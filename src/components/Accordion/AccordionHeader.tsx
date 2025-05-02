import { forwardRef, useCallback, useId } from "react";
import { AccordionHeaderInjectedProps, AccordionHeaderProps } from "./accordion.types";
import { accordionHeaderVariants } from "./accordion.variants";
import clsx from "clsx";
import styles from "./accordion.module.css";
import { ChevronDownIcon } from "lucide-react";
import { useAccordionContext } from "./hooks/useContext";


export const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
    (
        {
            children,
            className,
            style,
            ...restProps
        },
        ref
    ) => {
        const { onValueChange } = useAccordionContext(); // Obtener solo el handler global

        // Asumir props inyectadas desde AccordionItem
        const injectedProps = restProps as AccordionHeaderInjectedProps;
        const itemValue = injectedProps.itemValue; // El valor único de este item
        const isOpen = injectedProps.isOpen;     // Si este item está abierto
        const isDisabled = injectedProps.disabled; // Si este item está deshabilitado
        const size = injectedProps.size;
        const variant = injectedProps.variant;


        // Generar IDs únicos para vincular header y content (ARIA)
        // Usamos useId para generar IDs estables
        const headerId = useId();
        const contentId = `content-${headerId}`;


        // Handler de clic para el botón del header
        const handleHeaderClick = useCallback(() => {
            // Pasar nuestro propio itemValue.
            onValueChange(itemValue);
        }, [itemValue, onValueChange]);

        // Clases CSS para el botón del header
        const headerClasses = clsx(
            accordionHeaderVariants({ state: isOpen ? 'open' : 'closed', disabled: isDisabled, size, variant }),
            className
        );


        return (
            <button
                ref={ref}
                className={headerClasses}
                style={style}
                onClick={handleHeaderClick}
                disabled={isDisabled}

                // *** ATRIBUTOS ARIA para accesibilidad ***
                role="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                {...restProps}
            >
                {children} {/* Renderiza el contenido del encabezado (texto, icono opcional, etc.) */}
                {/* Opcional: Icono indicador de expandir/colapsar (ej. flecha) */}
                <span className={styles['lambda-accordion-header-icon-container']}>
                    <ChevronDownIcon className={styles['lambda-accordion-header-icon']} />
                </span>
            </button>
        );
    }
);