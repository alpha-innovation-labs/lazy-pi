import { readLocalPackageManifest } from "./readLocalPackageManifest.js";

/**
 * Validates that one local path looks like a standalone Pi package root.
 *
 * @param packageRoot Absolute package root path.
 */
export async function validateLocalPackageRoot(packageRoot: string): Promise<void> {
	await readLocalPackageManifest(packageRoot);
}
