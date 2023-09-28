import { SocialLink } from "@/types/api/collections.models";
import Strapi from "@/types/strapi.models";

export type HomeResponse = Strapi.SingleResponse<HomeData>;

export type HomeData = {
	title: string;
	subtitle: string;
	cta: string;
	image: Strapi.Item<Strapi.ImageData>;
	social_links?: Strapi.CollectionItem<Strapi.StandardItemData<SocialLink>>;
	resume: Strapi.Item<Strapi.MediaData>;
};

