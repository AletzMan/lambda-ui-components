import { useEffect, useLayoutEffect, useState, useRef } from "react";

// 2. El hook es genérico para recibir los tipos T y U
export const usePopover = <T extends HTMLElement, U extends HTMLElement>(
	config?: { x?: number; y?: number; disableListeners?: boolean },
	itemCallbacks?: Array<(() => void) | undefined>
) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
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
	const recalculatePosition = () => {
		if (isOpen && triggerRef.current && contentRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			const pickerHeight = contentRef.current.clientHeight;
			const pickerWidth = contentRef.current.clientWidth; // Obtener ancho del popover
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;

			// --- Vertical Positioning ---
			let top = rect.bottom + (config?.y || 0);
			let position: "below" | "above" = "below";
			if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
				top = rect.top - pickerHeight - (config?.y || 0);
				position = "above";
			}

			// --- Horizontal Positioning ---
			let left = rect.left + (config?.x || 0);
			const spaceRight = window.innerWidth - left;

			// Si no cabe a la derecha (overflow), intentamos alinear a la derecha del trigger
			if (spaceRight < pickerWidth) {
				// Calcular posición alineada a la derecha: (borde derecho del trigger) - (ancho del popover)
				const leftAlignedToRight = rect.right - pickerWidth + (config?.x || 0);

				// Solo cambiamos si la nueva posición no se sale por la izquierda
				if (leftAlignedToRight >= 0) {
					left = leftAlignedToRight;
				}
			}

			setMenuPosition({
				left: left,
				top: top,
				position: position,
				width: rect.width,
			});
		}
	};

	useLayoutEffect(() => {
		recalculatePosition();
		if (isOpen && contentRef.current) {
			setTimeout(() => {
				contentRef.current?.focus({ preventScroll: true });
			}, 100);
		}
	}, [isOpen]);

	// --- NUEVO: Observa cambios de tamaño del popover ---
	useEffect(() => {
		if (!isOpen || !contentRef.current) return;
		const observer = new ResizeObserver(() => {
			recalculatePosition();
		});
		observer.observe(contentRef.current);
		return () => observer.disconnect();
	}, [isOpen, contentRef.current]);

	const getFocusableItems = () => {
		if (!contentRef.current) return [];
		const all = Array.from(
			contentRef.current.querySelectorAll<HTMLElement>("[data-navigable=true]")
		);
		return all;
	};

	const onSelectOption = () => {
		if (highlightedIndex >= 0 && itemCallbacks && itemCallbacks[highlightedIndex]) {
			itemCallbacks[highlightedIndex]!();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLDivElement | HTMLUListElement | HTMLButtonElement>
	) => {
		const items = getFocusableItems();
		if (!items) return;

		if (!isOpen) {
			if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
				setIsOpen(true);
				setHighlightedIndex(0);
				e.preventDefault();
			}
			return;
		}

		if (e.key === "ArrowDown") {
			setHighlightedIndex((prev) => Math.min(prev + 1, items.length - 1));
			e.preventDefault();
		} else if (e.key === "ArrowUp") {
			setHighlightedIndex((prev) => Math.max(prev - 1, 0));
			e.preventDefault();
		} else if (e.key === "Escape") {
			setIsOpen(false);
			e.preventDefault();
		} else if (e.key === "Enter") {
			if (highlightedIndex >= 0) {
				setIsOpen(false);
				setSelectedOptionIndex(highlightedIndex);
				onSelectOption();
			}
			e.preventDefault();
			setHighlightedIndex(-1);
		}
	};

	// --- LÓGICA DE CIERRE POR EVENTOS ---
	useEffect(() => {
		function handleClickOutside(event: MouseEvent | TouchEvent) {
			if (triggerRef.current && triggerRef.current.contains(event.target as Node)) return;
			if (contentRef.current && contentRef.current.contains(event.target as Node)) return;
			setIsOpen(false);
		}

		// Se usa window para manejar scroll y resize de manera global
		function handleBlurEvent() {
			if (isOpen) {
				setIsOpen(false);
			}
		}

		function handleResizeEvent() {
			if (isOpen) {
				recalculatePosition();
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

		if (isOpen && !config?.disableListeners) {
			// Eventos de clic/tap para cerrar fuera
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("touchstart", handleClickOutside);

			// Eventos globales para cerrar en movimiento o pérdida de foco (usando el modo captura 'true')
			window.addEventListener("scroll", handleScrollEvent, true);
			window.addEventListener("resize", handleResizeEvent);
			window.addEventListener("blur", handleBlurEvent);
		}

		// Función de limpieza
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
			window.removeEventListener("scroll", handleScrollEvent, true);
			window.removeEventListener("resize", handleResizeEvent);
			window.removeEventListener("blur", handleBlurEvent);
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
		highlightedIndex,
		onSelectOption,
	};
};
