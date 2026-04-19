import { extname } from "node:path";
import type { LazyOtherTopLevelEntry } from "./readTopLevelLazyOtherEntries.js";

/**
 * Checks whether one top-level extension entry should appear in the Other tab.
 *
 * @param entry Top-level extension entry.
 * @returns True when the entry should be listed.
 */
export function isVisibleLazyOtherExtensionEntry(entry: LazyOtherTopLevelEntry): boolean {
	if (entry.name === "lazy" || entry.name === "lazy-pi") return false;
	if (entry.name === "node_modules" || entry.name === "index.ts" || entry.name === "index.js") return false;
	if (entry.isDirectory) return true;
	if (!entry.isFile) return false;
	return [".ts", ".js", ".mjs", ".cjs"].includes(extname(entry.name));
}
