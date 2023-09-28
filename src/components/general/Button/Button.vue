<template>
	<template v-if="href !== undefined">
		<a
			type="button"
			class="btn"
			:class="{
				'btn--large': size === 'large',
				'btn--filled': mode === 'filled',
				'btn--ghost': mode === 'ghost'
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
			class="btn"
			:class="{
				'btn--large': size === 'large',
				'btn--filled': mode === 'filled',
				'btn--ghost': mode === 'ghost'
			}"
		>
			<slot />
		</button>
	</template>
</template>

<script setup lang="ts">
defineProps<{
	size?: "normal" | "large";
	mode: "filled" | "ghost";
	href?: string;
}>();
</script>

<style scoped src="./Button.scss" />