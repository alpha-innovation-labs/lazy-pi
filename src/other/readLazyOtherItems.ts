import type { LazyPackageSummary } from "../model/types.js";
import { createLazyOtherChildSummary } from "./createLazyOtherChildSummary.js";
import { createLazyOtherGroupSummary } from "./createLazyOtherGroupSummary.js";
import { readGlobalPiPackageItems } from "./readGlobalPiPackageItems.js";
import { readOtherExtensionItems } from "./readOtherExtensionItems.js";

/**
 * Reads rows for the Other tab.
 *
 * @param cwd Current project directory.
 * @param query Optional local filter query.
 * @returns Combined Other tab rows.
 */
export async function readLazyOtherItems(cwd: string, query: string): Promise<LazyPackageSummary[]> {
	const normalized = query.trim().toLowerCase();
	const [extensionRows, packageRows] = await Promise.all([readOtherExtensionItems(cwd), readGlobalPiPackageItems(cwd)]);
	const localRows = extensionRows
		.filter((item) => item.installScope === "local")
		.filter((item) => !normalized || `${item.name} ${item.description} ${item.location ?? ""}`.toLowerCase().includes(normalized))
		.sort((left, right) => left.name.localeCompare(right.name));
	const globalRows = extensionRows
		.filter((item) => item.installScope === "global")
		.filter((item) => !normalized || `${item.name} ${item.description} ${item.location ?? ""}`.toLowerCase().includes(normalized))
		.sort((left, right) => left.name.localeCompare(right.name));
	const filteredPackages = packageRows
		.filter((item) => !normalized || `${item.name} ${item.description} ${item.location ?? ""}`.toLowerCase().includes(normalized))
		.sort((left, right) => left.name.localeCompare(right.name));
	return [
		createLazyOtherGroupSummary("Local", "Project-local extensions in .pi/extensions.", localRows.length),
		...localRows.map(createLazyOtherChildSummary),
		createLazyOtherGroupSummary("Global", "User-global extensions in ~/.pi/agent/extensions.", globalRows.length),
		...globalRows.map(createLazyOtherChildSummary),
		createLazyOtherGroupSummary("Packages", "Global Pi packages from user settings and pi list.", filteredPackages.length),
		...filteredPackages.map(createLazyOtherChildSummary),
	];
}
