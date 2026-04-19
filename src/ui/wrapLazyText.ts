import { truncateToWidth, visibleWidth } from "@mariozechner/pi-tui";

/**
 * Wraps one plain-text paragraph to a fixed width.
 *
 * @param text Source text.
 * @param width Maximum line width.
 * @returns Wrapped lines.
 */
export function wrapLazyText(text: string, width: number): string[] {
	if (width <= 0) return [""];
	const words = text.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return [""];
	const lines: string[] = [];
	let line = "";
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (visibleWidth(next) <= width) line = next;
		else {
			if (line) lines.push(line);
			line = truncateToWidth(word, width, "");
		}
	}
	if (line) lines.push(line);
	return lines;
}
