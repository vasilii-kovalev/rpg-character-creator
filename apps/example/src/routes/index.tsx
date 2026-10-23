import { createHashRouter, type LazyRouteFunction, redirect, type RouteObject } from "react-router";

import { createId } from "packages/shared/src/create-id";

import { db } from "../services/db";
import { PageFallback } from "./page-fallback";

type PageModule = Awaited<ReturnType<LazyRouteFunction<RouteObject>>>;

interface PageCache {
	page?: Promise<PageModule>;
}

const loadPage = (importer: LazyRouteFunction<RouteObject>): (() => Promise<PageModule>) => {
	const cache: PageCache = {};

	return async (): Promise<PageModule> => {
		cache.page ??= importer();

		const page = await cache.page;

		return page;
	};
};

const loadCharacterListPage = loadPage(async () => {
	const page = await import("../pages/character-list/page");

	return page;
});

const loadCharacterEditorPage = loadPage(async () => {
	const page = await import("../pages/character-editor/page");

	return page;
});

// Warm both lazy loaders at startup so in-app navigation does not wait on HydrateFallback.
void loadCharacterListPage();
void loadCharacterEditorPage();

const createCharacter = async (): Promise<Response> => {
	const id = createId();

	await db.characters.add({
		id,
		name: "New character",
	});

	return redirect(`/characters/${id}`);
};

// Hash routing keeps the HTTP path on this application's `index.html`. GitHub Pages has no SPA rewrites.
export const router = createHashRouter([
	{
		HydrateFallback: PageFallback,
		lazy: loadCharacterListPage,
		path: "/",
	},
	{
		loader: createCharacter,
		path: "/characters/new",
	},
	{
		HydrateFallback: PageFallback,
		lazy: loadCharacterEditorPage,
		path: "/characters/:id",
	},
]);
