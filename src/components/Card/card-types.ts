import { VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { card } from "./card.variants";

export interface ICardHeader {
    /**
     * El título principal del encabezado de la tarjeta. Es un string de texto.
     */
    title: string;
    /**
     * Opcional: Un texto descriptivo o subtítulo para el encabezado.
     */
    description?: string;
    /**
     * Opcional: Un elemento React (como un icono) para mostrar en el encabezado.
     */
    icon?: React.ReactNode;
}

export interface ICardActions {
    /**
     * Opcional: Un elemento React (como un icono) para mostrar como parte de la acción.
     */
    icon?: React.ReactNode;
    /**
     * Opcional: El texto que se muestra como parte de la acción (por ejemplo, el texto de un botón de acción).
     */
    text?: string;
    /**
     * Opcional: La función que se llama cuando se activa esta acción (por ejemplo, al hacer clic en el área de la acción).
     */
    onClick?: () => void;
    // Una acción puede tener solo icono, solo texto, o ambos.
}

export interface ICardImage {
    /**
     * La URL de la fuente de la imagen.
     */
    src: string;
    /**
     * Opcional: El texto alternativo para la imagen (recomendado para accesibilidad).
     */
    alt?: string;
    /**
     * Opcional: Un número que indica la altura de la imagen como porcentaje del ancho de la tarjeta.
     * Esto puede usarse para controlar la relación de aspecto de la imagen.
     */
    heightPorcent?: number;
}

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "disabled" | "color"> {
    /**
     * Opcional: Configuración para la sección de imagen de la tarjeta.
     */
    image?: ICardImage;

    /**
     * Opcional: Configuración para la sección de encabezado de la tarjeta.
     */
    header?: ICardHeader;

    /**
     * Opcional: Un array de objetos que definen las acciones disponibles en la tarjeta en el pie de la card.
     */
    actions?: ICardActions[];

    /**
     * Define la variante visual principal de la tarjeta. 
     */
    variant?: VariantProps<typeof card>["variant"];

    /**
     * Define el tamaño de la tarjeta, afectando dimensiones, espaciado interno (padding) y quizás el tamaño de otros elementos internos.
     */
    size?: "medium" | "small" | "large";

    /**
     * Define el radio de las esquinas de la tarjeta. 
     */
    radius?: VariantProps<typeof card>["radius"];

    /**
     * El contenido principal de la tarjeta. Este es el área donde se coloca el contenido principal
     * de la tarjeta (texto, otros componentes, etc.). Se pasa como children del componente. 
     */
    children: React.ReactNode;

}