import { TextareaHTMLAttributes, FocusEvent } from "react";
import { TextAreaVariants } from "./textarea.variants";

export interface TextAreaProps
	extends Omit<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		"disabled" | "aria-invalid" | "aria-describedby" | "aria-labelledby" | "onFocus" | "onBlur"
	> {
	/**
	 * Define la variante visual del área de texto.
	 */
	variant?: TextAreaVariants["variant"];
	/**
	 * Define el tamaño del área de texto, afectando el padding y el tamaño de fuente.
	 */
	size?: TextAreaVariants["size"];

	/**
	 * Indica si el área de texto está en un estado de validación inválido.
	 * Esto suele usarse para mostrar estilos de error.
	 * @default false
	 */
	invalid?: boolean;

	/**
	 * Deshabilita el área de texto, impidiendo la interacción del usuario.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Indica si el área de texto es obligatoria para completar un formulario.
	 * No añade validación por sí solo, pero puede usarse para estilos o lógica.
	 * @default false
	 */
	required?: boolean;

	/**
	 * Etiqueta de texto asociada al área de texto.
	 * Si se proporciona, se renderizará típicamente un elemento `<label>` vinculado al área de texto.
	 */
	label?: string;

	/**
	 * Mensaje de error que se muestra cuando `invalid` es true.
	 * Este texto suele aparecer debajo del área de texto.
	 */
	errorMessage?: string;

	/**
	 * Texto de ayuda o descripción adicional que se muestra debajo del área de texto.
	 */
	helperText?: string;

	/**
	 * Callback que se dispara cuando el área de texto recibe el foco.
	 * Recibe el evento de foco nativo.
	 */
	onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;

	/**
	 * Callback que se dispara cuando el área de texto pierde el foco.
	 * Recibe el evento de foco nativo.
	 */
	onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;

	// Nota: Como TextAreaProps extiende Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, ...>,
	// también acepta otras props estándar de HTMLTextAreaElement como 'value', 'onChange',
	// 'placeholder', 'name', 'id', 'rows', 'cols', etc. que no han sido omitidas o redefinidas.
}
