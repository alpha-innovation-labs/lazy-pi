import type { ExtensionCommandContext } from "@mariozechner/pi-coding-agent";
import type { LazyPackageSummary } from "../model/types.js";
import { removeLocalPackageLink as removeLink } from "../local/removeLocalPackageLink.js";

/**
 * Removes one global dev symlink for a local package.
 *
 * @param ctx Pi command context.
 * @param item Selected local package row.
 */
export async function removeLocalPackageLink(ctx: ExtensionCommandContext, item: LazyPackageSummary): Promise<void> {
	if (!item.linkPath) throw new Error(`Missing global link path for ${item.name}`);
	await removeLink(item.linkPath);
	ctx.ui.notify(`Removed local package link ${item.name}`, "info");
}
