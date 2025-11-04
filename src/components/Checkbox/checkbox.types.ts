import { InputHTMLAttributes } from "react";
import { CheckboxVariants, ContainerVariants } from "./checkbox.variants";

export interface CheckBoxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | "color" | "type"> {
	/**
	 * Controla si el checkbox está activado (`true`) o desactivado (`false`).
	 * Usar esta prop hace que el componente sea controlado.
	 * @default false
	 */
	checked?: boolean;
	/**
	 * Callback simple que se ejecuta cada vez que el estado del checkbox cambia (de activado a desactivado o viceversa).
	 * Recibe el nuevo valor booleano.
	 */
	onCheckedChange?: (checked: boolean) => void;
	/**
	 * Callback que se ejecuta con el evento nativo de cambio del input.
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Controla el tamaño visual del control de la casilla de verificación.
	 */
	size?: CheckboxVariants["size"];

	/**
	 * Define el estilo visual de la casilla de verificación, como la apariencia de la caja y la marca de verificación.
	 */
	variant?: CheckboxVariants["variant"];

	/**
	 * Ajusta la redondez de las esquinas de la caja de la casilla de verificación.
	 */
	radius?: CheckboxVariants["radius"];

	/**
	 * Establece el esquema de color para la casilla de verificación, típicamente afectando el color de la marca de verificación cuando está marcada.
	 */
	color?: CheckboxVariants["color"];

	/**
	 * Controla dónde se coloca la etiqueta de texto (`label`) en relación con el control de la casilla (por ejemplo, a la izquierda o a la derecha).
	 */
	positionLabel?: ContainerVariants["positionLabel"];

	/**
	 * El texto que se muestra junto al control de la casilla, asociado semánticamente a él.
	 */
	label?: string;

	/**
	 * Deshabilita la casilla de verificación, impidiendo que el usuario cambie su estado y cambiando su apariencia para indicar que no está disponible.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Icono personalizado que se muestra en la casilla de verificación cuando está marcada.
	 */
	icon?: React.ReactNode;

	/**
	 * Indica la posición de la casilla de verificación dentro de un grupo de casillas de verificación (Join).
	 * @default "middle"
	 */
	joinposition?: "first" | "middle" | "last";
}
