import { getAgentDir } from "@mariozechner/pi-coding-agent";
import { resolve } from "node:path";

/**
 * Returns the global extension symlink path for one local dev package.
 *
 * @param packageName Package name.
 * @returns Global symlink path.
 */
export function getLocalPackageLinkPath(packageName: string): string {
	return resolve(getAgentDir(), "extensions", packageName);
}
