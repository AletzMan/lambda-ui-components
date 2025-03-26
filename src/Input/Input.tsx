/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { ChangeEvent, forwardRef, HTMLInputTypeAttribute, useState, MouseEvent, FocusEvent } from "react"
import styles from "./input.module.css"
import { cva, VariantProps } from "class-variance-authority"
import { Eye, EyeOff, X } from "lucide-react"
import clsx from 'clsx'
import { useInputGroup } from "../InputGroup/InputGroup"

export const input = cva(styles["lambda_input__wrapper"], {
    variants: {
        size: {
            tiny: styles["lambda_input__wrapper--size-tiny"],
            small: styles["lambda_input__wrapper--size-small"],
            medium: styles["lambda_input__wrapper--size-medium"],
            large: styles["lambda_input__wrapper--size-large"],
        },
        variant: {
            outline: styles["lambda_input__wrapper--variant-outline"],
            flat: styles["lambda_input__wrapper--variant-flat"],
            underline: styles["lambda_input__wrapper--variant-underline"],
        },
        type: {
            text: styles["lambda_input__wrapper--type-text"],
            search: styles["lambda_input__wrapper--type-search"],
            password: styles["lambda_input__wrapper--type-password"],
            email: styles["lambda_input__wrapper--type-email"],
        },
        radius: {
            none: styles["lambda_input__wrapper--radius-none"],
            small: styles["lambda_input__wrapper--radius-small"],
            medium: styles["lambda_input__wrapper--radius-medium"],
            large: styles["lambda_input__wrapper--radius-large"],
            pill: styles["lambda_input__wrapper--radius-pill"],
        },
        error: {
            true: styles["lambda_input__wrapper--error-true"],
            false: "",
        },
        hasElements: {
            none: styles["lambda_input__wrapper--elements-none"],
            first: styles["lambda_input__wrapper--elements-first"],
            last: styles["lambda_input__wrapper--elements-last"],
            both: styles["lambda_input__wrapper--elements-both"]
        },
        disabled: {
            false: styles["lambda_input__wrapper--disabled-false"],
            true: styles["lambda_input__wrapper--disabled-true"],
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        type: "text",
        error: false,
        disabled: false,
    },
})

const labels = cva(styles["lambda_input__label"], {
    variants: {
        size: {
            tiny: styles["lambda_input__label--size-tiny"],
            small: styles["lambda_input__label--size-small"],
            medium: styles["lambda_input__label--size-medium"],
            large: styles["lambda_input__label--size-large"],
        },
        radius: {
            none: styles["lambda_input__label--radius-none"],
            small: styles["lambda_input__label--radius-small"],
            medium: styles["lambda_input__label--radius-medium"],
            large: styles["lambda_input__label--radius-large"],
            pill: styles["lambda_input__label--radius-pill"],
        },
        hasElements: {
            none: styles["lambda_input__label--elements-none"],
            first: styles["lambda_input__label--elements-first"],
            last: styles["lambda_input__label--elements-last"],
            both: styles["lambda_input__label--elements-both"]
        },

    },
    defaultVariants: {
        radius: "small",
        size: "medium",
    },
})

const textInput = cva(styles["lambda_input__field"], {
    variants: {
        size: {
            tiny: styles["lambda_input__field--size-tiny"],
            small: styles["lambda_input__field--size-small"],
            medium: styles["lambda_input__field--size-medium"],
            large: styles["lambda_input__field--size-large"],
        },
        disabled: {
            false: styles["lambda_input__field--disabled-false"],
            true: styles["lambda_input__field--disabled-true"],
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false
    }
})

const errorlabel = cva(styles["lambda_input__error"], {
    variants: {
        size: {
            tiny: styles["lambda_input__error--size-tiny"],
            small: styles["lambda_input__error--size-small"],
            medium: styles["lambda_input__error--size-medium"],
            large: styles["lambda_input__error--size-large"],
        },
    },
    defaultVariants: {
        size: "medium"
    }
})

const buttonPassword = cva(styles["lambda_input__toggle-password"], {
    variants: {
        size: {
            tiny: styles["lambda_input__toggle-password--tiny"],
            small: styles["lambda_input__toggle-password--small"],
            medium: styles["lambda_input__toggle-password--medium"],
            large: styles["lambda_input__toggle-password--large"],
        },
        variant: {
            outline: styles["lambda_input__toggle-password--outline"],
            flat: styles["lambda_input__toggle-password--flat"],
            underline: styles["lambda_input__toggle-password--underline"],
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "outline"
    }
})



export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type">, VariantProps<typeof input> {
    label?: string,
    error?: boolean,
    errorMessage?: string
    floatingLabel?: boolean
    helperText?: string
    isRequired?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant: propVariant, radius: propRadius, size: propSize, label, error, errorMessage, disabled, type = "text", value: controlledValue, onChange, isRequired, floatingLabel, placeholder, helperText, ...props }, ref) => {
        let contextVariant, contextRadius, contextSize, isGroup, contextDisabled, contextError, hasElements: "none" | "first" | "last" | "both"
        try {
            const context = useInputGroup()
            contextVariant = context.variant
            contextRadius = context.radius
            contextSize = context.size
            contextDisabled = context.disabled
            contextError = context.error
            hasElements = context.hasElements
            isGroup = true
        } catch (e) {
            contextVariant = propVariant
            contextRadius = propRadius
            contextSize = propSize
            contextDisabled = disabled
            contextError = error
            isGroup = false
            hasElements = "none"
        }
        const [showPassword, setShowPassword] = useState(false)
        const [internalValue, setInternalValue] = useState("")
        const [isLabelFloating, setIsLabelFloating] = useState(false)
        const [isFocused, setIsFocused] = useState(false)

        const isControlled = controlledValue !== undefined
        const value = isControlled ? controlledValue : internalValue

        const isPasswordType = type === "password"
        const isSearchType = type === "search"
        const inputType = isPasswordType && showPassword ? "text" : type

        const togglePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            if (isPasswordType) {
                setShowPassword((prev) => !prev)
            }
        }

        const clearInput = () => {
            if (isSearchType) {
                if (!isControlled) setInternalValue("")
                if (onChange) onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
            }
        }

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value
            if (!isControlled) {
                setInternalValue(newValue)
            }
            if (onChange) {
                onChange(e)
            }
            if (floatingLabel) {
                setIsLabelFloating(!!newValue || isFocused)
            }
        }

        const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
            e.preventDefault()
            setIsFocused(true)
            if (floatingLabel) {
                setIsLabelFloating(true)
            }
        }

        const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
            e.preventDefault()
            setIsFocused(false)
            if (floatingLabel && !value) {
                setIsLabelFloating(false)
            }
        }

        const inputPlaceholder = floatingLabel ? "" : placeholder

        return (
            <div className={clsx(styles["lambda_input"], { [styles["lambda_input--disabled-true"]]: contextDisabled, [styles["lambda_input--group"]]: isGroup })}>
                {label && (
                    <label className={clsx(labels({ radius: contextRadius, size: contextSize, hasElements }), {
                        [styles["lambda_input__label--floating"]]: floatingLabel && isLabelFloating,
                        [styles["lambda_input__label--default"]]: floatingLabel && !isLabelFloating,
                        [styles["lambda_input__label--placeholder"]]: floatingLabel && !isLabelFloating,
                        [styles["lambda_input__label--isRequired"]]: isRequired,
                    })}>
                        {`${label as string}`}
                    </label>
                )}
                {helperText && <label className={clsx(styles["lambda_input--helper"], { [styles["lambda_input--helper-disabled"]]: disabled })}>{helperText}</label>}
                <div className={clsx(input({ variant: contextVariant, disabled: contextDisabled, radius: contextRadius, size: contextSize, error: contextError, type, hasElements, className }), { [styles["lambda_input__wrapper--group"]]: isGroup })}>
                    <div className={clsx(styles["lambda_input__input-wrapper"], { [styles["lambda_input__input-wrapper--password"]]: isPasswordType || isSearchType })}>
                        <input
                            ref={ref}
                            value={value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            type={inputType as HTMLInputTypeAttribute}
                            className={clsx(textInput({ size: contextSize, disabled: contextDisabled }), { [styles["lambda_input__field--showPassword"]]: isPasswordType && !showPassword && value.toString().length > 0 })}
                            disabled={contextDisabled || undefined}
                            placeholder={inputPlaceholder}
                            {...props}
                        />
                        {isPasswordType && (
                            <button onClick={togglePasswordVisibility} className={buttonPassword({ size: contextSize, variant: contextVariant })}>
                                {showPassword ? <Eye className={styles["lambda_input__icon"]} /> : <EyeOff className={styles["lambda_input__icon"]} />}
                            </button>
                        )}
                        {isSearchType && value && (
                            <span onClick={clearInput} className={styles["lambda_input__clear-search"]}>
                                <X className={styles["lambda_input__clear-search-icon"]} />
                            </span>
                        )}
                    </div>
                </div>
                {contextError && errorMessage && <span className={errorlabel({ size: contextSize })}>{errorMessage}</span>}
            </div>
        )
    }
)