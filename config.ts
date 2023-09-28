/**
 * Use this to configure the site exactly how you want it to behave.
 */
export default {
	strapiUrl: "https://portfolio-api-yi9v.onrender.com", // the domain where strapi is being hosted. please ensure that public access is allowed to all of the necessary endpoints!
	enableContentCaching: true, // enable/disable content caching on the site: whether api content be cached to sessionStorage to reduce api calls
	artificialDelay: true, // enable/disable the artificial delay between api calls to show off animations/transitions
	artificialDelayDuration: 1000 // the artifical delay duration in milliseconds
};