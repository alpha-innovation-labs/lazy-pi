import type { ExtensionContext } from "@mariozechner/pi-coding-agent";
import { createLocalPackageIssuesWidget } from "./createLocalPackageIssuesWidget.js";
import { clearLocalPackageIssuesWidget } from "./clearLocalPackageIssuesWidget.js";
import { LOCAL_PACKAGE_ISSUES_WIDGET_KEY } from "./localPackageIssuesWidgetKey.js";
import { readInvalidLocalPackageIssues } from "./readInvalidLocalPackageIssues.js";

/**
 * Renders or clears the LazyPi local package issues widget.
 *
 * @param ctx Pi extension context.
 */
export async function renderLocalPackageIssuesWidget(ctx: ExtensionContext): Promise<void> {
	const issues = await readInvalidLocalPackageIssues(ctx.cwd);
	if (issues.length === 0) {
		clearLocalPackageIssuesWidget(ctx);
		return;
	}
	const first = issues[0]!;
	const message = issues.length === 1 ? first.message : `${first.message} (+${issues.length - 1} more)`;
	ctx.ui.setWidget(LOCAL_PACKAGE_ISSUES_WIDGET_KEY, createLocalPackageIssuesWidget(ctx, message), { placement: "belowEditor" });
}
