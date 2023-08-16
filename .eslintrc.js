// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const root = __dirname;

module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	plugins: [
		"eslint-plugin-vue",
		"@typescript-eslint"
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:vue/base",
		"plugin:vue/vue3-recommended"
	],
	parserOptions: {
		project: path.join(root, "./tsconfig.json"),
		extraFileExtensions: [".vue"],
		parser: "@typescript-eslint/parser"
	},
	rules: {
		"vue/multi-word-component-names": ["off"],
		"vue/html-indent": ["error", "tab"],
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				multiline: {
					delimiter: "semi",
					requireLast: true
				},
				singleline: {
					delimiter: "semi",
					requireLast: true
				}
			}
		],
		"@typescript-eslint/no-explicit-any": "error",
		"quote-props": ["error", "consistent-as-needed"],
		"semi": "error",
		"quotes": ["error", "double"],
		"arrow-parens": ["error", "as-needed"],
		"newline-per-chained-call": "off",
		"function-paren-newline": "off",
		"array-element-newline": "off",
		"object-property-newline": "off",
		"max-len": ["error", { code: 9999 }],
		"comma-dangle": ["error", "never"],
		"nonblock-statement-body-position": ["error", "below"]
	}
};