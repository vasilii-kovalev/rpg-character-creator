import { defineConfig } from "vite-plus";

/*
	Vitest projects do not inherit per-package `test` options from here; each workspace sets those in its own `vite.config.ts`.
	`packages/configs` is omitted: it holds shared helpers only and has no test files.
*/
export default defineConfig({
	test: {
		projects: ["apps/*", "packages/shared", "packages/ui"],
	},
});
