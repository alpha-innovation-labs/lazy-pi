import { readLazyFavoriteCache } from "./readLazyFavoriteCache.js";
import { writeLazyFavoriteCache } from "./writeLazyFavoriteCache.js";

/**
 * Writes the full Lazy Pi favorite package list.
 *
 * @param names Favorite package names.
 */
export async function writeLazyFavoritePackageNames(names: string[]): Promise<void> {
	const existing = await readLazyFavoriteCache();
	const existingByName = new Map(existing.map((item) => [item.name, item]));
	await writeLazyFavoriteCache(names.map((name) => existingByName.get(name) ?? { name }));
}
