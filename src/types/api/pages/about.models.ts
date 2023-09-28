import Strapi from "@/types/strapi.models";

export type AboutResponse = Strapi.SingleResponse<AboutData>;

export type AboutData = {
	title: string;
	description: string;
	info_blocks: Strapi.BaseItemData<InfoBlock>[]; //repeated component
	image: Strapi.Item<Strapi.ImageData>;
};

type InfoBlock = {
	title: string;
	description: string;
};