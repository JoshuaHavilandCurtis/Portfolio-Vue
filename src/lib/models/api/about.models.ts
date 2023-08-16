import { StrapiBaseItemData, StrapiImageData, StrapiItem, StrapiSingleResponse } from "@/lib/models/strapi.models";

export type AboutResponse = StrapiSingleResponse<AboutData>

export type AboutData = {
	title: string;
	description: string;
	info_blocks: StrapiBaseItemData<InfoBlock>[]; //repeated component
	image: StrapiItem<StrapiImageData>;
}

type InfoBlock = {
	title: string;
	description: string;
}