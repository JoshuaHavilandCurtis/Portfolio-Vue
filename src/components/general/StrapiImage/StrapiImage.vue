<template>
	<img
		:src="strapiUrl(format?.url)"
		:width="format?.width"
		:height="format?.height"
		:alt="image.data.attributes.alternativeText ?? undefined"
		:loading="lazy === true ? 'lazy' : undefined"
	>
</template>

<script setup lang="ts">
import Strapi from "@/types/strapi.models";
import { computed } from "vue";
import { strapiUrl } from "@/utils/strapi";

const props = defineProps<{
	image: Strapi.Item<Strapi.ImageData>;
	format: "thumbnail" | "small" | "medium" | "large";
	lazy?: boolean;
}>();

const format = computed(() => props.image.data.attributes.formats[props.format]);
</script>

<style src="./StrapiImage.scss" scoped />@/types/api/strapi.models