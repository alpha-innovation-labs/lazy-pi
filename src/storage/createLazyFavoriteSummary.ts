import type { LazyFavoriteCacheEntry, LazyPackageSummary } from "../model/types.js";

/**
 * Converts one cached favorite entry into a modal row.
 *
 * @param entry Cached favorite entry.
 * @param installed Whether the package is installed.
 * @returns Package summary row.
 */
export function createLazyFavoriteSummary(entry: LazyFavoriteCacheEntry, installed: boolean): LazyPackageSummary {
	return {
		name: entry.name,
		description: entry.description ?? "",
		version: entry.version ?? "0.0.0",
		latestVersion: entry.latestVersion,
		downloads: entry.downloads,
		repository: entry.repository,
		homepage: entry.homepage,
		installed,
		favorited: true,
	};
}
