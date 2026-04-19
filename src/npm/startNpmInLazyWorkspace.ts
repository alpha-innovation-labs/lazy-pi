import { spawn, type ChildProcess } from "node:child_process";
import type { LazyInstallScope } from "../model/types.js";
import { ensureLazyPackageJson } from "../storage/ensureLazyPackageJson.js";
import { getLazyExtensionDir } from "../paths/getLazyExtensionDir.js";

/**
 * Starts one npm command inside one Lazy Pi workspace without waiting.
 *
 * @param args npm arguments.
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Started child process.
 */
export async function startNpmInLazyWorkspace(args: string[], scope: LazyInstallScope = "global", cwd = process.cwd()): Promise<ChildProcess> {
	await ensureLazyPackageJson(scope, cwd);
	return spawn("npm", args, {
		cwd: getLazyExtensionDir(scope, cwd),
		stdio: "ignore",
	});
}
