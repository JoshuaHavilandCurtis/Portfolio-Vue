import Strapi from "@/types/api/strapi.models";

export type AboutResponse = Strapi.SingleResponse<AboutData>;

export type AboutData = {
	title: string;
	content: string;
	info_blocks: Strapi.BaseItemData<InfoBlock>[]; //repeated component
	image: Strapi.Item<Strapi.ImageData>;
};

type InfoBlock = {
	title: string;
	content: string;
};