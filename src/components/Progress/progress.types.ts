import { ProgressVariants } from "./progress.variants";

export interface ProgressProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "color"> {
	/**
	 * Valor del progreso (0-100).
	 */
	value: number;
	/**
	 * Si es true, muestra el progreso como indeterminado (animación infinita).
	 */
	indeterminate?: boolean;
	/**
	 * Tamaño del progreso
	 */
	size?: ProgressVariants["size"];
	/**
	 * Color del progreso
	 */
	color?: ProgressVariants["color"];
	/**
	 * Variant del progreso
	 */
	variant?: ProgressVariants["variant"];
	/**
	 * Clases adicionales
	 */
	className?: string;
	/**
	 * Etiqueta del progreso
	 */
	label?: string;
	/**
	 * Mostrar valor del progreso
	 */
	showValue?: boolean;
}
