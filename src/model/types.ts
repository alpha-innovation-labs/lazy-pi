import type { ExtensionCommandContext } from "@mariozechner/pi-coding-agent";

/**
 * Lazy Pi installation scopes.
 */
export type LazyInstallScope = "global" | "local";

/**
 * Lazy Pi item kinds.
 */
export type LazyPackageKind = "lazy-package" | "other-extension" | "pi-package" | "group";

/**
 * Lazy Pi top-level modal actions.
 */
export type LazyAction = "installed" | "search" | "favorites" | "other";

/**
 * One package row shown in the Lazy Pi modal.
 */
export type LazyPackageSummary = {
	name: string;
	description: string;
	version: string;
	latestVersion?: string;
	downloads?: number;
	repository?: string;
	homepage?: string;
	installed: boolean;
	favorited: boolean;
	kind?: LazyPackageKind;
	installScope?: LazyInstallScope;
	installedGlobal?: boolean;
	installedLocal?: boolean;
	location?: string;
	category?: string;
};

/**
 * One cached favorite package entry stored on disk.
 */
export type LazyFavoriteCacheEntry = {
	name: string;
	description?: string;
	version?: string;
	latestVersion?: string;
	downloads?: number;
	repository?: string;
	homepage?: string;
	cachedAt?: string;
};

/**
 * Disk format for the Lazy Pi favorites cache.
 */
export type LazyFavoriteCacheFile = {
	version: 1;
	items: LazyFavoriteCacheEntry[];
};

/**
 * Theme type used by Lazy Pi UI.
 */
export type LazyTheme = ExtensionCommandContext["ui"]["theme"];

/**
 * One Lazy Pi package load result.
 */
export type LazyPackageLoadResult = {
	items: LazyPackageSummary[];
	totalCount?: number;
};

/**
 * Loads package rows for one Lazy Pi action and query.
 */
export type LoadLazyPackages = (action: LazyAction, query: string) => Promise<LazyPackageLoadResult>;

/**
 * One background mutation started by Lazy Pi.
 */
export type LazyMutationTask = {
	label: string;
	completion: Promise<void>;
};

/**
 * Result returned when the Lazy Pi modal closes.
 */
export type LazyModalResult = "reload" | null;

/**
 * Executes one Lazy Pi action for the selected package.
 */
export type RunLazyAction = (action: "install" | "update" | "delete", item: LazyPackageSummary, scope: LazyInstallScope) => Promise<LazyMutationTask>;
