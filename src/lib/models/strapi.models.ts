/**
 * Request parameters used when querying the API.
 */
export type StrapiRequestParams = {
	populate: number | string;
	[key: string]: unknown; //todo
}

/**
 * There are two main types of REST API responses from Strapi (as far as I'm
 * aware) - The'single type' response and the 'collection' response.
 */
export type StrapiResponse = StrapiSingleResponse | StrapiCollectionResponse

/**
 * Response received when querying a single type, or a single collection item, using
 * the REST API.
 */
export type StrapiSingleResponse<T = object> = StrapiItem<StrapiPublishableItemData<T>> //standard item

/**
 * Response received when querying a collection using the REST API.
 */
export type StrapiCollectionResponse<T = object> = StrapiCollectionItem<StrapiPublishableItemData<T>> & { //collection item
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}


/* Item types */

/**
 * A base item. Contains item data within it.
 */
export type StrapiItem<T extends StrapiItemData> = {
	data: T;
	meta: object;
}

/**
 * A base collection item. Contains item data within it.
 */
export type StrapiCollectionItem<T extends StrapiItemData> = {
	data: T[];
}


/* Item data types */

export type StrapiItemData = StrapiBaseItemData | StrapiStandardItemData | StrapiPublishableItemData

/**
 * Base item data. Only contains an ID alongside any custom properties.
 * 
 * Used for repeated components.
 */
export type StrapiBaseItemData<T = object> = T & {
	id: number;
}

/**
 * Standard item data. Contains an ID as well as attributes.
 */
export type StrapiStandardItemData<T = object> = {
	id: number;
	attributes: T & {
		createdAt: string;
		updatedAt: string;
	};
}

/**
 * Publishable item data. Same as StandardItemData, but also contains the `publishedAt` property.
 */
export type StrapiPublishableItemData<T = object> = StrapiStandardItemData<T & {
	publishedAt: string;
}>


/* Common item data types */

/**
 * Image data. Contains several properties about an image, including the one or more formats available.
 * 
 * An image may or may not have larger formats available: it depends on its size.
 */
export type StrapiImageData = StrapiStandardItemData<{ //image is a standard, not a publishable item!
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		thumbnail: StrapiImageFormat;
		small: StrapiImageFormat<500>;
		medium?: StrapiImageFormat<750>;
		large?: StrapiImageFormat<1000>;
	};
	hash: string;
	ext: string;
	mime: string;
	size: string;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string | null;
}>

export type StrapiImageFormat<width = number> = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: width;
	height: number;
	size: number;
	url: string;
}