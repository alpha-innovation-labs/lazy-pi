import type { LazyTheme } from "../model/types.js";

/**
 * Renders one split-pane content row for Lazy Pi.
 *
 * @param theme Active Pi theme.
 * @param left Left pane line.
 * @param right Right pane line.
 * @returns Split-pane row.
 */
export function renderLazyPaneRow(theme: LazyTheme, left: string, right: string): string {
	return `${theme.fg("borderMuted", "│")}${left}${theme.fg("borderMuted", "│")}${right}${theme.fg("borderMuted", "│")}`;
}
