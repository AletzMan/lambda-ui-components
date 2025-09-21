import { DatePickerVariants } from "./datepicker.variants";

export interface DatePickerProps {
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
	size?: DatePickerVariants["size"];
	/**
	 * Permite personalizar el tipo del calendario
	 */
	type?: DatePickerVariants["type"];
	/**
	 * Permite personalizar el radio del calendario
	 */
	radius?: DatePickerVariants["radius"];
	/**
	 * Permite personalizar la variante visual
	 */
	variant?: DatePickerVariants["variant"];
	/**
	 * Texto de cabecera opcional
	 */
	header?: string;
	/**
	 * Permite deshabilitar días específicos
	 */
	isDateDisabled?: (date: Date) => boolean;
}
