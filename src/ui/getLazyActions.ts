import type { LazyAction } from "../model/types.js";

/**
 * Returns Lazy Pi actions in menu order.
 *
 * @returns Ordered Lazy Pi actions.
 */
export function getLazyActions(): LazyAction[] {
	return ["installed", "search", "favorites", "other", "local"];
}
