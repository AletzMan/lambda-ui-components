// src/components/Alert/Alert.types.ts

import React, { HTMLAttributes } from "react";
import { AlertVariants } from "./alert.variants";

// Props para el componente Alert
// Extiende HTMLAttributes<HTMLDivElement> para permitir props estándar de div
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
	/**
	 * Define la variante visual del alert, afectando típicamente el color de fondo y texto.
	 * Corresponde a los tipos semánticos de alerta.
	 */
	color: AlertVariants["color"];
	/**
	 * Define la variante visual del alert, afectando típicamente el color de fondo y texto.
	 * Corresponde a los tipos semánticos de alerta.
	 */
	variant: AlertVariants["variant"];

	/**
	 * El texto que representa el titulo del contenido.
	 */
	title?: string;

	/**
	 * El contenido del mensaje del alert.
	 */
	message: string;

	/**
	 * Opcional: Callback que se llama cuando se hace clic en el botón de cerrar (si se muestra).
	 * Si se proporciona este callback, se mostrará un botón de cerrar.
	 */
	onClose?: () => void;

	/**
	 * Modifica el tamaño de la Alert
	 * @default small
	 */
	size?: AlertVariants["size"];

	/**
	 * Modifica el radio de la Alert
	 * @default small
	 */
	radius?: AlertVariants["radius"];

	/**
	 * Si es `true`, se mostrará un icono por defecto basado en la variante (success, danger, warning, info).
	 * @default false
	 */
	showIcon?: boolean;

	/**
	 * Opcional: Un elemento React para usar como icono, sobrescribiendo el icono por defecto.
	 * Solo se mostrará si `showIcon` es `true` o si prefieres controlarlo internamente.
	 * (Decidimos: solo si `showIcon` es true O `customIcon` es proporcionado directamente).
	 * Si `customIcon` se proporciona, tiene prioridad sobre el icono por defecto.
	 */
	customIcon?: React.ReactNode;

	/**
	 * El rol ARIA para el alert. "status" es para información no crítica, "alert" es para errores o advertencias urgentes.
	 * Considera "alert" si la alerta aparece de forma dinámica y es crítica.
	 * @default "status"
	 */
	role?: "alert" | "status";
}
