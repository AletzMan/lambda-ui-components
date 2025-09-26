import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from "react";
import { AccordionContentFinalInjectedProps, AccordionContentProps } from "./accordion.types";
import { accordionContentVariants } from "./accordion.variants";
import clsx from "clsx";
import styles from "./accordion.module.css";

// --- Componente Nieto: AccordionContent ---
export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
	({ children, className, style, ...restProps }, ref) => {
		// Ref para el div interno que contiene el contenido real (para medir su altura)
		const innerContentRef = useRef<HTMLDivElement>(null);

		// Estado para controlar la propiedad 'height' del div principal del panel de contenido.
		const [contentHeight, setContentHeight] = useState<string>("0px");

		// Estado para saber si la animación está actualmente en curso.
		const [isAnimating, setIsAnimating] = useState(false);

		// *** Obtener las props inyectadas por el AccordionItem padre ***
		// Estas props son esenciales para que este componente sepa su estado y sus IDs ARIA.
		const injectedPropsFinal = restProps as AccordionContentFinalInjectedProps;
		const isItemOpen = injectedPropsFinal.isopen; // *** CLAVE: Si este item está abierto (inyectado) ***
		const headerIdFinal = injectedPropsFinal.headerid; // ID del header asociado (inyectado)
		const contentIdFinal = injectedPropsFinal.contentid; // ID de este panel (inyectado)
		const associatedItemValue = injectedPropsFinal.itemvalue; // Valor del item padre (inyectado, útil para logs)
		const variant = injectedPropsFinal.variant;
		const size = injectedPropsFinal.size;

		// --- useLayoutEffect para medir altura y controlar la animación ---
		useLayoutEffect(() => {
			const innerElement = innerContentRef.current;
			// Si la ref interna no está disponible, no podemos medir, salimos.
			if (!innerElement) {
				return;
			}

			// --- Lógica de Apertura/Cierre basada en la prop INYECTADA isItemOpen ---
			if (isItemOpen) {
				// --- Lógica de Apertura ---
				setIsAnimating(true);
				// 1. Poner la altura del contenedor interno a 'auto' para medir la altura natural.
				innerElement.style.height = "auto";

				// 2. Medir la altura natural del contenido interno.
				const naturalHeight = innerElement.scrollHeight;

				// 3. Usar requestAnimationFrame para establecer la altura a la medida en el siguiente tick.
				requestAnimationFrame(() => {
					// 4. Establecer el estado 'contentHeight'. Esto disparará la transición CSS.
					setContentHeight(`${naturalHeight}px`);
				});
			} else {
				// --- Lógica de Cierre ---
				setIsAnimating(true);

				// 1. Obtener la altura actual del contenido ANTES de comenzar la transición a 0.
				const currentHeight = innerElement.scrollHeight;

				// 2. Establecer explícitamente el estado 'contentHeight' a la altura actual medida en píxeles.
				setContentHeight(`${currentHeight}px`);

				// 3. Usar requestAnimationFrame para establecer la altura a 0px en el siguiente tick.
				requestAnimationFrame(() => {
					// 4. Establecer el estado 'contentHeight' a '0px'. Esto disparará la transición CSS.
					setContentHeight("0px");
				});
			}
		}, [isItemOpen, associatedItemValue]);

		// --- Handler para el evento transitionend ---
		// Se llama cuando la animación CSS de 'height' (o otras propiedades transicionadas) termina.
		const handleTransitionEnd = useCallback(() => {
			// Si el item está ABIERTO después de que termina la transición:
			// Establecer la altura a 'auto' para permitir que el contenido ajuste su tamaño dinámicamente.
			if (isItemOpen) {
				setContentHeight("auto");
			}
			setIsAnimating(false);
		}, [isItemOpen]);

		// --- Clases CSS ---
		const contentClasses = clsx(
			accordionContentVariants({ state: isItemOpen ? "open" : "closed", size, variant }),
			className
		);

		return (
			// El div principal para el panel de contenido
			// Este es el elemento cuya propiedad 'height' se controlará y animará.
			<div
				ref={ref}
				className={contentClasses}
				style={{
					...style,
					height: contentHeight,
				}}
				// *** Escuchar el evento 'transitionend' para saber cuándo termina la animación ***
				onTransitionEnd={handleTransitionEnd}
				id={contentIdFinal}
				aria-labelledby={headerIdFinal}
				aria-hidden={!isItemOpen && !isAnimating}
				//{...(restProps as HTMLAttributes<HTMLDivElement>)}
			>
				{/* Contenedor interno para el contenido real y el padding */}
				<div ref={innerContentRef} className={styles["lambda-accordion-content-inner"]}>
					{children} {/* El contenido real del panel */}
				</div>
			</div>
		);
	}
);
