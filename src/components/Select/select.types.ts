import { SelectHTMLAttributes } from "react";

import { SelectVariants } from "./select.variants";

export interface IListCollection {
	/**
	 * La etiqueta visible para esta opción en la lista desplegable.
	 */
	label: string;
	/**
	 * El valor asociado a esta opción. Es un string único que identifica la opción seleccionada.
	 */
	value: string;
	/**
	 * Opcional: Una URL de imagen o un elemento para mostrar como avatar junto a la etiqueta de la opción.
	 */
	avatar?: string;
	/**
	 * Opcional: Un texto descriptivo adicional para esta opción.
	 */
	description?: string;
}

export interface SelectProps
	extends Omit<
		SelectHTMLAttributes<HTMLSelectElement>,
		"size" | "disabled" | "value" | "onChange" | "placeholder" | "required" | "multiple" | "name"
	> {
	/**
	 * Define el tamaño del select, afectando padding y tamaño de fuente del control visible.
	 */
	size?: SelectVariants["size"];

	/**
	 * Define el radio del select, afectando el radio de las esquinas del control visible.
	 */
	radius?: SelectVariants["radius"];

	/**
	 * Define la variante visual del select
	 */
	variant?: SelectVariants["variant"];

	/**
	 * Deshabilita el select, impidiendo la interacción del usuario.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Indica si el select está en un estado de validación inválido.
	 * @default false
	 */
	invalid?: boolean;

	/**
	 * Etiqueta de texto asociada al select.
	 */
	label?: string;

	/**
	 * Un array de objetos que definen las opciones disponibles en el select.
	 * Cada objeto debe seguir la estructura `IListCollection`.
	 */
	options: IListCollection[];

	/**
	 * Texto que se muestra como una opción por defecto cuando no hay ningún valor seleccionado.
	 */
	placeholder?: string;

	/**
	 * Mensaje de error que se muestra cuando `invalid` es true.
	 * Este texto suele aparecer debajo del control select.
	 */
	errorMessage?: string;

	/**
	 * Indica si la selección es obligatoria en este select.
	 * @default false
	 */
	required?: boolean;

	/**
	 * El valor de la opción seleccionada actualmente (para usar como componente controlado).
	 */
	value?: string;

	/**
	 * El valor inicial del select en un componente no controlado.
	 * Se ignora si la prop `value` está presente.
	 */
	defaultValue?: string;

	/**
	 * Callback que se dispara cuando el usuario selecciona una nueva opción.
	 * Recibe el `value` (string) de la opción seleccionada, o `undefined` si se deselecciona (comportamiento nativo).
	 */
	onChange?: (value: string | undefined) => void;

	/**
	 * El atributo `name` para el elemento `<select>` nativo subyacente.
	 * Es útil para la serialización de formularios.
	 */
	name?: string;
}
