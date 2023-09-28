<template>
	<span
		ref="terminalTextElRef"
		class="terminal-text"
	>
		<slot />
	</span>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { delay as delayUtil, randomDelay } from "@/utils/common";

const props = defineProps<{
	fixedHeight?: boolean;
	delay?: number;
}>();

const terminalTextElRef = ref<HTMLElement | null>(null);

onMounted(() => {
	hide();
	void startEffect();
});

const createCursorElmt = () => {
	const elmt = document.createElement("span");
	elmt.classList.add("terminal-text__cursor");
	elmt.dataset.blink = "false";
	return elmt;
};

const cursorElmt = createCursorElmt();

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

const startBlinking = () => cursorElmt.dataset.blink = "true";

const stopBlinking = () => cursorElmt.dataset.blink = "false";

/**
 * Start the terminal text effect.
 */
const startEffect = async () => {
	if (terminalTextElRef.value === null)
		throw new Error("Missing terminal text slot element");

	stopBlinking();

	const textNodes = getTextNodes(terminalTextElRef.value);

	//get the parsed text nodes
	const parsedTextNodes = new Map<Node, SpecialChar[]>();
	for (const node of textNodes)
		parsedTextNodes.set(node, parseText(node.textContent ?? ""));

	//if fixed height requested - remove the modifiers from the text nodes for now, in order to accurately determine the element's final height
	if (props.fixedHeight) {
		for (const [node, chars] of parsedTextNodes) {
			node.textContent = chars
				.map(char => typeof char === "string" ? char : "")
				.join("");
		}

		terminalTextElRef.value.style.minHeight = `${terminalTextElRef.value.clientHeight}px`;
	}

	//wait for the prop delay if it exists
	if (props.delay !== undefined)
		await delayUtil(props.delay);

	//now remove all characters
	for (const node of textNodes)
		node.textContent = "";

	show();

	//and wait for all chars to be added
	for (const [node, chars] of parsedTextNodes)
		await insertChars(node, chars);

	//if fixed height requested - remove the previously calculated min height
	if (props.fixedHeight)
		terminalTextElRef.value.style.minHeight = "";

	startBlinking();
};

/**
 * Return all the text nodes on an element.
 * @param elmt Target element
 * @returns All text nodes
 */
const getTextNodes = (elmt: Node) => {
	const textNodes: Node[] = [];

	for (const node of elmt.childNodes) {
		if (node.nodeType !== Node.TEXT_NODE) {
			textNodes.push(...getTextNodes(node));
			continue;
		}

		if (node.textContent === "\n")
			continue;

		textNodes.push(node);
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
};

type SpecialChar = string | Modifier;

/**
 * Insert the characters for a Text Node incrementally, with a random duration between each insertion.
 * @param textNode Target text node
 */
const insertChars = async (node: Node, chars: SpecialChar[]) => {
	//insert the cursor after this node
	const parentNode = node.parentNode;
	if (parentNode === null)
		throw new Error("Terminal text text node has missing parent node");

	const nextNode = node.nextSibling;
	if (nextNode === null) {
		if (parentNode !== terminalTextElRef.value)
			parentNode.appendChild(cursorElmt);

	} else {
		parentNode.insertBefore(cursorElmt, nextNode);
	}

	//insert each char
	for (const char of chars) {
		//if its just a string character: append it
		if (typeof char === "string") {
			await randomDelay(10, 50);
			node.textContent = (node.textContent ?? "") + char;
			continue;
		}

		//otherwise, if its a modifier: apply that modifier
		switch (char.type) {
			case ModifierType.DELAY:
				if (typeof char.value !== "number")
					throw new Error("Terminal text 'delay' modifier has invalid value");

				startBlinking();
				await delayUtil(char.value);
				stopBlinking();
				break;

			case ModifierType.DELETE:
				if (typeof char.value !== "number" && char.value !== "line")
					throw new Error("Terminal text 'delete' modifier has invalid value");

				await removeChars(node, char.value);
				break;
		}
	}
};

/**
 * Parse a string as an array of `SpecialChar`. This can probably be done in a better way.
 * @param text Target text
 * @returns Parsed text
 */
const parseText = (text: string) => {
	const chars: SpecialChar[] = [];
	let modifiedText = text;

	while (modifiedText.includes("{") && modifiedText.includes("}")) {
		const startIndex = modifiedText.indexOf("{");
		const endIndex = modifiedText.indexOf("}", startIndex);
		if (endIndex === -1)
			throw new Error("Terminal text modifier bracket was opened but never closed");

		const modString = modifiedText.slice(startIndex + 1, endIndex).trim();
		const mod = parseTextModifier(modString);

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
 * @returns Text modifier
 */
const parseTextModifier = (string: string) => {
	const seperatorIndex = string.indexOf(":");
	if (seperatorIndex === -1)
		throw new Error("Terminal text modifier is missing colon");

	const type = string.slice(0, seperatorIndex).trim() as ModifierType;

	const rawValue = string.slice(seperatorIndex + 1, string.length).trim();
	let value: number | string = parseInt(rawValue);
	if (isNaN(value))
		value = rawValue;

	const modifier: Modifier = { type, value };
	return modifier;
};

type DeleteModifierOption = number | "line";

/**
 * Perform the 'delete' modifier and remove chars from the text. This is basic, and cannot
 * handle climbing up to the previous text node.
 * @param textNode Target text node
 * @param quantity Quantity of chars to remove
 */
const removeChars = async (textNode: Node, quantity: DeleteModifierOption) => {
	let quantityRemaining = quantity === "line"
		? textNode.textContent?.length ?? 0
		: quantity;

	for (let i = 0; i < quantityRemaining; i++) {
		await randomDelay(10, 50);
		textNode.textContent = textNode.textContent?.slice(0, textNode.textContent.length - 1) ?? null;
	}
};

</script>

<!-- unscoped! -->
<style src="./TerminalText.scss" />