import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonVariants } from "./button.variants";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
	/**
	 * Define el estilo visual principal del botón (por ejemplo, sólido, delineado, transparente).
	 */
	variant?: ButtonVariants["variant"];

	/**
	 * Establece el esquema de color del botón (por ejemplo, primario, secundario, peligro).
	 */
	color?: ButtonVariants["color"];

	/**
	 * Controla el tamaño visual del botón, afectando el padding y el tamaño del texto/icono.
	 */
	size?: ButtonVariants["size"];

	/**
	 * Define si el botón ocupa todo el ancho disponible (cuando es true) o normal (cuando es false).
	 */
	block?: ButtonVariants["block"];

	/**
	 * Define si el botón es circular (cuando es true) o normal (cuando es false).
	 */
	isCircle?: ButtonVariants["isCircle"];

	/**
	 * Controla la posición de un icono (`icon`) en relación con la etiqueta (`label`) del botón.
	 */
	iconPosition?: ButtonVariants["iconPosition"];

	/**
	 * Activa un estado visual de carga para el botón, típicamente mostrando un spinner y deshabilitando la interacción.
	 */
	loading?: ButtonVariants["loading"];

	/**
	 * Un elemento React (como un icono) para mostrar dentro del botón.
	 */
	icon?: ReactNode | undefined | null;

	/**
	 * El texto principal que se muestra dentro del botón.
	 */
	label?: string;

	/**
	 * Texto que se muestra en lugar de la etiqueta (`label`) cuando el botón está en estado de carga (`loading`).
	 */
	loadingText?: string;

	/**
	 * Una etiqueta para accesibilidad (ARIA). Proporciona una descripción concisa para lectores de pantalla, especialmente útil si el botón solo contiene un icono.
	 */
	"aria-label"?: string;
}
