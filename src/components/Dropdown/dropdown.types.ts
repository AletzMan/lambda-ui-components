import { ButtonHTMLAttributes, ReactNode } from "react";
import { DropdownVariants } from "./dropdown.variants";

export interface DropdownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
	/**
	 * Define el estilo visual principal del botón (por ejemplo, sólido, delineado, transparente).
	 */
	variant?: DropdownVariants["variant"];
	/**
	 * Controla el tamaño visual del botón, afectando el padding y el tamaño del texto/icono.
	 */
	size?: DropdownVariants["size"];
	/**
	 * Define el radio del botón.
	 */
	radius?: DropdownVariants["radius"];
	/**
	 * Un elemento React (como un icono) para mostrar dentro del botón.
	 */
	icon?: ReactNode | undefined | null;
	/**
	 * El texto principal que se muestra dentro del botón.
	 */
	text?: string;
	/**
	 * Una etiqueta para accesibilidad (ARIA). Proporciona una descripción concisa para lectores de pantalla, especialmente útil si el botón solo contiene un icono.
	 */
	"aria-label"?: string;

	/**
	 * Indica la posición del hijo dentro del Join(Si el botón está dentro de un Join).
	 */
	joinposition?: DropdownVariants["joinposition"];
}
