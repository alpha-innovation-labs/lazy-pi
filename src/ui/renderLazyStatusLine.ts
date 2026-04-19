import type { LazyAction, LazyTheme } from "../model/types.js";
import { getLazyActionLabel } from "./getLazyActionLabel.js";

/**
 * Renders the Lazy Pi status summary line.
 *
 * @param theme Active Pi theme.
 * @param action Current action.
 * @param count Current visible row count.
 * @param totalCount Total available row count.
 * @param loading Whether rows are loading.
 * @param pendingLabel Active background mutation label.
 * @returns Rendered status line.
 */
export function renderLazyStatusLine(theme: LazyTheme, action: LazyAction, count: number, totalCount: number | null, loading: boolean, pendingLabel: string | null): string {
	const noun = action === "other" ? "items" : "packages";
	const label = totalCount !== null ? `${count} / ${totalCount}` : `${count} ${noun}`;
	const state = pendingLabel ? theme.fg("warning", pendingLabel) : loading ? theme.fg("warning", "loading") : theme.fg("success", label);
	return `${theme.fg("accent", getLazyActionLabel(action))} · ${state}`;
}
