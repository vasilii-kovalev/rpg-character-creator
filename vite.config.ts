import { defineConfig } from "vite-plus";

import oxfmtConfig from "./oxfmt.config.ts";
import oxlintConfig from "./oxlint.config.ts";

const config = defineConfig({
	// `pack` is omitted because the internal packages are consumed as source.
	fmt: oxfmtConfig,
	lint: oxlintConfig,
	run: {
		tasks: {
			"build-site": {
				// Caching this task would skip the commands and leave `site/` unrestored.
				cache: false,
				command: [
					/*
						`site/` is cleared by its own step before any build starts, so every application, the dashboard included, builds in parallel and only adds its own files.
						Vite's `emptyOutDir` cannot do this. It only runs inside a build, and the root has no entry to build without a virtual-module workaround.
						The dashboard's `outDir` is `site/`, which contains every application's directory, so letting its build clear `site/` would require running it before the others.
					*/
					"node -e \"fs.rmSync('site', { recursive: true, force: true })\"",
					"vp run --filter ./apps/* --parallel build",
				],
			},
			// A task and a `package.json` script cannot share a name, so the scripts call these by their own names.
			"cspell:check": "cspell . --quiet --no-show-suggestions",
			"fmt:check": "vp fmt --check",
			"fmt:fix": "vp fmt",
			// `vp lint` type-checks app and test programs via each workspace `tsconfig.json` references and honors `.gitignore` via `--ignore-path`.
			"lint:check": "vp lint --ignore-path .gitignore",
			"lint:fix": "vp lint --ignore-path .gitignore --fix",
			"markdownlint:check": 'markdownlint "**/*.md" --ignore-path .gitignore',
			"markdownlint:fix": 'markdownlint "**/*.md" --ignore-path .gitignore --fix',
			"stylelint:check": 'stylelint "**/*.{css,css.ts}" --ignore-path .gitignore',
			"stylelint:fix": 'stylelint "**/*.{css,css.ts}" --ignore-path .gitignore --fix',
		},
	},
});

export default config;
