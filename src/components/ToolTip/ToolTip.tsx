import React, {
	forwardRef,
	useCallback,
	useRef,
	useEffect,
	useState,
	useMemo,
	isValidElement,
	cloneElement,
	useId,
	HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { tooltipContainer, tooltipArrow } from "./tooltip.variants";

import styles from "./tooltip.module.css";
import { TooltipPosition, TooltipProps } from "./tooltip.types";

// Helper para mapear la posición principal del tooltip a la clase de posición de la flecha
const mapTooltipPositionToArrowPosition = (tooltipPos: TooltipPosition): TooltipPosition => {
	switch (tooltipPos) {
		case "top-left":
			return "bottom-left";
		case "top-center":
			return "bottom-center";
		case "top-right":
			return "bottom-right";
		case "bottom-left":
			return "top-left";
		case "bottom-center":
			return "top-center";
		case "bottom-right":
			return "top-right";
		case "left-center":
			return "right-center";
		case "right-center":
			return "left-center";
		// Si añades más posiciones en el futuro, mapearlas aquí
		default:
			return "bottom-center";
	}
};

// Helper para obtener el primer elemento hijo DOM válido
const getTargetElement = (wrapper: HTMLDivElement | null): HTMLElement | null => {
	if (!wrapper) return null;
	return wrapper.firstElementChild as HTMLElement | null;
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	(
		{
			content,
			children,
			position = "top-center",
			delayShow = 100,
			delayHide = 100,
			offset = 8,
			color = "secondary",
			radius,
			disabled = false,
			ariaLabel,
			id,
			className,
			...rest
		},
		_ref
	) => {
		// Estado para controlar la visibilidad del tooltip
		const [isVisible, setIsVisible] = useState(false);
		// Estado para almacenar la posición calculada del tooltip (top, left en píxeles)
		const [tooltipPositionStyle, setTooltipPositionStyle] = useState<
			{ top?: number; left?: number } | undefined
		>(undefined);
		// Estado para almacenar la posición efectiva (real) del tooltip
		const [effectivePosition, setEffectivePosition] = useState<TooltipPosition>(position);

		// Refs para el div que envuelve el target y el elemento del tooltip en el Portal
		const targetWrapperRef = useRef<HTMLDivElement>(null);
		const tooltipRef = useRef<HTMLDivElement>(null);
		// Timers para los retrasos de mostrar/ocultar
		const showTimerRef = useRef<number | null>(null);
		const hideTimerRef = useRef<number | null>(null);

		// Generar ID único para el tooltip si no se proporciona (para accesibilidad)
		const generatedId = useId();
		const tooltipId = id || `lambda-tooltip-${generatedId}`;

		// --- Handlers para mostrar/ocultar (con retrasos) ---

		const showTooltip = useCallback(() => {
			if (disabled) return;

			// Limpiar timer de ocultar si existe
			if (hideTimerRef.current !== null) {
				window.clearTimeout(hideTimerRef.current);
				hideTimerRef.current = null;
			}

			// Iniciar timer de mostrar
			if (delayShow > 0) {
				showTimerRef.current = window.setTimeout(() => {
					setIsVisible(true);
					showTimerRef.current = null;
				}, delayShow);
			} else {
				// Mostrar inmediatamente si no hay retraso
				setIsVisible(true);
			}
		}, [disabled, delayShow]);

		const hideTooltip = useCallback(() => {
			// Limpiar timer de mostrar si existe
			if (showTimerRef.current !== null) {
				window.clearTimeout(showTimerRef.current);
				showTimerRef.current = null;
			}

			// Iniciar timer de ocultar
			if (delayHide > 0) {
				hideTimerRef.current = window.setTimeout(() => {
					setIsVisible(false);
					hideTimerRef.current = null;
					// Resetear la posición después de ocultar (opcional pero puede evitar flashes)
					// setTooltipPositionStyle(undefined);
				}, delayHide);
			} else {
				// Ocultar inmediatamente si no hay retraso
				setIsVisible(false);
				// Resetear la posición
				// setTooltipPositionStyle(undefined); // Considerar resetear solo al final de la transición CSS si la usas
			}
		}, [delayHide]);

		// --- Handlers de Eventos (Hover y Focus) ---

		const handleMouseEnter = useCallback(() => {
			showTooltip();
		}, [showTooltip]);

		const handleMouseLeave = useCallback(() => {
			hideTooltip();
		}, [hideTooltip]);

		const handleFocus = useCallback(() => {
			// Solo mostrar tooltip con focus si no está deshabilitado
			if (!disabled) {
				showTooltip();
			}
		}, [disabled, showTooltip]);

		const handleBlur = useCallback(() => {
			// Ocultar tooltip al perder foco
			hideTooltip();
		}, [hideTooltip]);

		// --- Manejo de Teclado (Escape para cerrar si está visible y enfocado) ---

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "Escape") {
					if (isVisible) {
						event.preventDefault();
						hideTooltip();
						// Opcional: devolver el foco al elemento que activó el tooltip
						getTargetElement(targetWrapperRef.current)?.focus();
					}
				}
			},
			[isVisible, hideTooltip]
		);

		// --- Cálculo de la Posición del Tooltip (cuando se vuelve visible) ---

		useEffect(() => {
			// Recalcular la posición solo si el tooltip es visible y tenemos las referencias
			if (isVisible && targetWrapperRef.current && tooltipRef.current) {
				const targetElement = getTargetElement(targetWrapperRef.current);
				if (!targetElement) return;

				const targetRect = targetElement.getBoundingClientRect();
				const tooltipRect = tooltipRef.current.getBoundingClientRect();

				let top = 0;
				let left = 0;
				let nextPosition: TooltipPosition = position;

				// Función para verificar si hay espacio suficiente en la dirección deseada
				const fits = (pos: TooltipPosition) => {
					switch (pos) {
						case "top-left":
						case "top-center":
						case "top-right":
							return targetRect.top - tooltipRect.height - offset >= 0;
						case "bottom-left":
						case "bottom-center":
						case "bottom-right":
							return targetRect.bottom + tooltipRect.height + offset <= window.innerHeight;
						case "left-center":
							return targetRect.left - tooltipRect.width - offset >= 0;
						case "right-center":
							return targetRect.right + tooltipRect.width + offset <= window.innerWidth;
						default:
							return true;
					}
				};

				// Mapeo de opuestos
				const opposite: Record<TooltipPosition, TooltipPosition> = {
					"top-left": "bottom-left",
					"top-center": "bottom-center",
					"top-right": "bottom-right",
					"bottom-left": "top-left",
					"bottom-center": "top-center",
					"bottom-right": "top-right",
					"left-center": "right-center",
					"right-center": "left-center",
				};

				// Si no cabe en la posición deseada, usar la opuesta si cabe
				if (!fits(position) && fits(opposite[position])) {
					nextPosition = opposite[position];
				}

				switch (nextPosition) {
					case "top-left":
						top = targetRect.top - tooltipRect.height - offset;
						left = targetRect.left;
						break;
					case "top-center":
						top = targetRect.top - tooltipRect.height - offset;
						left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
						break;
					case "top-right":
						top = targetRect.top - tooltipRect.height - offset;
						left = targetRect.right - tooltipRect.width;
						break;
					case "bottom-left":
						top = targetRect.bottom + offset;
						left = targetRect.left;
						break;
					case "bottom-center":
						top = targetRect.bottom + offset;
						left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
						break;
					case "bottom-right":
						top = targetRect.bottom + offset;
						left = targetRect.right - tooltipRect.width;
						break;
					case "left-center":
						top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
						left = targetRect.left - tooltipRect.width - offset;
						break;
					case "right-center":
						if (targetRect.right + tooltipRect.width + offset > window.innerWidth) {
							left = targetRect.left - tooltipRect.width - offset;
							nextPosition = "left-center";
						} else {
							left = targetRect.right + offset;
						}
						top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
						break;
				}

				// Nota: Aquí podrías añadir lógica para ajustar la posición si el tooltip se sale de la pantalla.
				// Es una adición compleja y no está incluida en esta versión inicial.

				// Establecer la posición calculada en el estado
				setTooltipPositionStyle({
					top: top,
					left: left,
				});
				setEffectivePosition(nextPosition);
			} else {
				// Resetear la posición cuando el tooltip no es visible
				// Esto evita que el tooltip parpadee en la última posición visible antes de ocultarse completamente.
				setTooltipPositionStyle(undefined);
			}

			// Listener para re-calcular posición en scroll o resize si el tooltip está visible
			const handleReposition = () => {
				if (isVisible && targetWrapperRef.current && tooltipRef.current) {
					// Volver a ejecutar el cálculo de posición
					const targetElement = getTargetElement(targetWrapperRef.current);
					if (!targetElement) return;

					const targetRect = targetElement.getBoundingClientRect();
					const tooltipRect = tooltipRef.current.getBoundingClientRect();

					let top = 0;
					let left = 0;
					let nextPosition: TooltipPosition = position;

					// Recalcular lógica de posición (duplicado, idealmente extraer a una función)
					switch (position) {
						case "top-left":
							top = targetRect.top - tooltipRect.height - offset;
							left = targetRect.left;
							break;
						case "top-center":
							top = targetRect.top - tooltipRect.height - offset;
							left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
							break;
						case "top-right":
							top = targetRect.top - tooltipRect.height - offset;
							left = targetRect.right - tooltipRect.width;
							break;
						case "bottom-left":
							top = targetRect.bottom + offset;
							left = targetRect.left;
							break;
						case "bottom-center":
							top = targetRect.bottom + offset;
							left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
							break;
						case "bottom-right":
							top = targetRect.bottom + offset;
							left = targetRect.right - tooltipRect.width;
							break;
						case "left-center":
							top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
							left = targetRect.left - tooltipRect.width - offset;
							break;
						case "right-center":
							if (targetRect.right + tooltipRect.width + offset > window.innerWidth) {
								left = targetRect.left - tooltipRect.width - offset;
								position = "left-center";
							} else {
								left = targetRect.right + offset;
							}
							top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
							break;
					}

					setTooltipPositionStyle({
						top: top,
						left: left,
					});
					setEffectivePosition(nextPosition);
				}
			};

			// Añadir listeners solo si el tooltip es visible
			if (isVisible) {
				window.addEventListener("scroll", handleReposition);
				window.addEventListener("resize", handleReposition);
			}

			// Función de limpieza para remover listeners y timers
			return () => {
				if (showTimerRef.current !== null) {
					window.clearTimeout(showTimerRef.current);
					showTimerRef.current = null;
				}
				if (hideTimerRef.current !== null) {
					window.clearTimeout(hideTimerRef.current);
					hideTimerRef.current = null;
				}
				window.removeEventListener("scroll", handleReposition);
				window.removeEventListener("resize", handleReposition);
				// No resetear isVisible o tooltipPositionStyle aquí, solo se hace cuando hideTooltip completa
			};
		}, [isVisible, position, offset]); // Dependencias: recalcular si visibilidad, posición o offset cambian

		// --- Renderizar el Target (children) envuelto en un div ---

		const targetElementWithProps = useMemo(() => {
			if (!isValidElement(children)) {
				return children;
			}

			// *** CORRECCIÓN: Definir las props a añadir con tipado específico ***

			const propsToAdd: HTMLAttributes<HTMLElement> = {
				"aria-describedby": tooltipId,
				onMouseEnter: handleMouseEnter,
				onMouseLeave: handleMouseLeave,
				onFocus: handleFocus,
				onBlur: handleBlur,
				onKeyDown: handleKeyDown,
			};

			// Obtener props existentes del children, tipado como HTMLAttributes<HTMLElement>
			const existingProps = children.props as HTMLAttributes<HTMLElement>;

			// *** CORRECCIÓN: Fusionar handlers existentes del children con los nuestros de forma segura ***
			// Comenzamos con una copia de las props existentes
			const mergedProps: HTMLAttributes<HTMLElement> = { ...existingProps };

			// Iterar sobre las propiedades que queremos añadir/fusionar
			for (const propNameString in propsToAdd) {
				// Usar Object.prototype.hasOwnProperty.call para evitar errores de ESLint
				if (Object.prototype.hasOwnProperty.call(propsToAdd, propNameString)) {
					// Castear a keyof AddedProps para acceder con seguridad a propsToAdd
					const propName = propNameString as keyof HTMLAttributes<HTMLElement>;

					const newHandler = propsToAdd[propName]; // Nuestro handler
					// Acceder a la prop existente usando el nombre de prop seguro
					const existingHandler = existingProps[propName as keyof HTMLAttributes<HTMLElement>];

					// Verificar si ambos son funciones antes de intentar fusionar
					if (typeof newHandler === "function" && typeof existingHandler === "function") {
						// Crear una nueva función que llame a nuestro handler primero, luego al existente
						// Usamos un casting a any para la firma de la función fusionada por flexibilidad,
						// localizando el uso de 'any' a esta función interna.
						mergedProps[propName] = ((...args: HTMLAttributes<HTMLElement>[]) => {
							newHandler(...args); // Llamar a nuestro handler
							existingHandler(...args); // Llamar al handler existente
						}) as HTMLAttributes<HTMLElement>; // Casting de vuelta al tipo esperado por React
					} else if (newHandler !== undefined) {
						// Si nuestro handler no es función o si no existe un handler existente,
						// nuestra prop sobrescribe la existente.
						mergedProps[propName] = newHandler;
					}
					// Si newHandler es undefined y existingHandler también es undefined, no hacemos nada.
					// Si newHandler es undefined y existingHandler es función, el handler existente permanece
					// en mergedProps porque empezamos con {...existingProps}.
				}
			}

			// Clonar el elemento children y aplicar las props fusionadas
			return cloneElement(children, mergedProps);
		}, [
			children,
			tooltipId,
			handleMouseEnter,
			handleMouseLeave,
			handleFocus,
			handleBlur,
			handleKeyDown,
		]);

		// Dependencias: Re-clonar si children cambia (esto puede ser caro!), o si handlers/tooltipId cambian.
		// Idealmente, children debería ser estable o usar useCallback/useMemo en el padre.

		if (!isValidElement(children)) {
			console.error("Tooltip component requires a single valid React element as children.");
			// Retornar children sin tooltip si la validación falla
			return <>{children}</>;
		}

		// --- Renderizar el Tooltip Content (en un Portal) ---

		// Solo renderizar el Portal si el tooltip está (o estará pronto) visible
		// Esto evita renderizar el contenido del tooltip innecesariamente
		const renderPortal =
			isVisible || showTimerRef.current !== null || hideTimerRef.current !== null;

		const tooltipPortal = renderPortal
			? createPortal(
				<div
					ref={tooltipRef}
					id={tooltipId}
					role="tooltip"
					// Aplicar estilos de posición calculados
					style={{
						...tooltipPositionStyle,
					}}
					// Aplicar variantes CVA para el contenedor ( variant, position para estilos específicos)
					className={clsx(
						tooltipContainer({ color, position: effectivePosition, radius }),
						{ [styles.visible]: isVisible },
						tooltipArrow({
							arrowPosition: mapTooltipPositionToArrowPosition(effectivePosition),
							color,
						})
					)}
					// Si el contenido es solo un ícono, usar ariaLabel en el contenedor
					aria-label={ariaLabel} // Si se proporciona una etiqueta ARIA adicional
				>
					{content}
					{/* La flecha se renderiza como pseudo-elemento ::before en .lambda-tooltip-container */}
				</div>,
				document.body
			)
			: null;

		// --- Renderizar el Wrapper del Target y el Portal ---
		return (
			// Este div envuelve el elemento children y recibe el ref del forwardRef si se usa
			<div
				ref={targetWrapperRef} // Ref para obtener el bounding box del target
				className={clsx(styles["lambda-tooltip-target-wrapper"], className)}
				{...rest}
			>
				{targetElementWithProps}
				{tooltipPortal}
			</div>
		);
	}
);
