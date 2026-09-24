type NavigatorWithHints = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

/**
 * Whether this device should get optional WebGL effects: not in data-saver
 * mode, and not a low-core / low-memory device. Browser-only.
 */
export function isCapableDevice() {
	const nav = navigator as NavigatorWithHints;
	if (nav.connection?.saveData) return false;
	if ((nav.hardwareConcurrency ?? 8) <= 4) return false;
	if ((nav.deviceMemory ?? 8) <= 4) return false;
	return true;
}
