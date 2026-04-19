import type { LazyPackageSummary } from "../model/types.js";

/**
 * Creates one indented child row for the Lazy Pi Other tab.
 *
 * @param item Source row.
 * @returns Child row copy.
 */
export function createLazyOtherChildSummary(item: LazyPackageSummary): LazyPackageSummary {
	return {
		...item,
		name: `  ${item.name}`,
	};
}
