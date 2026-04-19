import { refreshLazyLoader } from "../loader/refreshLazyLoader.js";
import { runNpmInLazyWorkspace } from "./runNpmInLazyWorkspace.js";

/**
 * Updates one package in the Lazy Pi workspace.
 *
 * @param packageName npm package name.
 */
export async function updateLazyWorkspacePackage(packageName: string): Promise<void> {
	await runNpmInLazyWorkspace(["install", "--omit=dev", `${packageName}@latest`]);
	await refreshLazyLoader();
}
