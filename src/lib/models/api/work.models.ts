import { Product } from "@/lib/models/api/products.models";
import { StrapiCollectionItem, StrapiPublishableItemData, StrapiSingleResponse } from "@/lib/models/strapi.models";

export type WorkResponse = StrapiSingleResponse<WorkData>;

export type WorkData = {
	title: string;
	description: string;
	products: StrapiCollectionItem<StrapiPublishableItemData<Product>>;
}