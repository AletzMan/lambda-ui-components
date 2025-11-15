import { InputVariants } from "./input.variants";

export interface InputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"disabled" | "size" | "type" | "value" | "placeholder" | "prefix" | "suffix"
	> {
	/**
	 * Define el tamaño visual del input, ajustando el padding y el tamaño del texto.
	 */
	size?: InputVariants["size"];

	/**
	 * Define el radio de los bordes del input.
	 */
	radius?: InputVariants["radius"];

	/**
	 * Controla el estilo visual del input, como el color del borde o el fondo.
	 */
	variant?: InputVariants["variant"];

	/**
	 * Activa un estado visual de error o inválido para el input, típicamente cambiando el color del borde a rojo.
	 */
	invalid?: InputVariants["invalid"];

	/**
	 * Desactiva completamente el input, haciendo que no se pueda interactuar con él.
	 */
	disabled?: InputVariants["disabled"];

	/**
	 * Establece el tipo de entrada nativa subyacente (ej. 'text', 'password', 'email').
	 */
	type?: InputVariants["type"];

	/**
	 * Una etiqueta de texto asociada al input, que generalmente aparece sobre o junto a él.
	 */
	label?: string;

	/**
	 * Un mensaje de texto que se muestra debajo del input cuando está marcado como inválido (`invalid={true}`).
	 */
	errorMessage?: string;

	/**
	 * Habilita una animación donde la etiqueta (`label`) se mueve y reduce de tamaño cuando el input está enfocado o tiene valor.
	 */
	floatingLabel?: boolean;

	/**
	 * Texto adicional que se muestra debajo del input para proporcionar ayuda o contexto.
	 */
	helperText?: string;

	/**
	 * Indica que este campo debe ser llenado para que un formulario sea válido.
	 */
	required?: boolean;

	/**
	 * Un elemento React que se muestra antes del valor del input, como un icono o un botón.
	 */
	prefix?: React.ReactNode | string | undefined;

	/**
	 * Un elemento React que se muestra después del valor del input, como un icono o un botón.
	 */
	suffix?: React.ReactNode | string | undefined;

	/**
	 * Una función que se ejecuta cada vez que el texto en el input es modificado por el usuario. Recibe el valor actual del input como un string.
	 */
	onChangeValue?: (value: string) => void;

	/**
	 * El texto actual que debe mostrar el input. Al usar esta prop, controlas el valor desde el componente padre.
	 */
	value?: string;

	/**
	 * Texto que aparece dentro del input cuando está vacío y no tiene foco, sirviendo como pista para el usuario.
	 */
	placeholder?: string;

	/**
	 * Indica la posición del hijo dentro del Join(Si el input está dentro de un Join).
	 */
	joinposition?: "first" | "last" | "middle";
}
