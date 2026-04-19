import { mkdir } from "node:fs/promises";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyExtensionDir } from "../paths/getLazyExtensionDir.js";

/**
 * Ensures one Lazy Pi workspace directory exists.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 */
export async function ensureLazyWorkspace(scope: LazyInstallScope = "global", cwd = process.cwd()): Promise<void> {
	await mkdir(getLazyExtensionDir(scope, cwd), { recursive: true });
}
