import type { LazyPackageLoadResult } from "../model/types.js";
import { createLazyFavoriteSummary } from "../storage/createLazyFavoriteSummary.js";
import { readLazyFavoriteCache } from "../storage/readLazyFavoriteCache.js";
import { readLazyInstalledPackageNameSets } from "../storage/readLazyInstalledPackageNameSets.js";
import { refreshLazyFavoriteCache } from "../storage/refreshLazyFavoriteCache.js";

/**
 * Loads package rows for the Lazy Pi favorites tab.
 *
 * @param query Optional local filter query.
 * @param cwd Current project directory.
 * @returns Favorite package rows.
 */
export async function fetchLazyFavoritePackages(query: string, cwd: string): Promise<LazyPackageLoadResult> {
	const favorites = await readLazyFavoriteCache();
	const installed = await readLazyInstalledPackageNameSets(cwd);
	void refreshLazyFavoriteCache();
	const normalized = query.trim().toLowerCase();
	const items = favorites
		.map((entry) => ({
			...createLazyFavoriteSummary(entry, installed.global.has(entry.name) || installed.local.has(entry.name)),
			kind: "lazy-package" as const,
			installedGlobal: installed.global.has(entry.name),
			installedLocal: installed.local.has(entry.name),
			category: "Lazy package",
		}))
		.filter((item) => !normalized || `${item.name} ${item.description}`.toLowerCase().includes(normalized))
		.sort((left, right) => left.name.localeCompare(right.name));
	return { items, totalCount: favorites.length };
}
