import { TagVariants } from "./tag.variants";

export interface TagProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "disabled" | "checked" | "color"> {
	/**
	 * Define el estilo visual del tag, como la apariencia del carril y el pulgar.
	 */
	variant?: TagVariants["variant"];
	/**
	 * Controla el tamaño visual del tag.
	 */
	size?: TagVariants["size"];
	/**
	 * Controla el radio visual del tag.
	 */
	radius?: TagVariants["radius"];
	/**
	 * Establece el esquema de color para el tag, típicamente afectando el color cuando está activado.
	 */
	color?: TagVariants["color"];
	/**
	 * Define el texto que se muestra en el tag.
	 */
	text?: string;
	/**
	 * Define el icono que se muestra en el tag.
	 */
	icon?: React.ReactNode;
	/**
	 * Define la funcionalidad de cierre del tag, si no se define no se muestra (no se muestra el icono de cierre).
	 */
	onClose?: () => void;
}
