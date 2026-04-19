import { readFile, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyExtensionDir } from "../paths/getLazyExtensionDir.js";
import { getLazyInstalledPackageDir } from "../paths/getLazyInstalledPackageDir.js";
import { listLazyDirectoryExtensionFiles } from "./listLazyDirectoryExtensionFiles.js";

async function readStats(path: string): Promise<Awaited<ReturnType<typeof stat>> | null> {
	try {
		return await stat(path);
	} catch {
		return null;
	}
}

/**
 * Resolves extension entry file paths for one installed package.
 *
 * @param packageName Installed package name.
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Importable relative entry paths.
 */
export async function resolveLazyPackageExtensionEntries(packageName: string, scope: LazyInstallScope = "global", cwd = process.cwd()): Promise<string[]> {
	const directory = getLazyInstalledPackageDir(packageName, scope, cwd);
	const manifestPath = resolve(directory, "package.json");
	const text = await readFile(manifestPath, "utf8");
	const pkg = JSON.parse(text) as { pi?: { extensions?: string[] } };
	const declared = pkg.pi?.extensions ?? [];
	const targets = declared.length > 0 ? declared : ["extensions", "index.ts", "index.js"];
	const workspaceDir = getLazyExtensionDir(scope, cwd);
	const files = await Promise.all(targets.map(async (target) => {
		const fullPath = resolve(directory, target);
		const fileStats = await readStats(fullPath);
		if (!fileStats) return [];
		if (fileStats.isFile()) return [relative(workspaceDir, fullPath)];
		const nested = await listLazyDirectoryExtensionFiles(fullPath);
		return nested.map((path) => relative(workspaceDir, path));
	}));
	return Array.from(new Set(files.flat())).sort((left, right) => left.localeCompare(right));
}
