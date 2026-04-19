import type { LazyInstallScope, LazyPackageSummary } from "../model/types.js";

/**
 * Creates one Lazy Pi summary row for a non-Lazy extension.
 *
 * @param name Extension display name.
 * @param scope Install scope.
 * @param location Absolute extension path.
 * @param entryType Top-level entry kind.
 * @returns Normalized summary row.
 */
export function createOtherExtensionSummary(
	name: string,
	scope: LazyInstallScope,
	location: string,
	entryType: "directory" | "file",
): LazyPackageSummary {
	return {
		name,
		description: `${scope === "global" ? "Global" : "Local"} extension ${entryType}`,
		version: "",
		installed: true,
		favorited: false,
		kind: "other-extension",
		installScope: scope,
		installedGlobal: scope === "global",
		installedLocal: scope === "local",
		location,
		category: "Extension",
	};
}
