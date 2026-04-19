import type { LazyPackageLoadResult, LazyPackageSummary } from "../model/types.js";
import { readLazyFavoritePackageNames } from "../storage/readLazyFavoritePackageNames.js";
import { readLazyInstalledPackageNameSets } from "../storage/readLazyInstalledPackageNameSets.js";
import { createLazySearchUrl } from "./createLazySearchUrl.js";

/**
 * Searches npm for packages tagged with pi-package.
 *
 * @param query Free-text query.
 * @param cwd Current project directory.
 * @returns Search result rows.
 */
export async function fetchLazySearchPackages(query: string, cwd: string): Promise<LazyPackageLoadResult> {
	const installed = await readLazyInstalledPackageNameSets(cwd);
	const favorites = new Set(await readLazyFavoritePackageNames());
	const response = await fetch(createLazySearchUrl(query));
	if (!response.ok) throw new Error(`npm search failed with HTTP ${response.status}`);
	const data = await response.json() as {
		total?: number;
		objects?: Array<{
			package: {
				name: string;
				description?: string;
				version?: string;
				links?: { repository?: string; homepage?: string };
			};
			downloads?: { monthly?: number };
		}>;
	};
	const normalizedQuery = query.trim().toLowerCase();
	const items = (data.objects ?? []).map((item) => ({
		name: item.package.name,
		description: item.package.description ?? "",
		version: item.package.version ?? "0.0.0",
		downloads: item.downloads?.monthly ?? 0,
		repository: item.package.links?.repository,
		homepage: item.package.links?.homepage,
		installed: installed.global.has(item.package.name) || installed.local.has(item.package.name),
		favorited: favorites.has(item.package.name),
		kind: "lazy-package",
		installedGlobal: installed.global.has(item.package.name),
		installedLocal: installed.local.has(item.package.name),
		category: "Lazy package",
	} satisfies LazyPackageSummary)).filter((item) => {
		if (!normalizedQuery) return true;
		return `${item.name} ${item.description} ${item.repository ?? ""} ${item.homepage ?? ""}`.toLowerCase().includes(normalizedQuery);
	}).sort((left, right) => {
		if (!normalizedQuery) return (right.downloads ?? 0) - (left.downloads ?? 0);
		const leftStarts = left.name.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
		const rightStarts = right.name.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
		if (leftStarts !== rightStarts) return rightStarts - leftStarts;
		const leftIncludes = left.name.toLowerCase().includes(normalizedQuery) ? 1 : 0;
		const rightIncludes = right.name.toLowerCase().includes(normalizedQuery) ? 1 : 0;
		if (leftIncludes !== rightIncludes) return rightIncludes - leftIncludes;
		return (right.downloads ?? 0) - (left.downloads ?? 0);
	});
	return { items, totalCount: normalizedQuery ? items.length : data.total };
}
