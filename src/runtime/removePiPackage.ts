import { DefaultPackageManager, SettingsManager, getAgentDir, type ExtensionCommandContext } from "@mariozechner/pi-coding-agent";
import type { LazyInstallScope } from "../model/types.js";

/**
 * Removes one configured Pi package source and persists the settings change.
 *
 * @param ctx Pi command context.
 * @param source Configured package source.
 * @param scope Installation scope.
 */
export async function removePiPackage(ctx: ExtensionCommandContext, source: string, scope: LazyInstallScope): Promise<void> {
	const settingsManager = SettingsManager.create(ctx.cwd, getAgentDir());
	const packageManager = new DefaultPackageManager({ cwd: ctx.cwd, agentDir: getAgentDir(), settingsManager });
	await packageManager.removeAndPersist(source, { local: scope === "local" });
}
