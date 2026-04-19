import type { LazyPackageSummary } from "../model/types.js";

/**
 * Filters installed packages by query.
 *
 * @param packages Installed package rows.
 * @param query Free-text query.
 * @returns Filtered installed package rows.
 */
export function filterLazyInstalledPackages(packages: LazyPackageSummary[], query: string): LazyPackageSummary[] {
	const normalized = query.trim().toLowerCase();
	if (!normalized) return packages;
	return packages.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(normalized));
}
