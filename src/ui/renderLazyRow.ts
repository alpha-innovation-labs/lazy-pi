import { truncateToWidth, visibleWidth } from "@mariozechner/pi-tui";
import type { LazyPackageSummary, LazyTheme } from "../model/types.js";
import { padLazyLine } from "./padLazyLine.js";

/**
 * Renders one package row in the Lazy Pi list pane.
 *
 * @param theme Active Pi theme.
 * @param item Package row.
 * @param width List pane width.
 * @param selected Whether the row is selected.
 * @returns Rendered row line.
 */
export function renderLazyRow(theme: LazyTheme, item: LazyPackageSummary, width: number, selected: boolean): string {
	const marker = selected ? theme.fg("accent", "› ") : "  ";
	const favoriteMark = item.favorited ? theme.fg("warning", "★ ") : "  ";
	const installedMark = item.kind === "group" ? theme.bold("▾ ") : item.kind === "lazy-package" && item.installed ? theme.fg("success", "• ") : "  ";
	const suffixText = item.kind === "group"
		? theme.fg("dim", item.category ?? "")
		: item.kind === "lazy-package" && item.downloads !== undefined
			? theme.fg("dim", `${item.downloads.toLocaleString()}`)
			: item.kind === "lazy-package" && item.installScope === "local"
				? theme.fg("warning", "L")
				: item.kind === "lazy-package" && item.installScope === "global"
					? theme.fg("success", "G")
					: "";
	const suffix = suffixText ? ` ${suffixText}` : "";
	const prefix = `${marker}${favoriteMark}${installedMark}`;
	const available = Math.max(1, width - visibleWidth(prefix) - visibleWidth(suffix));
	const labelText = truncateToWidth(item.name, available, "");
	const label = item.kind === "group" ? theme.bold(labelText) : labelText;
	const base = `${prefix}${label}`;
	const gap = " ".repeat(Math.max(0, width - visibleWidth(base) - visibleWidth(suffix)));
	const line = `${base}${gap}${suffix}`;
	return selected ? theme.bg("selectedBg", padLazyLine(line, width)) : padLazyLine(line, width);
}
