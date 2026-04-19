import { writeFile } from "node:fs/promises";
import type { LazyInstallScope } from "../model/types.js";
import { createLazyLoaderContent } from "./createLazyLoaderContent.js";
import { getLazyLoaderPath } from "../paths/getLazyLoaderPath.js";
import { readLazyInstalledPackageNames } from "../storage/readLazyInstalledPackageNames.js";
import { resolveLazyPackageExtensionEntries } from "./resolveLazyPackageExtensionEntries.js";

/**
 * Regenerates one Lazy Pi loader file from installed packages.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 */
export async function refreshLazyLoader(scope: LazyInstallScope = "global", cwd = process.cwd()): Promise<void> {
	const names = await readLazyInstalledPackageNames(scope, cwd);
	const entries = (await Promise.all(names.map((name) => resolveLazyPackageExtensionEntries(name, scope, cwd)))).flat();
	await writeFile(getLazyLoaderPath(scope, cwd), createLazyLoaderContent(entries), "utf8");
}
