"use client";
import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const format = new Intl.DateTimeFormat("en-GB", {
	hour: "2-digit",
	minute: "2-digit",
	timeZone: site.timeZone,
});

function subscribe(onChange: () => void) {
	const id = window.setInterval(onChange, 15_000);
	return () => window.clearInterval(id);
}

/** Franklin's local time, so visitors know when a reply is likely. */
export function LocalTime({ className }: { className?: string }) {
	const time = useSyncExternalStore(subscribe, () => format.format(new Date()), () => "--:--");
	return (
		<span className={className}>
			<span className="sr-only">Franklin&apos;s local time: </span>
			<time suppressHydrationWarning>{time}</time> {site.timeZoneLabel}
		</span>
	);
}
