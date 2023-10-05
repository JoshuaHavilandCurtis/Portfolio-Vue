import { required } from "@/utils/common";
import { castEnv } from "@/utils/env";

export default {
	strapiUrl:
		required(castEnv.asString(
			import.meta.env.VITE_STRAPI_URL as string | undefined
		)),
	enableContentCaching:
		required(castEnv.asBool(
			import.meta.env.VITE_ENABLE_CONTENT_CACHING as string | undefined
		)),
	artificialDelay:
		required(castEnv.asBool(
			import.meta.env.VITE_ARTIFICAL_DELAY as string | undefined
		)),
	artificialDelayDuration:
		castEnv.asNumber(
			import.meta.env.VITE_ARTIFICAL_DELAY_DURATION as string | undefined
		)
		?? 250
};