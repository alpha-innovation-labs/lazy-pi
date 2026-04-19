import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { LazyPackageSummary } from "../model/types.js";
import { normalizeLazyRepositoryUrl } from "./normalizeLazyRepositoryUrl.js";

const execFileAsync = promisify(execFile);

/**
 * Opens the selected package repository in the system browser.
 *
 * @param item Selected package row.
 */
export async function openLazyPackageRepository(item: LazyPackageSummary): Promise<void> {
	if (!item.repository) throw new Error(`No repository URL for ${item.name}`);
	const url = normalizeLazyRepositoryUrl(item.repository);
	if (process.platform === "darwin") {
		await execFileAsync("open", [url]);
		return;
	}
	if (process.platform === "win32") {
		await execFileAsync("cmd", ["/c", "start", "", url]);
		return;
	}
	await execFileAsync("xdg-open", [url]);
}
