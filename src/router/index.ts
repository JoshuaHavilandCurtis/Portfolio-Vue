import About from "@/views/About/About.vue";
import Home from "@/views/Home/Home.vue";
import Product from "@/views/Product/Product.vue";
import Work from "@/views/Work/Work.vue";
import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "Home",
			path: "/",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			component: Home
		},
		{
			name: "About",
			path: "/about",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			component: About
		},
		{
			name: "My work",
			path: "/my-work",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			component: Work,
			children: [
				{
					name: "Product",
					path: ":productID",
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					component: Product
				}
			]
		}

	]
});