/* eslint-disable quote-props */
module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"plugins": [
		"@typescript-eslint",
		"eslint-plugin-vue"
	],
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:vue/base",
		"plugin:vue/vue3-recommended"
	],
	"parserOptions": {
		"tsconfigRootDir": __dirname,
		"project": [
			"tsconfig.json"
		],
		"extraFileExtensions": [".vue"],
		"parser": "@typescript-eslint/parser"
	},
	"ignorePatterns": [
		"ecosystem.config.js",
		"build"
	],
	"rules": {
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				"multiline": {
					"delimiter": "semi",
					"requireLast": true
				},
				"singleline": {
					"delimiter": "semi",
					"requireLast": true
				}
			}
		],
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/semi": "error",
		"vue/multi-word-component-names": ["off"],
		"vue/html-indent": ["error", "tab"],
		"quote-props": [
			"error",
			"consistent-as-needed"
		],
		"semi": "error",
		"no-extra-semi": "error",
		"quotes": [
			"error",
			"double"
		],
		"arrow-parens": [
			"error",
			"as-needed"
		],
		"newline-per-chained-call": "off",
		"function-paren-newline": "off",
		"array-element-newline": "off",
		"object-property-newline": "off",
		"comma-dangle": [
			"error",
			"never"
		],
		"nonblock-statement-body-position": [
			"error",
			"below"
		]
	}
};