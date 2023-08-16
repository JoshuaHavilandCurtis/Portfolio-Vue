<template>
	<img
		:src="fixStrapiImageUrl(format?.url)"
		:width="format?.width"
		:height="format?.height"
	>
</template>

<script setup lang="ts">
import { StrapiImageData, StrapiItem } from "@/lib/models/strapi.models";
import { computed } from "vue";
import { fixStrapiImageUrl } from "@/lib/strapi";

const props = defineProps<{
	image: StrapiItem<StrapiImageData>;
	format: "thumbnail" | "small" | "medium" | "large";
}>();

const format = computed(() => props.image.data.attributes.formats[props.format]);
</script>

<style src="./StrapiImage.scss" scoped />@/lib/models/strapi.models