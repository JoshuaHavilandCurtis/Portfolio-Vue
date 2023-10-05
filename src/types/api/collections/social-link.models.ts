import Strapi from "@/types/api/strapi.models";

export type SocialLink = {
	name: string;
	url: string;
	icon: Strapi.Item<Strapi.ImageData>;
	background_color: string;
};