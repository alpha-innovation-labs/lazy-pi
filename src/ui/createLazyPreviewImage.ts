import { Image } from "@mariozechner/pi-tui";
import type { LazyTheme } from "../model/types.js";
import { getLazyImageMimeType } from "./getLazyImageMimeType.js";

/**
 * Downloads one manifest image and converts it into a terminal image component.
 *
 * @param theme Active Pi theme.
 * @param packageName npm package name.
 * @param imageUrl Remote image URL.
 * @returns Terminal image component.
 */
export async function createLazyPreviewImage(theme: LazyTheme, packageName: string, imageUrl: string): Promise<Image> {
	const response = await fetch(imageUrl);
	if (!response.ok) throw new Error(`Failed to load manifest image for ${packageName}`);
	const mimeType = response.headers.get("content-type")?.split(";")[0] || getLazyImageMimeType(imageUrl);
	const base64Data = Buffer.from(await response.arrayBuffer()).toString("base64");
	return new Image(base64Data, mimeType, {
		fallbackColor: (text) => theme.fg("dim", text),
	}, {
		filename: packageName,
		maxWidthCells: 36,
		maxHeightCells: 12,
	});
}
