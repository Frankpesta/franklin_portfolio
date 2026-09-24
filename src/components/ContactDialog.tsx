"use client";
import emailjs from "@emailjs/browser";
import { type FormEvent, useCallback, useEffect, useId, useImperativeHandle, useRef, useState, type Ref } from "react";
import { site } from "@/content/site";
import { DUR, EASE, STAGGER } from "@/motion/config";
import { gsap } from "@/motion/gsap";
import { useScroll } from "@/motion/SmoothScroll";

const KINDS = ["Contract project", "Full-time role", "Something else"] as const;
type Kind = (typeof KINDS)[number];

type Fields = { name: string; email: string; kind: Kind; message: string; company: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Fields = { name: "", email: "", kind: "Contract project", message: "", company: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
	const errors: Errors = {};
	if (!f.name.trim()) errors.name = "Tell me who you are.";
	if (!EMAIL.test(f.email.trim())) errors.email = "I need a valid email to reply to.";
	if (f.message.trim().length < 10) errors.message = "A sentence or two about the project, please.";
	return errors;
}

export type ContactDialogHandle = { open: () => void };

/**
 * The contact form, in a native <dialog> (focus trap, Esc and inert page for
 * free) that slides in from the right. Messages go through EmailJS.
 */
export function ContactDialog({ ref }: { ref: Ref<ContactDialogHandle> }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const [fields, setFields] = useState<Fields>(EMPTY);
	const [errors, setErrors] = useState<Errors>({});
	const [status, setStatus] = useState<Status>("idle");
	const { lock, unlock } = useScroll();
	const id = useId();

	const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const open = useCallback(() => {
		const dialog = dialogRef.current;
		if (!dialog || dialog.open) return;
		dialog.showModal();
		lock();
		if (reduce()) return;
		gsap
			.timeline({ defaults: { ease: EASE.inOut } })
			.fromTo(panelRef.current, { xPercent: 100 }, { xPercent: 0, duration: DUR.md })
			.from(panelRef.current?.querySelectorAll(".dialog-item") ?? [], { y: 24, opacity: 0, stagger: STAGGER.items, duration: DUR.md, ease: EASE.out }, "-=0.35");
	}, [lock]);

	const close = useCallback(() => {
		const dialog = dialogRef.current;
		if (!dialog?.open) return;
		const done = () => {
			dialog.close();
			unlock();
			if (status === "sent") setStatus("idle");
		};
		if (reduce()) return done();
		gsap.to(panelRef.current, { xPercent: 100, duration: DUR.sm, ease: EASE.inOut, onComplete: done });
	}, [unlock, status]);

	useImperativeHandle(ref, () => ({ open }), [open]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		const onCancel = (e: Event) => {
			e.preventDefault();
			close();
		};
		dialog.addEventListener("cancel", onCancel);
		return () => dialog.removeEventListener("cancel", onCancel);
	}, [close]);

	const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
		setFields((f) => ({ ...f, [key]: value }));
		if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
	};

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (fields.company) return; // honeypot: bots fill every field
		const found = validate(fields);
		setErrors(found);
		const firstInvalid = (Object.keys(found) as (keyof Errors)[])[0];
		if (firstInvalid) {
			e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
			return;
		}
		setStatus("sending");
		try {
			await emailjs.send(
				site.emailjs.serviceId,
				site.emailjs.templateId,
				{
					from_name: fields.name.trim(),
					from_email: fields.email.trim(),
					inquiry_type: fields.kind,
					message: `[${fields.kind}]\n\n${fields.message.trim()}`,
				},
				{ publicKey: site.emailjs.publicKey },
			);
			setStatus("sent");
			setFields(EMPTY);
		} catch {
			setStatus("error");
		}
	};

	const field = (name: "name" | "email" | "message") => ({
		id: `${id}-${name}`,
		name,
		"aria-invalid": errors[name] ? true : undefined,
		"aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
	});

	const inputClass =
		"mt-2 w-full border-b border-line-strong bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted/70 focus:border-accent aria-[invalid=true]:border-accent";

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={`${id}-title`}
			className="m-0 ml-auto h-[100dvh] max-h-none w-full max-w-xl bg-transparent p-0 text-ink backdrop:bg-black/50"
			onClick={(e) => {
				if (e.target === dialogRef.current) close();
			}}
		>
			<div ref={panelRef} className="flex h-full flex-col overflow-y-auto bg-paper px-6 py-6 sm:px-10" data-lenis-prevent>
				<div className="dialog-item flex items-center justify-between">
					<p className="t-label text-muted">(07) — New project</p>
					<button type="button" onClick={close} className="t-label py-2">
						Close ✕
					</button>
				</div>

				<h2 id={`${id}-title`} className="dialog-item t-h2 mt-10">
					Tell me what you&apos;re building.
				</h2>
				{/* COPY: review */}
				<p className="dialog-item mt-4 max-w-[40ch] text-muted">
					A few lines is enough. I usually reply within a day ({site.timeZoneLabel}).
				</p>

				<form noValidate onSubmit={submit} className="mt-10 flex flex-1 flex-col gap-8">
					<fieldset className="dialog-item">
						<legend className="t-label text-muted">This is about</legend>
						<div className="mt-3 flex flex-wrap gap-2">
							{KINDS.map((k) => (
								<label key={k} className="cursor-pointer">
									<input
										type="radio"
										name="kind"
										value={k}
										checked={fields.kind === k}
										onChange={() => update("kind", k)}
										className="peer sr-only"
									/>
									<span className="t-label inline-flex h-10 items-center rounded-full border border-line-strong px-4 transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
										{k}
									</span>
								</label>
							))}
						</div>
					</fieldset>

					<div className="dialog-item grid gap-8 sm:grid-cols-2">
						<div>
							<label htmlFor={`${id}-name`} className="t-label text-muted">
								Name
							</label>
							<input
								{...field("name")}
								type="text"
								autoComplete="name"
								value={fields.name}
								onChange={(e) => update("name", e.target.value)}
								className={inputClass}
							/>
							{errors.name && (
								<p id={`${id}-name-error`} className="mt-2 text-sm text-accent-text">
									{errors.name}
								</p>
							)}
						</div>
						<div>
							<label htmlFor={`${id}-email`} className="t-label text-muted">
								Email
							</label>
							<input
								{...field("email")}
								type="email"
								autoComplete="email"
								inputMode="email"
								value={fields.email}
								onChange={(e) => update("email", e.target.value)}
								className={inputClass}
							/>
							{errors.email && (
								<p id={`${id}-email-error`} className="mt-2 text-sm text-accent-text">
									{errors.email}
								</p>
							)}
						</div>
					</div>

					<div className="dialog-item">
						<label htmlFor={`${id}-message`} className="t-label text-muted">
							Project, timeline, budget: whatever you have
						</label>
						<textarea
							{...field("message")}
							rows={5}
							value={fields.message}
							onChange={(e) => update("message", e.target.value)}
							className={`${inputClass} resize-none`}
						/>
						{errors.message && (
							<p id={`${id}-message-error`} className="mt-2 text-sm text-accent-text">
								{errors.message}
							</p>
						)}
					</div>

					<div aria-hidden className="absolute -left-[9999px]">
						<label>
							Company
							<input
								tabIndex={-1}
								autoComplete="off"
								name="company"
								value={fields.company}
								onChange={(e) => update("company", e.target.value)}
							/>
						</label>
					</div>

					<div className="dialog-item mt-auto">
						<button
							type="submit"
							disabled={status === "sending"}
							className="group relative isolate flex h-16 w-full items-center justify-between overflow-hidden rounded-full border border-ink px-7 text-left transition-colors disabled:opacity-60 data-[sent=true]:border-accent"
							data-sent={status === "sent"}
						>
							<span
								aria-hidden
								className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-data-[sent=true]:scale-x-100"
							/>
							<span className="t-label group-hover:text-on-accent group-data-[sent=true]:text-on-accent">
								{status === "sending" ? "Sending…" : status === "sent" ? "Sent. Talk soon." : "Send message"}
							</span>
							<span aria-hidden className="text-xl group-hover:text-on-accent group-data-[sent=true]:text-on-accent">
								{status === "sent" ? "✓" : "→"}
							</span>
						</button>
						<p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-muted">
							{status === "sent" && "Thanks! Your message is in my inbox."}
							{status === "error" && "That didn't send. Please try again, or reach me on WhatsApp."}
						</p>
					</div>
				</form>
			</div>
		</dialog>
	);
}
