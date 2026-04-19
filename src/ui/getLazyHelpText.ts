import type { LazyAction } from "../model/types.js";

/**
 * Returns the footer help text for the current Lazy Pi tab.
 *
 * @param action Active tab.
 * @returns Human-readable shortcut summary.
 */
export function getLazyHelpText(action: LazyAction): string {
	const base = "j/k move • Ctrl+C close";
	if (action === "search") return `${base} • f favorite • o repo • i local • I global`;
	if (action === "favorites") return `${base} • f favorite • o repo • i local • I global`;
	if (action === "installed") return `${base} • f favorite • o repo • u update • d delete`;
	if (action === "other") return `${base} • o repo • d delete`;
	if (action === "local") return `${base} • a add package • d delete`;
	return base;
}
