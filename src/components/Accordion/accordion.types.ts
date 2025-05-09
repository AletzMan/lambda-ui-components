import React, { HTMLAttributes } from 'react';

export type AccordionValue = string | number | null | undefined;
export type AccordionVariant = "default" | "flush" | "split";
export type AccordionSize = "tiny" | "small" | "medium" | "large";


// --- Props para el componente Accordion (Padre) ---
// Extiende HTMLAttributes<HTMLDivElement> para props estándar del contenedor
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    /**
     * El/los valor(es) del AccordionItem que está/n actualmente abierto(s).
     * Para un Accordion single-open (predeterminado), es un único valor (string | number)
     * o null/undefined si ninguno está abierto.
     * Usar con `onValueChange` para un componente controlado.
     */
    value?: AccordionValue;

    /**
     * El valor del AccordionItem que debe estar abierto por defecto (al montar)
     * cuando el componente es no controlado.
     * Para un Accordion single-open (predeterminado), es un único valor.
     */
    defaultValue?: AccordionValue;

    /**
     * Callback llamado cuando el estado de un AccordionItem cambia (se abre o cierra).
     * Recibe el nuevo valor del item abierto (o null/undefined si se cierra).
     * Usar con `value` para un componente controlado.
     */
    onValueChange?: (value: AccordionValue) => void;

    /**
     * Los hijos del Accordion. Deben ser `AccordionItem` componentes.
     */
    children: React.ReactNode;

    /**
     * Opcional: Indica si se permite tener múltiples items abiertos simultáneamente.
     * (Implementación de single-open por ahora, esta prop no afectará hasta implementarla).
     * @default false (para single-open)
     */
    // type?: 'single' | 'multiple'; // Podríamos usar type en lugar de isMultiOpen
    // isMultiOpen?: boolean; // O un booleano


    /**
     * Opcional: Tamaño visual del Accordion.
     * @type `AccordionSize`
     * @default `medium`
     */
    size?: AccordionSize;


    /**
     * Opcional: Variante visual del Accordion.
     */
    variant?: AccordionVariant;

    // Otras props estándar de div como className, style, etc. ya están incluidas por la extensión.
}

// --- Props para el componente AccordionItem ---
// Extiende HTMLAttributes<HTMLDivElement> para props estándar del contenedor del item
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Un valor único que identifica este item dentro del Accordion padre.
     * Se usa para controlar su estado abierto/cerrado. Requerido.
     */
    value: string | number;

    /**
     * Los hijos del AccordionItem. Deben ser `AccordionHeader` y `AccordionContent`.
     */
    children: React.ReactNode;
    /**
     * Si es true, este item está deshabilitado y no se puede expandir/colapsar.
     * @default false
     */
    disabled?: boolean;

    // Opcional: Variante visual específica para el item si es diferente del padre
    // itemVariant?: VariantProps<typeof accordionItemVariants>["variant"]; 
}

// --- Props para el componente AccordionHeader ---
// Extiende HTMLAttributes<HTMLButtonElement> ya que renderizará un <button>
export interface AccordionHeaderProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * El contenido del encabezado del item (el texto clickeable).
     */
    children: React.ReactNode;
    size?: AccordionSize;
    /**
    * Opcional: Variante visual del Accordion.
    */
    variant?: AccordionVariant;
}

// --- Props para el componente AccordionContent ---
// Extiende HTMLAttributes<HTMLDivElement> ya que renderizará un <div> para el contenido
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * El contenido del panel del item (el contenido expandible/colapsable).
    */
    children: React.ReactNode;
    size?: AccordionSize;
}


// Interfaz interna FINAL para las props que AccordionItem inyecta a Header y Content
// Esto coincide con lo que AccordionItem CLONARÁ y pasará.
export interface AccordionHeaderFinalInjectedProps extends AccordionHeaderProps {
    itemValue: string | number;
    isOpen: boolean;
    disabled: boolean;
    headerId: string;
    contentId: string;
}

export interface AccordionContentFinalInjectedProps extends AccordionContentProps {
    itemValue: string | number;
    isOpen: boolean;
    headerId: string;
    contentId: string;
}

// Interfaz interna para las props que AccordionItem inyecta a Header y Content
export interface AccordionHeaderInjectedProps extends AccordionHeaderProps {
    itemValue: string | number;
    isOpen: boolean;
    disabled: boolean;
}

