import { delay } from "@/lib/common";

const domain = "http://127.0.0.1:1337";

export const fetchFromStrapi = async (query) => {
	try {
		await delay(1000);
		const response = await fetch(`${domain}/api/${query}?populate=deep`);
		if (!response.ok) throw new Error('Response was not OK!'); //fetch succeeded, but response was not ok

		return await response.json();
	} catch (error) {
		throw new Error(`Fetch failed! - ${error}`); //fetch failed
	}
}