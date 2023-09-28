// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Strapi {
	/**
	 * Request parameters used when querying the API.
	 */
	export type RequestParams = {
		populate: number | string;
		[key: string]: unknown; //todo
	};

	/**
	 * There are two main types of REST API responses from Strapi (as far as I'm
	 * aware) - The'single type' response and the 'collection' response.
	 */
	export type Response = SingleResponse | CollectionResponse;

	/**
	 * Response received when querying a single type, or a single collection item, using
	 * the REST API.
	 */
	export type SingleResponse<T = object> = Item<PublishableItemData<T>>; //standard item

	/**
	 * Response received when querying a collection using the REST API.
	 */
	export type CollectionResponse<T = object> = CollectionItem<PublishableItemData<T>> & { //collection item
		meta: {
			pagination: {
				page: number;
				pageSize: number;
				pageCount: number;
				total: number;
			};
		};
	};


	/* Item types */

	/**
	 * A base item. Contains item data within it.
	 */
	export type Item<T extends ItemData> = {
		data: T;
		meta: object;
	};

	/**
	 * A base collection item. Contains item data within it.
	 */
	export type CollectionItem<T extends ItemData> = {
		data: T[];
	};


	/* Item data types */

	export type ItemData = BaseItemData | StandardItemData | PublishableItemData;

	/**
	 * Base item data. Only contains an ID alongside any custom properties.
	 * 
	 * Used for repeated components.
	 */
	export type BaseItemData<T = object> = T & {
		id: number;
	};

	/**
	 * Standard item data. Contains an ID as well as attributes.
	 */
	export type StandardItemData<T = object> = {
		id: number;
		attributes: T & {
			createdAt: string;
			updatedAt: string;
		};
	};

	/**
	 * Publishable item data. Same as StandardItemData, but also contains the `publishedAt` property.
	 */
	export type PublishableItemData<T = object> = StandardItemData<T & {
		publishedAt: string;
	}>;


	/* Common item data types */

	/**
	 * Image data. Contains several properties about an image, including the one or more formats available.
	 * 
	 * An image may or may not have larger formats available: it depends on its size.
	 */

	export type MediaData<T = object> = StandardItemData<T & { //standard, not a publishable item
		name: string;
		alternativeText: string | null;
		caption: string | null;
		width: number;
		height: number;
		formats: object | null;
		hash: string;
		ext: string;
		mime: string;
		size: string;
		url: string;
		previewUrl: string | null;
		provider: string;
		provider_metadata: string | null;
	}>;

	export type ImageData = MediaData<{
		formats: {
			thumbnail: ImageDataFormat;
			small: ImageDataFormat<500>;
			medium?: ImageDataFormat<750>;
			large?: ImageDataFormat<1000>;
		};
	}>;

	export type ImageDataFormat<width = number> = {
		name: string;
		hash: string;
		ext: string;
		mime: string;
		path: string | null;
		width: width;
		height: number;
		size: number;
		url: string;
	};
}

export default Strapi;