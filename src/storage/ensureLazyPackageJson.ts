import { access, writeFile } from "node:fs/promises";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyPackageJsonPath } from "../paths/getLazyPackageJsonPath.js";
import { ensureLazyWorkspace } from "./ensureLazyWorkspace.js";

const EMPTY_PACKAGE_JSON = JSON.stringify(
	{
		name: "lazy-pi-workspace",
		private: true,
		type: "module",
		dependencies: {},
	},
	null,
	2,
) + "\n";

/**
 * Ensures one Lazy Pi workspace package.json exists.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 */
export async function ensureLazyPackageJson(scope: LazyInstallScope = "global", cwd = process.cwd()): Promise<void> {
	await ensureLazyWorkspace(scope, cwd);
	try {
		await access(getLazyPackageJsonPath(scope, cwd));
	} catch {
		await writeFile(getLazyPackageJsonPath(scope, cwd), EMPTY_PACKAGE_JSON, "utf8");
	}
}
