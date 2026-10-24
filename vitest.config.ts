import { defineConfig } from "vite-plus";

/*
	Vitest projects do not inherit per-package `test` options from here; each workspace sets those in its own `vite.config.ts`.
	`packages/configs` is omitted: it holds shared helpers only and has no test files.
*/
export default defineConfig({
	test: {
		// Coverage is resolved from this root config and shared by every project. `@vitest/coverage-v8` only collects browser coverage from Chromium, and the browser projects also run Firefox.
		coverage: {
			provider: "istanbul",
		},
		projects: ["apps/*", "packages/shared", "packages/ui"],
	},
});
