import { realpath, readdir } from "node:fs/promises";
import { getAgentDir } from "@mariozechner/pi-coding-agent";
import { resolve } from "node:path";

/**
 * Reads global symlinked local package entries managed for dev testing.
 *
 * @returns Symlink paths with resolved targets.
 */
export async function readLocalPackageLinkEntries(): Promise<Array<{ linkPath: string; targetPath: string }>> {
	const extensionsDir = resolve(getAgentDir(), "extensions");
	try {
		const entries = await readdir(extensionsDir, { withFileTypes: true });
		const links = await Promise.all(entries.filter((entry) => entry.isSymbolicLink()).map(async (entry) => {
			const linkPath = resolve(extensionsDir, entry.name);
			try {
				return { linkPath, targetPath: await realpath(linkPath) };
			} catch {
				return null;
			}
		}));
		return links.filter((item): item is { linkPath: string; targetPath: string } => !!item);
	} catch {
		return [];
	}
}
