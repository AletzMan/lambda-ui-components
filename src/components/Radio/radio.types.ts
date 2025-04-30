import { InputHTMLAttributes } from "react";
import { RadioVariants } from "./radio.variants";

export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | "checked" | "color" | "type" | "value"> {

    /**
     * Controla el tamaño visual del control de radio .
     */
    size?: RadioVariants["size"];

    /**
     * Define el estilo visual del control de radio, como la apariencia del círculo y el punto.
     */
    variant?: RadioVariants["variant"];

    /**
     * Establece el esquema de color para el control de radio.
     */
    color?: RadioVariants["color"];

    /**
     * (Esta prop específica depende de la implementación interna). Define un subtipo o variación visual para el control de radio.
     */
    type?: RadioVariants["type"];

    /**
     * Controla dónde se coloca la etiqueta de texto (`label`) en relación con el control de radio (por ejemplo, a la izquierda o a la derecha).
     */
    positionLabel?: RadioVariants["positionLabel"];

    /**
     * Desactiva este botón de radio individual, impidiendo que el usuario lo seleccione.
     */
    disabled?: RadioVariants["disabled"];

    /**
     * El texto descriptivo que se muestra junto al control de radio, asociado semánticamente a él.
     */
    label?: string;

    /**
     * El valor único asociado a este botón de radio específico. Este valor se utiliza para identificar qué opción fue seleccionada dentro de un grupo de radios.
     * **Nota:** La prop `checked` para controlar si el radio está seleccionado *no* está disponible directamente en `RadioProps`; se espera que sea gestionada externamente (típicamente por un componente `RadioGroup` padre) basado en que su valor coincida con el valor seleccionado del grupo.
     */
    value: string | number | ReadonlyArray<string>;
}