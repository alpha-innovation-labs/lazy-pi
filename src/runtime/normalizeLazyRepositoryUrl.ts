/**
 * Normalizes a package repository URL into a browser-openable URL.
 *
 * @param repository Raw package repository URL.
 * @returns Browser-safe repository URL.
 */
export function normalizeLazyRepositoryUrl(repository: string): string {
	const normalized = repository.replace(/^git\+/, "").replace(/\.git$/, "");
	if (normalized.startsWith("git@github.com:")) return `https://github.com/${normalized.slice("git@github.com:".length)}`;
	return normalized;
}
