import { SocialLink } from "@/types/api/collections/social-link.models";
import Strapi from "@/types/api/strapi.models";

export type ContactResponse = Strapi.SingleResponse<ContactData>;

export type ContactData = {
	title: string;
	content: string;
	social_links: Strapi.CollectionItem<Strapi.StandardItemData<SocialLink>>;
};