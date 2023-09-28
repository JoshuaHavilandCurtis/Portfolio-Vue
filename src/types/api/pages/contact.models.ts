import { SocialLink } from "@/types/api/collections.models";
import Strapi from "@/types/strapi.models";

export type ContactResponse = Strapi.SingleResponse<ContactData>;

export type ContactData = {
	title: string;
	description: string;
	social_links: Strapi.CollectionItem<Strapi.StandardItemData<SocialLink>>;
};