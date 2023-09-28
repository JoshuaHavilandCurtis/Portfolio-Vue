import Strapi from "@/types/strapi.models";

export type SocialLink = {
	name: string;
	url: string;
	icon: Strapi.Item<Strapi.ImageData>;
	background_color: string;
};