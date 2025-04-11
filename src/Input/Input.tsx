/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { ChangeEvent, forwardRef, HTMLInputTypeAttribute, useState, MouseEvent, FocusEvent } from "react"
import styles from "./input.module.css"
import { cva, VariantProps } from "class-variance-authority"
import { CircleX, Eye, EyeOff, X } from "lucide-react"
import clsx from 'clsx'
import { useInputGroup } from "../InputGroup/InputGroup"
import { InvalidMessage } from "../_util/InvalidMessage/InvalidMessage"

export const lambdaInput = cva(styles["lambda-input"], {
    variants: {
        size: {
            tiny: styles["lambda-input-tiny"],
            small: styles["lambda-input-small"],
            medium: styles["lambda-input-medium"],
            large: styles["lambda-input-large"],
        },
        radius: {
            none: styles["lambda-input-radius-none"],
            small: styles["lambda-input-radius-small"],
            medium: styles["lambda-input-radius-medium"],
            large: styles["lambda-input-radius-large"],
            pill: styles["lambda-input-radius-pill"],
        },
        disabled: {
            false: styles["lambda-input-enabled"],
            true: styles["lambda-input-disabled"],
        },
        invalid: {
            true: styles["lambda-input-invalid"],
            false: "",
        },
    },
    defaultVariants: {
        radius: "small",
        disabled: false,
    },
})
export const input = cva(styles["lambda-input-wrapper"], {
    variants: {
        size: {
            tiny: styles["lambda-input-wrapper-tiny"],
            small: styles["lambda-input-wrapper-small"],
            medium: styles["lambda-input-wrapper-medium"],
            large: styles["lambda-input-wrapper-large"],
        },
        variant: {
            outline: styles["lambda-input-wrapper-outline"],
            flat: styles["lambda-input-wrapper-flat"],
            underline: styles["lambda-input-wrapper-underline"],
        },
        type: {
            text: styles["lambda-input-wrapper-text"],
            search: styles["lambda-input-wrapper-search"],
            password: styles["lambda-input-wrapper-password"],
            email: styles["lambda-input-wrapper-email"],
        },
        radius: {
            none: styles["lambda-input-wrapper-radius-none"],
            small: styles["lambda-input-wrapper-radius-small"],
            medium: styles["lambda-input-wrapper-radius-medium"],
            large: styles["lambda-input-wrapper-radius-large"],
            pill: styles["lambda-input-wrapper-radius-pill"],
        },
        invalid: {
            true: styles["lambda-input-wrapper-invalid"],
            false: "",
        },
        hasElements: {
            none: styles["lambda-input-wrapper-elements-none"],
            first: styles["lambda-input-wrapper-elements-first"],
            last: styles["lambda-input-wrapper-elements-last"],
            both: styles["lambda-input-wrapper-elements-both"]
        },
        disabled: {
            false: styles["lambda-input-wrapper-enabled"],
            true: styles["lambda-input-wrapper-disabled"],
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        type: "text",
        hasElements: "none",
        invalid: false,
        disabled: false,
    },
})

const labels = cva(styles["lambda-input-label"], {
    variants: {
        size: {
            tiny: styles["lambda-input-label-tiny"],
            small: styles["lambda-input-label-small"],
            medium: styles["lambda-input-label-medium"],
            large: styles["lambda-input-label-large"],
        },
        radius: {
            none: styles["lambda-input-label-radius-none"],
            small: styles["lambda-input-label-radius-small"],
            medium: styles["lambda-input-label-radius-medium"],
            large: styles["lambda-input-label-radius-large"],
            pill: styles["lambda-input-label-radius-pill"],
        },
        hasElements: {
            none: styles["lambda-input-label-elements-none"],
            first: styles["lambda-input-label-elements-first"],
            last: styles["lambda-input-label-elements-last"],
            both: styles["lambda-input-label-elements-both"]
        },

    },
    defaultVariants: {
        radius: "small",
        size: "medium",
    },
})

const textInput = cva(styles["lambda-input-field"], {
    variants: {
        size: {
            tiny: styles["lambda-input-field-tiny"],
            small: styles["lambda-input-field-small"],
            medium: styles["lambda-input-field-medium"],
            large: styles["lambda-input-field-large"],
        },
        disabled: {
            false: styles["lambda-input-field-disabled"],
            true: styles["lambda-input-field-enabled"],
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false
    }
})


const buttonPassword = cva(styles["lambda-input-toggle-password"], {
    variants: {
        size: {
            tiny: styles["lambda-input-toggle-password-tiny"],
            small: styles["lambda-input-toggle-password-small"],
            medium: styles["lambda-input-toggle-password-medium"],
            large: styles["lambda-input-toggle-password-large"],
        },
        variant: {
            outline: styles["lambda-input-toggle-password-outline"],
            flat: styles["lambda-input-toggle-password-flat"],
            underline: styles["lambda-input-toggle-password-underline"],
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "outline"
    }
})


export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type">, VariantProps<typeof input> {
    label?: string,
    invalid?: boolean,
    errorMessage?: string
    floatingLabel?: boolean
    helperText?: string
    required?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant: propVariant, radius: propRadius, size: propSize, label, invalid, errorMessage, disabled, type = "text", value: controlledValue, onChange, required, floatingLabel, placeholder, helperText, ...props }, ref) => {
        let contextVariant, contextRadius, contextSize, isGroup, contextDisabled, contextInvalid, hasElements: "none" | "first" | "last" | "both"
        try {
            const context = useInputGroup()
            contextVariant = context.variant
            contextRadius = context.radius
            contextSize = context.size
            contextDisabled = context.disabled
            contextInvalid = context.invalid
            hasElements = context.hasElements
            isGroup = true
        } catch (e) {
            contextVariant = propVariant
            contextRadius = propRadius
            contextSize = propSize
            contextDisabled = disabled
            contextInvalid = invalid
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
            <div className={clsx(lambdaInput({ radius: contextRadius, disabled: contextDisabled, size: contextSize, invalid: contextInvalid, className }), { [styles["lambda-input-group"]]: isGroup, [styles["lambda-input-group-helper"]]: isGroup && helperText })}>
                {label && (
                    <label className={clsx(labels({ radius: contextRadius, size: contextSize, hasElements }), {
                        [styles["lambda-input-label-floating"]]: floatingLabel && isLabelFloating,
                        [styles["lambda-input-label-default"]]: floatingLabel && !isLabelFloating,
                        [styles["lambda-input-label-placeholder"]]: floatingLabel && !isLabelFloating,
                        [styles["lambda-input-label-required"]]: required,
                    })}>
                        {`${label as string}`}
                    </label>
                )}
                {helperText && <label className={clsx(styles["lambda-input-helper"], { [styles["lambda-input-helper-disabled"]]: disabled })}>{helperText}</label>}
                <div className={clsx(input({ variant: contextVariant, disabled: contextDisabled, radius: contextRadius, size: contextSize, invalid: contextInvalid, type, hasElements }), { [styles["lambda-input-wrapper-group"]]: isGroup })}>
                    <div className={clsx(styles["lambda-input-input-wrapper"], { [styles["lambda-input-input-wrapper--password"]]: isPasswordType || isSearchType })}>
                        <input
                            ref={ref}
                            value={value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            type={inputType as HTMLInputTypeAttribute}
                            className={clsx(textInput({ size: contextSize, disabled: contextDisabled }), { [styles["lambda-input-field-showPassword"]]: isPasswordType && !showPassword && value.toString().length > 0 })}
                            disabled={contextDisabled || undefined}
                            placeholder={inputPlaceholder}
                            {...props}
                        />
                        {isPasswordType && (
                            <button onClick={togglePasswordVisibility} className={buttonPassword({ size: contextSize, variant: contextVariant })}>
                                {showPassword ? <Eye className={styles["lambda-input-icon"]} /> : <EyeOff className={styles["lambda-input-icon"]} />}
                            </button>
                        )}
                        {isSearchType && value && (
                            <span onClick={clearInput} className={styles["lambda-input-clear-search"]}>
                                <X className={styles["lambda-input-clear-search-icon"]} />
                            </span>
                        )}
                        {contextInvalid && <CircleX className={clsx(styles["lambda-input-invalid-icon"], { [styles["lambda-input-invalid-icon-password"]]: isPasswordType || isSearchType })} />}
                    </div>
                </div>
                {contextInvalid && errorMessage && !isGroup && <InvalidMessage errorMessage={errorMessage} invalid={contextInvalid} size={contextSize} />}
            </div>
        )
    }
)