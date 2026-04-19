import type { LazyPackageMedia } from "../model/types.js";

/**
 * Fetches manifest media metadata for one Pi package.
 *
 * @param packageName npm package name.
 * @returns Package media URLs from the npm manifest.
 */
export async function fetchLazyPackageMedia(packageName: string): Promise<LazyPackageMedia> {
	const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`);
	if (!response.ok) throw new Error(`Failed to load package manifest for ${packageName}`);
	const manifest = await response.json() as { pi?: { image?: string; video?: string } };
	return {
		imageUrl: manifest.pi?.image,
		videoUrl: manifest.pi?.video,
	};
}
