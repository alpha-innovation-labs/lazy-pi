import { readLocalPackageLinkEntries } from "../local/readLocalPackageLinkEntries.js";
import { validateLocalPackageRoot } from "../local/validateLocalPackageRoot.js";

/**
 * Reads invalid globally linked local packages and their validation messages.
 *
 * @param _cwd Current project directory.
 * @returns Invalid source rows.
 */
export async function readInvalidLocalPackageIssues(_cwd: string): Promise<Array<{ source: string; message: string }>> {
	const links = await readLocalPackageLinkEntries();
	const issues = await Promise.all(links.map(async ({ linkPath, targetPath }) => {
		try {
			await validateLocalPackageRoot(targetPath);
			return null;
		} catch (error) {
			return { source: linkPath, message: error instanceof Error ? error.message : String(error) };
		}
	}));
	return issues.filter((item): item is { source: string; message: string } => !!item);
}
