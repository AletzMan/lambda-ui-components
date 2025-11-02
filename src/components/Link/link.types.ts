// src/components/Link/Link.types.ts

import React from "react";
import { ButtonVariants } from "../Button/button.variants";
import { LinkButtonVariants } from "./link.variants";
// Importar tipos y variantes del componente Button para reutilizarlos
// ASEGÚRATE de que esta ruta de importación sea correcta para tus archivos Button

// Define los tipos posibles para la prop 'type' del Link (solo visual)
export type LinkType = "default" | "button";

// Define el tipo de referencia que forwardRef puede recibir (siempre <a>)
export type LinkRef = HTMLAnchorElement;

// --- Props para el componente Link (siempre renderiza <a>) ---
// Extiende directamente de las props de un enlace <a> nativo para incluir todos los atributos estándar.
export interface LinkProps
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "disabled" | "label" | "color"> {
	/**
	 * La URL a la que apunta el enlace. Requerida para la navegación del <a>.
	 */
	href: string; // href es esencial ya que siempre es un <a>

	/**
	 * El tipo de Link determina su **apariencia visual**:
	 * 'default' para un enlace de texto normal, 'button' para apariencia de botón.
	 * @default 'default'
	 */
	type?: LinkType;

	/**
	 * Texto de la etiqueta del Link. Se puede usar en lugar de `children`.
	 * Si se proporcionan 'label' y 'children', 'label' tiene prioridad.
	 */
	label?: string;

	/**
	 * Opcional: Un elemento React (como un icono SVG) para mostrar dentro del Link.
	 * Su apariencia y posición se controlarán solo cuando `type` sea 'button'.
	 */
	icon?: React.ReactNode | undefined | null;

	/**
	 * Opcional: Mantiene un estilo caundo su valor esta activado.
	 * Su apariencia y posición se controlarán solo cuando `type` sea 'button'.
	 */
	justify?: LinkButtonVariants["justify"];

	/**
	 * Si es true, el Link se muestra en un estado deshabilitado.
	 * Visualmente afectará a ambos tipos. Se aplicará `pointer-events: none` y `aria-disabled="true"`.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Atributo ARIA para proporcionar una etiqueta accesible cuando el contenido visual no es suficiente.
	 * Por ejemplo, si el link solo tiene un icono.
	 */
	"aria-label"?: string;

	// *** Incluir props de Button variants como PROPS OPCIONALES. ***
	// Estas props se usarán para estilizar SOLAMENTE cuando `type` sea 'button'.
	// No aplicarán estilos cuando `type` sea 'default'.
	variant?: ButtonVariants["variant"];
	color?: ButtonVariants["color"];
	size?: ButtonVariants["size"];
	iconPosition?: ButtonVariants["iconPosition"];
	radius?: ButtonVariants["radius"];
	// El estado 'loading' es más complejo en un <a>, pero podemos añadirlo si se requiere un indicador visual
	// sin deshabilitar completamente el link (aunque deshabilitarlo suele ser mejor en estado de carga).
	loading?: ButtonVariants["loading"];

	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
