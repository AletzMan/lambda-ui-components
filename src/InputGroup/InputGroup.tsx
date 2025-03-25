
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, forwardRef, createContext, useMemo, PropsWithChildren, FC, useContext, RefAttributes } from "react"
import { InputProps } from "../Input/Input"
import styles from "./inputGroup.module.css"
import clsx from 'clsx'
import { VariantProps, cva } from "class-variance-authority"


export const inputGroup = cva(styles["lambda-input-group"], {
    variants: {
        size: {
            tiny: styles["lambda-input-group--size-tiny"],
            small: styles["lambda-input-group--size-small"],
            medium: styles["lambda-input-group--size-medium"],
            large: styles["lambda-input-group--size-large"],
        },
        variant: {
            outline: styles["lambda-input-group--variant-outline"],
            flat: styles["lambda-input-group--variant-flat"],
            underline: styles["lambda-input-group--variant-underline"],
        },
        radius: {
            none: styles["lambda-input-group--radius-none"],
            small: styles["lambda-input-group--radius-small"],
            medium: styles["lambda-input-group--radius-medium"],
            large: styles["lambda-input-group--radius-large"],
            pill: styles["lambda-input-group--radius-pill"],
        },
        hasElements: {
            none: styles["lambda-input-group--elements-none"],
            first: styles["lambda-input-group--elements-first"],
            last: styles["lambda-input-group--elements-last"],
            both: styles["lambda-input-group--elements-both"]
        },
        error: {
            true: styles["lambda-input-group--error-true"],
            false: "",
        },
        disabled: {
            false: styles["lambda-input-group--disabled-false"],
            true: styles["lambda-input-group--disabled-true"],
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "medium",
        error: false,
        disabled: false,
    },
})

type InputGroupContextType = {
    variant?: "outline" | "flat" | "underline" | null
    radius?: "none" | "small" | "medium" | "large" | "pill" | null
    size?: "tiny" | "small" | "medium" | "large" | null
    error?: boolean | null
    hasElements: "none" | "first" | "last" | "both"
    disabled?: boolean | null
}

const InputGroupContext = createContext<InputGroupContextType | null>(null)

interface InputGroupProps extends Omit<InputProps, "error" | "disabled">, VariantProps<typeof inputGroup>, RefAttributes<HTMLDivElement> {
    prefixElement?: ReactNode
    suffixElement?: ReactNode
}

export const InputGroup: FC<PropsWithChildren<InputGroupProps>> = forwardRef<HTMLDivElement, InputGroupProps>(
    ({ prefixElement, suffixElement, children, variant, radius, size, error, disabled, }, ref) => {
        const hasElements: "none" | "first" | "last" | "both" = prefixElement && suffixElement ? "both" : prefixElement ? "first" : suffixElement ? "last" : "none"


        const contextValue = useMemo(
            () => ({
                variant: variant ?? "outline",
                radius: radius ?? "medium",
                size: size ?? "medium",
                error: error ?? false,
                hasElements: hasElements,
                disabled: disabled ?? false,
            }),
            [variant, radius, size, error, disabled, hasElements]
        )

        return (
            <InputGroupContext.Provider value={contextValue}>
                <div ref={ref} className={clsx(inputGroup({ variant: undefined, radius, size, error, disabled, hasElements }))}>
                    {prefixElement && <div className={styles["lambda-input-group__start"]}>{prefixElement}</div>}
                    {children}
                    {suffixElement && <div className={styles["lambda-input-group__end"]}>{suffixElement}</div>}
                </div>
            </InputGroupContext.Provider>
        )
    }
)

export const useInputGroup = () => {
    const context = useContext(InputGroupContext)
    if (!context) {
        throw new Error("useInputGroup must be used within an InputGroup")
    }
    return context
}


export default InputGroup // Exportamos el componente con forwardRef