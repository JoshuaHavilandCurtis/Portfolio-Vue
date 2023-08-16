import config from "@/../config";
import { delay } from "@/lib/common";
import { StrapiResponse } from "@/lib/models/strapi.models";
import axios from "axios";

/**
 * Send a GET request to a Strapi API endpoint. The response type must be defined
 * to provide effective typing functionality.
 * @param endpoint Endpoint to use
 * @returns Promise containing response data
 */
export const getFromStrapi = async <T extends StrapiResponse>(endpoint: string): Promise<T> => {
	if (config.enableContentCaching) {
		const cachedResponseData = getCachedStrapiResponseData<T>(endpoint);
		if (cachedResponseData !== null)
			return cachedResponseData;
	}

	if (config.artificialDelay)
		await delay(config.artificialDelayDuration);

	const response = await axios.get(`${config.strapiUrl}/api/${endpoint}?populate=deep`).then(res => {
		if (res.status !== 200)
			throw new Error("Response was not OK"); //fetch succeeded, but response was not OK
		return res;
	}).catch(e => {
		throw new Error(`Strapi API request failed - ${e as string}`);
	});

	const data = response.data as T;

	if (config.enableContentCaching)
		setCachedStrapiResponseData(endpoint, data);

	return data;
};

/**
 * Get a cached Strapi API response from sessionStorage.
 * @param endpoint Selected endpoint
 * @returns Cached data
 */
const getCachedStrapiResponseData = <T extends StrapiResponse = StrapiResponse>(endpoint: string): T | null => {
	const stringifiedResponse = sessionStorage.getItem(`strapi-cached-response-${endpoint}`);
	if (stringifiedResponse === null)
		return null;

	const response = JSON.parse(stringifiedResponse) as T;
	return response;
};

/**
 * Set a cached Strapi API response into sessionStorage.
 * @param endpoint Selected endpoint
 * @param response Response to be cached
 */
const setCachedStrapiResponseData = (endpoint: string, response: StrapiResponse) => sessionStorage.setItem(`strapi-cached-response-${endpoint}`, JSON.stringify(response));

/**
 * Fix a Strapi images' URL: if the image is being served directly from Strapi then we
 * have to prepend the Strapi URL to the image path.
 */
export const fixStrapiImageUrl = (url: string) => url.startsWith("/") ? config.strapiUrl + url : url;