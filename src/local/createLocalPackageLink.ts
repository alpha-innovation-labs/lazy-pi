import { lstat, mkdir, realpath, symlink } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { getLocalPackageLinkPath } from "./getLocalPackageLinkPath.js";

/**
 * Creates or verifies the global symlink for one local dev package.
 *
 * @param packageName Package name.
 * @param packageRoot Absolute local package root.
 */
export async function createLocalPackageLink(packageName: string, packageRoot: string): Promise<void> {
	const linkPath = getLocalPackageLinkPath(packageName);
	try {
		const stats = await lstat(linkPath);
		if (!stats.isSymbolicLink()) throw new Error(`Global extension entry already exists and is not a symlink: ${linkPath}`);
		const linkedTarget = await realpath(linkPath);
		if (resolve(linkedTarget) !== resolve(packageRoot)) throw new Error(`Global extension symlink already points somewhere else: ${linkPath}`);
		return;
	} catch (error) {
		const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
		if (code && code !== "ENOENT") throw error;
	}
	await mkdir(dirname(linkPath), { recursive: true });
	await symlink(packageRoot, linkPath, "dir");
}
