import type { LazyTheme } from "../model/types.js";

/**
 * Renders the Lazy Pi input line.
 *
 * @param theme Active Pi theme.
 * @param value Current captured value.
 * @param mode Active capture mode.
 * @returns Rendered input line.
 */
export function renderLazyQueryLine(theme: LazyTheme, value: string, mode: "search" | "add-local" | null): string {
	if (mode === "add-local") {
		const text = value || "+ add local package path";
		return `${theme.fg(value ? "accent" : "dim", "+")} ${value ? text : theme.fg("dim", text)}`;
	}
	const text = value || "search";
	return `${theme.fg(mode === "search" ? "accent" : "dim", "/")} ${value ? text : theme.fg("dim", text)}`;
}
