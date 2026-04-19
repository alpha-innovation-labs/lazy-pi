import type { LazyTheme } from "../model/types.js";

/**
 * Renders the bottom split-pane separator.
 *
 * @param theme Active Pi theme.
 * @param leftWidth Left pane width.
 * @param rightWidth Right pane width.
 * @returns Bottom pane separator line.
 */
export function renderLazyPaneBottomSeparator(theme: LazyTheme, leftWidth: number, rightWidth: number): string {
	return theme.fg("borderMuted", `├${"─".repeat(leftWidth)}┴${"─".repeat(rightWidth)}┤`);
}
