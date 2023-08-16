<template>
	<template v-if="href !== undefined">
		<a
			type="button"
			class="large-button large-button--link"
			:class="{
				'large-button--filled': mode === 'filled',
				'large-button--ghost': mode === 'ghost'
			}"
			:href="href"
			target="_blank"
		>
			<slot />
		</a>
	</template>
	<template v-else>
		<button
			type="button"
			class="large-button"
			:class="{
				'large-button--filled': mode === 'filled',
				'large-button--ghost': mode === 'ghost'
			}"
		>
			<slot />
		</button>
	</template>
</template>

<script setup lang="ts">

defineProps<{
	mode: "filled" | "ghost";
	href?: string;
}>();
</script>

<style scoped src="./LargeButton.scss" />