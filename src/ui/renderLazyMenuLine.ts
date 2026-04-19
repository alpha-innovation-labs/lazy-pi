import type { LazyAction, LazyTheme } from "../model/types.js";
import { getLazyActions } from "./getLazyActions.js";

const ACTION_LABELS: Record<LazyAction, string> = {
	installed: "Installed (1)",
	search: "Search (2)",
	favorites: "Favorites (3)",
	other: "Other (4)",
	local: "Local (5)",
};

/**
 * Renders the Lazy Pi action menu.
 *
 * @param theme Active Pi theme.
 * @param activeAction Selected action.
 * @returns Menu line.
 */
export function renderLazyMenuLine(theme: LazyTheme, activeAction: LazyAction): string {
	return getLazyActions().map((action) => {
		const label = ` ${ACTION_LABELS[action]} `;
		return action === activeAction ? theme.bg("selectedBg", theme.bold(label)) : theme.fg("muted", `[${ACTION_LABELS[action]}]`);
	}).join(" ");
}
