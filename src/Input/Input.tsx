import React, { ChangeEvent, forwardRef, HTMLInputTypeAttribute, useState, MouseEvent } from "react";
import styles from "./input.module.css";
import { cva, VariantProps } from "class-variance-authority";
import { Eye, EyeOff, X } from "lucide-react";
import clsx from 'clsx';

const input = cva(styles["lambda-input__wrapper"], {
    variants: {
        size: {
            small: styles["lambda-input__wrapper--size-small"],
            medium: styles["lambda-input__wrapper--size-medium"],
            large: styles["lambda-input__wrapper--size-large"],
        },
        variant: {
            outline: styles["lambda-input__wrapper--variant-outline"],
            flat: styles["lambda-input__wrapper--variant-flat"],
            underline: styles["lambda-input__wrapper--variant-underline"],
        },
        type: {
            text: styles["lambda-input__wrapper--type-text"],
            search: styles["lambda-input__wrapper--type-search"],
            password: styles["lambda-input__wrapper--type-password"],
            email: styles["lambda-input__wrapper--type-email"],
        },
        radius: {
            none: styles["lambda-input__wrapper--radius-none"],
            small: styles["lambda-input__wrapper--radius-small"],
            medium: styles["lambda-input__wrapper--radius-medium"],
            pill: styles["lambda-input__wrapper--radius-pill"],
        },
        error: {
            true: styles["lambda-input__wrapper--error-true"],
            false: "",
        },
        disabled: {
            false: styles["lambda-input__wrapper--disabled-false"],
            true: styles["lambda-input__wrapper--disabled-true"],
        },
    },
    compoundVariants: [
        { type: "password", size: "small", className: styles["lambda-input__wrapper--password-small"] },
        { type: "password", size: "medium", className: styles["lambda-input__wrapper--password-medium"] },
        { type: "password", size: "large", className: styles["lambda-input__wrapper--password-large"] },
        { type: "search", size: "small", className: styles["lambda-input__wrapper--search-small"] },
        { type: "search", size: "medium", className: styles["lambda-input__wrapper--search-medium"] },
        { type: "search", size: "large", className: styles["lambda-input__wrapper--search-large"] },
    ],
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        error: false,
        disabled: false,
    },
});

const labels = cva(styles["lambda-input__label"], {
    variants: {
        size: {
            small: styles["lambda-input__label--size-small"],
            medium: styles["lambda-input__label--size-medium"],
            large: styles["lambda-input__label--size-large"],
        },
        radius: {
            none: styles["lambda-input__label--radius-none"],
            small: styles["lambda-input__label--radius-small"],
            medium: styles["lambda-input__label--radius-medium"],
            pill: styles["lambda-input__label--radius-pill"],
        },
    },
    defaultVariants: {
        radius: "small",
        size: "medium",
    },
});

const textInput = cva(styles["lambda-input__field"], {
    variants: {
        size: {
            small: styles["lambda-input__field--size-small"],
            medium: styles["lambda-input__field--size-medium"],
            large: styles["lambda-input__field--size-large"],
        },
    },
});

const errorlabel = cva(styles["lambda-input__error"], {
    variants: {
        size: {
            small: styles["lambda-input__error--size-small"],
            medium: styles["lambda-input__error--size-medium"],
            large: styles["lambda-input__error--size-large"],
        },
    },
});

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type">, VariantProps<typeof input> { label?: string, error?: boolean, errorMessage?: string; }

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, radius, size, label, error, errorMessage, disabled, type = "text", value: controlledValue, onChange, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [internalValue, setInternalValue] = useState("");

        const isControlled = controlledValue !== undefined;
        const value = isControlled ? controlledValue : internalValue;

        const isPasswordType = type === "password";
        const isSearchType = type === "search";
        const inputType = isPasswordType && showPassword ? "text" : type;

        const togglePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (isPasswordType) {
                setShowPassword((prev) => !prev);
            }
        };

        const clearInput = () => {
            if (isSearchType) {
                if (!isControlled) setInternalValue("");
                if (onChange) onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
            }
        };

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalValue(e.target.value);
            }
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <div className={clsx(styles["lambda-input"], { [styles["lambda-input--disabled-true"]]: disabled })}>
                {label && <label className={labels({ radius, size })}>{`${label as string}`}</label>}
                <div className={input({ variant, disabled, radius, size, error, type, className })}>
                    <div className={styles["lambda-input__input-wrapper"]}>
                        <input ref={ref} value={value} onChange={handleChange} type={inputType as HTMLInputTypeAttribute} className={textInput({ size })} disabled={disabled || undefined} {...props} />
                        {isPasswordType && (
                            <button onClick={togglePasswordVisibility} className={clsx(styles["lambda-input__toggle-password"], { [styles["lambda-input__toggle-password--flat"]]: variant === "flat" })}>
                                {showPassword ? <EyeOff className={styles["lambda-input__icon"]} /> : <Eye className={styles["lambda-input__icon"]} />}
                            </button>
                        )}
                        {isSearchType && value && (
                            <span onClick={clearInput} className={styles["lambda-input__clear-search"]}>
                                <X className={styles["lambda-input__clear-search-icon"]} />
                            </span>
                        )}
                    </div>
                </div>
                {error && errorMessage && <span className={errorlabel({ size })}>{errorMessage}</span>}
            </div>
        );
    }
);