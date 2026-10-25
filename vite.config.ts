import { readFileSync } from "node:fs";

import { defineConfig } from "vite-plus";

import oxfmtConfig from "./oxfmt.config.ts";
import oxlintConfig from "./oxlint.config.ts";

/*
	Automatic tracking fingerprints every directory a command lists. A gitignored name such as `coverage` is still in the workspace root listing, so the cache misses when that directory appears. Explicit inputs leave the listing out. `.gitignore` entries are already globs, so each exclusion is that pattern with a leading `!`. A negative pattern filters files opened by path and does not filter listed names (https://github.com/voidzero-dev/vite-task/issues/504). `package-lock.json` stands in for the packages under `node_modules`.
*/
const readGitignoreExclusions = (): Array<string> => {
	const gitignore = readFileSync(new URL("./.gitignore", import.meta.url), "utf8");
	const gitignoreLines = gitignore.split(/\r?\n/u);

	return gitignoreLines.reduce<Array<string>>((exclusions, rawLine) => {
		const line = rawLine.trim();

		// A `!` re-include has no equivalent here: any matching negative drops the file.
		if (line !== "" && !line.startsWith("#") && !line.startsWith("!")) {
			exclusions.push(`!${line}`);
		}

		return exclusions;
	}, []);
};

const generatedCacheExclusions: Array<string> = [
	...readGitignoreExclusions(),
	// Git does not list `.git` in `.gitignore`. Hashing it misses the cache on every commit.
	"!**/.git/**",
];

interface CacheInput {
	input: Array<string>;
}

// Every cached tool reads `.gitignore`. The lockfile and workspace manifests stand in for installed packages.
const getCacheInput = (...patterns: Array<string>): CacheInput => {
	return {
		input: [".gitignore", "**/package.json", "package-lock.json", ...patterns, ...generatedCacheExclusions],
	};
};

const editorAndDotDirectories: Array<string> = ["**/.storybook/**", "**/.vscode/**", ".editorconfig", ".rumdl.toml"];

const formatCache = getCacheInput("**/*.{css,html,json,md,mjs,ts,tsx}", ...editorAndDotDirectories);

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
			"cspell:check": {
				cache: getCacheInput("**/*", ...editorAndDotDirectories, ".npmrc", "!LICENSE"),
				command: "cspell . --quiet --no-show-suggestions && cspell-check-unused-words",
			},
			"fmt:check": {
				cache: formatCache,
				command: "vp fmt --check",
			},
			"fmt:fix": {
				cache: formatCache,
				command: "vp fmt",
			},
			// `vp lint` type-checks app and test programs via each workspace `tsconfig.json` references and honors `.gitignore` via `--ignore-path`.
			"lint:check": {
				cache: getCacheInput("**/*.{mjs,ts,tsx}", "**/.storybook/**/*.{ts,tsx}", "**/tsconfig*.json"),
				command: "vp lint --ignore-path .gitignore",
			},
			"lint:fix": "vp run lint:check --fix",
			"stylelint:check": {
				cache: getCacheInput("**/*.{css,css.ts}", "**/.storybook/**/*.css", "stylelint.config.mjs"),
				command: 'stylelint "**/*.{css,css.ts}" --ignore-path .gitignore',
			},
			"stylelint:fix": "vp run stylelint:check --fix",
		},
	},
});

export default config;
