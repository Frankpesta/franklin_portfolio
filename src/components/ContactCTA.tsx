"use client";
import { useRef } from "react";
import { ContactDialog, type ContactDialogHandle } from "./ContactDialog";
import { Magnetic } from "./motion/Magnetic";

/** The big magnetic "Start a project" button and the form it opens. */
export function ContactCTA() {
	const dialogRef = useRef<ContactDialogHandle>(null);
	return (
		<>
			<Magnetic strength={0.45}>
				<button
					type="button"
					onClick={() => dialogRef.current?.open()}
					className="group relative flex aspect-square w-[min(15rem,60vw)] items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
				>
					<span className="t-label text-sm">
						Start a project
						<span aria-hidden className="mt-2 block text-center text-2xl transition-transform duration-500 group-hover:rotate-[-45deg]">
							→
						</span>
					</span>
				</button>
			</Magnetic>
			<ContactDialog ref={dialogRef} />
		</>
	);
}
