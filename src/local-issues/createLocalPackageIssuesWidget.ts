import type { ExtensionContext } from "@mariozechner/pi-coding-agent";
import { truncateToWidth } from "@mariozechner/pi-tui";

/**
 * Creates the LazyPi local package issues widget.
 *
 * @param ctx Pi extension context.
 * @param message Widget message.
 * @returns Renderable widget component.
 */
export function createLocalPackageIssuesWidget(
	ctx: ExtensionContext,
	message: string,
): { invalidate(): void; render(width: number): string[] } {
	return {
		invalidate(): void {},
		render(width: number): string[] {
			return [truncateToWidth(ctx.ui.theme.fg("warning", `LazyPi: ${message}`), width, ctx.ui.theme.fg("dim", "…"))];
		},
	};
}
