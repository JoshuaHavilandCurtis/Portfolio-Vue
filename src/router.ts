import FourZeroFour from "@/pages/404/404.vue";
import About from "@/pages/About/About.vue";
import Contact from "@/pages/Contact/Contact.vue";
import Index from "@/pages/Index/Index.vue";
import Product from "@/pages/Work/Product/Product.vue";
import Work from "@/pages/Work/Work.vue";
import { RouteComponent, createRouter, createWebHistory } from "vue-router";

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "404",
			path: "/:pathMatch(.*)*",
			component: FourZeroFour as RouteComponent
		},
		{
			name: "Home",
			path: "/",
			component: Index as RouteComponent,
			children: [
				{
					name: "About",
					path: "/about",
					component: About as RouteComponent
				},
				{
					name: "My work",
					path: "/my-work",
					component: Work as RouteComponent,
					children: [
						{
							name: "Product",
							path: ":productID",
							component: Product as RouteComponent
						}
					]
				},
				{
					name: "Contact",
					path: "/contact",
					component: Contact as RouteComponent
				}
			]
		}
	]
});