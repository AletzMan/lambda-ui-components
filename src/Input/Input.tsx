import { ChangeEvent, forwardRef, HTMLInputTypeAttribute, useState, MouseEvent } from "react";
import styles from "./input.module.css"
import { cva, VariantProps } from "class-variance-authority";
import { Eye, EyeOff, X, } from "lucide-react";

const input = cva(styles.base, {
    variants: {
        size: {
            small: styles.sm,
            medium: styles.md,
            large: styles.lg,
        },
        variant: {
            outline: styles.outline,
            flat: styles.flat,
            underline: styles.underline,
        },
        type: {
            text: styles.text,
            search: styles.search,
            password: styles.password,
            email: styles.email,
        },
        radius: {
            none: styles.none,
            small: styles.small,
            medium: styles.medium,
            pill: styles.pill,
        },
        error: {
            true: styles.is_error,
            false: ''
        },
        disabled: {
            false: styles.enabled,
            true: styles.disabled,
        },
    },
    compoundVariants: [
        { type: 'password', size: 'small', className: styles.password_sm },
        { type: 'password', size: 'medium', className: styles.password_md },
        { type: 'password', size: 'large', className: styles.password_md },
        { type: 'search', size: 'small', className: styles.search_sm },
        { type: 'search', size: 'medium', className: styles.search_md },
        { type: 'search', size: 'large', className: styles.search_md },
    ],
    defaultVariants: {
        variant: "outline",
        size: 'medium',
        radius: 'small',
        error: false,
        disabled: false,
    },
})



const labels = cva(styles.label, {
    variants: {
        size: {
            small: styles.label_sm,
            medium: styles.label_md,
            large: styles.label_lg,
        },
        radius: {
            none: styles.label_none,
            small: styles.label_small,
            medium: styles.label_medium,
            pill: styles.label_pill,
        }
    },
    compoundVariants: [

    ],
    defaultVariants: {
        radius: 'small',
        size: 'medium'
    },
})

const textInput = cva(styles.input, {
    variants: {
        size: {
            small: styles.input_sm,
            medium: styles.input_md,
            large: styles.input_lg,
        },
    },
})

const errorlabel = cva(styles.error, {
    variants: {
        size: {
            small: styles.error_sm,
            medium: styles.error_md,
            large: styles.error_lg,
        },
    },
})

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type">,
    VariantProps<typeof input> { label?: string, error?: boolean, errorMessage?: string; }
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            radius, size, label, error, errorMessage,
            disabled, type = "text", value: controlledValue,
            onChange,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const [internalValue, setInternalValue] = useState("")

        const isControlled = controlledValue !== undefined
        const value = isControlled ? controlledValue : internalValue

        const isPasswordType = type === "password"
        const isSearchType = type === 'search'
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
        };

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalValue(e.target.value)
            }
            if (onChange) {
                onChange(e)
            }
        }

        return (
            <div className={`${styles.container} ${disabled && styles.container_disabled}`} >
                {label && (
                    <label className={labels({ radius, size })}>
                        {`${label as string}`}
                    </label>
                )}
                <div className={input({ variant, disabled, radius, size, error, type, className })}>
                    <div className={styles.inputWrapper}>
                        <input
                            ref={ref}
                            value={value}
                            onChange={handleChange}
                            type={inputType as HTMLInputTypeAttribute}
                            className={textInput({ size })}
                            disabled={disabled || undefined}
                            {...props}
                        />
                        {isPasswordType && (
                            <button
                                onClick={togglePasswordVisibility}
                                className={`${styles.togglePassword} ${variant === 'flat' && styles.togglePassword_flat}`}
                            >
                                {showPassword ? <EyeOff className={styles.icon} /> : <Eye className={styles.icon} />}
                            </button>
                        )}
                        {isSearchType && value && (
                            <span
                                onClick={clearInput}
                                className={styles.clearSearch}
                            >
                                <X className={styles.clearSearch_icon} />
                            </span>
                        )}
                    </div>
                </div>
                {error && errorMessage && <span className={errorlabel({ size })}>{errorMessage}</span>}
            </div>
        );
    }
)