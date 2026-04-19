import { getAgentDir } from "@mariozechner/pi-coding-agent";
import { resolve } from "node:path";
import type { LazyPackageSummary } from "../model/types.js";
import { createOtherExtensionSummary } from "./createOtherExtensionSummary.js";
import { isVisibleLazyOtherExtensionEntry } from "./isVisibleLazyOtherExtensionEntry.js";
import { readTopLevelLazyOtherEntries } from "./readTopLevelLazyOtherEntries.js";

/**
 * Reads non-Lazy extension rows from global and project extension roots.
 *
 * @param cwd Current project directory.
 * @returns Normalized extension rows.
 */
export async function readOtherExtensionItems(cwd: string): Promise<LazyPackageSummary[]> {
	const globalDir = resolve(getAgentDir(), "extensions");
	const localDir = resolve(cwd, ".pi", "extensions");
	const [globalEntries, localEntries] = await Promise.all([readTopLevelLazyOtherEntries(globalDir), readTopLevelLazyOtherEntries(localDir)]);
	const rows = [
		...globalEntries
			.filter(isVisibleLazyOtherExtensionEntry)
			.map((entry) => createOtherExtensionSummary(entry.name.replace(/\.[^.]+$/, ""), "global", resolve(globalDir, entry.name), entry.isDirectory ? "directory" : "file")),
		...localEntries
			.filter(isVisibleLazyOtherExtensionEntry)
			.map((entry) => createOtherExtensionSummary(entry.name.replace(/\.[^.]+$/, ""), "local", resolve(localDir, entry.name), entry.isDirectory ? "directory" : "file")),
	];
	return rows.sort((left, right) => left.name.localeCompare(right.name));
}
