import { resolve } from "node:path";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyNodeModulesDir } from "./getLazyNodeModulesDir.js";

/**
 * Returns one installed package directory inside Lazy Pi.
 *
 * @param packageName npm package name.
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Installed package directory path.
 */
export function getLazyInstalledPackageDir(packageName: string, scope: LazyInstallScope = "global", cwd = process.cwd()): string {
	return resolve(getLazyNodeModulesDir(scope, cwd), packageName);
}
