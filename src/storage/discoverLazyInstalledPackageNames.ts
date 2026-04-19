import { readdir, readFile } from "node:fs/promises";
import type { LazyInstallScope } from "../model/types.js";
import { getLazyNodeModulesDir } from "../paths/getLazyNodeModulesDir.js";

async function readLazyPackageName(path: string): Promise<string | null> {
	try {
		const text = await readFile(path, "utf8");
		const pkg = JSON.parse(text) as { name?: string; keywords?: string[]; pi?: unknown };
		const isPiPackage = Array.isArray(pkg.keywords) && pkg.keywords.includes("pi-package");
		if (!pkg.name || (!isPiPackage && !pkg.pi)) return null;
		return pkg.name;
	} catch {
		return null;
	}
}

/**
 * Discovers installed Lazy Pi packages from top-level node_modules entries.
 *
 * @param scope Installation scope.
 * @param cwd Current project directory.
 * @returns Sorted installed package names.
 */
export async function discoverLazyInstalledPackageNames(scope: LazyInstallScope = "global", cwd = process.cwd()): Promise<string[]> {
	const nodeModulesDir = getLazyNodeModulesDir(scope, cwd);
	try {
		const entries = await readdir(nodeModulesDir, { withFileTypes: true });
		const names = await Promise.all(entries.flatMap((entry) => {
			if (!entry.isDirectory()) return [];
			if (entry.name.startsWith(".")) return [];
			if (entry.name.startsWith("@")) {
				return readdir(`${nodeModulesDir}/${entry.name}`, { withFileTypes: true }).then((scoped) =>
					Promise.all(scoped.filter((item) => item.isDirectory()).map((item) => readLazyPackageName(`${nodeModulesDir}/${entry.name}/${item.name}/package.json`))),
				);
			}
			return [readLazyPackageName(`${nodeModulesDir}/${entry.name}/package.json`)];
		}));
		return Array.from(new Set(names.flat().filter((name): name is string => !!name))).sort((left, right) => left.localeCompare(right));
	} catch {
		return [];
	}
}
