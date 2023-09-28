import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		compression(),
		compression({ algorithm: "brotliCompress", exclude: [/\.(br)$/, /\.(gz)$/], deleteOriginalAssets: true })
	],
	resolve: {
		alias: {
			"~": fileURLToPath(new URL("./node_modules", import.meta.url)),
			"@": fileURLToPath(new URL("./src", import.meta.url))
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