import { fetchLazyPackageSummary } from "../registry/fetchLazyPackageSummary.js";
import { readLazyInstalledPackageNames } from "./readLazyInstalledPackageNames.js";
import { createLazyFavoriteCacheEntry } from "./createLazyFavoriteCacheEntry.js";
import { readLazyFavoriteCache } from "./readLazyFavoriteCache.js";
import { writeLazyFavoriteCache } from "./writeLazyFavoriteCache.js";

let activeRefresh: Promise<void> | undefined;

/**
 * Refreshes cached favorite package metadata in the background.
 *
 * @returns Refresh completion.
 */
export function refreshLazyFavoriteCache(): Promise<void> {
	if (activeRefresh) return activeRefresh;
	activeRefresh = runLazyFavoriteCacheRefresh().finally(() => {
		activeRefresh = undefined;
	});
	return activeRefresh;
}

/**
 * Fetches latest metadata for all current favorites and writes it to disk.
 *
 * @returns Refresh completion.
 */
async function runLazyFavoriteCacheRefresh(): Promise<void> {
	const initialEntries = await readLazyFavoriteCache();
	if (initialEntries.length === 0) return;
	const installed = new Set(await readLazyInstalledPackageNames());
	const refreshedEntries = await Promise.all(initialEntries.map(async (entry) => {
		try {
			const summary = await fetchLazyPackageSummary(entry.name, installed.has(entry.name), true);
			return createLazyFavoriteCacheEntry(summary);
		} catch {
			return entry;
		}
	}));
	const latestEntries = await readLazyFavoriteCache();
	const refreshedByName = new Map(refreshedEntries.map((entry) => [entry.name, entry]));
	await writeLazyFavoriteCache(latestEntries.map((entry) => refreshedByName.get(entry.name) ?? entry));
}
