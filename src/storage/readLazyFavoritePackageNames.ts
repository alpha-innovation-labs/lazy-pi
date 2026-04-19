import { readLazyFavoriteCache } from "./readLazyFavoriteCache.js";

/**
 * Reads the current Lazy Pi favorite package names.
 *
 * @returns Sorted favorite package names.
 */
export async function readLazyFavoritePackageNames(): Promise<string[]> {
	const items = await readLazyFavoriteCache();
	return items.map((item) => item.name);
}
