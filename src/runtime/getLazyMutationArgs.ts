/**
 * Builds npm arguments for one Lazy Pi mutation.
 *
 * @param action Requested package mutation.
 * @param packageName npm package name.
 * @returns npm argv for the mutation.
 */
export function getLazyMutationArgs(action: "install" | "update" | "delete", packageName: string): string[] {
	if (action === "install") return ["install", "--omit=dev", packageName];
	if (action === "update") return ["install", "--omit=dev", `${packageName}@latest`];
	return ["uninstall", packageName];
}
