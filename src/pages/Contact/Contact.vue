<!-- eslint-disable vue/no-v-html -->
<template>
	<Transition
		appear
		name="content-loaded"
	>
		<Loader v-if="data === null" />

		<StandardContent
			v-else
			class="contact"
		>
			<BackButton />
			<div class="contact__content">
				<hgroup>
					<h1>{{ data.title }}</h1>
				</hgroup>

				<p v-html="parse(data.description)" />
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
	</Transition>
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

const data = ref<ContactData | null>(null);

void (async () => {
	const response = await getFromStrapi<ContactResponse>("contact");
	data.value = response.data.attributes;
})();
</script>

<style scoped src="./Contact.scss" />