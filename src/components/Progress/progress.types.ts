import { ProgressVariants } from "./progress.variants";

export interface ProgressProps {
	/**
	 * Valor del progreso (0-100)
	 */
	value: number;
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
