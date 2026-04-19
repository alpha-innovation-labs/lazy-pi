import { readFile } from "node:fs/promises";
import type { LazyInstallScope, LazyPackageSummary } from "../model/types.js";
import { getLazyInstalledPackageDir } from "../paths/getLazyInstalledPackageDir.js";
import { readLazyFavoritePackageNames } from "./readLazyFavoritePackageNames.js";
import { readLazyInstalledPackageNameSets } from "./readLazyInstalledPackageNameSets.js";
import { readLazyInstalledPackageNames } from "./readLazyInstalledPackageNames.js";

/**
 * Reads installed package metadata from both Lazy Pi workspaces.
 *
 * @param cwd Current project directory.
 * @returns Installed package rows.
 */
export async function readLazyInstalledPackages(cwd: string): Promise<LazyPackageSummary[]> {
	const favorites = new Set(await readLazyFavoritePackageNames());
	const installedSets = await readLazyInstalledPackageNameSets(cwd);
	const scopes: LazyInstallScope[] = ["local", "global"];
	const rows = await Promise.all(scopes.flatMap(async (scope) => {
		const names = await readLazyInstalledPackageNames(scope, cwd);
		return Promise.all(names.map(async (name) => {
			const text = await readFile(`${getLazyInstalledPackageDir(name, scope, cwd)}/package.json`, "utf8");
			const pkg = JSON.parse(text) as {
				name: string;
				description?: string;
				version?: string;
				repository?: string | { url?: string };
				homepage?: string;
			};
			return {
				name: pkg.name,
				description: pkg.description ?? "",
				version: pkg.version ?? "0.0.0",
				repository: typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url,
				homepage: pkg.homepage,
				installed: true,
				favorited: favorites.has(pkg.name),
				kind: "lazy-package",
				installScope: scope,
				installedGlobal: installedSets.global.has(pkg.name),
				installedLocal: installedSets.local.has(pkg.name),
				location: getLazyInstalledPackageDir(name, scope, cwd),
				category: "Lazy package",
			} satisfies LazyPackageSummary;
		}));
	}));
	return rows.flat().sort((left, right) => {
		if (left.name !== right.name) return left.name.localeCompare(right.name);
		return (left.installScope ?? "").localeCompare(right.installScope ?? "");
	});
}
