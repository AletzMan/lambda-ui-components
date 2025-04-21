/* eslint-disable react-hooks/exhaustive-deps */
// src/components/Select/hooks/useDropdownPlacement.ts

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

            // Si el espacio debajo es menor que la altura de la lista
            if (viewportHeight - bottom < listHeight) {
                // Y hay suficiente espacio arriba (esto es una mejora opcional)
                const { top } = triggerRef.current.getBoundingClientRect();
                if (top > listHeight) { // Si hay espacio arriba, abre hacia arriba
                    setDirection("up");
                } else { // Si no hay espacio arriba tampoco, quizás abre hacia abajo por defecto o decide otra lógica
                    setDirection("down"); // Podrías querer otra lógica aquí, ej. la que tenga más espacio
                }
            } else {
                // Hay suficiente espacio abajo, abre hacia abajo
                setDirection("down");
            }
        }
    };

    // Re-verificar la dirección cuando el desplegable se abre, o la ventana/scroll cambia
    useEffect(() => {
        if (isOpen) {
            // Usar setTimeout es a veces necesario si el DOM del dropdown no está
            // completamente renderizado/posicionado al momento de que isOpen es true.
            const handler = setTimeout(checkDirection, 0); // Un delay de 0 o pequeño

            const handleScrollOrResize = () => checkDirection();

            window.addEventListener("scroll", handleScrollOrResize);
            window.addEventListener("resize", handleScrollOrResize);

            return () => {
                clearTimeout(handler);
                window.removeEventListener("scroll", handleScrollOrResize);
                window.removeEventListener("resize", handleScrollOrResize);
            };
        }
        // No necesitamos cleanup de los listeners si isOpen es false, ya que el efecto no se ejecuta
        // y los listeners solo se añaden cuando isOpen es true.

    }, [isOpen, triggerRef, dropdownRef]); // Dependencias: isOpen y las refs (si cambiaran, lo cual es raro)

    return direction;
}