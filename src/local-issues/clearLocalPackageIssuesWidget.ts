import type { ExtensionContext } from "@mariozechner/pi-coding-agent";
import { LOCAL_PACKAGE_ISSUES_WIDGET_KEY } from "./localPackageIssuesWidgetKey.js";

/**
 * Clears the LazyPi local package issues widget.
 *
 * @param ctx Pi extension context.
 */
export function clearLocalPackageIssuesWidget(ctx: ExtensionContext): void {
	ctx.ui.setWidget(LOCAL_PACKAGE_ISSUES_WIDGET_KEY, undefined, { placement: "belowEditor" });
}
