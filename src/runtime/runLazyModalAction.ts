import type { ExtensionCommandContext } from "@mariozechner/pi-coding-agent";
import type { LazyInstallScope, LazyMutationTask, LazyPackageSummary } from "../model/types.js";
import { refreshLazyLoader } from "../loader/refreshLazyLoader.js";
import { startNpmInLazyWorkspace } from "../npm/startNpmInLazyWorkspace.js";
import { getLazyActionLabelText } from "./getLazyActionLabelText.js";
import { getLazyActionSuccessText } from "./getLazyActionSuccessText.js";
import { getLazyMutationArgs } from "./getLazyMutationArgs.js";
import { removeLocalPackageLink } from "./removeLocalPackageLink.js";
import { removeOtherExtension } from "./removeOtherExtension.js";
import { removePiPackage } from "./removePiPackage.js";

/**
 * Starts one Lazy Pi package mutation in a background child process.
 *
 * @param ctx Pi command context.
 * @param action Requested package mutation.
 * @param item Selected package row.
 * @param scope Installation scope.
 * @returns Started background task.
 */
export async function runLazyModalAction(
	ctx: ExtensionCommandContext,
	action: "install" | "update" | "delete",
	item: LazyPackageSummary,
	scope: LazyInstallScope,
): Promise<LazyMutationTask> {
	if (item.kind === "other-extension" && action === "delete") {
		if (!item.location) throw new Error(`Missing extension path for ${item.name}`);
		return {
			label: `${getLazyActionLabelText(action)} ${scope} extension ${item.name}…`,
			completion: removeOtherExtension(item.location).then(() => {
				ctx.ui.notify(`${getLazyActionSuccessText(action)} ${scope} extension ${item.name}`, "info");
			}),
		};
	}
	if (item.category === "Local package" && action === "delete") {
		return {
			label: `${getLazyActionLabelText(action)} local package link ${item.name}…`,
			completion: removeLocalPackageLink(ctx, item),
		};
	}
	if (item.kind === "pi-package" && action === "delete") {
		return {
			label: `${getLazyActionLabelText(action)} ${scope} package ${item.name}…`,
			completion: removePiPackage(ctx, item.name, scope).then(() => {
				ctx.ui.notify(`${getLazyActionSuccessText(action)} ${scope} package ${item.name}`, "info");
			}),
		};
	}
	const child = await startNpmInLazyWorkspace(getLazyMutationArgs(action, item.name), scope, ctx.cwd);
	const label = `${getLazyActionLabelText(action)} ${scope} ${item.name}…`;
	const completion = new Promise<void>((resolve, reject) => {
		child.once("error", reject);
		child.once("exit", async (code) => {
			if (code !== 0) return reject(new Error(`npm ${action} failed with exit code ${code ?? -1}`));
			try {
				await refreshLazyLoader(scope, ctx.cwd);
				ctx.ui.notify(`${getLazyActionSuccessText(action)} ${scope} ${item.name}`, "info");
				resolve();
			} catch (error) {
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	});
	return { label, completion };
}
