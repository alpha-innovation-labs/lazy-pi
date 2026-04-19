/**
 * Builds the npm search URL for Lazy Pi.
 *
 * @param query Free-text query.
 * @returns npm search URL.
 */
export function createLazySearchUrl(query: string): string {
	const text = query.trim() ? `keywords:pi-package ${query.trim()}` : "keywords:pi-package";
	return `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(text)}&size=40`;
}
