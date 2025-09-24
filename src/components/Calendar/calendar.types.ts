import { CalendarVariants } from "./calendar.variants";

export type CalendarEventStatus = "success" | "warning" | "danger";

export interface CalendarEvents {
	date: Date;
	label: string[];
	status: CalendarEventStatus[];
}

export interface CalendarProps {
	/**
	 * Fecha actualmente seleccionada
	 */
	value?: Date;
	/**
	 * Callback cuando cambia la fecha seleccionada
	 */
	onChange?: (date: Date) => void;
	/**
	 * Fecha mínima seleccionable
	 */
	minDate?: Date;
	/**
	 * Fecha máxima seleccionable
	 */
	maxDate?: Date;
	/**
	 * Deshabilita el calendario
	 */
	disabled?: boolean;
	/**
	 * Permite personalizar el tamaño del calendario
	 */
	size?: CalendarVariants["size"];
	/**
	 * Permite personalizar el tipo del calendario
	 */
	type?: CalendarVariants["type"];
	/**
	 * Permite personalizar el radio del calendario
	 */
	radius?: CalendarVariants["radius"];
	/**
	 * Permite personalizar la variante visual
	 */
	variant?: CalendarVariants["variant"];
	/**
	 * Permite deshabilitar días específicos
	 */
	isDateDisabled?: (date: Date) => boolean;
	/**
	 * Permite personalizar los eventos del calendario
	 */
	events?: CalendarEvents[];
}
