import { resolve } from "node:path";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyExtensionDir } from "./getLazyExtensionDir.js";

/**
 * Returns one managed Lazy Pi package.json path.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Lazy Pi package.json path.
 */
export function getLazyPackageJsonPath(scope: LazyInstallScope = "global", cwd = process.cwd()): string {
	return resolve(getLazyExtensionDir(scope, cwd), "package.json");
}
