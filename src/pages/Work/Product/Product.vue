<!-- eslint-disable vue/no-v-html -->
<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader v-if="showLoader" />
	</Transition>

	<SplitContent
		v-if="data !== null"
		second-slot-type="image"
		class="product"
	>
		<template #first>
			<BackButton />

			<div class="product__main-content">
				<hgroup>
					<h1>
						{{ data.title }}
					</h1>
					<h4 v-if="data.subtitle !== null">
						{{ data.subtitle }}
					</h4>
				</hgroup>

				<div v-html="parse(data.content)" />
				<ul class="product__tags">
					<li
						v-for="tag of data.tags.data"
						:key="tag.id"
						:style="'--product-tag-color: ' + tag.attributes.color"
						class="product-tag"
						:aria-label="tag.attributes.name"
					>
						{{ tag.attributes.name }}
					</li>
				</ul>
				<Button
					class="product__link"
					size="large"
					mode="filled"
					:href="data.link"
				>
					Visit the site
				</Button>
			</div>
		</template>

		<template #second>
			<StrapiImage
				:image="data.image"
				format="large"
				lazy
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import BackButton from "@/components/general/BackButton/BackButton.vue";
import Button from "@/components/general/Button/Button.vue";
import Loader from "@/components/general/Loader/Loader.vue";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import SplitContent from "@/components/sections/SplitContent/SplitContent.vue";
import config from "@/config";
import { ProductResponse, Product } from "@/types/api/pages/products.models";
import { delay } from "@/utils/common";
import { getFromStrapi } from "@/utils/strapi";
import { parse } from "marked";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

if (typeof router.currentRoute.value.params.productID !== "string")
	throw new Error("Missing product ID from request");

const productID = parseInt(router.currentRoute.value.params.productID);
const data = ref<Product | null>(null);
const showLoader = ref(true);

void (async () => {
	const response = await getFromStrapi<ProductResponse>(`products/${productID}`);
	data.value = response.data.attributes;
	if (config.artificialDelay)
		await delay(config.artificialDelayDuration);
	showLoader.value = false;
})();
</script>

<style scoped src="./Product.scss" />@/utils/strapi