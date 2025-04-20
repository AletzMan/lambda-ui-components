import React, { ChangeEvent, forwardRef, HTMLInputTypeAttribute, useState, MouseEvent, useId } from "react"
import styles from "./input.module.css"
import { VariantProps } from "class-variance-authority"
import { CircleX, Eye, EyeOff, X } from "lucide-react"
import clsx from 'clsx'
import { useInputGroup } from "../InputGroup/InputGroup"
import { InvalidMessage } from "../_util/InvalidMessage/InvalidMessage"
import { HelperText } from "../_util/HelperText/HelperText"
import { buttonPassword, input, labels, lambdaInput, textInput } from "./input.variants"


export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type" | "onChange" | "value">, VariantProps<typeof input> {
    label?: string,
    invalid?: boolean,
    errorMessage?: string
    floatingLabel?: boolean
    helperText?: string
    required?: boolean
    onChange?: (value: string) => void
    value?: string
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
        } catch (_e) {
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
        const inputId = useId();

        const errorId = errorMessage ? `${inputId}-error` : undefined;
        const helperId = helperText ? `${inputId}-helper` : undefined;
        const describedByIds = [errorId, helperId].filter(Boolean).join(" ");

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
                if (onChange) onChange("")
            }
        }

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value
            if (!isControlled) {
                setInternalValue(newValue)
            }
            if (onChange) {
                onChange(e.currentTarget.value)
            }
            if (floatingLabel) {
                setIsLabelFloating(!!newValue || isFocused)
            }
        }

        const handleFocus = () => {
            setIsFocused(true)
            if (floatingLabel) {
                setIsLabelFloating(true)
            }
        }

        const handleBlur = () => {
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
                    })} htmlFor={inputId} >
                        {`${label as string}`}
                    </label>
                )}
                {helperText && <HelperText id={helperId} text={helperText} size={contextSize} disabled={contextDisabled} focused={isFocused} />}
                <div className={clsx(input({ variant: contextVariant, disabled: contextDisabled, radius: contextRadius, size: contextSize, invalid: contextInvalid, type, hasElements }), { [styles["lambda-input-wrapper-group"]]: isGroup })}>
                    <div className={clsx(styles["lambda-input-input-wrapper"], { [styles["lambda-input-input-wrapper-password"]]: isPasswordType || isSearchType })}>
                        <input
                            ref={ref}
                            value={value}
                            id={inputId}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required={required}
                            aria-invalid={contextInvalid || undefined}
                            aria-describedby={describedByIds || undefined}
                            type={inputType as HTMLInputTypeAttribute}
                            className={clsx(textInput({ size: contextSize, disabled: contextDisabled }), { [styles["lambda-input-field-showPassword"]]: isPasswordType && !showPassword && value.length > 0 })}
                            disabled={contextDisabled || undefined}
                            placeholder={inputPlaceholder}
                            {...props}
                        />
                        {isPasswordType && (
                            <button onClick={togglePasswordVisibility} className={buttonPassword({ size: contextSize, variant: contextVariant })} type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}  >
                                {showPassword ? <Eye className={styles["lambda-input-icon"]} /> : <EyeOff className={styles["lambda-input-icon"]} />}
                            </button>
                        )}
                        {isSearchType && value && (
                            <button // Cambiar span a button
                                type="button" // Añadir tipo
                                onClick={clearInput}
                                aria-label="Limpiar búsqueda" // Añadir ARIA label
                                className={styles["lambda-input-clear-search"]} // Asegúrate que los estilos funcionen en un button
                            >
                                <X className={styles["lambda-input-clear-search-icon"]} />
                            </button>
                        )}
                        {contextInvalid && <CircleX className={clsx(styles["lambda-input-invalid-icon"], { [styles["lambda-input-invalid-icon-password"]]: isPasswordType || isSearchType })} />}
                    </div>
                </div>
                {contextInvalid && errorMessage && !isGroup && <InvalidMessage id={errorId} errorMessage={errorMessage} invalid={contextInvalid} size={contextSize} />}
            </div>
        )
    }
)