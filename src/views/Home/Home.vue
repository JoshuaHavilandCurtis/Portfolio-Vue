<!-- eslint-disable vue/no-v-html -->
<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader
			v-if="data === null || !contentReady"
			fixed
			prioritise
		/>

		<FiftyFifty
			v-else
			each-item-viewport-height
			fill-second-with="image"
			class="home"
		>
			<template #first>
				<BurgerMenu />

				<div class="home__main-content">
					<h1>
						{{ data.title }}
					</h1>

					<TerminalText
						ref="terminalTextElRef"
						class="mb-4"
						fixed-height
					>
						<h5 v-html="marked.parse(data.subtitle)" />
					</TerminalText>

					<LargeButton
						mode="ghost"
						@click="() => router.push(`about`)"
					>
						{{ data.cta }}
					</LargeButton>
				</div>

				<div class="home__footer">
					<span v-if="data.social_links !== undefined && data.social_links.data.length > 0">
						Find me at
						<template
							v-for="( link, index ) in data.social_links.data "
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
							href="#"
						>my resume</a> (PDF 296kb)</span>
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
import BurgerMenu from "@/components/general/BurgerMenu/BurgerMenu.vue";
import LargeButton from "@/components/general/LargeButton/LargeButton.vue";
import TerminalText from "@/components/general/TerminalText/TerminalText.vue";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import { HomeResponse, HomeData } from "@/lib/models/api/home.models";
import { getFromStrapi } from "@/lib/strapi";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { marked } from "marked";
import { delay } from "@/lib/common";

const router = useRouter();

const terminalTextElRef = ref<HTMLElement & { startEffect: () => unknown; } | null>(null); //no types on exposed methods and props, sad

const data = ref<HomeData | null>(null);

const contentReady = ref(false);

void (async () => {
	//delay of a minimum of 100ms to stop loading artifacts, and to show off the loader
	await Promise.all([
		(async () => {
			const response = await getFromStrapi<HomeResponse>("home");
			data.value = response.data.attributes;
		})(),
		delay(100)
	]);
	contentReady.value = true;

	await delay(20); //this is very dodgy but it has to be done it seems....
	terminalTextElRef.value?.startEffect();
})();
</script>

<style scoped src="./Home.scss" />