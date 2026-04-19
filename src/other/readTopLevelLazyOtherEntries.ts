import { readdir } from "node:fs/promises";

export type LazyOtherTopLevelEntry = {
	name: string;
	isDirectory: boolean;
	isFile: boolean;
};

/**
 * Reads top-level entries from one extension directory.
 *
 * @param directory Directory to inspect.
 * @returns Top-level entry shapes.
 */
export async function readTopLevelLazyOtherEntries(directory: string): Promise<LazyOtherTopLevelEntry[]> {
	try {
		const entries = await readdir(directory, { withFileTypes: true });
		return entries.map((entry) => ({
			name: entry.name,
			isDirectory: entry.isDirectory(),
			isFile: entry.isFile(),
		}));
	} catch {
		return [];
	}
}
