import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * Reads and validates the manifest for one local Pi package root.
 *
 * @param packageRoot Absolute package root path.
 * @returns Package name and declared extension entries.
 */
export async function readLocalPackageManifest(packageRoot: string): Promise<{ name: string; extensions: string[] }> {
	const packageJsonPath = resolve(packageRoot, "package.json");
	let pkg: { name?: string; pi?: { extensions?: string[] } };
	try {
		pkg = JSON.parse(await readFile(packageJsonPath, "utf8")) as { name?: string; pi?: { extensions?: string[] } };
	} catch {
		throw new Error(`Local package must be a standalone Pi package root with package.json: ${packageRoot}`);
	}
	if (!pkg.name?.trim()) throw new Error(`Local package must declare package.json name: ${packageRoot}`);
	if (!Array.isArray(pkg.pi?.extensions) || pkg.pi.extensions.length === 0) {
		throw new Error(`Local package must declare pi.extensions in package.json: ${packageRoot}`);
	}
	return { name: pkg.name, extensions: pkg.pi.extensions };
}
