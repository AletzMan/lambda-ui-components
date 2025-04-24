import { useEffect, RefObject } from 'react';

/**
 * Hook to detect clicks outside of a specified element.
 * @param ref The ref object for the element to watch.
 * @param callback The function to call when a click outside occurs.
 */
export function useClickOutside(ref: RefObject<HTMLDivElement | null>, callback: (event: MouseEvent) => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}