import config from "@/config";
import Strapi from "@/types/api/strapi.models";
import { delay } from "@/utils/common";

/**
 * Send a GET request to a Strapi API endpoint. The response type must be defined
 * to provide effective typing functionality.
 * @param endpoint Endpoint to use
 * @returns Promise containing response data
 */
export const getFromStrapi = async <T extends Strapi.Response>(endpoint: string) => {
	if (config.enableContentCaching) {
		const cachedResponseData = getCachedStrapiResponseData<T>(endpoint);
		if (cachedResponseData !== null)
			return cachedResponseData;
	}

	const fetchData = async () => {
		let data: T;

		try {
			const res = await fetch(`${config.strapiUrl}/api/${endpoint}?populate=deep`);

			switch (res.status) {
				case 200:
					data = await res.json() as T;
					break;

				case 404:
					throw new Error("404 - Requested content not found");

				default:
					throw new Error("API request failed");
			}

		} catch (e) {
			if (e === "404") //todo -> hmm
				throw new Error(`API request failed: ${e}`); //rethrow
			else
				console.error("API request failed. Trying again shortly...");

			await delay(2500);
			data = await fetchData();
		}

		return data;
	};

	const data = await fetchData();

	if (config.enableContentCaching)
		setCachedStrapiResponseData(endpoint, data);

	return data;
};

/**
 * Get a cached Strapi API response from sessionStorage.
 * @param endpoint Selected endpoint
 * @returns Cached data
 */
const getCachedStrapiResponseData = <T extends Strapi.Response = Strapi.Response>(endpoint: string): T | null => {
	const stringifiedResponse = sessionStorage.getItem(`strapi-cached-response-${endpoint}`);
	if (stringifiedResponse === null)
		return null;

	return JSON.parse(stringifiedResponse) as T;
};

/**
 * Set a cached Strapi API response into sessionStorage.
 * @param endpoint Selected endpoint
 * @param response Response to be cached
 */
const setCachedStrapiResponseData = (endpoint: string, response: Strapi.Response) => sessionStorage.setItem(`strapi-cached-response-${endpoint}`, JSON.stringify(response));

/**
 * Fix a Strapi images' URL: if the image is being served directly from Strapi then we
 * have to prepend the Strapi URL to the image path.
 * @param url Target url
 */
export const strapiUrl = (url: string) => url.startsWith("/") ? config.strapiUrl + url : url;