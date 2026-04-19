import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { registerLazyPiExtension } from "./registerLazyPiExtension.js";

/**
 * Registers LazyPi.
 *
 * @param pi Pi extension API.
 */
export default function index(pi: ExtensionAPI): void {
	registerLazyPiExtension(pi);
}
