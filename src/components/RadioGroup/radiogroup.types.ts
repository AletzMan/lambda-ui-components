import { RadioGroupVariants } from "./radiogrouo.variants";

export interface RadioGroupProps {

    /**
     * Define la dirección en la que se colocan los botones de radio dentro del grupo (horizontal o vertical).
     */
    orientation?: RadioGroupVariants["orientation"];

    /**
     * Controla el tamaño general del grupo y puede influir en el tamaño de los botones de radio individuales dentro de él.
     */
    size?: RadioGroupVariants["size"];

    /**
     * Establece el esquema de color para todos los botones de radio dentro del grupo.
     */
    color?: RadioGroupVariants["color"];

    /**
     * (Esta prop específica depende de la implementación interna). Define una variación en la apariencia o comportamiento del grupo de radios.
     */
    type?: RadioGroupVariants["type"];

    /**
     * Ajusta la redondez de las esquinas del contenedor del grupo.
     */
    radius?: RadioGroupVariants["radius"];

    /**
     * Controla el estilo visual general del grupo de radios.
     */
    variant?: RadioGroupVariants["variant"];

    /**
     * Deshabilita todos los botones de radio individuales contenidos dentro de este grupo.
     * @default false
     */
    disabled?: boolean;

    /**
     * El atributo `name` que se aplicará a todos los botones de radio individuales dentro del grupo.
     * Es esencial para que el navegador los trate como un grupo donde solo uno puede ser seleccionado a la vez.
     */
    name?: string;

    /**
     * El `value` de la opción de radio que actualmente está seleccionada en el grupo (para usar como componente controlado).
     */
    selectedOption?: string;

    /**
     * Una función que se ejecuta cuando el usuario selecciona un botón de radio diferente en el grupo. Recibe el `value` del radio seleccionado.
     */
    onChange?: (value: string) => void;

    /**
     * El `value` de la opción de radio que estará seleccionada por defecto cuando el componente se monte (para usar como componente no controlado).
     */
    defaultValue?: string;

    /**
     * Define el espacio entre los botones de radio individuales dentro del grupo, usando un valor CSS válido (ej. '8px', '1rem').
     */
    gap?: string;

    // Además de estas, el RadioGroup aceptará los botones de radio individuales como `children`.
}