<template>
	<section
		class="section-split-content"
		:class="{ 'section-split-content--min-vp-height-slots': minVpHeightSlots }"
	>
		<div class="section-split-content__first">
			<slot name="first" />
		</div>
		<div
			class="section-split-content__second"
			:class="{
				'section-split-content__second--image': secondSlotType === 'image',
				'section-split-content__second--swiper': secondSlotType === 'swiper'
			}"
		>
			<slot name="second" />
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	minVpHeightSlots?: boolean;
	secondSlotType?: "image" | "swiper";
}>();
</script>

<!-- unscoped! -->
<style src="./SplitContent.scss" />