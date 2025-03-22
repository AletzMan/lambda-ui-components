/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { ChangeEvent, forwardRef, HTMLInputTypeAttribute, useState, MouseEvent, FocusEvent } from "react";
import styles from "./input.module.css";
import { cva, VariantProps } from "class-variance-authority";
import { Eye, EyeOff, X } from "lucide-react";
import clsx from 'clsx';
import { useInputGroup } from "../InputGroup/InputGroup";

export const input = cva(styles["lambda-input__wrapper"], {
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
            large: styles["lambda-input__wrapper--radius-large"],
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
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        type: "text",
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
            large: styles["lambda-input__wrapper--radius-large"],
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
    defaultVariants: {
        size: "medium"
    }
});

const errorlabel = cva(styles["lambda-input__error"], {
    variants: {
        size: {
            small: styles["lambda-input__error--size-small"],
            medium: styles["lambda-input__error--size-medium"],
            large: styles["lambda-input__error--size-large"],
        },
    },
    defaultVariants: {
        size: "medium"
    }
});

const buttonPassword = cva(styles["lambda-input__toggle-password"], {
    variants: {
        size: {
            small: styles["lambda-input__toggle-password--small"],
            medium: styles["lambda-input__toggle-password--medium"],
            large: styles["lambda-input__toggle-password--large"],
        },
        variant: {
            outline: styles["lambda-input__toggle-password--outline"],
            flat: styles["lambda-input__toggle-password--flat"],
            underline: styles["lambda-input__toggle-password--underline"],
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "outline"
    }
});

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type">, VariantProps<typeof input> {
    label?: string,
    error?: boolean,
    errorMessage?: string;
    floatingLabel?: boolean; // Agregamos la propiedad floatingLabel
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant: propVariant, radius: propRadius, size: propSize, label, error, errorMessage, disabled, type = "text", value: controlledValue, onChange, floatingLabel, placeholder, ...props }, ref) => {
        let contextVariant, contextRadius, contextSize;
        try {
            const context = useInputGroup();
            contextVariant = context.variant;
            contextRadius = context.radius;
            contextSize = context.size;
        } catch (e) {
            contextVariant = propVariant;
            contextRadius = propRadius;
            contextSize = propSize;
        }
        const [showPassword, setShowPassword] = useState(false);
        const [internalValue, setInternalValue] = useState("");
        const [isLabelFloating, setIsLabelFloating] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

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
            const newValue = e.target.value;
            if (!isControlled) {
                setInternalValue(newValue);
            }
            if (onChange) {
                onChange(e);
            }
            if (floatingLabel) {
                setIsLabelFloating(!!newValue || isFocused);
            }
        };

        const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
            e.preventDefault();
            setIsFocused(true);
            if (floatingLabel) {
                setIsLabelFloating(true);
            }
        };

        const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
            e.preventDefault();
            setIsFocused(false);
            if (floatingLabel && !value) {
                setIsLabelFloating(false);
            }
        };

        const inputPlaceholder = floatingLabel ? "" : placeholder;

        return (
            <div className={clsx(styles["lambda-input"], { [styles["lambda-input--disabled-true"]]: disabled })}>
                {label && (
                    <label className={clsx(labels({ radius: contextRadius, size: contextSize }), {
                        [styles["lambda-input__label--floating"]]: floatingLabel && isLabelFloating,
                        [styles["lambda-input__label--default"]]: floatingLabel && !isLabelFloating,
                        [styles["lambda-input__label--placeholder"]]: floatingLabel && !isLabelFloating,
                    })}>
                        {`${label as string}`}
                    </label>
                )}
                <div className={clsx(input({ variant: contextVariant, disabled, radius: contextRadius, size: contextSize, error, type, className }), { [styles["lambda-input__wrapper--group"]]: contextVariant })}>
                    <div className={clsx(styles["lambda-input__input-wrapper"], { [styles["lambda-input__input-wrapper--password"]]: isPasswordType || isSearchType })}>
                        <input
                            ref={ref}
                            value={value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            type={inputType as HTMLInputTypeAttribute}
                            className={clsx(textInput({ size: contextSize }), { [styles["lambda-input__field--showPassword"]]: !showPassword })}
                            disabled={disabled || undefined}
                            placeholder={inputPlaceholder}
                            {...props}
                        />
                        {isPasswordType && (
                            <button onClick={togglePasswordVisibility} className={buttonPassword({ size: contextSize, variant: contextVariant })}>
                                {showPassword ? <Eye className={styles["lambda-input__icon"]} /> : <EyeOff className={styles["lambda-input__icon"]} />}
                            </button>
                        )}
                        {isSearchType && value && (
                            <span onClick={clearInput} className={styles["lambda-input__clear-search"]}>
                                <X className={styles["lambda-input__clear-search-icon"]} />
                            </span>
                        )}
                    </div>
                </div>
                {error && errorMessage && <span className={errorlabel({ size: contextSize })}>{errorMessage}</span>}
            </div>
        );
    }
);