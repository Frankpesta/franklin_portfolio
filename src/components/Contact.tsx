"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const defaultFormState = {
	name: { value: "", error: "" },
	email: { value: "", error: "" },
	message: { value: "", error: "" },
};

export const Contact = () => {
	const [formData, setFormData] = useState(defaultFormState);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsSubmitting(true);
		setStatusMessage("");

		const templateParams = {
			from_name: formData.name.value,
			from_email: formData.email.value,
			message: formData.message.value,
		};

		try {
			const response = await emailjs.send(
				"service_z5k4y5e",
				"template_l9mkmug",
				templateParams,
				"lyA_0fVUxcVWgBhVg"
			);

			console.log("SUCCESS!", response.status, response.text);
			setStatusMessage("Message sent successfully!");
			setFormData(defaultFormState); // reset form
		} catch (err) {
			console.error("FAILED...", err);
			setStatusMessage("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="flex flex-col md:flex-row justify-between gap-5">
				<input
					type="text"
					placeholder="Your Name"
					className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
					value={formData.name.value}
					onChange={(e) =>
						setFormData({
							...formData,
							name: { value: e.target.value, error: "" },
						})
					}
				/>
				<input
					type="email"
					placeholder="Your email address"
					className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
					value={formData.email.value}
					onChange={(e) =>
						setFormData({
							...formData,
							email: { value: e.target.value, error: "" },
						})
					}
				/>
			</div>
			<div>
				<textarea
					placeholder="Your Message"
					rows={10}
					className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full"
					value={formData.message.value}
					onChange={(e) =>
						setFormData({
							...formData,
							message: { value: e.target.value, error: "" },
						})
					}
				/>
			</div>
			<button
				className="w-full px-2 py-2 mt-4 bg-neutral-100 rounded-md font-bold text-neutral-500"
				type="submit"
				disabled={isSubmitting}>
				{isSubmitting ? "Sending..." : "Submit"}
			</button>
			{statusMessage && (
				<p className="text-center text-sm mt-2 text-neutral-600">
					{statusMessage}
				</p>
			)}
		</form>
	);
};
