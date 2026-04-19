import type { LazyAction, LazyPackageLoadResult } from "../model/types.js";
import { readLazyOtherItems } from "../other/readLazyOtherItems.js";
import { fetchLazyFavoritePackages } from "../registry/fetchLazyFavoritePackages.js";
import { fetchLazySearchPackages } from "../registry/fetchLazySearchPackages.js";
import { filterLazyInstalledPackages } from "../registry/filterLazyInstalledPackages.js";
import { readLazyInstalledPackages } from "../storage/readLazyInstalledPackages.js";

/**
 * Loads packages for the active Lazy Pi tab.
 *
 * @param action Active modal action.
 * @param query Free-text query.
 * @param cwd Current project directory.
 * @returns Package rows for the current tab.
 */
export async function loadLazyModalPackages(action: LazyAction, query: string, cwd: string): Promise<LazyPackageLoadResult> {
	if (action === "search") return fetchLazySearchPackages(query, cwd);
	if (action === "favorites") return fetchLazyFavoritePackages(query, cwd);
	if (action === "other") {
		const items = await readLazyOtherItems(cwd, query);
		return { items, totalCount: items.length };
	}
	const items = filterLazyInstalledPackages(await readLazyInstalledPackages(cwd), query);
	return { items, totalCount: items.length };
}
