<!-- eslint-disable vue/no-v-html -->
<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader v-if="data === null" />

		<SplitContent
			v-else
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

						<p>{{ data.description }}</p>
					</div>

					<div
						v-if="data.info_blocks !== undefined && data.info_blocks.length > 0"
						class="about__info-blocks"
					>
						<div
							v-for="infoBlock of data.info_blocks"
							:key="infoBlock.id"
							class="info-block"
						>
							<h4>{{ infoBlock.title }}</h4>
							<div v-html="parse(infoBlock.description)" />
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
	</Transition>
</template>

<script setup lang="ts">
import Loader from "@/components/general/Loader/Loader.vue";
import SplitContent from "@/components/sections/SplitContent/SplitContent.vue";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import BackButton from "@/components/general/BackButton/BackButton.vue";
import { AboutResponse, AboutData } from "@/types/api/pages/about.models";
import { getFromStrapi } from "@/utils/strapi";
import { ref } from "vue";
import { parse } from "marked";

const data = ref<AboutData | null>(null);

void (async () => {
	const response = await getFromStrapi<AboutResponse>("about");
	data.value = response.data.attributes;
})();
</script>

<style scoped src="./About.scss" />