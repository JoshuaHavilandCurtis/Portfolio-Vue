<!-- eslint-disable vue/no-v-html -->
<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader v-if="showLoader" />
	</Transition>

	<StandardContent
		v-if="data !== null"
		class="contact"
	>
		<BackButton />
		<div class="contact__content">
			<hgroup>
				<h1>{{ data.title }}</h1>
			</hgroup>

			<p v-html="parse(data.content)" />
			<ul class="social-link-icons">
				<li
					v-for="link of data.social_links.data"
					:key="link.id"
				>
					<a
						class="btn social-link-icon"
						:style="{ backgroundColor: link.attributes.background_color }"
						target="_blank"
						:href="link.attributes.url"
					>
						<StrapiImage
							:image="link.attributes.icon"
							format="thumbnail"
							lazy
						/>
					</a>
				</li>
			</ul>
		</div>
	</StandardContent>
</template>

<script setup lang="ts">
import Loader from "@/components/general/Loader/Loader.vue";
import StandardContent from "@/components/sections/StandardContent/StandardContent.vue";
import { ContactResponse, ContactData } from "@/types/api/pages/contact.models";
import { getFromStrapi } from "@/utils/strapi";
import { ref } from "vue";
import { parse } from "marked";
import StrapiImage from "@/components/general/StrapiImage/StrapiImage.vue";
import BackButton from "@/components/general/BackButton/BackButton.vue";
import config from "@/config";
import { delay } from "@/utils/common";

const data = ref<ContactData | null>(null);
const showLoader = ref(true);

void (async () => {
	const response = await getFromStrapi<ContactResponse>("contact");
	data.value = response.data.attributes;
	if (config.artificialDelay)
		await delay(config.artificialDelayDuration);
	showLoader.value = false;
})();
</script>

<style scoped src="./Contact.scss" />