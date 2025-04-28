/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, RefObject } from 'react';

/**
 * Hook to determine if a dropdown should open "up" or "down"
 * based on available space in the viewport below the trigger element.
 * @param triggerRef Ref object for the element that triggers the dropdown (e.g., the button).
 * @param dropdownRef Ref object for the dropdown list element (e.g., the ul).
 * @param isOpen Boolean indicating if the dropdown is currently open.
 */
export function useDropdownPlacement(
    triggerRef: RefObject<HTMLButtonElement | null>,
    dropdownRef: RefObject<HTMLElement>,
    isOpen: boolean
) {
    const [direction, setDirection] = useState<"up" | "down">("down");

    const checkDirection = () => {

        if (triggerRef.current && dropdownRef.current) {
            const { bottom } = triggerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const { height: listHeight } = dropdownRef.current.getBoundingClientRect();

            if (viewportHeight - bottom < listHeight) {
                const { top } = triggerRef.current.getBoundingClientRect();
                if (top > listHeight) {
                    setDirection("up");
                } else {
                    setDirection("down");
                }
            } else {
                setDirection("down");
            }
        }
    };

    useEffect(() => {
        const handleScrollOrResize = () => {
            checkDirection();
        };

        const handleTransitionEnd = (event: TransitionEvent) => {
            if (event.propertyName === 'transform') {
                checkDirection();
            }
        };

        if (isOpen) {
            if (dropdownRef.current) {
                dropdownRef.current.addEventListener('transitionend', handleTransitionEnd);
            }
            window.addEventListener("scroll", handleScrollOrResize);
            window.addEventListener("resize", handleScrollOrResize);

        }
        return () => {
            if (dropdownRef.current) {
                dropdownRef.current.removeEventListener('transitionend', handleTransitionEnd);
            }
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
        };

    }, [isOpen, triggerRef, dropdownRef]);

    return { direction, checkDirection };
}