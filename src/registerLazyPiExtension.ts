import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { clearLocalPackageIssuesWidget } from "./local-issues/clearLocalPackageIssuesWidget.js";
import { renderLocalPackageIssuesWidget } from "./local-issues/renderLocalPackageIssuesWidget.js";
import { showLazyPiModal } from "./runtime/showLazyPiModal.js";

/**
 * Registers the Lazy Pi command.
 *
 * @param pi Pi extension API.
 */
export function registerLazyPiExtension(pi: ExtensionAPI): void {
	pi.registerCommand("lazy", {
		description: "Open the Lazy Pi package manager",
		handler: async (_args, ctx) => {
			await showLazyPiModal(ctx);
		},
	});
	pi.on("session_start", async (_event, ctx) => {
		if (!ctx.hasUI) return;
		await renderLocalPackageIssuesWidget(ctx);
	});
	pi.on("session_tree", async (_event, ctx) => {
		if (!ctx.hasUI) return;
		await renderLocalPackageIssuesWidget(ctx);
	});
	pi.on("session_shutdown", async (_event, ctx) => {
		if (!ctx.hasUI) return;
		clearLocalPackageIssuesWidget(ctx);
	});
}
