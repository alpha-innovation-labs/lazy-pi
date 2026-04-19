import type { LazyPackageSummary } from "../model/types.js";

/**
 * Creates one group row for the Lazy Pi Other tab.
 *
 * @param name Group label.
 * @param description Group description.
 * @param count Number of child rows.
 * @returns Group summary row.
 */
export function createLazyOtherGroupSummary(name: string, description: string, count: number): LazyPackageSummary {
	return {
		name,
		description,
		version: "",
		installed: false,
		favorited: false,
		kind: "group",
		category: `${count} item${count === 1 ? "" : "s"}`,
	};
}
