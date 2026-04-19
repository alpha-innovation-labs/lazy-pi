import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
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
}
