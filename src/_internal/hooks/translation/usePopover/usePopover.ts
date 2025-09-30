import { useEffect, useLayoutEffect, useState, useRef } from "react";

// 2. El hook es genérico para recibir los tipos T y U
export const usePopover = <T extends HTMLElement, U extends HTMLElement>() => {
	const [isOpen, setIsOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{
		top: number;
		left: number;
		position: "below" | "above";
	}>({
		top: 0,
		left: 0,
		position: "below",
	});
	// El hook crea las referencias (inicia en null, tipadas genéricamente)
	const triggerRef = useRef<T>(null);
	const contentRef = useRef<U>(null);

	// --- LÓGICA DE POSICIONAMIENTO ---
	useLayoutEffect(() => {
		if (isOpen && triggerRef.current && contentRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			const offsetY = 3;
			const offsetX = 0;
			// Se usa offsetHeight para obtener la altura renderizada del popover
			const pickerHeight = contentRef.current.offsetHeight;
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;

			let top = rect.bottom + offsetY; // Posición inicial por defecto: justo debajo del trigger
			let position: "below" | "above" = "below";

			// Lógica para invertir la posición si no hay espacio abajo
			// La condición se simplifica: ¿Hay espacio abajo? Si no, ¿hay espacio arriba?
			if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
				// Posición arriba: top del trigger - altura del popover - offset
				top = rect.top - pickerHeight - offsetY;
				position = "above";
			}

			setMenuPosition({
				left: rect.left + offsetX,
				top: top,
				position: position,
			});
		}
	}, [isOpen]);

	// --- LÓGICA DE CIERRE POR EVENTOS ---
	useEffect(() => {
		function handleClickOutside(event: MouseEvent | TouchEvent) {
			const triggerEl = triggerRef.current;
			const contentEl = contentRef.current;
			const target = event.target as Node;

			// 💡 Lógica corregida: Cierra si el clic NO fue en el trigger Y NO fue en el contenido del popover.
			if (
				isOpen &&
				triggerEl &&
				contentEl &&
				!triggerEl.contains(target) &&
				!contentEl.contains(target)
			) {
				setIsOpen(false);
			}
		}

		// Se usa window para manejar scroll y resize de manera global
		function handleGlobalEvent() {
			if (isOpen) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			// Eventos de clic/tap para cerrar fuera
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("touchstart", handleClickOutside);

			// Eventos globales para cerrar en movimiento o pérdida de foco (usando el modo captura 'true')
			window.addEventListener("scroll", handleGlobalEvent, true);
			window.addEventListener("resize", handleGlobalEvent);
			window.addEventListener("blur", handleGlobalEvent);
		}

		// Función de limpieza
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
			window.removeEventListener("scroll", handleGlobalEvent, true);
			window.removeEventListener("resize", handleGlobalEvent);
			window.removeEventListener("blur", handleGlobalEvent);
		};
	}, [isOpen]);

	return {
		isOpen,
		setIsOpen,
		menuPosition,
		triggerRef,
		contentRef,
	};
};
