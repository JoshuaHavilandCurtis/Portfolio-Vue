import { StrapiCollectionItem, StrapiCollectionResponse, StrapiImageData, StrapiItem, StrapiPublishableItemData, StrapiSingleResponse } from "@/lib/models/strapi.models";

export type ProductResponse = StrapiSingleResponse<Product>
export type ProductsResponse = StrapiCollectionResponse<Product>

export type Product = {
	title: string;
	subtitle?: string;
	description: string;
	link: string;
	image: StrapiItem<StrapiImageData>;
	tags: StrapiCollectionItem<StrapiPublishableItemData<ProductTag>>;
}

type ProductTag = {
	name: string;
	color: string;
}
