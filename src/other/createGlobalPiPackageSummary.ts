import type { LazyPackageSummary } from "../model/types.js";

/**
 * Creates one Lazy Pi summary row for a configured global Pi package.
 *
 * @param source Package source string.
 * @param location Installed package path, when present.
 * @param filtered Whether package settings include filters.
 * @returns Normalized summary row.
 */
export function createGlobalPiPackageSummary(source: string, location: string | undefined, filtered: boolean): LazyPackageSummary {
	return {
		name: source,
		description: filtered ? "Global Pi package (filtered)" : "Global Pi package",
		version: "",
		installed: true,
		favorited: false,
		kind: "pi-package",
		installScope: "global",
		installedGlobal: true,
		installedLocal: false,
		location,
		category: "Pi package",
	};
}
