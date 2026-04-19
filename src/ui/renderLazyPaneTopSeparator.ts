import type { LazyTheme } from "../model/types.js";

/**
 * Renders the top split-pane separator.
 *
 * @param theme Active Pi theme.
 * @param leftWidth Left pane width.
 * @param rightWidth Right pane width.
 * @returns Top pane separator line.
 */
export function renderLazyPaneTopSeparator(theme: LazyTheme, leftWidth: number, rightWidth: number): string {
	return theme.fg("borderMuted", `├${"─".repeat(leftWidth)}┬${"─".repeat(rightWidth)}┤`);
}
