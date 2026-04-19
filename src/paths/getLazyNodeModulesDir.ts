import { resolve } from "node:path";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyExtensionDir } from "./getLazyExtensionDir.js";

/**
 * Returns one Lazy Pi node_modules directory.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Lazy Pi node_modules path.
 */
export function getLazyNodeModulesDir(scope: LazyInstallScope = "global", cwd = process.cwd()): string {
	return resolve(getLazyExtensionDir(scope, cwd), "node_modules");
}
