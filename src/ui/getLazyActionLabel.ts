import type { LazyAction } from "../model/types.js";

/**
 * Returns the display label for one Lazy Pi action.
 *
 * @param action Lazy Pi action.
 * @returns Action label.
 */
export function getLazyActionLabel(action: LazyAction): string {
	if (action === "installed") return "Installed";
	if (action === "search") return "Search";
	if (action === "favorites") return "Favorites";
	if (action === "other") return "Other";
	return "Local";
}
