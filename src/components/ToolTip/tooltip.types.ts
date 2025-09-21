// src/components/Tooltip/tooltip.types.ts

import React, { HTMLAttributes } from "react";
import { TooltipContainerVariants } from "./tooltip.variants"; // Importar tipos de variantes

// Tipo para la posición del Tooltip relativa al target
export type TooltipPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";
// No implementamos posiciones laterales (left/right) inicialmente para mantener la complejidad manejable.

// Props para el componente Tooltip
export interface TooltipProps
	extends Omit<
		// Omitir props de HTMLAttributes<HTMLDivElement> que vamos a redefinir
		HTMLAttributes<HTMLDivElement>,
		"disabled" | "content" | "color"
	> {
	/**
	 * El contenido a mostrar dentro del tooltip.
	 */
	content: React.ReactNode;

	/**
	 * El elemento sobre el cual se activará el tooltip.
	 * Debe ser un elemento React válido (ej: <button>, <span>, <div>).
	 */
	children: React.ReactElement; // Tooltip typically wraps a single element

	/**
	 * La posición del tooltip relativa al componente hijo.
	 * @default 'top-center'
	 */
	position?: TooltipPosition;

	/**
	 * Retraso en milisegundos antes de mostrar el tooltip al hacer hover o focus.
	 * @default 0
	 */
	delayShow?: number;

	/**
	 * Retraso en milisegundos antes de ocultar el tooltip al quitar hover o blur.
	 * @default 0
	 */
	delayHide?: number;

	/**
	 * Distancia en píxeles entre el tooltip y el componente hijo.
	 * @default 8
	 */
	offset?: number;

	/**
	 * Variante visual del tooltip.
	 * @default 'default'
	 */
	color?: TooltipContainerVariants["color"];

	/**
	 * Variante visual del tooltip.
	 * @default 'default'
	 */
	radius?: TooltipContainerVariants["radius"];

	/**
	 * Deshabilitar el tooltip.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Etiqueta ARIA adicional para el tooltip si el contenido no es suficiente.
	 * Usado para aria-label en el elemento del tooltip si content es solo iconografía,
	 * o para aria-describedby si el ID no se genera o proporciona.
	 */
	ariaLabel?: string;

	/**
	 * ID para el elemento del tooltip (para vincularlo con aria-describedby).
	 * Si no se proporciona, se genera un ID único.
	 */
	id?: string; // Optional ID for aria-describedby

	// No incluimos 'isVisible' prop para control externo directo;
	// la visibilidad es controlada por hover/focus (o disabled).
}
