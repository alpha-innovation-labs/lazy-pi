import type { LazyTheme } from "../model/types.js";

/**
 * Renders the Lazy Pi query input line.
 *
 * @param theme Active Pi theme.
 * @param query Current search query.
 * @param searching Whether search capture mode is active.
 * @returns Rendered query line.
 */
export function renderLazyQueryLine(theme: LazyTheme, query: string, searching: boolean): string {
	const value = query || "press / to search";
	const prefix = searching ? theme.fg("accent", "/") : theme.fg("dim", "/");
	return `${prefix} ${query ? value : theme.fg("dim", value)}`;
}
