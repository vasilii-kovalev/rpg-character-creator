/** @type {import("stylelint").Config} */
const config = {
	extends: ["stylelint-config-standard"],
	ignoreFiles: [
		"**/*.ts",
		/*
		 * `**` matches only ordinary path segments. This pattern names a segment
		 * that starts with `.`, so files such as `.storybook/main.ts` are ignored.
		 */
		"**/.*/**/*.ts",
		"!**/*.css.ts",
	],
	overrides: [
		{
			/*
			 * A Linaria `css` template is the body of the generated class, so its
			 * declarations sit on the PostCSS root. stylelint-order sorts that root
			 * only when the syntax marks it with `raws.isRuleLike`. This syntax does,
			 * and it keeps the newline after the opening backtick on the first
			 * declaration so autofix does not glue properties onto one line.
			 */
			customSyntax: "postcss-styled-syntax",
			files: ["**/*.css.ts"],
		},
	],
	plugins: ["stylelint-order"],
	rules: {
		"order/custom-properties-alphabetical-order": true,
		"order/order": ["custom-properties", "declarations", "at-rules", "rules"],
		"order/properties-alphabetical-order": true,
	},
};

export default config;
