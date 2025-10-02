import { useEffect, useLayoutEffect, useState, useRef } from "react";

// 2. El hook es genérico para recibir los tipos T y U
export const usePopover = <T extends HTMLElement, U extends HTMLElement>(offset?: {
	x?: number;
	y?: number;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
	const [menuPosition, setMenuPosition] = useState<{
		top: number;
		left: number;
		position: "below" | "above";
		width: number;
	}>({
		top: 0,
		left: 0,
		position: "below",
		width: 0,
	});
	// El hook crea las referencias (inicia en null, tipadas genéricamente)
	const triggerRef = useRef<T>(null);
	const contentRef = useRef<U>(null);

	// --- LÓGICA DE POSICIONAMIENTO ---
	useLayoutEffect(() => {
		if (isOpen && triggerRef.current && contentRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			// Se usa offsetHeight para obtener la altura renderizada del popover
			const pickerHeight = contentRef.current.offsetHeight;
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;

			let top = rect.bottom + (offset?.y || 0); // Posición inicial por defecto: justo debajo del trigger
			let position: "below" | "above" = "below";

			// Lógica para invertir la posición si no hay espacio abajo
			// La condición se simplifica: ¿Hay espacio abajo? Si no, ¿hay espacio arriba?
			if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
				// Posición arriba: top del trigger - altura del popover - offset
				top = rect.top - pickerHeight - (offset?.y || 0);
				position = "above";
			}

			setMenuPosition({
				left: rect.left + (offset?.x || 0),
				top: top,
				position: position,
				width: rect.width,
			});
			setTimeout(() => {
				if (isOpen && contentRef.current) {
					contentRef.current?.focus();
				}
			}, 100);
		}
	}, [isOpen]);

	const getFocusableItems = () => {
		if (!contentRef.current) return [];
		const all = Array.from(contentRef.current.querySelectorAll<HTMLElement>(":scope > *"));
		return all.filter((el) => el.tagName === "BUTTON" || el.tagName === "A" || el.tabIndex >= 0);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement | HTMLUListElement>) => {
		const items = getFocusableItems();
		if (!items) return;

		const activeIndex = Array.from(items).findIndex((el) => el === document.activeElement);

		if (e.key === "ArrowDown") {
			e.preventDefault();
			const next = items[(activeIndex + 1) % items.length];
			next?.focus();
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			const prev = items[(activeIndex - 1 + items.length) % items.length];
			prev?.focus();
		}

		if (e.key === "Escape") {
			e.preventDefault();
			setIsOpen(false);
		}

		if (e.key === "Enter") {
			e.preventDefault();
			setIsOpen(false);
			setSelectedOptionIndex(activeIndex);
		}
	};

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

		function handleScrollEvent(event: Event) {
			if (!isOpen) return;

			const contentEl = contentRef.current;
			if (!contentEl) return;

			const target = event.target as Node | null;

			// 👉 Si el scroll ocurrió dentro del popover, lo ignoramos
			if (target && contentEl.contains(target)) {
				return;
			}

			// 👉 Si no, cerramos
			setIsOpen(false);
		}

		if (isOpen) {
			// Eventos de clic/tap para cerrar fuera
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("touchstart", handleClickOutside);

			// Eventos globales para cerrar en movimiento o pérdida de foco (usando el modo captura 'true')
			window.addEventListener("scroll", handleScrollEvent, true);
			window.addEventListener("resize", handleGlobalEvent);
			window.addEventListener("blur", handleGlobalEvent);
		}

		// Función de limpieza
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
			window.removeEventListener("scroll", handleScrollEvent, true);
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
		handleKeyDown,
		selectedOptionIndex,
	};
};
