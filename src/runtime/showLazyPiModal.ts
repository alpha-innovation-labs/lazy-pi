import type { ExtensionCommandContext } from "@mariozechner/pi-coding-agent";
import type { LazyModalResult } from "../model/types.js";
import { toggleLazyFavoritePackage } from "../storage/toggleLazyFavoritePackage.js";
import { openLazyPackageRepository } from "./openLazyPackageRepository.js";
import { LazyPiModal } from "../ui/LazyPiModal.js";
import { addLocalDirectorySource } from "./addLocalDirectorySource.js";
import { loadLazyModalPackages } from "./loadLazyModalPackages.js";
import { runLazyModalAction } from "./runLazyModalAction.js";

/**
 * Opens the Lazy Pi package manager modal.
 *
 * @param ctx Pi command context.
 */
export async function showLazyPiModal(ctx: ExtensionCommandContext): Promise<void> {
	if (!ctx.hasUI) return;
	const result = await ctx.ui.custom<LazyModalResult>(
		(tui, theme, _keybindings, done) => new LazyPiModal(
			tui,
			theme,
			async (action, query) => loadLazyModalPackages(action, query, ctx.cwd),
			async (action, item, scope) => runLazyModalAction(ctx, action, item, scope),
			async (source) => addLocalDirectorySource(ctx, source),
			async (item) => {
				const favorited = await toggleLazyFavoritePackage(item);
				ctx.ui.notify(favorited ? `Favorited ${item.name}` : `Unfavorited ${item.name}`, "info");
				return favorited;
			},
			async (item) => {
				try {
					await openLazyPackageRepository(item);
				} catch (error) {
					ctx.ui.notify(error instanceof Error ? error.message : String(error), "error");
				}
			},
			done,
		),
		{
			overlay: true,
			overlayOptions: {
				anchor: "center",
				width: "88%",
				minWidth: 96,
				maxHeight: "88%",
			},
		},
	);
	if (result === "reload") {
		await ctx.reload();
		return;
	}
}
