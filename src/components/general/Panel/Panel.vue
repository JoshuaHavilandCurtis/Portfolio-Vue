<template>
	<Transition
		v-if="initialDelayFinished"
		name="fade"
	>
		<div
			v-if="open"
			class="panel-backdrop"
			@click="closeAction"
			@touchstart="getPanelStartingPosX"
			@touchmove="ev => slidePanel(ev.touches[0]!.clientX)"
			@touchend="checkIfShouldClosePanel"
		/>
	</Transition>

	<Transition
		v-if="initialDelayFinished"
		name="slide-in-from-right"
	>
		<div
			v-if="open"
			ref="panelElRef"
			class="panel"
		>
			<slot />
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { delay } from "@/utils/common";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{
	open: boolean;
	closeAction: () => void;
}>();

const checkPanel = (value = props.open) => {
	if (value) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
};

onMounted(checkPanel);
watch(computed(() => props.open), checkPanel);

/**
 * Delay timer exists to stop Transition playing half an animation on page load.
 */
const initialDelayFinished = ref(false);
void delay(0).then(() => initialDelayFinished.value = true);

/**
 * Close panel on ESC keypress.
 */
document.addEventListener("keydown", ev => {
	if (ev.key !== "Escape" && ev.key !== "Esc")
		return;
	props.closeAction();
});

const panelElRef = ref<HTMLElement | null>(null);

/**
 * The position of the most recent Touch event, relative to the panel's
 * currently set starting position.
 */
let posX_relativeToPanel: number | null = null;
let panelStartingPosX: number | null = null;

const getPanelStartingPosX = () => panelStartingPosX = panelElRef.value?.getBoundingClientRect().left ?? 0;

/**
 * Attempt to slide the panel relative to `posX`.
 * @param posX X position of TouchEvent
 */
const slidePanel = (posX: number) => {
	if (panelElRef.value === null || panelStartingPosX === null)
		return;

	posX_relativeToPanel = posX - panelStartingPosX;

	//dont go backwards
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
	if (panelElRef.value === null || posX_relativeToPanel === null)
		return;

	panelStartingPosX = null;

	//readd transition delay and unset transform
	panelElRef.value.style.transition = "";
	panelElRef.value.style.transform = "";

	//if less than halfway dragged, keep panel open
	if (posX_relativeToPanel <= panelElRef.value.clientWidth / 2)
		return;

	//otherwise, close panel
	posX_relativeToPanel = null;
	props.closeAction();
};
</script>

<style scoped src="./Panel.scss" />