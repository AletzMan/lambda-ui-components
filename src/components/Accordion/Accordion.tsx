import React, {
	forwardRef,
	useCallback,
	useState,
	useMemo,
	useRef,
	useLayoutEffect,
	useId,
	useContext,
} from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import styles from "./accordion.module.css";
import {
	accordionVariants,
	accordionItemVariants,
	accordionHeaderVariants,
	accordionContentVariants,
} from "./accordion.variants";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import type {
	AccordionProps,
	AccordionValue,
	AccordionItemProps,
	AccordionHeaderProps,
	AccordionContentProps,
} from "./accordion.types";

// --- Contexto para comunicar el estado del Accordion a los Items ---
export interface AccordionContextValue {
	activeValue: AccordionValue;
	onValueChange: (value: AccordionValue) => void;
	size?: any;
	variant?: any;
	radius?: any;
}
const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);
const useAccordionContext = () => {
	const context = useContext(AccordionContext);
	if (context === undefined) {
		throw new Error("useAccordionContext must be used within an AccordionProvider");
	}
	return context;
};

// --- AccordionRoot ---
const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
	(
		{
			value: controlledValue,
			defaultValue,
			onValueChange,
			children,
			variant = "default",
			className,
			radius,
			style,
			size,
			...restProps
		},
		ref
	) => {
		const { radiusBox } = useUIConfig();
		const radiusValue = radius || radiusBox;
		const isControlled = onValueChange !== undefined;
		const [uncontrolledActiveValue, setUncontrolledActiveValue] =
			useState<AccordionValue>(defaultValue);
		const activeValue = isControlled ? controlledValue : uncontrolledActiveValue;
		const handleValueChange = useCallback(
			(clickedValue: AccordionValue) => {
				const newValue = activeValue === clickedValue ? null : clickedValue;
				if (isControlled && onValueChange) {
					onValueChange(newValue);
				} else {
					setUncontrolledActiveValue(newValue);
				}
			},
			[activeValue, isControlled, onValueChange]
		);
		const contextValue = useMemo(
			() => ({ activeValue, onValueChange: handleValueChange, size, variant, radius: radiusValue }),
			[activeValue, handleValueChange, size, variant, radiusValue]
		);
		const accordionClasses = clsx(accordionVariants({ variant, radius: radiusValue }), className);
		return (
			<AccordionContext.Provider value={contextValue}>
				<div ref={ref} className={accordionClasses} style={style} {...restProps}>
					{children}
				</div>
			</AccordionContext.Provider>
		);
	}
);

// Contexto para propagar el valor del item a los hijos
const AccordionItemContext = React.createContext<{
	value: string | number;
	isOpen: boolean;
	headerId: string;
	contentId: string;
	disabled?: boolean;
}>({ value: "", isOpen: false, headerId: "", contentId: "" });

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ value, children, disabled = false, className, style }, ref) => {
		const { activeValue, variant, radius } = useAccordionContext();
		const isOpen = activeValue === value;
		const itemUniqueIdPrefix = useId();
		const headerId = `accordion-header-${itemUniqueIdPrefix}`;
		const contentId = `accordion-content-${itemUniqueIdPrefix}`;
		const itemClasses = clsx(
			accordionItemVariants({ state: isOpen ? "open" : "closed", disabled, variant, radius }),
			className
		);
		return (
			<AccordionItemContext.Provider value={{ value, isOpen, headerId, contentId, disabled }}>
				<div ref={ref} className={itemClasses} style={style}>
					{children}
				</div>
			</AccordionItemContext.Provider>
		);
	}
);
AccordionItem.displayName = "AccordionItem";

// --- AccordionHeader ---
const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
	({ children, className, style, ...restProps }, ref) => {
		const { onValueChange, size, variant } = useAccordionContext();
		const { value, isOpen, headerId, contentId, disabled } = React.useContext(AccordionItemContext);
		const handleHeaderClick = useCallback(() => {
			onValueChange(value);
		}, [value, onValueChange]);
		const headerClasses = clsx(
			accordionHeaderVariants({ state: isOpen ? "open" : "closed", disabled, size, variant }),
			className
		);
		return (
			<button
				ref={ref}
				className={headerClasses}
				style={style}
				onClick={handleHeaderClick}
				id={headerId}
				role="button"
				aria-expanded={isOpen || false}
				aria-controls={contentId}
				disabled={disabled}
				{...restProps}
			>
				{children}
				<span className={styles["lambda-accordion-header-icon-container"]}>
					<ChevronDownIcon className={styles["lambda-accordion-header-icon"]} />
				</span>
			</button>
		);
	}
);
AccordionHeader.displayName = "AccordionHeader";

// --- AccordionContent ---
const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
	({ children, className, style, ...restProps }, ref) => {
		const innerContentRef = useRef<HTMLDivElement>(null);
		const [contentHeight, setContentHeight] = useState<string>("0px");
		const [isAnimating, setIsAnimating] = useState(false);
		const { isOpen, headerId, contentId } = React.useContext(AccordionItemContext);
		const { size, variant } = useAccordionContext();
		useLayoutEffect(() => {
			const innerElement = innerContentRef.current;
			if (!innerElement) return;
			if (isOpen) {
				setIsAnimating(true);
				innerElement.style.height = "auto";
				const naturalHeight = innerElement.scrollHeight;
				requestAnimationFrame(() => {
					setContentHeight(`${naturalHeight}px`);
				});
			} else {
				setIsAnimating(true);
				const currentHeight = innerElement.scrollHeight;
				setContentHeight(`${currentHeight}px`);
				requestAnimationFrame(() => {
					setContentHeight("0px");
				});
			}
		}, [isOpen]);
		const handleTransitionEnd = useCallback(() => {
			if (isOpen) {
				setContentHeight("auto");
			}
			setIsAnimating(false);
		}, [isOpen]);
		const contentClasses = clsx(
			accordionContentVariants({ state: isOpen ? "open" : "closed", size, variant }),
			className
		);
		return (
			<div
				ref={ref}
				className={contentClasses}
				style={{ ...style, height: contentHeight }}
				onTransitionEnd={handleTransitionEnd}
				id={contentId}
				aria-labelledby={headerId}
				aria-hidden={!isOpen && !isAnimating}
				{...restProps}
			>
				<div ref={innerContentRef} className={styles["lambda-accordion-content-inner"]}>
					{children}
				</div>
			</div>
		);
	}
);
AccordionContent.displayName = "AccordionContent";

// Exportación agrupada tipo Table
const Accordion = Object.assign(AccordionRoot, {
	Item: AccordionItem,
	Header: AccordionHeader,
	Content: AccordionContent,
});
export { Accordion, AccordionContext, useAccordionContext };
