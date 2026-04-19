import type { LazyPackageSummary } from "../model/types.js";
import { createLazyFavoriteCacheEntry } from "./createLazyFavoriteCacheEntry.js";
import { readLazyFavoriteCache } from "./readLazyFavoriteCache.js";
import { writeLazyFavoriteCache } from "./writeLazyFavoriteCache.js";

/**
 * Toggles one package in the Lazy Pi favorites list.
 *
 * @param item Package to toggle.
 * @returns True when the package is now favorited.
 */
export async function toggleLazyFavoritePackage(item: LazyPackageSummary): Promise<boolean> {
	const entries = await readLazyFavoriteCache();
	const next = entries.some((entry) => entry.name === item.name)
		? entries.filter((entry) => entry.name !== item.name)
		: [...entries, createLazyFavoriteCacheEntry(item)];
	await writeLazyFavoriteCache(next);
	return next.some((entry) => entry.name === item.name);
}
