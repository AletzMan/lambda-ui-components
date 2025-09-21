import { HTMLAttributes } from "react";
import { RangeTrackVariants } from "./range.variants"; // Importar tipos de variantes

// Tipos para el valor del Range (número para handle único, tupla para dos handles)
export type RangeValue = number | [number, number];

// Tipos para variantes visuales
export type RangeSize = RangeTrackVariants["size"];

export type RangeMarks = {
	value: number;
	label?: string;
};

// Props para el componente Range
export interface RangeProps
	extends Omit<
		// Omitir props de HTMLAttributes<HTMLDivElement> que vamos a redefinir
		HTMLAttributes<HTMLDivElement>,
		"value" | "onChange" | "onInput" | "defaultValue" // Añadir 'defaultValue' a Omit por si acaso
	> {
	/**
	 * El valor o el rango de valores seleccionado.
	 * Usa un número para un solo handle, o una tupla [inicio, fin] para dos handles.
	 * Componente controlado.
	 */
	value: RangeValue;

	/**
	 * El valor mínimo del rango.
	 * @default 0
	 */
	min?: number;

	/**
	 * El valor máximo del rango.
	 * @default 100
	 */
	max?: number;

	/**
	 * El tamaño del incremento de valor al mover el handle.
	 * Debe ser un número positivo. Si es 0, cualquier valor entre min y max es permitido.
	 * @default 1
	 */
	step?: number;

	/**
	 * Callback que se llama cuando el valor/rango cambia al soltar el handle.
	 * Recibe el nuevo valor: number o [number, number].
	 */
	onChange?: (value: RangeValue) => void;

	/**
	 * Callback que se llama mientras el handle se está moviendo.
	 * Puede usarse para retroalimentación en tiempo real.
	 * Recibe el valor intermedio: number o [number, number].
	 */
	onInput?: (value: RangeValue) => void;

	/**
	 * Deshabilitar el slider.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Tamaño del slider.
	 * @default "medium"
	 */
	size?: RangeSize;

	/**
	 * Variante visual del slider (afecta track y fill).
	 * @default "primary"
	 */

	/**
	 * Etiqueta ARIA para el slider (requerido para accesibilidad).
	 * Usa una cadena para handle único o una tupla [etiquetaInicio, etiquetaFin] para dos handles.
	 */
	ariaLabel: string | [string, string];

	/**
	 * Etiqueta de texto para el slider (opcional).
	 * Si se proporciona, se renderiza como una etiqueta <label>.
	 */
	label?: string;

	/**
	 *  Muestra el valor en el slider. Por defecto es true.
	 */
	viewValue?: boolean;

	/**
	 * Muestra la barra de progreso en el slider. Por defecto es true.
	 */
	viewBar?: boolean;

	/**
	 * Marca en el slider.
	 */
	marks?: RangeMarks[];

	/**
	 * Orientación del slider: horizontal o vertical. Por defecto es 'horizontal'.
	 */
	orientation?: RangeTrackVariants["orientation"];

	radius?: RangeTrackVariants["radius"];
}
