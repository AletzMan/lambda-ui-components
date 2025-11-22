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
 * Allows customizing how the slider value is displayed (tooltip/handle label).
 * Receives the numeric value and must return a string or number to show.
 */
formatValue?: (value: number) => string | number;

/**
 * The minimum allowed value of the slider range.
 * @default 0
 */
min?: number;

/**
 * The maximum allowed value of the slider range.
 * @default 100
 */
max?: number;

/**
 * The amount the value increases or decreases with each movement.
 * Must be positive. If set to 0, any value between min and max is allowed.
 * @default 1
 */
step?: number;

/**
 * Disables user interaction with the slider.
 * @default false
 */
disabled?: boolean;

/**
 * Controls the size of the slider (track and thumb).
 * @default "medium"
 */
size?: SliderSize;

/**
 * Optional label describing the slider.
 * Rendered as a <label> when provided.
 */
label?: string;

/**
 * Whether the current value should be visible on the slider (e.g., tooltip).
 * @default true
 */
viewValue?: boolean;

/**
 * Whether the filled progress bar should be visible.
 * @default true
 */
viewBar?: boolean;

/**
 * Marks displayed along the slider track.  
 * Each mark can optionally show a label.
 */
marks?: SliderMarks[];

/**
 * Orientation of the slider: horizontal or vertical.
 * @default "horizontal"
 */
orientation?: SliderTrackVariants["orientation"];

/**
 * Controls how rounded the track and thumb should be.
 */
radius?: SliderTrackVariants["radius"];

}

// Props para Slider (valor único)
export interface SliderSingleProps extends BaseSliderProps {
	/**
 * The default value of the slider.
 */
	defaultValue?: number;
	/**
 * The current value of the slider.
 */
value?: number;

/**
 * Callback fired when the slider value changes.
 */
onChangeValue?: (value: number) => void;

}

// Props para Slider.Range (rango de valores)
export interface SliderRangeProps extends BaseSliderProps {
	/**
 * The default value of the slider.
 */
defaultValue?: [number, number];
	/**
 * The current value range represented as [start, end].
 */
value?: [number, number];

/**
 * Callback fired when the selected range changes.
 */
onChangeValue?: (value: [number, number]) => void;

}

// Unión de tipos para uso interno si es necesario, aunque idealmente se usarán por separado
export type SliderProps = SliderSingleProps | SliderRangeProps;
