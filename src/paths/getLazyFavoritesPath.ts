import { resolve } from "node:path";
import { getLazyExtensionDir } from "./getLazyExtensionDir.js";

/**
 * Returns the Lazy Pi favorites file path.
 *
 * @returns Favorites JSON file path.
 */
export function getLazyFavoritesPath(): string {
	return resolve(getLazyExtensionDir(), "favorites.json");
}
