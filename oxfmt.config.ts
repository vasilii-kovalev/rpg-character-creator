import { defineConfig } from "oxfmt";

// Indentation and line width come from `.editorconfig`.
const config = defineConfig({
	experimentalOperatorPosition: "start",
	overrides: [
		{
			// Markdown prose uses spaces (see `.editorconfig`), but code blocks keep tabs.
			files: ["*.md"],
			options: {
				useTabs: true,
			},
		},
	],
	sortImports: {
		// Matches the `packages/*` TypeScript path alias: internal workspace imports stay in their own group.
		customGroups: [
			{
				elementNamePattern: ["packages/**"],
				groupName: "packages",
			},
		],
		groups: ["builtin", "external", "packages", "internal", ["parent", "sibling", "index"]],
		sortSideEffects: true,
	},
});

export default config;
