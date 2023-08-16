import { StrapiCollectionItem, StrapiImageData, StrapiItem, StrapiSingleResponse, StrapiStandardItemData } from "@/lib/models/strapi.models";

export type HomeResponse = StrapiSingleResponse<HomeData>

export type HomeData = {
	title: string;
	subtitle: string;
	cta: string;
	image: StrapiItem<StrapiImageData>;
	social_links?: StrapiCollectionItem<StrapiStandardItemData<SocialLink>>;
}

type SocialLink = {
	name: string;
	url: string;
}