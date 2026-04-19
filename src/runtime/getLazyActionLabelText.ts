/**
 * Returns a human-readable verb phrase for one background mutation.
 *
 * @param action Requested package mutation.
 * @returns Present-tense status label.
 */
export function getLazyActionLabelText(action: "install" | "update" | "delete"): string {
	if (action === "install") return "Installing";
	if (action === "update") return "Updating";
	return "Removing";
}
