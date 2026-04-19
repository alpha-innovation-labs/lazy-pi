/**
 * Creates the generated Lazy Pi loader source file.
 *
 * @param entries Import paths for installed package extensions.
 * @returns TypeScript loader source.
 */
export function createLazyLoaderContent(entries: string[]): string {
	const loaders = entries.map((entry) => `		async () => import("./${entry.replace(/\\/g, "/")}")`).join(",\n");
	return `import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";\n\n/**\n * Loads packages installed by Lazy Pi.\n *\n * @param pi Pi extension API.\n */\nexport default async function index(pi: ExtensionAPI): Promise<void> {\n	const loaders = [\n${loaders}\n	];\n	for (const load of loaders) {\n		try {\n			const module = await load();\n			if (typeof module.default === "function") await module.default(pi);\n		} catch (error) {\n			console.error("Failed to load Lazy Pi package extension", error);\n		}\n	}\n}\n`;
}
