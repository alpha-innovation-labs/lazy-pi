import type { LazyAction, LazyPackageSummary } from "../model/types.js";
import { wrapLazyText } from "./wrapLazyText.js";

/**
 * Builds right-pane preview lines for the selected package.
 *
 * @param action Active action tab.
 * @param item Selected package row.
 * @param width Preview width.
 * @param loading Whether the modal is loading rows.
 * @param error Current load error text.
 * @returns Preview lines.
 */
export function buildLazyPreviewLines(
	action: LazyAction,
	item: LazyPackageSummary | null,
	width: number,
	loading: boolean,
	error: string | null,
): string[] {
	if (loading) return ["Loading packages…"];
	if (error) return wrapLazyText(error, width);
	if (!item) {
		if (action === "search") return ["Press Enter to run the search."];
		if (action === "other") return ["No other items found."];
		if (action === "local") return ["Press a to add a local Pi package path."];
		return ["No package selected."];
	}
	const lines = [item.name.trim(), ""];
	if (item.kind === "group") {
		if (item.category) lines.push(`Count: ${item.category}`);
		lines.push("", ...wrapLazyText(item.description || "No description", width));
		return lines;
	}
	if (item.category) lines.push(`Type: ${item.category}`);
	if (item.installScope) lines.push(`Scope: ${item.installScope}`);
	if (item.installedLocal || item.installedGlobal) {
		const installedScopes = [item.installedLocal ? "local" : null, item.installedGlobal ? "global" : null].filter((value): value is string => !!value);
		lines.push(`Installed: ${installedScopes.join(", ")}`);
	}
	if (item.downloads !== undefined) lines.push(`Downloads: ${item.downloads.toLocaleString()}/mo`);
	if (item.version) lines.push(`Version: ${item.version}`);
	if (item.repository) lines.push(`Repo: ${item.repository.replace(/^git\+/, "")}`);
	if (item.location) lines.push(`Path: ${item.location}`);
	if (item.linkPath) lines.push(`Link: ${item.linkPath}`);
	lines.push("", ...wrapLazyText(item.description || "No description", width));
	if (action === "installed") lines.push("", "Installed Lazy packages across local and global workspaces.");
	if (action === "favorites") lines.push("", "Favorite Lazy packages overview.");
	if (action === "other") lines.push("", "Other shows non-Lazy extensions and global Pi packages.");
	if (action === "local") lines.push("", "Local shows globally linked local Pi packages for dev testing.");
	return lines;
}
