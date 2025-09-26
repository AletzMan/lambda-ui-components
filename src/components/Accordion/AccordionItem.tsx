import { Children, cloneElement, forwardRef, isValidElement, useId } from "react";
import {
	AccordionContentFinalInjectedProps,
	AccordionContentProps,
	AccordionHeaderFinalInjectedProps,
	AccordionHeaderProps,
	AccordionItemProps,
} from "./accordion.types";
import { accordionItemVariants } from "./accordion.variants";
import clsx from "clsx";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionContent } from "./AccordionContent";
import { useAccordionContext } from "./hooks/useContext";

// --- Componente Hijo: AccordionItem (Revisado para Inyectar Props) ---
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ value, children, disabled = false, className, style }, ref) => {
		// Obtener el estado activo y el handler del contexto del Accordion padre
		const { activeValue, size, variant, radius } = useAccordionContext();

		// Determinar si este AccordionItem específico está abierto
		const isOpen = activeValue === value;
		// Generar IDs únicos y estables para vincular Header y Content de ESTE ITEM (ARIA)
		// Usamos useId para generar un prefijo ID único para esta instancia de Item
		const itemUniqueIdPrefix = useId();
		// Construir los IDs completos para el header y el content de este item
		const headerId = `accordion-header-${itemUniqueIdPrefix}`;
		const contentId = `accordion-content-${itemUniqueIdPrefix}`;

		// Clases CSS para el contenedor del AccordionItem
		const itemClasses = clsx(
			accordionItemVariants({
				state: isOpen ? "open" : "closed",
				disabled,
				variant,
				radius,
			}),
			className
		);

		// el estado (isOpen, disabled), el valor del item (itemValue), y los IDs (headerId, contentId).
		const renderedChildren = Children.map(children, (child) => {
			// Solo clonar elementos React válidos
			if (!isValidElement(child)) {
				return child;
			}

			// Verificar si el hijo es un AccordionHeader
			if (child.type === AccordionHeader) {
				// Inyectar props en el AccordionHeader
				const injectedProps: AccordionHeaderFinalInjectedProps = {
					itemvalue: value, // Inyectar el valor de ESTE item
					isopen: isOpen, // Inyectar si ESTE item está abierto
					disabled, // Inyectar si ESTE item está deshabilitado
					headerid: headerId, // Inyectar el ID del header generado para ESTE item
					contentid: contentId, // Inyectar el ID del content generado para ESTE item
					size,
					variant,
					// Pasar props originales del Header también
					...(child.props as AccordionHeaderProps),
				};
				// Clonar el elemento Header con las props inyectadas
				return cloneElement(child, injectedProps);
			}

			// Verificar si el hijo es un AccordionContent
			if (child.type === AccordionContent) {
				// Inyectar props en el AccordionContent
				const injectedProps: AccordionContentFinalInjectedProps = {
					itemvalue: value, // Inyectar el valor de ESTE item
					isopen: isOpen, // Inyectar si ESTE item está abierto
					headerid: headerId, // Inyectar el ID del header asociado (de ESTE item)
					contentid: contentId, // Inyectar el ID de este content (de ESTE item)
					variant,
					size,
					// Pasar props originales del Content también
					...(child.props as AccordionContentProps),
				};
				// Clonar el elemento Content con las props inyectadas
				return cloneElement(child, injectedProps);
			}

			// Si el hijo no es ni Header ni Content, renderizarlo tal cual y advertir
			console.warn(
				"AccordionItem should only contain AccordionHeader and AccordionContent elements.",
				child
			);
			return child;
		});

		return (
			// Contenedor principal del AccordionItem
			<div
				ref={ref} // Pasar la ref externa
				className={itemClasses} // Aplicar clases calculadas
				style={style} // Estilos inline
				// No necesita rol ARIA específico aquí.
				//{...restProps} // Esparcir otras props estándar de div
			>
				{/* Renderizar los hijos CLONADOS (Header y Content con props inyectadas) */}
				{renderedChildren}
			</div>
		);
	}
);
