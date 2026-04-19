import type { LazyFavoriteCacheEntry, LazyPackageSummary } from "../model/types.js";

/**
 * Creates one disk cache entry from a package summary.
 *
 * @param item Package summary to cache.
 * @returns Favorite cache entry.
 */
export function createLazyFavoriteCacheEntry(item: LazyPackageSummary): LazyFavoriteCacheEntry {
	return {
		name: item.name,
		description: item.description,
		version: item.version,
		latestVersion: item.latestVersion,
		downloads: item.downloads,
		repository: item.repository,
		homepage: item.homepage,
		cachedAt: new Date().toISOString(),
	};
}
