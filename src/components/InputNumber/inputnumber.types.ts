import { InputNumberVariants } from "./inputnumber.variants";

export interface InputNumberProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type" | "onChange" | "value" | "min" | "max" | "step"> {

    /**
     * Controla el estilo visual del input numérico, como el color del borde o el fondo.
     */
    variant?: InputNumberVariants["variant"];

    /**
     * Define el tamaño visual del input, ajustando el padding y el tamaño del texto.
     */
    size?: InputNumberVariants["size"];

    /**
     * Ajusta la redondez de las esquinas del input.
     */
    radius?: InputNumberVariants["radius"];

    /**
     * Activa un estado visual de error o inválido para el input, típicamente cambiando el color del borde a rojo.
     */
    invalid?: InputNumberVariants["invalid"];

    /**
     * Desactiva completamente el input, haciendo que no se pueda interactuar con él y cambiando su apariencia para indicar que no está disponible.
     */
    disabled?: InputNumberVariants["disabled"];

    /**
     * (Esta prop específica depende de la implementación interna). Define un subtipo o variación dentro de la funcionalidad de entrada numérica que ofrece este componente.
     */
    typeNumber?: InputNumberVariants["typeNumber"];

    /**
     * Establece el valor numérico más bajo que el usuario puede introducir o seleccionar.
     */
    min?: number;

    /**
     * Establece el valor numérico más alto que el usuario puede introducir o seleccionar.
     */
    max?: number;

    /**
     * Determina en qué incrementos cambia el valor al usar los controles de paso (como las flechas hacia arriba/abajo) o al validar múltiplos.
     */
    step?: number;

    /**
     * Un texto que sirve como etiqueta descriptiva visible para el input, ayudando al usuario a identificar su propósito.
     */
    label?: string;

    /**
     * Un mensaje de texto que aparece debajo del input cuando está marcado como inválido (`invalid={true}`).
     */
    errorMessage?: string;

    /**
     * Texto adicional que se muestra debajo del input para proporcionar ayuda o contexto al usuario sobre cómo usarlo.
     */
    helperText?: string;

    /**
     * Indica que este campo es obligatorio para completar un formulario. Visualmente, podría añadir un asterisco.
     */
    required?: boolean;

    /**
     * Una función que se ejecuta cada vez que el número en el input es modificado por el usuario. Recibe el nuevo valor numérico.
     */
    onChange?: (value: number | undefined) => void;

    /**
     * El valor numérico actual que el input debe mostrar. Al usar esta prop, controlas el valor desde el componente padre.
     */
    value?: number;
}