import { useEffect, useState } from "react";

/**
 * Custom hook that returns the ID of the currently active section.
 *
 * @param selectors - The CSS selector for the sections to observe. (default: "h2"), (optional: "h2, h3, h4, h5, h6")
 * @param rootMargin - The margin around the root element. (default: "-20% 0px -70% 0px") this is the margin around the root element in the viewport - top, right, bottom, left
 * @returns The ID of the currently active section.
 */
export function useActiveSectionObserver({
	selectors = "h2",
	rootMargin = "-20% 0px -70% 0px",
}: {
	selectors?: string;
	rootMargin?: string;
}) {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const headings = Array.from(document.querySelectorAll(selectors));
		if (!headings.length) return;

		let current: string | null = null;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((entry) => entry.isIntersecting);
				if (visible.length === 0) return;

				// El heading más alto en pantalla
				const topMost = visible.reduce((prev, curr) =>
					prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
				);

				if (topMost.target.id !== current) {
					current = topMost.target.id;
					setActiveId(topMost.target.id);
				}
			},
			{
				rootMargin,
				threshold: [0, 0.25, 0.5, 1],
			}
		);

		headings.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [selectors]);

	return activeId;
}
