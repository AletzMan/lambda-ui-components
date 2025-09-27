import { InputHTMLAttributes } from "react";
import { CheckboxVariants, ContainerVariants } from "./checkbox.variants";

export interface CheckBoxProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"size" | "disabled" | "checked" | "color" | "type" | "onChange"
	> {
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
	 * Controla si la casilla está marcada (`true`) o desmarcada (`false`).
	 * Usar esta prop hace que el componente sea controlado.
	 * @default false (o el valor por defecto del input nativo)
	 */
	checked?: boolean;

	/**
	 * Una función que se ejecuta cada vez que el estado de la casilla cambia (de marcado a desmarcado o viceversa). Recibe el evento de cambio nativo.
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Deshabilita la casilla de verificación, impidiendo que el usuario cambie su estado y cambiando su apariencia para indicar que no está disponible.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Indica la posición de la casilla de verificación dentro de un grupo de casillas de verificación (Join).
	 * @default "middle"
	 */
	joinposition?: "first" | "middle" | "last";
}
