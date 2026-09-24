"use client";
import { useSyncExternalStore } from "react";
import { THEME } from "@/motion/config";

type Theme = "light" | "dark";

const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

function readTheme(): Theme {
	const chosen = document.documentElement.dataset.theme;
	if (chosen === "light" || chosen === "dark") return chosen;
	return systemDark() ? "dark" : "light";
}

function subscribe(onChange: () => void) {
	const mql = window.matchMedia("(prefers-color-scheme: dark)");
	mql.addEventListener("change", onChange);
	window.addEventListener(THEME.changeEvent, onChange);
	return () => {
		mql.removeEventListener("change", onChange);
		window.removeEventListener(THEME.changeEvent, onChange);
	};
}

export function ThemeToggle({ className }: { className?: string }) {
	const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);
	const next: Theme = theme === "dark" ? "light" : "dark";

	const toggle = () => {
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem(THEME.storageKey, next);
		} catch {
			// Preference just won't persist.
		}
		window.dispatchEvent(new Event(THEME.changeEvent));
	};

	return (
		<button type="button" onClick={toggle} className={className}>
			<span aria-hidden className="relative inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-current">
				<span className="absolute inset-y-0 right-0 w-1/2 rounded-r-full bg-current" />
			</span>
			<span className="t-label">{theme ? (theme === "dark" ? "Dark" : "Light") : "Theme"}</span>
			<span className="sr-only"> theme, switch to {next}</span>
		</button>
	);
}
