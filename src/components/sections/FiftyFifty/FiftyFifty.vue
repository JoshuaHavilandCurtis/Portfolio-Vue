<template>
	<section
		class="fifty-fifty"
		:class="{ eachItemViewportHeight }"
	>
		<div class="fifty-fifty__first">
			<slot name="first" />
		</div>
		<div
			class="fifty-fifty__second"
			:class="{
				'fifty-fifty__second--image': fillSecondWith === 'image',
				'fifty-fifty__second--swiper': fillSecondWith === 'swiper'
			}"
		>
			<slot name="second" />
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	eachItemViewportHeight?: boolean;
	fillSecondWith?: "image" | "swiper";
}>();
</script>

<!-- unscoped! -->
<style src="./FiftyFifty.scss" />