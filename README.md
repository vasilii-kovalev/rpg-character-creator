# RPG character creator

## Project discontinued

This repository is discontinued and remains an unfinished record of the experiment.

The intended product was a static, browser-based companion for tabletop RPGs, starting with Pathfinder Second Edition Remaster. It was meant to provide character creation and leveling, a calculated character sheet, a spell book, equipment and custom items, virtual dice rolls, and condition tracking with time advancement and recovery rolls. Role-playing, movement, measurements, and the wider game world would remain at the table.

The goal was to automate the mechanics relevant to the character, not just display them as reference text or require players to remember which modifiers apply. That goal conflicted with the intended scope:

- **Rules cross the app/table boundary.** Feats, items, spells, and conditions can depend on targets, positions, terrain, actions, and other circumstances outside a character sheet. These dependencies cross combat, exploration, and other parts of play, so they cannot be neatly separated into character-only and table-only rules.
- **Effects interact in different ways.** For example, frightened and sickened both have values but recover differently, and Dwarven Doughtiness changes how frightened decreases at the end of a turn. Modeling effects and their overrides requires interpreting rules written for people and encoding an increasing number of interactions and exceptions.
- **Missing context must come from somewhere.** To apply such rules automatically, the app would need to track the relevant encounter state or ask players to supply it, sometimes repeatedly. Manually adding conditions or switching equipment was acceptable, but repeatedly updating terrain or situational modifiers would create the micromanagement the app was meant to avoid. Leaving effects as text or relying on manual modifiers would instead leave players to handle important mechanics themselves.

A character builder or partially automated sheet can still be useful, but that tradeoff does not provide the consistent automation intended here. Switching to another tabletop system would not necessarily resolve the mismatch, since its rules may also rely on a human-managed world and interpretation.

The intended direction is instead to create an original ruleset from scratch, with structured, executable mechanics rather than rules that require interpreting free text, and build a game around the state those mechanics need. This shifts the work toward game design, implementation, and balance.

## Overview

This repository is for browser-based RPG character creators. Each game has its own application for creating a character and leveling that character over time.

## Goals

The working product is important, but the project is also a way to explore three problems:

- how to represent a complex ruleset while making it flexible to support extension;
- how to present a lot of competing information without overwhelming the player;
- how to test a system with too many valid combinations to check one by one.

## Games

### Pathfinder Second Edition

- [Application](https://vasilii-kovalev.github.io/rpg-character-creator/pathfinder-second-edition/)
- [Source code](./apps/pathfinder-second-edition)
- Status: Discontinued (unfinished)

## Legal

Legal notices are in [`LEGAL.md`](./LEGAL.md).

## How the site works

The landing page lists the games that are available. The site has two levels. The site dashboard lists the available character-creator applications. Each application then has its own dashboard, which lists the characters created for that game.

The whole site is static and runs in the browser. There is no backend, account system, or cloud synchronization. Characters are stored in the browser that created them, under the origin that served the site, and remain subject to that browser's storage-retention policy.

The goals shape the code. Rules stay with the game they belong to, calculations are kept separate from storage and UI where possible, and the repository supports both component work and several kinds of rules tests.

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
- `dev:pathfinder-second-edition` — Run the Pathfinder Second Edition character creator locally.
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
- `test` — Run the test suite and write a coverage report.
- `test:ui` — Run tests with the Vitest UI and a coverage report.

### Recommended extensions

The workspace recommends these extensions. The same list is in [`.vscode/extensions.json`](./.vscode/extensions.json):

- Code Spell Checker
- EditorConfig
- Oxc
- rumdl
- Stylelint
- TypeScript 7/TypeScript (Native Preview)
- vscode-styled-components
