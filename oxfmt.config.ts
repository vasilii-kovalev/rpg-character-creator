import { defineConfig } from "oxfmt";

// Indentation and line width come from `.editorconfig`.
const config = defineConfig({
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
