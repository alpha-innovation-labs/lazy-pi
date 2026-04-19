import { DefaultPackageManager, SettingsManager, getAgentDir } from "@mariozechner/pi-coding-agent";
import type { LazyPackageSummary } from "../model/types.js";
import { createGlobalPiPackageSummary } from "./createGlobalPiPackageSummary.js";

/**
 * Reads configured global Pi packages using Pi's internal package manager.
 *
 * @param cwd Current project directory.
 * @returns Global Pi package rows.
 */
export async function readGlobalPiPackageItems(cwd: string): Promise<LazyPackageSummary[]> {
	const settingsManager = SettingsManager.create(cwd, getAgentDir());
	const packageManager = new DefaultPackageManager({ cwd, agentDir: getAgentDir(), settingsManager });
	return packageManager
		.listConfiguredPackages()
		.filter((item) => item.scope === "user")
		.map((item) => createGlobalPiPackageSummary(item.source, item.installedPath, item.filtered))
		.sort((left, right) => left.name.localeCompare(right.name));
}
