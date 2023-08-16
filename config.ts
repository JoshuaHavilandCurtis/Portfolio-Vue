/**
 * Use this to configure the site exactly how you want it to behave.
 */
export default {
	strapiUrl: "http://192.168.1.206:1337",		// the domain where strapi is being hosted. please ensure that public access is allowed to all of the necessary endpoints!
	enableContentCaching: false,				// enable/disable content caching on the site: whether api content be cached to sessionStorage to reduce api calls
	artificialDelay: false,						// enable/disable the artificial delay between api calls to show off animations/transitions
	artificialDelayDuration: 750				// the artifical delay duration in milliseconds
};