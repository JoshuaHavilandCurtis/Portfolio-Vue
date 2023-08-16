<template>
	<span
		ref="terminalTextElRef"
		class="terminal-text"
	>
		<slot />
	</span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { delay, randomDelay } from "@/lib/common";

const props = defineProps<{
	fixedHeight?: boolean;
}>();

//unable to set classes directly onto `<slot>` component: have to manually select the child...
//todo -> see if theres a way to fix this
const terminalTextElRef = ref<HTMLElement | null>(null);

onMounted(() => hide());

const createCursorElmt = () => {
	const elmt = document.createElement("span");
	elmt.textContent = "_";
	elmt.classList.add("terminal-text__cursor");
	return elmt;
};

const _cursorElmt = createCursorElmt();
const cursorElRef = computed(() => _cursorElmt); //get as a .value prop in case of future change to elmt ref

const show = () => {
	if (terminalTextElRef.value === null)
		return;
	terminalTextElRef.value.style.visibility = "";
};

const hide = () => {
	if (terminalTextElRef.value === null)
		return;
	terminalTextElRef.value.style.visibility = "hidden";
};

/**
 * Start blinking the cursor.
 */
const startBlinking = () => cursorElRef.value.dataset.blink = "true";

/**
 * Stop blinking the cursor.
 */
const stopBlinking = () => cursorElRef.value.dataset.blink = "false";

type NodeChar = {
	node: Node;
	chars: SpecialChar[];
}

/**
 * Start the terminal text effect.
 */
const startEffect = async () => {
	if (terminalTextElRef.value === null)
		throw new Error("Terminal text slot elmt ref is null!");

	await delay(50);

	//stop the cursor blinking
	stopBlinking();

	const textNodes = getTextNodes(terminalTextElRef.value);
	const nodeChars: NodeChar[] = textNodes.map(node => ({ node, chars: parseSpecialText(node.textContent ?? "") }));

	//if fixed height: once special text has been parsed, append all the text and determine the final height before we start animating.
	if (props.fixedHeight) {
		for (const nodeChar of nodeChars)
			nodeChar.node.textContent = nodeChar.chars.map(char => typeof char === "string" ? char : "").join("");

		terminalTextElRef.value.style.minHeight = `${terminalTextElRef.value.clientHeight}px`;
	}

	//remove all characters
	for (const node of textNodes)
		node.textContent = "";

	//enable visiblity again
	show();

	//wait for all chars to be added
	for (const nodeChar of nodeChars)
		await insertChars(nodeChar);

	//if fixed height: remove the calculated max height
	if (props.fixedHeight)
		terminalTextElRef.value.style.minHeight = "";

	//then start blinking the cursor again
	startBlinking();
};

//expose this above method to be called by parent component
defineExpose({
	startEffect
});

/**
 * Return all the text nodes on an element.
 * @param elmt Target element
 */
const getTextNodes = (elmt: Node) => {
	const textNodes: Node[] = [];

	for (const node of elmt.childNodes) {
		if (node.nodeType === Node.TEXT_NODE) {
			if (node.textContent === "\n")
				continue;
			textNodes.push(node);
		} else {
			textNodes.push(...getTextNodes(node));
		}
	}

	return textNodes;
};

enum ModifierType {
	DELAY = "delay",
	DELETE = "delete"
}

type Modifier = {
	type: ModifierType;
	value: number | string;
}

type SpecialChar = string | Modifier;

/**
 * Insert the characters for a Text Node incrementally, with a random duration between each insertion.
 * @param textNode Target text node
 */
const insertChars = async (nodeChar: NodeChar) => {
	//insert the cursor after this node
	const parentNode = nodeChar.node.parentNode;
	if (parentNode === null)
		throw new Error("Text node is missing parent node!");

	const nextNode = nodeChar.node.nextSibling;
	if (nextNode === null) {
		if (parentNode !== terminalTextElRef.value)
			parentNode.appendChild(cursorElRef.value);

	} else {
		parentNode.insertBefore(cursorElRef.value, nextNode);
	}

	//insert each char
	for (const char of nodeChar.chars) {
		//if its just a string character: append it
		if (typeof char === "string") {
			await randomDelay(10, 50);
			nodeChar.node.textContent = nodeChar.node.textContent !== null ? nodeChar.node.textContent + char : "";
			continue;
		}

		//otherwise, if its a modifier: apply that modifier
		switch (char.type) {
			case ModifierType.DELAY:
				if (typeof char.value !== "number")
					throw new Error("Terminal text: DELAY modifier has invalid value!");
				startBlinking();
				await delay(char.value);
				stopBlinking();
				break;

			case ModifierType.DELETE:
				if (typeof char.value !== "number" && !(char.value.toUpperCase() in DeleteModifierOptions))
					throw new Error("Terminal text: DELETE modifier has invalid value!");
				await removeChars(nodeChar.node, char.value as number | DeleteModifierOptions);
				break;
		}
	}
};

enum DeleteModifierOptions {
	LINE = "line"
}

const removeChars = async (textNode: Node, quantity: number | DeleteModifierOptions) => {
	let quantityRemaining = quantity === DeleteModifierOptions.LINE ? textNode.textContent?.length ?? 0 : quantity;
	while (quantityRemaining > 0) {
		await randomDelay(10, 50);
		textNode.textContent = textNode.textContent?.slice(0, textNode.textContent.length - 1) ?? null;
		quantityRemaining--;
	}
};

/**
 * Parse a string as an array of `SpecialChar`.
 * 
 *  * This can definitely be done better!
 * @param text Target text
 */
const parseSpecialText = (text: string): SpecialChar[] => {
	const chars: SpecialChar[] = [];
	let modifiedText = text;

	while (modifiedText.includes("{") && modifiedText.includes("}")) {
		const startIndex = modifiedText.indexOf("{");
		const endIndex = modifiedText.indexOf("}", startIndex);
		if (endIndex === -1)
			throw new Error("Terminal text: Modifier bracket was opened but not closed!");

		const modString = modifiedText.slice(startIndex + 1, endIndex).trim();
		const mod = parseModifier(modString);

		chars.push(...modifiedText.slice(0, startIndex).split(""));
		chars.push(mod);

		modifiedText = modifiedText.slice(endIndex + 1, text.length);
	}

	chars.push(...modifiedText);
	return chars;
};

/**
 * Parse a modifier in the string format `name: value`.
 * @param string 
 */
const parseModifier = (string: string): Modifier => {
	const seperatorIndex = string.indexOf(":");
	if (seperatorIndex === -1)
		throw new Error("Terminal text: `:` is not present!");

	const type = string.slice(0, seperatorIndex).trim() as ModifierType;

	const rawValue = string.slice(seperatorIndex + 1, string.length).trim();
	let value: number | string = parseInt(rawValue);
	if (isNaN(value))
		value = rawValue;

	const modifier: Modifier = { type, value };
	return modifier;
};

</script>

<!-- unscoped! -->
<style src="./TerminalText.scss" />