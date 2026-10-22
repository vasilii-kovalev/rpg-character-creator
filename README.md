# RPG character creator

## Overview

This repository is for browser-based RPG character creators. The landing page lists the games that are available, and each game has its own application for creating characters and leveling them over time.

The site has two levels. The site dashboard lists the available character-creator applications. Each application then has its own dashboard, which lists the characters created for that game.

The whole site is static and runs in the browser. There is no backend, account system, or cloud synchronization. Characters are stored in the browser that created them, under the origin that served the site, and remain subject to that browser's storage-retention policy.

The working product is important, but the project is also a way to explore three problems:

- how to represent a complex ruleset while making it flexible to support extension;
- how to present a lot of competing information without overwhelming the player;
- how to test a system with too many valid combinations to check one by one.

Those goals shape the code. Rules stay with the game they belong to, calculations are kept separate from storage and UI where possible, and the repository supports both component work and several kinds of rules tests.

Why the repository is arranged this way is in [`docs/architecture.md`](./docs/architecture.md).

## Installation

### Node.js and npm

The root `package.json` `devEngines` field requires:

- Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`
- npm `^12.0.0`

Incompatible versions fail at install.

### Setup

From the repository root, run the following commands to install dependencies:

```sh
npm ci
npm run install:browsers
```

The second command downloads Chromium and Firefox into the repository for Vitest browser tests.

## Scripts

- `install:browsers` — Download Chromium and Firefox for browser tests into this repository.
- `dev:dashboard` — Run the site dashboard locally.
- `dev:example` — Run the example character creator locally.
- `dev:ui` — Run Storybook for the shared component library.
- `prod:build` — Build the static site into `site/`.
- `prod:preview` — Serve the built `site/` locally.
- `prod:publish` — Build the site and publish it to GitHub Pages.
- `format:check` — Check formatting.
- `format:fix` — Apply formatting.
- `lint:css:check` — Check CSS and Linaria styles.
- `lint:css:fix` — Fix CSS and Linaria styles.
- `lint:markdown:check` — Check Markdown.
- `lint:markdown:fix` — Fix Markdown.
- `lint:spell:check` — Check spelling and report unused words in the CSpell configuration.
- `lint:ts:check` — Lint TypeScript and report type errors.
- `lint:ts:fix` — Apply TypeScript lint fixes.
- `check-and-fix` — Run project checks and apply automatic fixes.
- `test` — Run the test suite.
- `test:ui` — Run tests with the Vitest UI.

### Recommended extensions

The workspace recommends these extensions. The same list is in [`.vscode/extensions.json`](./.vscode/extensions.json):

- Code Spell Checker
- EditorConfig
- Oxc
- rumdl
- Stylelint
- TypeScript 7/TypeScript (Native Preview)
- vscode-styled-components

## License

See the [LICENSE](./LICENSE) file.
