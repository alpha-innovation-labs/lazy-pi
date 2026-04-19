import { getAgentDir } from "@mariozechner/pi-coding-agent";
import { resolve } from "node:path";
import type { LazyInstallScope } from "../model/types.js";

/**
 * Returns one Lazy Pi package workspace directory.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Lazy Pi workspace path.
 */
export function getLazyExtensionDir(scope: LazyInstallScope = "global", cwd = process.cwd()): string {
	return scope === "global" ? resolve(getAgentDir(), "extensions", "lazy") : resolve(cwd, ".pi", "extensions", "lazy");
}
