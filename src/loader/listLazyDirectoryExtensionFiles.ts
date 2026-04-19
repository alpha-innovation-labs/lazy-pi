import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * Lists extension entry files below one directory.
 *
 * @param directory Directory to scan.
 * @returns Relative extension file paths.
 */
export async function listLazyDirectoryExtensionFiles(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(entries.map(async (entry) => {
		const fullPath = resolve(directory, entry.name);
		if (entry.isDirectory()) return listLazyDirectoryExtensionFiles(fullPath);
		if (entry.name.endsWith(".ts") || entry.name.endsWith(".js")) return [fullPath];
		return [];
	}));
	return files.flat().sort((left, right) => left.localeCompare(right));
}
