<!-- eslint-disable vue/no-v-html -->
<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader v-if="data === null" />

		<FiftyFifty
			v-else
			fill-second-with="image"
			class="about"
		>
			<template #first>
				<BackButton />

				<div class="about__content">
					<div class="about__main-content">
						<h1>{{ data.title }}</h1>
						<p>{{ data.description }}</p>
					</div>

					<div
						v-if="data.info_blocks !== undefined && data.info_blocks.length > 0"
						class="about__info-blocks"
					>
						<div
							v-for="infoBlock in data.info_blocks"
							:key="infoBlock.id"
							class="info-block"
						>
							<h4>{{ infoBlock.title }}</h4>
							<p v-html="marked.parse(infoBlock.description)" />
						</div>
					</div>
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
import Loader from "@/components/general/Loader/Loader.vue";
import FiftyFifty from "@/components/sections/FiftyFifty/FiftyFifty.vue";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import BackButton from "@/components/general/BackButton/BackButton.vue";
import { AboutResponse, AboutData } from "@/lib/models/api/about.models";
import { getFromStrapi } from "@/lib/strapi";
import { ref } from "vue";
import { marked } from "marked";

const data = ref<AboutData | null>(null);

void (async () => {
	const response = await getFromStrapi<AboutResponse>("about");
	data.value = response.data.attributes;
})();
</script>

<style scoped src="./About.scss" />