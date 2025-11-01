/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, RefObject, useCallback } from "react";

export function useDropdownPlacement(
	triggerRef: RefObject<HTMLButtonElement | null>,
	dropdownRef: RefObject<HTMLUListElement> | null,
	isOpen: boolean
) {
	const [direction, setDirection] = useState<"up" | "down">("down");

	const checkDirection = useCallback(() => {
		if (triggerRef.current && dropdownRef?.current) {
			const { bottom } = triggerRef.current.getBoundingClientRect();
			const { height: dropdownHeight } = dropdownRef.current.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const spaceBelow = viewportHeight - bottom;
			if (spaceBelow < dropdownHeight) {
				setDirection("up");
			} else {
				setDirection("down");
			}
		}
	}, [triggerRef, dropdownRef]);

	useEffect(() => {
		if (isOpen) {
			const timeoutId = setTimeout(checkDirection, 0);

			const handleScrollOrResize = () => {
				checkDirection();
			};

			window.addEventListener("scroll", handleScrollOrResize);
			window.addEventListener("resize", handleScrollOrResize);

			return () => {
				clearTimeout(timeoutId);
				window.removeEventListener("scroll", handleScrollOrResize);
				window.removeEventListener("resize", handleScrollOrResize);
			};
		}
	}, [isOpen, checkDirection]);

	return { direction };
}
