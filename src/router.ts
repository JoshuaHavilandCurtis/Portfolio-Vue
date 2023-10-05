import FourZeroFour from "@/pages/404/404.vue";
import About from "@/pages/About/About.vue";
import Contact from "@/pages/Contact/Contact.vue";
import Index from "@/pages/Index/Index.vue";
import Product from "@/pages/Work/Product/Product.vue";
import Work from "@/pages/Work/Work.vue";
import { Component } from "vue";
import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "404",
			path: "/:pathMatch(.*)*",
			component: FourZeroFour as Component
		},
		{
			name: "Home",
			path: "/",
			component: Index as Component,
			children: [
				{
					name: "About",
					path: "/about",
					component: About as Component
				},
				{
					name: "My work",
					path: "/my-work",
					component: Work as Component,
					children: [
						{
							name: "Product",
							path: ":productID",
							component: Product as Component
						}
					]
				},
				{
					name: "Contact",
					path: "/contact",
					component: Contact as Component
				}
			]
		}
	]
});