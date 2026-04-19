import type { LazyInstallScope } from "../model/types.js";
import { discoverLazyInstalledPackageNames } from "./discoverLazyInstalledPackageNames.js";

/**
 * Reads installed package names managed by Lazy Pi.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Sorted installed package names.
 */
export async function readLazyInstalledPackageNames(scope: LazyInstallScope = "global", cwd = process.cwd()): Promise<string[]> {
	return discoverLazyInstalledPackageNames(scope, cwd);
}
