import { refreshLazyLoader } from "../loader/refreshLazyLoader.js";
import { runNpmInLazyWorkspace } from "./runNpmInLazyWorkspace.js";

/**
 * Removes one package from the Lazy Pi workspace.
 *
 * @param packageName npm package name.
 */
export async function removeLazyWorkspacePackage(packageName: string): Promise<void> {
	await runNpmInLazyWorkspace(["uninstall", packageName]);
	await refreshLazyLoader();
}
