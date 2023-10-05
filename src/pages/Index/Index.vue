<!-- eslint-disable vue/no-v-html -->

<!-- also known as 'Home' ! -->

<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader
			v-if="showLoader"
			fixed
			prioritise
		/>
	</Transition>

	<SplitContent
		v-if="data !== null"
		min-vp-height-slots
		second-slot-type="image"
		class="index"
	>
		<template #first>
			<BurgerMenu :items="burgerMenuItems" />

			<div class="index__main-content">
				<hgroup>
					<h1>{{ data.title }}</h1>
				</hgroup>

				<TerminalText
					class="index__subtitle mb-4"
					fixed-height
					:delay="config.artificialDelay ? config.artificialDelayDuration : undefined"
				>
					<div v-html="parse(data.content)" />
				</TerminalText>

				<Button
					size="large"
					mode="ghost"
					@click="router.push('contact')"
				>
					{{ data.cta }}
				</Button>
			</div>

			<div class="index__footer">
				<span v-if="data.social_links.data.length > 0">
					Find/contact me on
					<template
						v-for="(link, index) of data.social_links.data "
						:key="link.attributes"
					>

						<template v-if="data.social_links.data.length === 1">
							<a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>.
						</template>

						<template v-else-if="index === data.social_links.data.length - 1">
							and <a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>.
						</template>

						<template v-else-if="index === data.social_links.data.length - 2">
							<a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>
						</template>

						<template v-else>
							<a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>,
						</template>

					</template>
				</span>

				<span>Download
					<a
						target="_blank"
						:href="strapiUrl(data.resume.data.attributes.url)"
					>my resume</a>.</span>
			</div>
		</template>

		<template #second>
			<StrapiImage
				:image="data.image"
				format="large"
			/>
		</template>
	</SplitContent>

	<Panel
		:open="panelOpen"
		:close-action="closePanel"
	>
		<RouterView />
	</Panel>
</template>

<script setup lang="ts">
import Loader from "@/components/general/Loader/Loader.vue";
import SplitContent from "@/components/sections/SplitContent/SplitContent.vue";
import BurgerMenu from "@/components/general/BurgerMenu/BurgerMenu.vue";
import Button from "@/components/general/Button/Button.vue";
import TerminalText from "@/components/general/TerminalText/TerminalText.vue";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import Panel from "@/components/general/Panel/Panel.vue";
import { HomeResponse, HomeData } from "@/types/api/pages/home.models";
import { getFromStrapi, strapiUrl } from "@/utils/strapi";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { parse } from "marked";
import config from "@/config";
import { delay } from "@/utils/common";

const router = useRouter();
const burgerMenuItems = router.getRoutes()
	.find(route => route.path === "/")?.children
	.map(route => ({
		label: route.name?.toString() ?? "...",
		href: route.path
	})) ?? [];

//when on child page
const panelOpen = computed(() => router.currentRoute.value.path !== "/");
const closePanel = () => void router.push("/");

const data = ref<HomeData | null>(null);
const showLoader = ref(true);

void (async () => {
	const response = await getFromStrapi<HomeResponse>("home");
	data.value = response.data.attributes;
	if (config.artificialDelay)
		await delay(config.artificialDelayDuration);
	showLoader.value = false;
})();
</script>

<style scoped src="./Index.scss" />