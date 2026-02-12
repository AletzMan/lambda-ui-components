
import { useEffect, RefObject } from "react";

/**
 * Hook to detect clicks and events outside of specified elements.
 * @param refs An array of ref objects for the elements to watch.
 * @param callback The function to call when an event outside occurs.
 */
export function useClickOutside(
	refs: RefObject<HTMLElement | null>[],
	callback: (event: MouseEvent | TouchEvent | Event) => void
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			const isInside = refs.some(
				(ref) => ref.current && ref.current.contains(event.target as Node)
			);
			if (!isInside) {
				callback(event);
			}
		};

		const handleBlurEvent = () => {
			callback(new Event("blur"));
		};

		const handleResizeEvent = () => {
			callback(new Event("resize"));
		};

		// Escuchamos eventos en todo el documento
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		document.addEventListener("wheel", handleClickOutside);
		window.addEventListener("blur", handleBlurEvent);
		window.addEventListener("resize", handleResizeEvent);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
			document.removeEventListener("wheel", handleClickOutside);
			window.removeEventListener("blur", handleBlurEvent);
			window.removeEventListener("resize", handleResizeEvent);
		};
	}, [refs, callback]);
}
