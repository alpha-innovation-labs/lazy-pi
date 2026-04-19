import type { LazyInstallScope } from "../model/types.js";
import { readLazyInstalledPackageNames } from "./readLazyInstalledPackageNames.js";

/**
 * Reads installed Lazy Pi package names for both scopes.
 *
 * @param cwd Current project directory.
 * @returns Installed package name sets by scope.
 */
export async function readLazyInstalledPackageNameSets(cwd: string): Promise<Record<LazyInstallScope, Set<string>>> {
	const [globalNames, localNames] = await Promise.all([
		readLazyInstalledPackageNames("global", cwd),
		readLazyInstalledPackageNames("local", cwd),
	]);
	return {
		global: new Set(globalNames),
		local: new Set(localNames),
	};
}
