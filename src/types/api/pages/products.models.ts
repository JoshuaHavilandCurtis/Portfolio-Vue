import Strapi from "@/types/strapi.models";

export type ProductResponse = Strapi.SingleResponse<Product>;
export type ProductsResponse = Strapi.CollectionResponse<Product>;

export type Product = {
	title: string;
	subtitle?: string;
	description: string;
	link: string;
	image: Strapi.Item<Strapi.ImageData>;
	tags: Strapi.CollectionItem<Strapi.PublishableItemData<ProductTag>>;
};

type ProductTag = {
	name: string;
	color: string;
};
