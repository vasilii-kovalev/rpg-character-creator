# Architecture

This document records why the repository is arranged the way it is. What the project is, and how to install and run it, lives in the [README](../README.md).

## Constraints

The site is a collection of character-creator applications behind one landing page. It ships as static files. There is no server, account system, or cloud sync: each browser keeps the characters it created, for as long as that browser keeps the origin's storage.

Those constraints decide the rest of this document. Hosting has to serve unchanging files. In-application routes cannot depend on a server rewrite. Storage has to live in the browser and survive several applications on the same origin. Each game's rules stay with that game's application, derived values are recalculated rather than stored as a second source of truth, and tests lean on several small layers instead of enumerating every valid character.

## Hosting

GitHub Pages is the only deployment target. It keeps hosting beside the source repository, costs nothing for this project, and avoids a dedicated server.

Publishing is a local step: `prod:publish` builds the site, and `oneclickpush` pushes `site/` to the root of the `gh-pages` branch. There is no deployment workflow in the repository. A local step is simpler to maintain and operate, and small commits do not start a deployment on every push. `oneclickpush` replaces `gh-pages`, which has security issues and is unmaintained. The replacement has no dependencies and pushes with Node's built-in APIs and git.

Pages serves the generated files as they are. It does not rewrite a missing path to `index.html`.

Asset URLs are relative, so the same build works at a domain root and under a project-site prefix. No source file contains a host name or a repository path. The development server still serves that relative layout from `/`.

