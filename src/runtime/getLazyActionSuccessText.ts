/**
 * Returns a human-readable success verb phrase for one mutation.
 *
 * @param action Completed package mutation.
 * @returns Past-tense success label.
 */
export function getLazyActionSuccessText(action: "install" | "update" | "delete"): string {
	if (action === "install") return "Installed";
	if (action === "update") return "Updated";
	return "Removed";
}
