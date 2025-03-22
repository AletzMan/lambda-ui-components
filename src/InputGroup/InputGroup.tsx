/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, forwardRef, createContext, useMemo, PropsWithChildren, FC, useContext, RefAttributes } from "react";
import { InputProps, input } from "../Input/Input";
import styles from "./inputGroup.module.css";
import clsx from 'clsx';
import { VariantProps } from "class-variance-authority";

type InputGroupContextType = {
    variant?: "outline" | "flat" | "underline" | null;
    radius?: "none" | "small" | "medium" | "large" | "pill" | null;
    size?: "small" | "medium" | "large" | null;
    error?: boolean | null;
    disabled?: boolean | null;
};

const InputGroupContext = createContext<InputGroupContextType | null>(null);

interface InputGroupProps extends Omit<InputProps, "error" | "disabled">, VariantProps<typeof input>, RefAttributes<HTMLDivElement> {
    startAddon?: ReactNode;
    endAddon?: ReactNode;
}

export const InputGroup: FC<PropsWithChildren<InputGroupProps>> = forwardRef<HTMLDivElement, InputGroupProps>( // Añadimos forwardRef aquí
    ({ startAddon, endAddon, children, variant, radius, size, error, disabled, ...props }, ref) => { // Recibimos props y ref como argumentos separados

        const contextValue = useMemo(
            () => ({
                variant: variant ?? null,
                radius: radius ?? null,
                size: size ?? null,
                error: error ?? null,
                disabled: disabled ?? null,
            }),
            [variant, radius, size, error, disabled]
        );

        return (
            <InputGroupContext.Provider value={contextValue}>
                <div ref={ref} className={clsx(styles["lambda-input-group"], input({ variant, radius, size, error, disabled }))}>
                    {startAddon && <div className={styles["lambda-input-group__start"]}>{startAddon}</div>}
                    {children}
                    {endAddon && <div className={styles["lambda-input-group__end"]}>{endAddon}</div>}
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