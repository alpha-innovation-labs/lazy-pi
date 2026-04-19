import { truncateToWidth } from "@mariozechner/pi-tui";
import type { LazyTheme } from "../model/types.js";
import { padLazyLine } from "./padLazyLine.js";

/**
 * Wraps one full-width line inside the Lazy Pi frame.
 *
 * @param theme Active Pi theme.
 * @param content Inner content.
 * @param innerWidth Available inner width.
 * @returns Framed line.
 */
export function renderLazyFrameLine(theme: LazyTheme, content: string, innerWidth: number): string {
	return `${theme.fg("borderMuted", "│")}${padLazyLine(truncateToWidth(content, innerWidth, ""), innerWidth)}${theme.fg("borderMuted", "│")}`;
}
