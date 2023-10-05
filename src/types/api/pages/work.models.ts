import { Product } from "@/types/api/pages/products.models";
import Strapi from "@/types/api/strapi.models";

export type WorkResponse = Strapi.SingleResponse<WorkData>;

export type WorkData = {
	title: string;
	content: string;
	products: Strapi.CollectionItem<Strapi.PublishableItemData<Product>>;
};