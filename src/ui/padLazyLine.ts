import { visibleWidth } from "@mariozechner/pi-tui";

/**
 * Pads one rendered line to the target width.
 *
 * @param text Source line.
 * @param width Target width.
 * @returns Padded line.
 */
export function padLazyLine(text: string, width: number): string {
	return `${text}${" ".repeat(Math.max(0, width - visibleWidth(text)))}`;
}
