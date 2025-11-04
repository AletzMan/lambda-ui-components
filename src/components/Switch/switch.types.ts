import { SwitchLabelVariants, SwitchVariants } from "./switch.variants";

export interface SwitchProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"size" | "disabled" | "checked" | "color"
	> {
	/**
	 * Callback simple que se ejecuta cada vez que el estado del switch cambia (de activado a desactivado o viceversa).
	 * Recibe el nuevo valor booleano.
	 */
	onCheckedChange?: (checked: boolean) => void;

	/**
	 * Controla el tamaño visual del control de interruptor.
	 */
	size?: SwitchVariants["size"];

	/**
	 * Define el estilo visual del interruptor, como la apariencia del carril y el pulgar.
	 */
	variant?: SwitchVariants["variant"];

	/**
	 * Establece el esquema de color para el interruptor, típicamente afectando el color cuando está activado.
	 */
	color?: SwitchVariants["color"];

	/**
	 * Define la forma del interruptor (por ejemplo, con extremos redondeados o cuadrados).
	 */
	shape?: SwitchVariants["shape"];

	/**
	 * Controla dónde se coloca la etiqueta de texto (`label`) en relación con el control del interruptor (por ejemplo, a la izquierda o a la derecha).
	 */
	positionLabel?: SwitchLabelVariants["position_label"];

	/**
	 * Deshabilita el interruptor, impidiendo que el usuario cambie su estado y cambiando su apariencia para indicar que no está disponible.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * El texto que se muestra junto al control del interruptor, asociado semánticamente a él.
	 */
	label?: string;

	/**
	 * Controla si el interruptor está activado (`true`) o desactivado (`false`).
	 * Usar esta prop hace que el componente sea controlado.
	 * @default false (o el valor por defecto del input nativo)
	 */
	checked?: boolean;
}
