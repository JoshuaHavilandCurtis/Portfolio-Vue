<template>
	<Transition
		appear
		name="fade"
	>
		<div
			v-if="visible"
			class="panel-backdrop"
			@click="() => closePanel()"
			@touchmove="(ev: TouchEvent) => slidePanel(ev.touches[0]!.clientX)"
			@touchend="() => checkIfShouldClosePanel()"
		/>
	</Transition>

	<Transition
		appear
		name="slide-in-from-right"
	>
		<div
			v-if="visible"
			ref="panelElRef"
			class="panel"
		>
			<slot />
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
	visible: boolean;
	closeFn: () => void;
}>();

document.addEventListener("keydown", ev => {
	if (ev.key !== "Escape" && ev.key !== "Esc")
		return;
	void closePanel();
});

const panelElRef = ref<HTMLElement | null>(null);

/**
 * The position of the most recent Touch event, relative to the panel.
 */
let posX_relativeToPanel: number | null = null;

/**
 * Attempt to slide the panel relative to `posX`.
 * @param posX X position of TouchEvent
 */
const slidePanel = (posX: number) => {
	if (panelElRef.value === null)
		throw new Error("Missing panel element ref!");

	//get the panels offset from its starting position
	posX_relativeToPanel = posX - panelElRef.value.offsetLeft;
	//if posX_relativeToPanel is negative, dont transform (dont go backwards)
	if (posX_relativeToPanel < 0)
		return;
	//remove transition delay and set transform
	panelElRef.value.style.transition = "unset";
	panelElRef.value.style.transform = `translateX(${posX_relativeToPanel}px)`;
};

/**
 * Check to see if the panel should remain open or if the panel should
 * be closed after `touchend` event is fired.
 */
const checkIfShouldClosePanel = () => {
	if (panelElRef.value === null)
		throw new Error("Missing panel element ref!");
	if (posX_relativeToPanel === null)
		return;

	//readd transition delay and unset transform
	panelElRef.value.style.transition = "";
	panelElRef.value.style.transform = "";

	//if less than halfway dragged, keep panel open
	if (posX_relativeToPanel <= panelElRef.value.clientWidth / 2)
		return;

	//otherwise, close panel
	posX_relativeToPanel = null;
	void closePanel(); //works together with <transition> component
};

const closePanel = () => props.closeFn();
</script>

<style scoped src="./Panel.scss" />