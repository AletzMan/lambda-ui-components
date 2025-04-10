/* eslint-disable react-refresh/only-export-components */
import { ReactNode, forwardRef, createContext, useMemo, PropsWithChildren, FC, useContext, RefAttributes } from "react"
import { InputProps } from "../Input/Input"
import styles from "./inputGroup.module.css"
import clsx from 'clsx'
import { VariantProps, cva } from "class-variance-authority"
import { InvalidMessage } from "../_util/InvalidMessage/InvalidMessage"

export const inputGroup = cva(styles["lambda-input-group"], {
    variants: {
        size: {
            tiny: styles["lambda-input-group-tiny"],
            small: styles["lambda-input-group-small"],
            medium: styles["lambda-input-group-medium"],
            large: styles["lambda-input-group-large"],
        },
        variant: {
            outline: styles["lambda-input-group-outline"],
            flat: styles["lambda-input-group-flat"],
            underline: styles["lambda-input-group-underline"],
        },
        radius: {
            none: styles["lambda-input-group-radius-none"],
            small: styles["lambda-input-group-radius-small"],
            medium: styles["lambda-input-group-radius-medium"],
            large: styles["lambda-input-group-radius-large"],
            pill: styles["lambda-input-group-radius-pill"],
        },
        hasElements: {
            none: styles["lambda-input-group-elements-none"],
            first: styles["lambda-input-group-elements-first"],
            last: styles["lambda-input-group-elements-last"],
            both: styles["lambda-input-group-elements-both"]
        },
        invalid: {
            true: styles["lambda-input-group-invalid"],
            false: "",
        },
        disabled: {
            false: styles["lambda-input-group-enabled"],
            true: styles["lambda-input-group-disabled"],
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "medium",
        invalid: false,
        disabled: false,
    },
})


type InputGroupContextType = {
    variant?: "outline" | "flat" | "underline" | null
    radius?: "none" | "small" | "medium" | "large" | "pill" | null
    size?: "tiny" | "small" | "medium" | "large" | null
    invalid?: boolean | null
    hasElements: "none" | "first" | "last" | "both"
    disabled?: boolean | null
}

const InputGroupContext = createContext<InputGroupContextType | null>(null)

interface InputGroupProps extends Omit<InputProps, "invalid" | "disabled">, VariantProps<typeof inputGroup>, RefAttributes<HTMLDivElement> {
    prefixElement?: ReactNode
    suffixElement?: ReactNode
    errorMessage?: string
}

export const InputGroup: FC<PropsWithChildren<InputGroupProps>> = forwardRef<HTMLDivElement, InputGroupProps>(
    ({ prefixElement, suffixElement, children, variant, radius, size, invalid, disabled, errorMessage }, ref) => {
        const hasElements: "none" | "first" | "last" | "both" = prefixElement && suffixElement ? "both" : prefixElement ? "first" : suffixElement ? "last" : "none"

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
        )

        return (
            <InputGroupContext.Provider value={contextValue}>
                <div className={styles["lambda-input-group-container"]}>
                    <div ref={ref} className={clsx(inputGroup({ variant: undefined, radius, size, invalid, disabled, hasElements }))}>
                        {prefixElement && <div className={styles["lambda-input-group-start"]}>{prefixElement}</div>}
                        <div className={styles["lambda-input-group-wrapper"]}>
                            {children}
                        </div>
                        {suffixElement && <div className={styles["lambda-input-group-end"]}>{suffixElement}</div>}
                    </div>
                    {errorMessage && invalid && <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />}
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