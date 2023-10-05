import { SocialLink } from "@/types/api/collections/social-link.models";
import Strapi from "@/types/api/strapi.models";

export type HomeResponse = Strapi.SingleResponse<HomeData>;

export type HomeData = {
	title: string;
	content: string;
	cta: string;
	image: Strapi.Item<Strapi.ImageData>;
	social_links: Strapi.CollectionItem<Strapi.StandardItemData<SocialLink>>;
	resume: Strapi.Item<Strapi.MediaData>;
};

