import type { LazyPackageSummary } from "../model/types.js";
import { createLocalPackageSummary } from "./createLocalPackageSummary.js";
import { readLocalPackageLinkEntries } from "./readLocalPackageLinkEntries.js";
import { readLocalPackageManifest } from "./readLocalPackageManifest.js";

/**
 * Reads globally linked local dev packages.
 *
 * @param _cwd Current project directory.
 * @param query Optional filter query.
 * @returns Normalized local package rows.
 */
export async function readLocalPackageItems(_cwd: string, query: string): Promise<LazyPackageSummary[]> {
	const normalized = query.trim().toLowerCase();
	const links = await readLocalPackageLinkEntries();
	const items = await Promise.all(links.map(async ({ linkPath, targetPath }) => {
		try {
			const manifest = await readLocalPackageManifest(targetPath);
			return createLocalPackageSummary(manifest.name, targetPath, linkPath);
		} catch {
			return null;
		}
	}));
	return items
		.filter((item): item is LazyPackageSummary => !!item)
		.filter((item) => !normalized || `${item.name} ${item.description} ${item.location ?? ""}`.toLowerCase().includes(normalized))
		.sort((left, right) => left.name.localeCompare(right.name));
}
