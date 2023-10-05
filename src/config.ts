import { required } from "@/utils/common";
import { castEnv } from "@/utils/env";

export default {
	strapiUrl: castEnv.asString(required(
		import.meta.env.VITE_STRAPI_URL as string | undefined
	)),
	enableContentCaching: castEnv.asBool(required(
		import.meta.env.VITE_ENABLE_CONTENT_CACHING as string | undefined
	)),
	artificialDelay: castEnv.asBool(required(
		import.meta.env.VITE_ARTIFICAL_DELAY as string | undefined
	)),
	artificialDelayDuration:
		import.meta.env.VITE_ARTIFICAL_DELAY_DURATION as string | undefined !== undefined
			? castEnv.asNumber(import.meta.env.VITE_ARTIFICAL_DELAY_DURATION as string)
			: 250
};