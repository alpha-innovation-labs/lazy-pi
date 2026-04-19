import { spawn } from "node:child_process";
import { ensureLazyPackageJson } from "../storage/ensureLazyPackageJson.js";
import { getLazyExtensionDir } from "../paths/getLazyExtensionDir.js";

/**
 * Runs one npm command inside the Lazy Pi workspace.
 *
 * @param args npm arguments.
 */
export async function runNpmInLazyWorkspace(args: string[]): Promise<void> {
	await ensureLazyPackageJson();
	await new Promise<void>((resolve, reject) => {
		const child = spawn("npm", args, {
			cwd: getLazyExtensionDir(),
			stdio: "ignore",
		});
		child.once("error", reject);
		child.once("exit", (code) => {
			if (code === 0) resolve();
			else reject(new Error(`npm ${args.join(" ")} failed with exit code ${code ?? -1}`));
		});
	});
}
