import { delay } from "@/lib/common";
import axios from 'axios';


//;
const domain = "http://localhost:1337"//"https://cms.joshuacurtis.co.uk";

export const fetchFromStrapi = async (query) => {
	try {
		await delay(1000);
		const response = await axios.get(`${domain}/api/${query}?populate=deep`);

		if (response.status !== 200) {
			throw new Error('Response was not OK!'); // fetch succeeded, but response was not OK
		}

		return response.data;
	} catch (error) {
		throw new Error(`Fetch failed! - ${error}`); // fetch failed
	}
}