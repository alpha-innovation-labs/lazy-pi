import { readFile } from "node:fs/promises";
import type { LazyFavoriteCacheEntry, LazyFavoriteCacheFile } from "../model/types.js";
import { getLazyFavoritesPath } from "../paths/getLazyFavoritesPath.js";
import { ensureLazyWorkspace } from "./ensureLazyWorkspace.js";

/**
 * Reads the Lazy Pi favorites cache from disk.
 *
 * @returns Cached favorite entries.
 */
export async function readLazyFavoriteCache(): Promise<LazyFavoriteCacheEntry[]> {
	await ensureLazyWorkspace();
	try {
		const text = await readFile(getLazyFavoritesPath(), "utf8");
		const parsed = JSON.parse(text) as LazyFavoriteCacheFile | string[];
		if (Array.isArray(parsed)) return parsed.map((name) => ({ name }));
		if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.items)) return [];
		return parsed.items
			.filter((item): item is LazyFavoriteCacheEntry => !!item && typeof item.name === "string" && item.name.length > 0)
			.sort((left, right) => left.name.localeCompare(right.name));
	} catch {
		return [];
	}
}
