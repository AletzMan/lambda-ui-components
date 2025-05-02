import { createContext, useContext } from "react";
import { AccordionSize, AccordionValue, AccordionVariant } from "../accordion.types";

// --- Contexto para comunicar el estado del Accordion a los Items ---
// Definir la forma del objeto de contexto
export interface AccordionContextValue {
    // El valor del item actualmente abierto (para single-open)
    activeValue: AccordionValue;
    // Función para establecer el item activo (se llama cuando se hace click en un header)
    // Recibe el valor del item que solicita el cambio.
    // Si ese item ya está activo, se cierra (se pasa null/undefined).
    // Si otro item está activo, se cierra el otro y se abre este.
    // Si ninguno está activo, se abre este.
    onValueChange: (value: AccordionValue) => void;
    size?: AccordionSize
    variant?: AccordionVariant
    // Opcional: Prop para indicar si es multi-open si se implementa
    // isMultiOpen: boolean;
    // Opcional: Prop para aplicar estilos o comportamiento basado en el contexto padre
    // variant?: AccordionProps['variant'];
}


// Crear el contexto con un valor inicial nulo o un objeto que lance un error si se usa fuera del proveedor
export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

// Hook helper para usar el contexto (lanza error si no está dentro de un proveedor)
export const useAccordionContext = () => {
    const context = useContext(AccordionContext);
    if (context === undefined) {
        throw new Error('useAccordionContext must be used within an AccordionProvider');
    }
    return context;
};
