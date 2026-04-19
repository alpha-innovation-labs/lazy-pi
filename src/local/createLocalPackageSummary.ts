import type { LazyPackageSummary } from "../model/types.js";

/**
 * Creates one Lazy Pi summary row for a globally linked local dev package.
 *
 * @param name Package name.
 * @param location Resolved absolute package path.
 * @param linkPath Global symlink path.
 * @returns Normalized summary row.
 */
export function createLocalPackageSummary(name: string, location: string, linkPath: string): LazyPackageSummary {
	return {
		name,
		description: "Global dev link to local Pi package",
		version: "",
		installed: true,
		favorited: false,
		kind: "pi-package",
		installScope: "global",
		installedGlobal: true,
		installedLocal: false,
		location,
		linkPath,
		category: "Local package",
	};
}
