/* eslint-disable react-refresh/only-export-components */
import { ReactNode, forwardRef, createContext, useMemo, PropsWithChildren, FC, useContext, RefAttributes, useRef } from "react";
import { InputProps } from "../Input/Input";
import styles from "./inputGroup.module.css";
import clsx from 'clsx';
import { VariantProps } from "class-variance-authority";
import { InvalidMessage } from "../_internal/components/InvalidMessage/InvalidMessage";
import { inputGroup } from "./inputgroup.variants";



type InputGroupContextType = {
    variant?: "outline" | "flat" | "underline" | null
    radius?: "none" | "small" | "medium" | "large" | "pill" | null
    size?: "tiny" | "small" | "medium" | "large" | null
    invalid?: boolean | null
    hasElements: "none" | "first" | "last" | "both"
    disabled?: boolean | null
}

const InputGroupContext = createContext<InputGroupContextType | null>(null);

interface InputGroupProps extends Omit<InputProps, "invalid" | "disabled">, VariantProps<typeof inputGroup>, RefAttributes<HTMLDivElement> {
    prefixElement?: ReactNode
    suffixElement?: ReactNode
    errorMessage?: string
}

export const InputGroup: FC<PropsWithChildren<InputGroupProps>> = forwardRef<HTMLDivElement, InputGroupProps>(
    ({ prefixElement, suffixElement, children, variant, radius, size, invalid, disabled, errorMessage }, ref) => {
        const hasElements: "none" | "first" | "last" | "both" = prefixElement && suffixElement ? "both" : prefixElement ? "first" : suffixElement ? "last" : "none";
        const refPrefix = useRef<HTMLDivElement>(null);

        const contextValue = useMemo(
            () => ({
                variant: variant ?? "outline",
                radius: radius ?? "medium",
                size: size ?? "medium",
                invalid: invalid ?? false,
                hasElements: hasElements,
                disabled: disabled ?? false,
            }),
            [variant, radius, size, invalid, disabled, hasElements]
        );

        return (
            <InputGroupContext.Provider value={contextValue}>
                <div className={styles["lambda-input-group-container"]}>
                    <div ref={ref} className={clsx(inputGroup({ variant: undefined, radius, size, invalid, disabled, hasElements }))}>
                        {prefixElement && <div className={styles["lambda-input-group-start"]} ref={refPrefix}>{prefixElement}</div>}
                        <div className={styles["lambda-input-group-wrapper"]}>
                            {children}
                        </div>
                        {suffixElement && <div className={styles["lambda-input-group-end"]}>{suffixElement}</div>}
                    </div>
                    {errorMessage && invalid && <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} marginArrow={refPrefix?.current?.getBoundingClientRect().width} />}
                </div>
            </InputGroupContext.Provider>
        );
    }
);

export const useInputGroup = () => {
    const context = useContext(InputGroupContext);
    if (!context) {
        throw new Error("useInputGroup must be used within an InputGroup");
    }
    return context;
};

export default InputGroup; // Exportamos el componente con forwardRef