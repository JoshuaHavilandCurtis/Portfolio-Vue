<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader v-if="data === null" />

		<FiftyFifty
			v-else
			fill-second-with="swiper"
			class="work"
		>
			<template #first>
				<BackButton />

				<div class="work__main-content">
					<h1>
						{{ data.title }}
					</h1>
					<p>
						{{ data.description }}
					</p>
				</div>
			</template>

			<template #second>
				<Swiper
					:speed="200"
					:space-between="16"
					:centered-slides="true"
					:navigation="true"
					:pagination="{
						clickable: true
					}"
					:simulate-touch="true"
					:allow-touch-move="true"
					:follow-finger="true"
					:grab-cursor="true"
					:breakpoints="{
						1400: {
							slidesPerView: 2
						},
						1200: {
							slidesPerView: 1.75
						},
						992: {
							slidesPerView: 1.5
						},
						768: {
							slidesPerView: 2
						},
						0: {
							slidesPerView: 1.35
						}
					}"
				>
					<SwiperSlide
						v-for="product in data.products.data"
						:key="product.id"
						:style="{ backgroundImage: `url('${fixStrapiImageUrl(product.attributes.image.data.attributes.formats.medium?.url ?? '')}')` }"
						@click="router.push(`${parentPath}/${product.id}`)"
					/>
				</Swiper>
			</template>
		</FiftyFifty>
	</Transition>

	<Panel
		:visible="productPanelVisible"
		:close-fn="closeProductPanel"
	>
		<RouterView />
	</Panel>
</template>

<script setup lang="ts">
import BackButton from "@/components/general/BackButton/BackButton.vue";
import Loader from "@/components/general/Loader/Loader.vue";
import Panel from "@/components/general/Panel/Panel.vue";
import FiftyFifty from "@/components/sections/FiftyFifty/FiftyFifty.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { getFromStrapi } from "@/lib/strapi";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { WorkResponse, WorkData } from "@/lib/models/api/work.models";
import { fixStrapiImageUrl } from "@/lib/strapi";

const router = useRouter();

/**
 * Shorthand computed property for the parent routes' URL path.
 */
const parentPath = router.currentRoute.value.matched[0]?.path ?? "/";

const productPanelVisible = ref(false);

const openProductPanel = () => {
	if (productPanelVisible.value)
		return;

	productPanelVisible.value = true;
};

const closeProductPanel = () => {
	if (!productPanelVisible.value)
		return;

	productPanelVisible.value = false;
	void router.push(parentPath);
};

/**
 * Determine if the user is on a product.
 */
const onProduct = computed(() => router.currentRoute.value.params["productID"] !== undefined);

const checkWorkPanel = (onProduct: boolean) => {
	if (onProduct) {
		openProductPanel();
	} else {
		closeProductPanel();
	}
};

watch(onProduct, () => checkWorkPanel(onProduct.value)); //check when the route changes
onMounted(() => checkWorkPanel(onProduct.value)); //check when the page loads

const data = ref<WorkData | null>(null);

void (async () => {
	const response = await getFromStrapi<WorkResponse>("work");
	data.value = response.data.attributes;
})();
</script>

<style scoped src="./Work.scss" />