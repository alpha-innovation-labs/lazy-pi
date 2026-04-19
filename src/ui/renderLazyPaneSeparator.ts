import type { LazyTheme } from "../model/types.js";

/**
 * Renders a full-width separator across both Lazy Pi panes.
 *
 * @param theme Active Pi theme.
 * @param leftWidth Left pane width.
 * @param rightWidth Right pane width.
 * @returns Separator line.
 */
export function renderLazyPaneSeparator(theme: LazyTheme, leftWidth: number, rightWidth: number): string {
	return theme.fg("borderMuted", `├${"─".repeat(leftWidth)}┼${"─".repeat(rightWidth)}┤`);
}
