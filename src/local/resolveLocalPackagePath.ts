import { homedir } from "node:os";
import { resolve } from "node:path";

/**
 * Resolves one local package source string into an absolute path.
 *
 * @param cwd Current project directory.
 * @param source Local package source string.
 * @returns Absolute filesystem path.
 */
export function resolveLocalPackagePath(cwd: string, source: string): string {
	if (source.startsWith("file:")) return new URL(source).pathname;
	if (source.startsWith("~/")) return resolve(homedir(), source.slice(2));
	return resolve(cwd, source);
}
