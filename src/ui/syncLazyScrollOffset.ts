import { clampLazyIndex } from "./clampLazyIndex.js";

/**
 * Keeps the selected row visible inside the list viewport.
 *
 * @param selectedIndex Selected row index.
 * @param scrollOffset Current scroll offset.
 * @param height Visible list height.
 * @param length Total row count.
 * @returns Updated scroll offset.
 */
export function syncLazyScrollOffset(selectedIndex: number, scrollOffset: number, height: number, length: number): number {
	if (length <= 0) return 0;
	const nextIndex = clampLazyIndex(selectedIndex, length);
	if (nextIndex < scrollOffset) return nextIndex;
	if (nextIndex >= scrollOffset + height) return Math.max(0, nextIndex - height + 1);
	return scrollOffset;
}
