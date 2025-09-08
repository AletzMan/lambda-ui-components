// src/components/Alert/Alert.types.ts

import React, { HTMLAttributes } from "react";

// Define los tipos posibles para la variante de color del Alert
export type AlertColor = "default" | "primary" | "danger" | "success" | "warning" | "info";

export type AlertSize = "tiny" | "small" | "medium" | "large" | undefined;
export type AlertVariant = "outline" | "soft" | "solid" | undefined;

// Props para el componente Alert
// Extiende HTMLAttributes<HTMLDivElement> para permitir props estándar de div
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Define la variante visual del alert, afectando típicamente el color de fondo y texto.
	 * Corresponde a los tipos semánticos de alerta.
	 */
	color: AlertColor;
	/**
	 * Define la variante visual del alert, afectando típicamente el color de fondo y texto.
	 * Corresponde a los tipos semánticos de alerta.
	 */
	variant: AlertVariant;

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
	size?: AlertSize;

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
