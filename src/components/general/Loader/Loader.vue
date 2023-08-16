<template>
	<section
		class="loader-wrapper"
		:class="{ inline, prioritise, fixed }"
	>
		<Transition
			appear
			name="fade-slow-in"
		>
			<div class="loader">
				<span>{</span>
				<span>}</span>
			</div>
		</Transition>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	inline?: boolean;
	prioritise?: boolean;
	fixed?: boolean;
	initialPageLoad?: boolean;
}>();
</script>

<style scoped src="./Loader.scss" />