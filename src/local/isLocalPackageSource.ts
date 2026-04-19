import { isAbsolute } from "node:path";

/**
 * Checks whether one package source string looks like a local filesystem path.
 *
 * @param source Package source string.
 * @returns True when the source is a local path.
 */
export function isLocalPackageSource(source: string): boolean {
	return source.startsWith("file:") || source.startsWith("./") || source.startsWith("../") || source.startsWith("~/") || isAbsolute(source);
}
