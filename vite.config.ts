import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		compression(),
		compression({ algorithm: "brotliCompress", exclude: [/\.(br)$/, /\.(gz)$/], deleteOriginalAssets: true })
	],
	resolve: {
		alias: {
			"~": "./node_modules",
			"@": process.env.mode === "production" ? "." : "./src"
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