import { HTMLAttributes } from "react";
import { SliderTrackVariants } from "./slider.variants"; // Importar tipos de variantes

 

// Tipos para variantes visuales
export type SliderSize = SliderTrackVariants["size"];

export type SliderMarks = {
	value: number;
	label?: string | number;
};

// Props para el componente Slider
// Props base compartidas
export interface BaseSliderProps
	extends Omit<
		HTMLAttributes<HTMLDivElement>,
		"value" | "onChange" | "onInput" | "defaultValue"
	> {
	/**
	 * Permite customizar la visualización del valor (tooltip/handle).
	 * Recibe el valor numérico y debe devolver un string o número a mostrar.
	 */
	formatValue?: (value: number) => string | number;

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
	 * Deshabilitar el slider.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Tamaño del slider.
	 * @default "medium"
	 */
	size?: SliderSize;

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
	marks?: SliderMarks[];

	/**
	 * Orientación del slider: horizontal o vertical. Por defecto es 'horizontal'.
	 */
	orientation?: SliderTrackVariants["orientation"];

	radius?: SliderTrackVariants["radius"];
}

// Props para Slider (valor único)
export interface SliderSingleProps extends BaseSliderProps {
	/**
	 * El valor seleccionado.
	 */
	value: number;

	/**
	 * Callback que se llama cuando el valor cambia.
	 */
	onChangeValue?: (value: number) => void;
}

// Props para Slider.Range (rango de valores)
export interface SliderRangeProps extends BaseSliderProps {
	/**
	 * El rango de valores seleccionado [inicio, fin].
	 */
	value: [number, number];

	/**
	 * Callback que se llama cuando el rango cambia.
	 */
	onChangeValue?: (value: [number, number]) => void;
}

// Unión de tipos para uso interno si es necesario, aunque idealmente se usarán por separado
export type SliderProps = SliderSingleProps | SliderRangeProps;
