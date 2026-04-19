/**
 * Clamps one selection index into the current item range.
 *
 * @param index Requested selection index.
 * @param length Current item count.
 * @returns Clamped index.
 */
export function clampLazyIndex(index: number, length: number): number {
	if (length <= 0) return -1;
	return Math.max(0, Math.min(index, length - 1));
}
