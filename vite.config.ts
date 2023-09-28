import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"~": path.resolve("./node_modules"),
			"@": path.resolve("./src")
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "~/bootstrap/scss/functions";
					@import "~/bootstrap/scss/mixins/breakpoints";
					@import "~/bootstrap/scss/variables";
					@import "~/bootstrap/scss/vendor/rfs";		
					@import "@/scss/functions";
					@import "@/scss/mixins";
					@import "@/scss/variables";
				` //this is fine, as its just sass logic. do not import the whole fucking bootstrap library over and over for each module. that is fucking awful.
			}
		}
	}
});