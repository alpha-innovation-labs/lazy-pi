import type { LazyPackageSummary } from "../model/types.js";

/**
 * Fetches one package manifest and converts it into a Lazy Pi summary row.
 *
 * @param packageName npm package name.
 * @param installed Whether the package is installed.
 * @param favorited Whether the package is favorited.
 * @returns Package summary row.
 */
export async function fetchLazyPackageSummary(
	packageName: string,
	installed: boolean,
	favorited: boolean,
): Promise<LazyPackageSummary> {
	const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`);
	if (!response.ok) throw new Error(`Failed to load package manifest for ${packageName}`);
	const pkg = await response.json() as {
		name: string;
		description?: string;
		version?: string;
		repository?: string | { url?: string };
		homepage?: string;
	};
	return {
		name: pkg.name,
		description: pkg.description ?? "",
		version: pkg.version ?? "0.0.0",
		repository: typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url,
		homepage: pkg.homepage,
		installed,
		favorited,
	};
}
