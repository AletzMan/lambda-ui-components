import React, {
  forwardRef,
  useCallback,
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
  useId,
  Children,
  cloneElement,
  isValidElement,
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
  AccordionHeaderFinalInjectedProps,
  AccordionHeaderInjectedProps,
  AccordionContentFinalInjectedProps,
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
    const [uncontrolledActiveValue, setUncontrolledActiveValue] = useState<AccordionValue>(defaultValue);
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

// --- AccordionItem ---
const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, disabled = false, className, style }, ref) => {
    const { activeValue, size, variant, radius } = useAccordionContext();
    const isOpen = activeValue === value;
    const itemUniqueIdPrefix = useId();
    const headerId = `accordion-header-${itemUniqueIdPrefix}`;
    const contentId = `accordion-content-${itemUniqueIdPrefix}`;
    const itemClasses = clsx(
      accordionItemVariants({ state: isOpen ? "open" : "closed", disabled, variant, radius }),
      className
    );
    const renderedChildren = Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      if ((child.type as any).displayName === AccordionHeader.displayName) {
        const injectedProps: AccordionHeaderFinalInjectedProps = {
          itemvalue: value,
          isopen: isOpen,
          disabled,
          headerid: headerId,
          contentid: contentId,
          size,
          variant,
          ...(child.props as AccordionHeaderProps),
        };
        return cloneElement(child, injectedProps);
      }
      if ((child.type as any).displayName === AccordionContent.displayName) {
        const injectedProps: AccordionContentFinalInjectedProps = {
          itemvalue: value,
          isopen: isOpen,
          headerid: headerId,
          contentid: contentId,
          variant,
          size,
          ...(child.props as AccordionContentProps),
        };
        return cloneElement(child, injectedProps);
      }
      return child;
    });
    return (
      <div ref={ref} className={itemClasses} style={style}>
        {renderedChildren}
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

// --- AccordionHeader ---
const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ children, className, style, disabled, ...restProps }, ref) => {
    const { onValueChange } = useAccordionContext();
    const { itemvalue, isopen, size, variant, headerid, contentid } = restProps as AccordionHeaderInjectedProps & {
      headerid?: string;
      contentid?: string;
    };
    const headerId = headerid || useId();
    const contentId = contentid || `content-${headerId}`;
    const handleHeaderClick = useCallback(() => {
      onValueChange(itemvalue);
    }, [itemvalue, onValueChange]);
    const headerClasses = clsx(
      accordionHeaderVariants({ state: isopen ? "open" : "closed", disabled, size, variant }),
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
        aria-expanded={isopen || false}
        aria-controls={contentId}
        disabled={disabled}
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
    const injectedPropsFinal = restProps as AccordionContentFinalInjectedProps;
    const isItemOpen = injectedPropsFinal.isopen;
    const headerIdFinal = injectedPropsFinal.headerid;
    const contentIdFinal = injectedPropsFinal.contentid;
    const variant = injectedPropsFinal.variant;
    const size = injectedPropsFinal.size;
    useLayoutEffect(() => {
      const innerElement = innerContentRef.current;
      if (!innerElement) return;
      if (isItemOpen) {
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
    }, [isItemOpen, injectedPropsFinal.itemvalue]);
    const handleTransitionEnd = useCallback(() => {
      if (isItemOpen) {
        setContentHeight("auto");
      }
      setIsAnimating(false);
    }, [isItemOpen]);
    const contentClasses = clsx(
      accordionContentVariants({ state: isItemOpen ? "open" : "closed", size, variant }),
      className
    );
    return (
      <div
        ref={ref}
        className={contentClasses}
        style={{ ...style, height: contentHeight }}
        onTransitionEnd={handleTransitionEnd}
        id={contentIdFinal}
        aria-labelledby={headerIdFinal}
        aria-hidden={!isItemOpen && !isAnimating}
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
