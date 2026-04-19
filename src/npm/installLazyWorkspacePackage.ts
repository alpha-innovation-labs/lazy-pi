import { refreshLazyLoader } from "../loader/refreshLazyLoader.js";
import { runNpmInLazyWorkspace } from "./runNpmInLazyWorkspace.js";

/**
 * Installs one package into the Lazy Pi workspace.
 *
 * @param packageName npm package name.
 */
export async function installLazyWorkspacePackage(packageName: string): Promise<void> {
	await runNpmInLazyWorkspace(["install", "--omit=dev", packageName]);
	await refreshLazyLoader();
}
