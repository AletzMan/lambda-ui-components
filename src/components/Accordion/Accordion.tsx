import { forwardRef, useCallback, useState, useMemo } from "react";
import clsx from "clsx";

import { AccordionProps, AccordionValue } from "./accordion.types";
import { accordionVariants } from "./accordion.variants";
import { AccordionContext } from "./hooks/useContext";
import { useUIConfig } from "../../_internal/hooks/translation/ConfigProvider";

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	(
		{
			value: controlledValue,
			defaultValue,
			onValueChange,
			children,
			variant = "default",
			className,
			style,
			size,
			...restProps
		},
		ref
	) => {
		// Gestionar el estado interno del item activo para Accordion no controlado
		const { radiusBox } = useUIConfig();
		const isControlled = onValueChange !== undefined;
		const [uncontrolledActiveValue, setUncontrolledActiveValue] =
			useState<AccordionValue>(defaultValue);

		// Determinar el valor activo actual (fuente de verdad: prop controlada o estado interno no controlado)
		const activeValue = isControlled ? controlledValue : uncontrolledActiveValue;

		// Handler para cuando un AccordionItem solicita cambiar su estado (abrir/cerrar)
		const handleValueChange = useCallback(
			(clickedValue: AccordionValue) => {
				const newValue = activeValue === clickedValue ? null : clickedValue;

				// Notificar al padre (si es controlado) o actualizar estado interno (si es no controlado)
				if (isControlled && onValueChange) {
					onValueChange(newValue);
				} else {
					setUncontrolledActiveValue(newValue);
				}
			},
			[activeValue, isControlled, onValueChange]
		);

		// Proveer el contexto a los AccordionItem hijos
		const contextValue = useMemo(
			() => ({
				activeValue,
				onValueChange: handleValueChange,
				size,
				variant,
			}),
			[activeValue, handleValueChange, size, variant]
		);

		// Clases CSS para el contenedor principal del Accordion
		const accordionClasses = clsx(accordionVariants({ variant, radius: radiusBox }), className);

		return (
			// Proveedor de contexto para que los hijos AccodionItem accedan al estado y handlers
			<AccordionContext.Provider value={contextValue}>
				{/* Contenedor principal (div) */}
				<div ref={ref} className={accordionClasses} style={style} {...restProps}>
					{/* Renderizar los hijos (espera AccordionItem) */}
					{children}
				</div>
			</AccordionContext.Provider>
		);
	}
);
