import { writeFile } from "node:fs/promises";
import type { LazyFavoriteCacheEntry, LazyFavoriteCacheFile } from "../model/types.js";
import { getLazyFavoritesPath } from "../paths/getLazyFavoritesPath.js";
import { ensureLazyWorkspace } from "./ensureLazyWorkspace.js";

/**
 * Writes the Lazy Pi favorites cache to disk.
 *
 * @param items Favorite cache entries.
 */
export async function writeLazyFavoriteCache(items: LazyFavoriteCacheEntry[]): Promise<void> {
	await ensureLazyWorkspace();
	const normalized = Array.from(new Map(items.map((item) => [item.name, item])).values())
		.sort((left, right) => left.name.localeCompare(right.name));
	const file: LazyFavoriteCacheFile = { version: 1, items: normalized };
	await writeFile(getLazyFavoritesPath(), JSON.stringify(file, null, 2) + "\n", "utf8");
}
