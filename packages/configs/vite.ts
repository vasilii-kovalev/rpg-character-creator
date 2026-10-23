import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import sonda from "sonda/vite";
import { type PluginOption } from "vite";
import { type UserConfig } from "vite-plus";

import rootPackage from "../../package.json" with { type: "json" };
import { createNodeAndBrowserTestConfig, createNodeTestConfig } from "./vitest.ts";

// Monorepo root: shared `outDir` paths.
const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));

interface SiteOutputDirectoryParams {
	isDashboard: boolean;
	slug: string;
}

const getSiteOutputDirectory = ({ isDashboard, slug }: SiteOutputDirectoryParams): string => {
	if (isDashboard) {
		return resolve(repositoryRoot, "site");
	}

	return resolve(repositoryRoot, "site", slug);
};

/*
	Fresh plugin instances per config: plugins keep per-config state, and Vitest resolves every project in one process.
	WyW runs first so it extracts Linaria templates before the React transform.
*/
const createLinariaReactPlugins = (): Array<PluginOption> => {
	return [
		wyw({
			oxcOptions: {
				transform: {
					jsx: {
						// Evaluating a TSX module during extraction must not expect `React` in scope.
						runtime: "automatic",
					},
				},
			},
		}),
		react({
			compiler: true,
		}),
	];
};

// Each workspace passes `import.meta.url` from its own `vite.config.ts` so the slug and `outDir` resolve to that app directory.
interface SiteConfigParams {
	configModuleUrl: string;
	devPort: number;
	isDashboard?: boolean;
}

const createSiteConfig = ({ configModuleUrl, devPort, isDashboard = false }: SiteConfigParams): UserConfig => {
	const slug = basename(fileURLToPath(new URL(".", configModuleUrl)));
	const shared: UserConfig = {
		// GitHub Pages needs relative asset URLs; Vite serves a relative `base` from `/` outside builds.
		base: "./",
		build: {
			// `build-site` clears `site/` once, then apps build in parallel; see root `vite.config.ts`.
			emptyOutDir: false,
			outDir: getSiteOutputDirectory({
				isDashboard,
				slug,
			}),
			// Sonda reads the source map when it reports the bundle.
			sourcemap: true,
		},
		preview: {
			port: devPort,
		},
		resolve: {
			tsconfigPaths: true,
		},
		server: {
			port: devPort,
		},
		test: createNodeAndBrowserTestConfig(),
	};

	// Dashboard is a static index into `site/`; other apps supply Linaria, React, and the per-slug database name.
	if (isDashboard) {
		return {
			...shared,
			plugins: [sonda()],
		};
	}

	return {
		...shared,
		define: {
			// Origin-scoped IndexedDB: the repo name keeps GitHub Pages project sites from colliding.
			"import.meta.env.VITE_APPLICATION_DATABASE_NAME": JSON.stringify(`${rootPackage.name}:${slug}`),
		},
		plugins: [...createLinariaReactPlugins(), sonda()],
	};
};

// `packages/shared`: Node tests only; no React, Linaria, or path-alias plugins.
const createNodeWorkspaceConfig = (): UserConfig => {
	return {
		test: createNodeTestConfig(),
	};
};

const createUiWorkspaceConfig = (): UserConfig => {
	return {
		plugins: createLinariaReactPlugins(),
		resolve: {
			tsconfigPaths: true,
		},
		test: createNodeAndBrowserTestConfig(),
	};
};

export { createNodeWorkspaceConfig, createSiteConfig, createUiWorkspaceConfig };
