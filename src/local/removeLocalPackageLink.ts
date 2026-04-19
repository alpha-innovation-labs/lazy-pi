import { unlink } from "node:fs/promises";

/**
 * Removes one global symlinked local package link.
 *
 * @param linkPath Global symlink path.
 */
export async function removeLocalPackageLink(linkPath: string): Promise<void> {
	await unlink(linkPath);
}
