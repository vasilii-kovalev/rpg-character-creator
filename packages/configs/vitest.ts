import { playwright } from "@vitest/browser-playwright";
import { type TestProjectInlineConfiguration } from "vite-plus";
import { type InlineConfig } from "vite-plus/test/node";

// `*.test.ts` runs in Node; `*.test.tsx` runs in Vitest browser mode.
const createNodeTestConfig = (): InlineConfig => {
	return {
		globals: true,
		include: ["src/**/*.test.ts"],
	};
};

// Each project gets its own objects: Vitest writes the project name into `browser.instances` entries while resolving the config.
const createBrowserTestConfig = (): InlineConfig => {
	return {
		browser: {
			enabled: true,
			// Headed Playwright windows tend to hang or crash on Windows when combined with `--ui`.
			headless: true,
			instances: [
				{
					browser: "chromium",
				},
				{
					browser: "firefox",
				},
			],
			provider: playwright(),
		},
		globals: true,
		include: ["src/**/*.test.tsx"],
		setupFiles: ["./vitest.browser.setup.ts"],
	};
};

// Nested projects inherit `root`, plugins, `define`, and `resolve` from the workspace config that declares them.
const createNodeAndBrowserTestConfig = (): InlineConfig => {
	const projects: Array<TestProjectInlineConfiguration> = [
		{
			test: {
				...createNodeTestConfig(),
				name: "node",
			},
		},
		{
			test: {
				...createBrowserTestConfig(),
				name: "browser",
			},
		},
	];

	return {
		projects,
	};
};

export { createNodeAndBrowserTestConfig, createNodeTestConfig };
