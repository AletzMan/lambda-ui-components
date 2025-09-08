import { ColorPickerVariants } from "./colorpicker.variants";

export interface ColorPickerProps
	extends Omit<
		React.HTMLAttributes<HTMLDivElement>,
		"size" | "disabled" | "checked" | "color" | "onChange"
	> {
	/**
	 * Valor actual del color seleccionado.
	 */
	value?: string;
	/**
	 * Define el valor actual del color seleccionado.
	 */
	onChange?: (value: string) => void;
	/**
	 * Define el valor actual del color seleccionado.
	 */
	disabled?: boolean;
	/**
	 * Define el formato del color seleccionado.
	 */
	format?: "hex" | "rgb" | "rgba" | "hsl" | "hsla";
	/**
	 * Define el tamaño del color picker.
	 */
	size?: ColorPickerVariants["size"];
	/**
	 * Define el estilo del color picker.
	 */
	variant?: ColorPickerVariants["variant"];
	/**
	 * Define el radio del color picker.
	 */
	radius?: ColorPickerVariants["radius"];
	/**
	 * Define si se muestra el texto del color picker.
	 */
	showText?: boolean;
}
