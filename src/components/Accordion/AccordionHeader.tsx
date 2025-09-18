import { forwardRef, useCallback, useId } from "react";
import { AccordionHeaderInjectedProps, AccordionHeaderProps } from "./accordion.types";
import { accordionHeaderVariants } from "./accordion.variants";
import clsx from "clsx";
import styles from "./accordion.module.css";
import { ChevronDownIcon } from "lucide-react";
import { useAccordionContext } from "./hooks/useContext";

export const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
	({ children, className, style, disabled, ...restProps }, ref) => {
		const { onValueChange } = useAccordionContext();

		// Desestructuramos para extraer explícitamente las props problemáticas.
		// El resto de las props se queda en 'domProps'.
		const { itemvalue, isopen, size, variant } = restProps as AccordionHeaderInjectedProps;
		console.log(disabled);
		const headerId = useId();
		const contentId = `content-${headerId}`;

		const handleHeaderClick = useCallback(() => {
			onValueChange(itemvalue);
		}, [itemvalue, onValueChange]);

		const headerClasses = clsx(
			accordionHeaderVariants({
				state: isopen ? "open" : "closed",
				disabled,
				size,
				variant,
			}),
			className
		);

		return (
			<button
				ref={ref}
				className={headerClasses}
				style={style}
				onClick={handleHeaderClick}
				// Atributos HTML válidos
				id={headerId}
				role="button"
				aria-expanded={isopen || false}
				aria-controls={contentId}
				// Pasamos cualquier otra prop estándar del DOM que pueda existir
			>
				{children}
				<span className={styles["lambda-accordion-header-icon-container"]}>
					<ChevronDownIcon className={styles["lambda-accordion-header-icon"]} />
				</span>
			</button>
		);
	}
);
