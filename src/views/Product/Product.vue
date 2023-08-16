<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader v-if="data === null" />

		<FiftyFifty
			v-else
			fill-second-with="image"
			class="product"
		>
			<template #first>
				<BackButton />

				<div class="product__main-content">
					<h1>
						{{ data.title }}
					</h1>
					<h4
						v-if="data.subtitle !== undefined"
						class="mb-3"
					>
						{{ data.subtitle }}
					</h4>
					<p>
						{{ data.description }}
					</p>
					<ul class="product__tags">
						<li
							v-for="tag in data.tags.data"
							:key="tag.id"
							:style="'--product-tag-color: ' + tag.attributes.color"
							class="product-tag"
						>
							{{ tag.attributes.name }}
						</li>
					</ul>
					<LargeButton
						class="product__link mt-3"
						mode="filled"
						:href="data.link"
					>
						Visit the site
					</LargeButton>
				</div>
			</template>

			<template #second>
				<StrapiImage
					:image="data.image"
					format="large"
				/>
			</template>
		</FiftyFifty>
	</Transition>
</template>

<script setup lang="ts">
import BackButton from "@/components/general/BackButton/BackButton.vue";
import LargeButton from "@/components/general/LargeButton/LargeButton.vue";
import Loader from "@/components/general/Loader/Loader.vue";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import FiftyFifty from "@/components/sections/FiftyFifty/FiftyFifty.vue";
import { ProductResponse, Product } from "@/lib/models/api/products.models";
// import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import { getFromStrapi } from "@/lib/strapi";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const productID = parseInt(router.currentRoute.value.params.productID?.toString() ?? ""); //todo -> check this!

const data = ref<Product | null>(null);

void (async () => {
	const response = await getFromStrapi<ProductResponse>(`products/${productID}`);
	data.value = response.data.attributes;
})();
</script>

<style scoped src="./Product.scss" />