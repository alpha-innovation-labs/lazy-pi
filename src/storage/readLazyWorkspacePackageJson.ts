import { readFile } from "node:fs/promises";
import { getLazyPackageJsonPath } from "../paths/getLazyPackageJsonPath.js";

/**
 * Reads the Lazy Pi workspace package.json.
 *
 * @returns Parsed Lazy Pi workspace package.json.
 */
export async function readLazyWorkspacePackageJson(): Promise<{ dependencies?: Record<string, string> }> {
	const text = await readFile(getLazyPackageJsonPath(), "utf8");
	return JSON.parse(text) as { dependencies?: Record<string, string> };
}
