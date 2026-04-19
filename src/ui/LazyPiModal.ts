import { Container, Key, matchesKey, truncateToWidth, type Focusable, type TUI } from "@mariozechner/pi-tui";
import type { LazyAction, LazyModalResult, LazyPackageSummary, LazyTheme, LoadLazyPackages, RunLazyAction } from "../model/types.js";
import { buildLazyPreviewLines } from "./buildLazyPreviewLines.js";
import { clampLazyIndex } from "./clampLazyIndex.js";
import { padLazyLine } from "./padLazyLine.js";
import { getLazyActions } from "./getLazyActions.js";
import { renderLazyFrameLine } from "./renderLazyFrameLine.js";
import { renderLazyMenuLine } from "./renderLazyMenuLine.js";
import { renderLazyPaneBottomSeparator } from "./renderLazyPaneBottomSeparator.js";
import { renderLazyPaneRow } from "./renderLazyPaneRow.js";
import { renderLazyPaneTopSeparator } from "./renderLazyPaneTopSeparator.js";
import { renderLazyQueryLine } from "./renderLazyQueryLine.js";
import { renderLazyRow } from "./renderLazyRow.js";
import { renderLazyStatusLine } from "./renderLazyStatusLine.js";
import { syncLazyScrollOffset } from "./syncLazyScrollOffset.js";
type LazyMode = Focusable & { focused: boolean };
/** Lazy Pi modal for browsing and managing Pi packages. */
export class LazyPiModal extends Container implements LazyMode {
	focused = true;
	private action: LazyAction = "installed";
	private query = "";
	private searching = false;
	private searchActionSnapshot: LazyAction = "installed";
	private searchQuerySnapshot = "";
	private items: LazyPackageSummary[] = [];
	private totalCount: number | null = null;
	private selectedIndex = -1;
	private scrollOffset = 0;
	private loading = false;
	private running = false;
	private pendingLabel: string | null = null;
	private error: string | null = null;
	private requestId = 0;

	/** Creates the Lazy Pi modal. */
	constructor(
		private readonly tui: TUI,
		private readonly theme: LazyTheme,
		private readonly loadPackages: LoadLazyPackages,
		private readonly runAction: RunLazyAction,
		private readonly onToggleFavorite: (item: LazyPackageSummary) => Promise<boolean>,
		private readonly onOpenRepository: (item: LazyPackageSummary) => Promise<void>,
		private readonly onClose: (result: LazyModalResult) => void,
	) {
		super();
		void this.refresh();
	}
	/** Handles terminal input for the modal. */ handleInput(data: string): void {
		if (matchesKey(data, Key.ctrl("c"))) return this.onClose(null);
		if (this.searching) return this.handleSearchInput(data);
		if (data === "q") return this.onClose(null);
		if (data === "1") return this.setAction("installed");
		if (data === "2") return this.setAction("search");
		if (data === "3") return this.setAction("favorites");
		if (data === "4") return this.setAction("other");
		if (matchesKey(data, Key.tab)) return this.shiftAction(1);
		if (matchesKey(data, Key.shift("tab"))) return this.shiftAction(-1);
		if (data === "/") return this.beginSearch();
		if (data === "j" || matchesKey(data, Key.down)) return this.moveSelection(1);
		if (data === "k" || matchesKey(data, Key.up)) return this.moveSelection(-1);
		if (data === "f") return void this.toggleSelectedFavorite();
		if (data === "o") return void this.openSelectedRepository();
		if (data === "i" && (this.action === "search" || this.action === "favorites")) return void this.runSelectedMutation("install", "local");
		if (data === "I" && (this.action === "search" || this.action === "favorites")) return void this.runSelectedMutation("install", "global");
		if (data === "u" && this.action === "installed") return void this.runSelectedMutation("update");
		if (data === "d" && this.action === "installed") return void this.runSelectedMutation("delete");
	}
	/** Invalidates cached render state. */ invalidate(): void {}
	/** Renders the modal body. */ render(width: number): string[] {
		const dialogWidth = Math.max(96, Math.min(width, Math.floor(width * 0.9)));
		const innerWidth = dialogWidth - 2;
		const leftWidth = Math.max(30, Math.floor((innerWidth - 1) * 0.48));
		const rightWidth = Math.max(28, innerWidth - leftWidth - 1);
		const bodyHeight = Math.max(14, Math.floor((this.tui.terminal.rows ?? 40) * 0.72) - 6);
		this.scrollOffset = syncLazyScrollOffset(this.selectedIndex, this.scrollOffset, bodyHeight, this.items.length);
		const visible = this.items.slice(this.scrollOffset, this.scrollOffset + bodyHeight);
		const listLines = visible.map((item, index) => renderLazyRow(this.theme, item, leftWidth, this.scrollOffset + index === this.selectedIndex));
		while (listLines.length < bodyHeight) listLines.push(padLazyLine("", leftWidth));
		const preview = buildLazyPreviewLines(this.action, this.items[this.selectedIndex] ?? null, rightWidth, this.loading || !!this.pendingLabel, this.error);
		const previewLines = preview.slice(0, bodyHeight).map((line) => padLazyLine(truncateToWidth(line, rightWidth, ""), rightWidth));
		while (previewLines.length < bodyHeight) previewLines.push(padLazyLine("", rightWidth));
		const lines = [
			this.theme.fg("borderMuted", `┌${"─".repeat(innerWidth)}┐`),
			renderLazyFrameLine(this.theme, renderLazyMenuLine(this.theme, this.action), innerWidth),
			renderLazyFrameLine(this.theme, renderLazyStatusLine(this.theme, this.action, this.items.length, this.totalCount, this.loading, this.pendingLabel), innerWidth),
			renderLazyPaneTopSeparator(this.theme, leftWidth, rightWidth),
		];
		for (let index = 0; index < bodyHeight; index += 1) lines.push(renderLazyPaneRow(this.theme, listLines[index]!, previewLines[index]!));
		lines.push(renderLazyPaneBottomSeparator(this.theme, leftWidth, rightWidth));
		lines.push(renderLazyFrameLine(this.theme, renderLazyQueryLine(this.theme, this.query, this.searching), innerWidth));
		lines.push(renderLazyFrameLine(this.theme, this.theme.fg("dim", "1/2/3/4 tabs • Tab cycle • / search • i local • I global • u update • d delete • f favorite • o repo • q close"), innerWidth));
		lines.push(this.theme.fg("borderMuted", `└${"─".repeat(innerWidth)}┘`));
		return lines.map((line) => truncateToWidth(line, dialogWidth, ""));
	}

