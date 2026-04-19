import { resolve } from "node:path";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyExtensionDir } from "./getLazyExtensionDir.js";

/**
 * Returns one generated Lazy Pi loader file path.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Lazy Pi loader file path.
 */
export function getLazyLoaderPath(scope: LazyInstallScope = "global", cwd = process.cwd()): string {
	return resolve(getLazyExtensionDir(scope, cwd), "index.ts");
}
