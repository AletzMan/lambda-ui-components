import { RatingVariants } from "./rating.variants";
import { HTMLAttributes } from "react";

export interface RatingProps
	extends Omit<
		HTMLAttributes<HTMLDivElement>,
		"size" | "disabled" | "checked" | "color" | "onChange"
	> {
	/**
	 * Controla el tamaño visual del control de calificación.
	 * @default "medium"
	 */
	size?: RatingVariants["size"];

	/**
	 * Define el estilo visual del control de calificación.
	 * @default "solid"
	 */
	variant?: RatingVariants["variant"];

	/**
	 * Define el color del control de calificación.
	 * @default "default"
	 */
	color?: RatingVariants["color"];

	/**
	 * Define el valor actual del control de calificación.
	 * @default 0
	 */
	value?: number;

	/**
	 *Función que se ejecuta cuando el valor del control de calificación cambia.
	 */
	onChange?: (value: number) => void;
	/**
	 * Define el icono personalizado.
	 */
	customIcon?: React.ReactNode[];

	/**
	 * Define el texto personalizado, para cada nivel de calificación.
	 */
	text?: string[];

	/**
	 * Define la posición del texto personalizado.
	 * @default "right"
	 */
	textPosition?: "top" | "bottom" | "right";
}
