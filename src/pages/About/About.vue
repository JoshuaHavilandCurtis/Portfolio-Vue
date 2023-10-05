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
		class="about"
	>
		<template #first>
			<BackButton />

			<div class="about__content">
				<div class="about__main-content">
					<hgroup>
						<h1>{{ data.title }}</h1>
					</hgroup>

					<p>{{ data.content }}</p>
				</div>

				<div
					v-if="data.info_blocks.length > 0"
					class="about__info-blocks"
				>
					<div
						v-for="infoBlock of data.info_blocks"
						:key="infoBlock.id"
						class="info-block"
					>
						<h4>{{ infoBlock.title }}</h4>
						<div v-html="parse(infoBlock.content)" />
					</div>
				</div>
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
import Loader from "@/components/general/Loader/Loader.vue";
import SplitContent from "@/components/sections/SplitContent/SplitContent.vue";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import BackButton from "@/components/general/BackButton/BackButton.vue";
import config from "@/config";
import { AboutResponse, AboutData } from "@/types/api/pages/about.models";
import { getFromStrapi } from "@/utils/strapi";
import { ref } from "vue";
import { parse } from "marked";
import { delay } from "@/utils/common";

const data = ref<AboutData | null>(null);
const showLoader = ref(true);

void (async () => {
	const response = await getFromStrapi<AboutResponse>("about");
	data.value = response.data.attributes;
	if (config.artificialDelay)
		await delay(config.artificialDelayDuration);
	showLoader.value = false;
})();
</script>

<style scoped src="./About.scss" />