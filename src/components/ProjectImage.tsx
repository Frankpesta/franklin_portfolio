import Image from "next/image";
import { twMerge } from "tailwind-merge";
import type { ProjectImage as ProjectImageData } from "@/content/types";

type Props = {
	image: ProjectImageData;
	sizes: string;
	className?: string;
	priority?: boolean;
	/** Marks this image as a source for the project Flip transition. */
	flipKey?: string;
	/** Marks this image as the destination of the project Flip transition. */
	flipTarget?: string;
};

/** Screenshots are cropped from the top so the product's header always shows. */
export function ProjectImage({ image, sizes, className, priority, flipKey, flipTarget }: Props) {
	return (
		<Image
			src={image.src}
			alt={image.alt}
			sizes={sizes}
			priority={priority}
			placeholder={image.src.blurDataURL ? "blur" : "empty"}
			data-flip-source={flipKey}
			data-flip-target={flipTarget}
			className={twMerge("h-full w-full object-cover object-top", className)}
		/>
	);
}

/** Resolve a Flip source image in the DOM at click time. */
export function flipSourceFor(flipKey: string, slug: string) {
	return () => {
		const image = document.querySelector<HTMLImageElement>(`img[data-flip-source="${flipKey}"]`);
		return image && image.getBoundingClientRect().width > 0 ? { slug, image } : null;
	};
}
