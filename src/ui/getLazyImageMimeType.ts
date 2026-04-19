/**
 * Guesses an image MIME type from a URL when headers are missing.
 *
 * @param url Remote image URL.
 * @returns Best-effort image MIME type.
 */
export function getLazyImageMimeType(url: string): string {
	const normalized = url.toLowerCase();
	if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
	if (normalized.endsWith(".gif")) return "image/gif";
	if (normalized.endsWith(".webp")) return "image/webp";
	return "image/png";
}
