import { BadgeVariants } from "./badge.variants";

export interface BadgeProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "disabled" | "checked" | "color"> {
	/**
	 * Controla el tamaño visual del badge.
	 */
	size?: BadgeVariants["size"];
	/**
	 * Establece el esquema de color para el badge, típicamente afectando el color cuando está activado.
	 */
	color?: BadgeVariants["color"];
	/**
	 * Define el texto que se muestra en el badge.
	 */
	/**
	 * Define el radio del badge.
	 */
	radius?: BadgeVariants["radius"];
	/**
	 * Define el texto que se muestra en el badge.
	 */
	text?: string;
	/**
	 * Define el número que se muestra en el badge, si no se define no se muestra.
	 */
	count?: number;
	/**
	 * Define el número máximo que se muestra en el badge, si count supera este número se muestra el valor de maxCount.
	 */
	maxCount?: number;
}