GitHub Pages runs Jekyll on a published branch unless a `.nojekyll` file is present. Jekyll would treat the generated site as source and omit names that start with `_` or `.`. `oneclickpush` copies the built directory as it stands, including dotfiles. Adding `.nojekyll` is left to the caller so the step stays explicit ([oneclickpush#1](https://github.com/zerodevx/oneclickpush/issues/1#issuecomment-6366801208)). The build writes that empty file afterward with Node, because `touch` is a POSIX command and Windows does not provide it. Each build clears `site/` first, so the file belongs to the published tree only.

Pages decides caching on its own. Every file, including content-hashed assets, is served with a ten-minute `Cache-Control: max-age`.

## Routing

The document path selects an application. The hash selects a screen inside it:

```text
<host-prefix>/                                      site dashboard
<host-prefix>/<application-slug>/#/                 that application's characters
<host-prefix>/<application-slug>/#/characters/new   create a character
<host-prefix>/<application-slug>/#/characters/<id>  open a character
```

`<host-prefix>` is empty at a domain root and may be a project directory.

A path-based in-application route would reload as a request for a file the build does not emit, such as `<slug>/characters/<id>`. A custom `404.html` could recover those URLs only by distinguishing application routes from missing assets. A memory router would keep the route out of the address bar. Hash routing leaves the HTTP path on the application's `index.html` and keeps bookmarks, history, and shared links. The create URL occupies the segment `new`, so a stored character id cannot be that segment.

The site dashboard has no client-side router.

## Storage

`localStorage` and IndexedDB are both scoped to the browser origin, not to URL paths. `localStorage` would give every application one synchronous string map unless they invented prefixes, and its quota is easy to fill with structured characters.

IndexedDB stores objects, is asynchronous, and gives each application a named database on the same origin. GitHub Pages project sites under `user.github.io` also share that origin, so a database name is `<root-package-name>:<slug>` — for example `rpg-character-creator:example`. The package name avoids collisions with another repository's applications; the slug separates this site's applications. The name is injected as `import.meta.env.VITE_APPLICATION_DATABASE_NAME`.

Dexie is the IndexedDB wrapper because the applications need declared tables, indexes, queries, and schema upgrades — not accounts, replication, or a second storage engine. [`idb`](https://github.com/jakearchibald/idb) is a thinner promise wrapper and leaves more schema work in application code. [localForage](https://localforage.github.io/localForage/) is convenient for key-value storage. [TanStack DB](https://tanstack.com/db/latest) and [RxDB](https://rxdb.info/) add reactive collections, incremental queries, or replication. [SQLite compiled to WebAssembly](https://sqlite.org/wasm/doc/trunk/index.md) is a different stack. Dexie is the middle of that range.

`createId` in `packages/shared` wraps nanoid for primary keys. The default nanoid is a 21-character URL-safe string with enough randomness for independently created browser databases, and a different shape from the `new` route segment. String ids also leave room for later export and import.

Applications that store characters construct Dexie in `src/services/db/index.ts`. One `characters` row is one complete character. Nested choices stay on that row and are stored through structured clone. The rules catalog ships with the application. Calculated fields are recomputed from that row and the catalog when the character is loaded.

A real character row includes `schemaVersion`. Opening a row migrates it to the version the application currently writes. Dexie database versions are reserved for index changes or rewrites of every row. Indexes are added only when a screen needs to query them. The example application stores `id` and `name` only.

## Workspace

The repository is an npm workspace: applications under `apps/`, reusable code under `packages/`. npm workspaces are enough, so there is no extra monorepo layer.

```text
.
├── apps/
│   ├── dashboard/
│   └── example/
├── packages/
│   ├── configs/
│   ├── shared/
│   └── ui/
├── vite.config.ts
├── vitest.config.ts
├── oxfmt.config.ts
├── oxlint.config.ts
├── stylelint.config.mjs
├── tsconfig.node.json
└── tsconfig.json
```

Generated directories such as `site/` and `storybook-static/` are not part of the source tree.

`apps/dashboard` is the landing page and has no React.

Each other `apps/<slug>` directory is one character creator. It owns that game's catalog, character model, rules, routes, UI, and browser database. The directory name is the slug and the URL segment.

`apps/example` proves the workspace. It is not a model for a finished character schema.

`packages/shared` holds generic TypeScript helpers such as id generation. Game catalogs, character rules, React, component styles, and Dexie stay out of it, even when those functions are pure.

`packages/ui` is the shared React component library.

`packages/configs` holds the shared build, test, and TypeScript configuration. Application source never imports this package.

An application may import either reusable package, and `packages/ui` may import `packages/shared`. Neither package imports an application, and `packages/shared` does not import `packages/ui`.

The dashboard keeps the list of applications in its own source: a title, a description, the slug, and the port used while that application is served on its own. The list is hand-written so the landing page is not coupled to a repository scan. In development the link is `http://localhost:<port>/`; in a production build it is the relative link `<slug>/`.

Each application is a separate build so one game's code stays out of the others unless it comes from a shared package. A new character creator is another directory under `apps/` with the same shape and a free development port stored on the dashboard entry. The site build already includes every application directory.

### Imports

Another workspace package is imported as `packages/<name>`. `packages/configs/tsconfig.app.json` maps `packages/*` to that package's `src/index.ts`. Application and package configs extend that file, so the mapping is written once. Node loads `vite.config.ts` and the other tool configs before `paths` apply, so those files import `packages/configs` by relative path.

A file reaches other modules in its own workspace with a relative import. Importing `packages/shared` adds that package's `.ts` files to the application's compilation, and the compiler does not apply `packages/shared`'s config to them. `${configDir}` is the directory of the opened config, not of the imported file, so an alias such as `@/` or `src/`, set to the extending workspace's `src`, means the application's `src` for those shared files too. `baseUrl` used to be a lookup root for bare imports. TypeScript 7 does not implement it, and a `paths` entry used in its place has the same limit. `rootDir` only affects emit layout. The `packages/*` wildcard can also resolve a package to itself; files inside that package do not use that specifier. Relative imports climb directories, so `import/no-relative-parent-imports` is off.

A second `paths` entry for every package `src` lets the first existing file win. The list grows with every package, and two packages that contain the same relative path collide. A distinct prefix per package (`@shared/*`, `@example/*`) is the layout Nx and similar monorepos use. Names do not collide, but each package adds a line, and the prefix is not "the current package."

Project references give each package its own compilation, so a local alias works there. The application lists every dependency under `references`. A wildcard is not supported; [TypeScript#56279](https://github.com/microsoft/TypeScript/issues/56279) asks for one and is open. The handbook behavior is that the importer then loads the referenced project's `.d.ts` output, so the package is compiled ahead of the application. [TypeScript#58657](https://github.com/microsoft/TypeScript/issues/58657) asks the compiler to apply an internal package's own `paths` while typechecking its uncompiled source. That is not implemented.

`package.json` `"imports"` does follow the importing file. TypeScript 7 resolves a specifier that starts with `#` from the nearest `package.json`, including when that file is part of an application compilation. Turborepo documents this for monorepos, and the TypeScript handbook points to it as the standard replacement for a convenience `paths` alias. `*` is the only pattern character, so one entry cannot match both `.ts` and `.tsx`. The import writes the extension (`"#*": "./src/*"`, then `#services/db.ts`).

That extension cannot be required on every import. With `moduleResolution` set to `bundler`, `allowImportingTsExtensions` permits `.ts` and `.tsx` and still accepts an import that omits them. Oxlint's `import/extensions` rule can require `.js`, `.jsx`, `.ts`, and `.tsx`. `ignorePackages` skips specifiers that are not relative and not an alias of the form `@/`, `#/`, or `~/`, so `packages/<name>` is never checked, and neither is `#services/db`. With `ignorePackages` off, the rule reports real packages such as `react`, which have no extension to add. Checking internal imports while ignoring those package names takes a `pathGroupOverrides` list on the rule. `package.json` `"imports"` was discarded because of that complexity.

Relative imports are the simplest approach that keeps packages as source, keeps a single `packages/*` entry, and does not change when a workspace starts importing another package. They do not write an extension, so that rule is unnecessary.

## Toolchain

### Node.js and npm

Node.js and npm were chosen because they are already familiar and because the rest of the tools run on Node.js anyway.

npm 12 was chosen because its install-time security defaults are stricter than earlier majors. The Node.js range is recorded only in the root `devEngines` field — there is no `engines` field, top-level `packageManager` field, or `.node-version` file — and copies npm 12's own `engines.node`, so the two stay aligned. Odd-numbered short-lived lines such as 23 and 25 are omitted. Every allowed version can run TypeScript config files directly, without a compile step. An incompatible version stops the install. Selecting a compatible Node.js and npm version remains a local responsibility.

`.npmrc` sets `save-exact` and `min-release-age=3`. Every direct dependency, development dependency, and override uses an exact version. The lockfile is committed, and a clean install uses `npm ci`. Internal packages are reached through TypeScript paths, so they do not need version ranges.

`dependencies` lists only code that ships to the browser. Everything else runs at build or development time.

### Vite+

Vite+ is the project-local command-line tool. It brings together Vite, Vitest, Oxlint, Oxfmt, and a tsgo-based checker, so each of those does not need a separate top-level setup. It also includes tsdown, which this repository skips because reusable packages are consumed as source.

npm overrides keep `vite` and `vitest` on the builds Vite+ ships. Plugins still import those package names even when project code imports `vite-plus`. Without the overrides, npm installs a second copy: two copies of Vite fail each other's runtime identity checks, and two copies of Vitest split mocks, assertions, and runner state. `vite` resolves to `@voidzero-dev/vite-plus-core` at the installed Vite+ version; `vitest` is pinned to the version `vp toolchain vitest` reports. Both overrides move with a Vite+ upgrade.

At the repository root, `vp dev` cannot choose among several applications, and a bare `vp build` asks for a package. Root scripts therefore pass a workspace directory explicitly. The root config has no `build` block because the root is not an application.

### TypeScript

Application code, shared packages, and configuration use TypeScript 7. Static types matter most for character models and rules. The `typescript` package provides the editor language server and `tsc`; Vite+'s checker does not replace those. `vp check` uses the tsgo toolchain bundled with Vite+.

Browser type-checking uses `ESNext` and DOM libraries. The production bundle target is Vite's default, not a duplicated `build.target`. Node configs use the language level of the minimum Node.js version in `devEngines`. `@types/node` is pinned to the Node 22 line to match the minimum supported runtime major rather than expose APIs from newer majors.

Each workspace `tsconfig.json` references an application config and separate test configs. Application configs set `"types": ["vite/client"]`, which limits automatic global typings: Vitest globals stay off runtime code, and React types arrive by importing `react`. Test configs extend the application config, add Vitest types, and clear the inherited exclusion of test files. Shared compiler defaults live in `packages/configs/tsconfig.base.json`. The root `tsconfig.json` has no sources of its own; `tsconfig.node.json` covers root tool configs, which run in Node rather than in the browser.

### React

Character applications and the shared component library use React 19. The site dashboard stays on plain TypeScript. Each character application's own dashboard remains part of its React application.

React 19 does not publish TypeScript declarations. Each workspace that depends on `react` also depends on `@types/react` and `@types/react-dom`. The dashboard and `packages/shared` do not.

`@vitejs/plugin-react` supplies the React transform. Its `compiler` option enables React Compiler through `oxc-transform-react`, which keeps the transform on the Oxc pipeline the rest of the toolchain already uses. The compiler memoizes components and hooks, so a dense character form that updates as related fields change does not need a hand-written `memo` / `useMemo` / `useCallback` layer that is easy to get wrong or leave out. A component or hook that must skip the compiler starts with `"use no memo"`. The dashboard config leaves the plugin out.

In-application routing uses React Router's `createHashRouter` with no basename. Routing is library mode: pages live under `pages/<name>/page.tsx` and load lazily.

### Shared Vite helpers

`packages/configs/vite.ts` keeps the Vite settings used by more than one build. It resolves the repository root from its own `import.meta.url`, so output paths do not depend on the current working directory. Helpers return a new object on every call: plugins and Vitest keep per-project state, and Vitest resolves every project in one process.

`createSiteConfig` takes the calling `vite.config.ts` module URL and a port used for both the development server and preview. The slug is the directory that contains that config. No config sets `root`: `vp -C` already starts in the workspace directory, and Vitest uses the directory of each project's config file. Every returned config uses the relative `base` required by hosting.

The dashboard (`isDashboard: true`) writes to `<repository-root>/site/` and omits React, CSS-in-JS extraction, and the database name. Every other application writes to `<repository-root>/site/<slug>/`, defines `VITE_APPLICATION_DATABASE_NAME`, and loads the shared React plugin list. CSS extraction runs first so it sees original tagged templates; the JSX runtime is `automatic` so evaluating a TSX module during extraction does not expect `React` in scope.

`packages/ui` registers that same plugin list. Storybook is started from `packages/ui`, finds this Vite config beside `.storybook`, and leaves the plugin list alone.

Site configs and the `packages/ui` config set `resolve.tsconfigPaths`, so Vite follows the `packages/*` mapping. `packages/shared` has no `packages/<name>` imports, so its config leaves the option unset.

## UI and styles

Shared React components live in `packages/ui`. Application-specific components stay with their application. Each shared component keeps its Linaria styles in a colocated `*.css.ts` file.

Global styles are plain CSS. Modern CSS already provides the features this project needs, including custom properties, without a preprocessor. Each application, the dashboard, and Storybook own their own global sheet, so page-level defaults and design tokens stay under the control of the page that loads them. `packages/ui` does not export a global stylesheet. Shared components read design values through CSS custom properties supplied by whichever global sheet is active.

Linaria is the component-level alternative to CSS Modules. CSS Modules need extra tooling for exact class-name types and unused-class diagnostics, and generated declarations add an indirect file to editor navigation. Linaria gives each class a TypeScript binding, so ordinary references and unused-code analysis track usage directly. For the static `css` API used here, the CSS stays in tagged templates; WyW extracts the rules at build time and replaces each template with a class-name string, so those rules need no browser injection runtime. vanilla-extract offers similar static bindings but uses typed property objects. Panda CSS also extracts styles statically, but adds an atomic design-system model this project does not need. The `*.css.ts` filename is a convention borrowed from vanilla-extract.

Stylelint covers both plain CSS and the CSS inside Linaria templates. Vite+ does not include a CSS linter: Oxlint sees `*.css.ts` as TypeScript, and Oxfmt formats code without validating CSS. The configuration is `stylelint.config.mjs`. A TypeScript config would load through Cosmiconfig, and Cosmiconfig 9 does not work with TypeScript 7 without pinning a newer Cosmiconfig. Plain ESM avoids maintaining that pin; the config shape is checked with a JSDoc `@type` instead. `postcss-styled-syntax` parses the templates and marks the generated class body so stylelint-order can sort it.

When applying fixes, Oxfmt runs before Stylelint because Oxfmt still treats Linaria files as TypeScript.

Storybook is the workbench for `packages/ui`. `@storybook/react-vite` uses the same React, React Compiler, and Vite pipeline as the applications. Stories sit beside components.

## Tests

The interesting testing problem is a ruleset with too many valid characters to check one by one. The current direction uses several small layers instead of exhaustive listing:

| Kind                 | Purpose                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------- |
| Unit tests           | Check one rule, prerequisite, helper, or derived value at a time                              |
| Property-based tests | Generate valid characters and check invariants such as prerequisites, uniqueness, and budgets |
| Golden tests         | Compare a small set of hand-built characters with their complete expected results             |
| Storybook stories    | Provide the first visual check for shared UI components                                       |

Rule tests call those functions directly and do not open Dexie. Generic helpers are tested in `packages/shared`.

Part of the project is to find out how much confidence these approaches provide compared with exhaustive checking. A bounded comparison has not been chosen yet.

Vitest is a multi-project workspace. The root `vitest.config.ts` only names the projects. Each project's test options live in that workspace's `vite.config.ts`, the same file its build and development server use, so plugins, `define` values, and `resolve` stay in one place. Vitest projects do not inherit test options from the root file. `packages/configs` is omitted: it has helpers, not tests.

`*.test.ts` runs in Node. `*.test.tsx` runs in Vitest browser mode. Nested node and browser projects inherit the workspace Vite config, so Linaria compiles in Node tests and no CSS mock is needed. `packages/shared` has no components and uses the Node config alone.

Browser tests use Playwright's Chromium and Firefox, headless. Headed Playwright windows tend to hang or crash on Windows when combined with the Vitest dashboard. Component tests render through `vitest-browser-react`.

Playwright browsers are installed into `node_modules/playwright-core/.local-browsers` by setting `PLAYWRIGHT_BROWSERS_PATH=0` on the npm scripts that install and launch them. That keeps the binaries inside the repository instead of a user-level cache. Vitest's `test.env` does not reach the Node workers that launch Playwright, so the variable cannot live in the Vitest config. Playwright is pinned in `packages/configs` because versions before 1.60.0 can hang while extracting browser archives on Node 24.16+ and 26.

## Lint and format

Lint and format commands are Vite Tasks (except markdown-related ones; see the reason below) so Vite Task can cache them. `package.json` scripts call those tasks under different names because a task and a script cannot share a name. There is no separate type-check script: Oxlint `typeCheck` reports type errors alongside its rules. Type-aware linting uses each workspace's referenced configs.

Oxlint and Oxfmt are used for speed. Oxlint enables every category except `nursery`, which the Oxlint docs mark as unstable by design. Those categories include the rules of hooks and the React Compiler rules Oxlint implements. The React override applies to TSX application code and `packages/ui`. Oxfmt reads indentation and line width from `.editorconfig`: tabs, with spaces in Markdown. Import sorting gives `packages/<name>` a group of its own, between external packages and relative files.

Generated and tooling output lives in `.gitignore`. Directory entries use a trailing `/**` so Oxlint `--ignore-path .gitignore` skips files even when a path is passed explicitly on the CLI; a plain `site/` entry is not enough. Storybook output uses `**/storybook-static/**` to cover workspace builds as well as root-level output. Oxfmt, Stylelint, rumdl, and CSpell follow the same ignore file.

rumdl is the Markdown linter because markdownlint-cli and markdownlint-cli2 bring a large dependency tree with open security advisories, including issues a newer release still has. rumdl checks the same rules from a native binary and a much smaller install, and this repository has no custom JavaScript rules that would require the old tools. Rule settings live in `.rumdl.toml`, which the editor extension reads as well. rumdl checks Markdown files from the working directory and respects `.gitignore` by default. `.rumdl.toml` records the rule settings and turns rumdl's own result cache off.
The check and fix scripts call `rumdl` directly. A cached Vite Task injects a file-tracking library that makes Git for Windows `ldd.exe` abort, and rumdl's package runs `ldd` while it selects a platform build ([vite-plus#3121](https://github.com/voidzero-dev/vite-plus/issues/3121), [vite-task#830](https://github.com/voidzero-dev/vite-task/issues/830)), so until these issues are fixed, it is not possible to use Vite Tasks to cache the results of the scripts.

## Build and preview

The production site is assembled in `site/`: the dashboard at the root, each application under `site/<slug>/`.

`site/` is deleted once, then every application build — dashboard included — runs in parallel. None of those builds empties its output directory. The dashboard's `outDir` is `site/` itself, which contains every application's directory, so no application build can clear that tree without deleting siblings. Vite's `emptyOutDir` cannot do the delete either: it only runs inside a build, and the root has no application entry. The site task disables its own cache so a cache hit cannot skip the delete and leave `site/` unrestored.

Preview points Vite's preview server at the assembled tree with `--outDir site`. That flag stays on the script. Putting `build.outDir` of `site` on the root Vite config would make a root `vp build` write into the deploy output.

Each application build also writes a Sonda report of that application's minified bundle. Sonda attributes output bytes to source files by reading source maps, so both applications set `build.sourcemap`. The `.map` files sit next to the assets in `site/` and are published with them. The HTML report is written to `.sonda/` and is not part of the site. Shared packages are not application builds, so they do not run the plugin.
