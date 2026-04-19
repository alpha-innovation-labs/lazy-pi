import { stat } from "node:fs/promises";
import type { ExtensionCommandContext } from "@mariozechner/pi-coding-agent";
import { createLocalPackageLink } from "../local/createLocalPackageLink.js";
import { readLocalPackageManifest } from "../local/readLocalPackageManifest.js";
import type { LazyMutationTask } from "../model/types.js";
import { resolveLocalPackagePath } from "../local/resolveLocalPackagePath.js";
import { validateLocalPackageRoot } from "../local/validateLocalPackageRoot.js";

/**
 * Adds one local Pi package as a global dev symlink.
 *
 * @param ctx Pi command context.
 * @param source User-provided package path.
 * @returns Started mutation task.
 */
export async function addLocalDirectorySource(ctx: ExtensionCommandContext, source: string): Promise<LazyMutationTask> {
	const resolved = resolveLocalPackagePath(ctx.cwd, source.trim());
	const directory = await stat(resolved).catch(() => null);
	if (!directory?.isDirectory()) throw new Error(`Directory not found: ${resolved}`);
	await validateLocalPackageRoot(resolved);
	const manifest = await readLocalPackageManifest(resolved);
	const completion = createLocalPackageLink(manifest.name, resolved).then(() => {
		ctx.ui.notify(`Linked local package ${manifest.name} from ${resolved}`, "info");
	});
	return {
		label: `Linking local package ${manifest.name}…`,
		completion,
	};
}