	/** Moves the list selection by one relative step. */ private moveSelection(delta: number): void {
		if (this.items.length === 0) return;
		this.selectedIndex = clampLazyIndex(this.selectedIndex + delta, this.items.length);
		this.tui.requestRender();
	}

	/** Switches to the next or previous tab. */ private shiftAction(delta: number): void {
		const actions = getLazyActions();
		const currentIndex = actions.indexOf(this.action);
		this.setAction(actions[(currentIndex + delta + actions.length) % actions.length]!);
	}

	/** Switches to one explicit tab. */
	private setAction(action: LazyAction): void {
		if (this.action === action) return;
		this.action = action;
		void this.refresh();
	}

	/** Enters search capture mode from the current tab. */ private beginSearch(): void {
		this.searching = true;
		this.searchActionSnapshot = this.action;
		this.searchQuerySnapshot = this.query;
		this.action = "search";
		this.items = [];
		this.totalCount = null;
		this.selectedIndex = -1;
		this.pendingLabel = null;
		this.error = null;
		this.tui.requestRender();
	}

	/** Handles input while editing the search query. */ private handleSearchInput(data: string): void {
		if (matchesKey(data, Key.escape)) return this.cancelSearch();
		if (matchesKey(data, Key.enter)) return this.finishSearch();
		if (matchesKey(data, Key.backspace)) return this.updateQuery(this.query.slice(0, -1));
		if (matchesKey(data, Key.ctrl("u"))) return this.updateQuery("");
		if (/^[ -~]$/.test(data)) return this.updateQuery(this.query + data);
	}

	/** Cancels search capture and restores the previous tab. */ private cancelSearch(): void {
		this.searching = false;
		this.pendingLabel = null;
		this.action = this.searchActionSnapshot;
		this.query = this.searchQuerySnapshot;
		void this.refresh();
	}

	/** Commits the search query and loads matching packages. */
	private finishSearch(): void { this.searching = false; void this.refresh(); }
	/** Updates the current query without running a search yet. */ private updateQuery(query: string): void { this.query = query; this.tui.requestRender(); }

	/** Reloads rows for the active tab. */ private async refresh(): Promise<void> {
		const requestId = ++this.requestId;
		this.loading = true;
		this.error = null;
		this.tui.requestRender();
		try {
			const result = await this.loadPackages(this.action, this.query);
			if (requestId !== this.requestId) return;
			this.items = result.items;
			this.totalCount = result.totalCount ?? result.items.length;
			this.selectedIndex = clampLazyIndex(this.selectedIndex < 0 ? 0 : this.selectedIndex, this.items.length);
			this.scrollOffset = syncLazyScrollOffset(this.selectedIndex, 0, Math.max(1, this.tui.terminal.rows ?? 20), this.items.length);
		} catch (error) {
			if (requestId !== this.requestId) return;
			this.items = [];
			this.totalCount = null;
			this.selectedIndex = -1;
			this.error = error instanceof Error ? error.message : String(error);
		} finally {
			if (requestId === this.requestId) { this.loading = false; this.tui.requestRender(); }
		}
	}

	/** Toggles the selected package as a favorite and refreshes the current tab. */ private async toggleSelectedFavorite(): Promise<void> {
		const item = this.items[this.selectedIndex];
		if (!item || item.kind === "other-extension" || item.kind === "pi-package" || this.running || this.pendingLabel) return;
		this.running = true;
		try { await this.onToggleFavorite(item); await this.refresh(); }
		finally { this.running = false; }
	}

	/** Opens the selected package repository in a browser. */ private async openSelectedRepository(): Promise<void> {
		const item = this.items[this.selectedIndex];
		if (item?.repository) await this.onOpenRepository(item);
	}

	/** Runs one install, update, or delete mutation on the selected row. */ private async runSelectedMutation(action: "install" | "update" | "delete", scope?: "global" | "local"): Promise<void> {
		const item = this.items[this.selectedIndex];
		if (!item || this.running || this.loading || this.pendingLabel) return;
		this.running = true;
		try {
			const task = await this.runAction(action, item, scope ?? item.installScope ?? "global");
			this.pendingLabel = task.label;
			this.tui.requestRender();
			void task.completion
				.then(() => this.onClose("reload"))
				.catch((error) => {
					this.error = error instanceof Error ? error.message : String(error);
					this.pendingLabel = null;
					this.tui.requestRender();
				});
		} finally { this.running = false; }
	}
}
