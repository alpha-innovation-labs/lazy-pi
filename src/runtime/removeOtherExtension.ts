import { rm, unlink } from "node:fs/promises";

/**
 * Removes one extension file or directory from disk.
 *
 * @param location Absolute extension path.
 */
export async function removeOtherExtension(location: string): Promise<void> {
	try {
		await unlink(location);
	} catch {
		await rm(location, { recursive: true, force: true });
	}
}
