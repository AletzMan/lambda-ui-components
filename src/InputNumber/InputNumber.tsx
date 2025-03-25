import { forwardRef, useState } from "react"
import styles from "./inputnumber.module.css"
import { cva, VariantProps } from "class-variance-authority"
import { ChevronDown, ChevronUp, EuroIcon, DollarSignIcon, PercentIcon, PoundSterlingIcon } from "lucide-react"
import clsx from "clsx"

const inputNumber = cva(styles.lambda_number, {
    variants: {
        size: {
            small: styles['lambda_number--size-small'],
            medium: styles['lambda_number--size-medium'],
            large: styles['lambda_number--size-large'],
        },
        variant: {
            outline: styles['lambda_number--variant-outline'],
            flat: styles['lambda_number--variant-flat'],
        },
        typeNumber: {
            default: styles['lambda_number--type-default'],
            'currency-USD': styles['lambda_number--type-usd'],
            'currency-EUR': styles['lambda_number--type-eur'],
            'currency-GBP': styles['lambda_number--type-gbp'],
            percentage: styles['lambda_number--type-porcentage'],
            decimal: styles['lambda_number--type-decimal'],
        },
        radius: {
            none: styles['lambda_number--radius-none'],
            small: styles['lambda_number--radius-small'],
            medium: styles['lambda_number--radius-medium'],
            pill: styles['lambda_number--radius-pill'],
        },
        error: {
            true: styles['lambda_number--invalid'],
            false: "",
        },
        disabled: {
            false: styles['lambda_number--enabled'],
            true: styles['lambda_number--disabled'],
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "medium",
        typeNumber: 'default',
        error: false,
        disabled: false,
    },
})

const labels = cva(styles['lambda_number--label'], {
    variants: {
        size: {
            small: styles['lambda_number--label-small'],
            medium: styles['lambda_number--label-medium'],
            large: styles['lambda_number--label-large'],
        },
        radius: {
            none: styles['lambda_number--label-radius-none'],
            small: styles['lambda_number--label-radius-small'],
            medium: styles['lambda_number--label-radius-medium'],
            pill: styles['lambda_number--label-radius-pill'],
        },
    },
    defaultVariants: {
        radius: "medium",
        size: "medium"
    },
})

const number = cva(styles['lambda_number--field'], {
    variants: {
        size: {
            small: styles['lambda_number--field-small'],
            medium: styles['lambda_number--field-medium'],
            large: styles['lambda_number--field-large'],
        },
        typeNumber: {
            default: styles['lambda_number--field-default'],
            'currency-USD': styles['lambda_number--field-usd'],
            'currency-EUR': styles['lambda_number--field-eur'],
            'currency-GBP': styles['lambda_number--field-gbp'],
            percentage: styles['lambda_number--field-porc'],
            decimal: styles['lambda_number--field-dec'],
        },
    },
    defaultVariants: {
        size: "medium",
        typeNumber: 'default'
    },
})

const arrows = cva(styles['lambda_number--handler'], {
    variants: {
        size: {
            small: styles['lambda_number--handler-small'],
            medium: styles['lambda_number--handler-medium'],
            large: styles['lambda_number--handler-large'],
        },
        variant: {
            outline: styles['lambda_number--handler-outline'],
            flat: styles['lambda_number--handler-flat'],
        }
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
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
    defaultVariants: {
        size: "medium"
    },
})

const typeCurrency = cva(styles['lambda_number--currency'], {
    variants: {
        size: {
            small: styles['lambda_number--currency-small'],
            medium: styles['lambda_number--currency-medium'],
            large: styles['lambda_number--currency-large'],
        },
        variant: {
            outline: styles['lambda_number--currency-outline'],
            flat: styles['lambda_number--currency-flat'],
        },
        typeNumber: {
            default: styles['lambda_number--currency-dafault'],
            'currency-USD': styles['lambda_number--currency-usd'],
            'currency-EUR': styles['lambda_number--currency-eur'],
            'currency-GBP': styles['lambda_number--currency-gbp'],
            percentage: styles['lambda_number--currency-porc'],
            decimal: styles['lambda_number--currency-dec'],
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "outline",
        typeNumber: "default"
    },
})





export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type" | "onChange">,
    VariantProps<typeof inputNumber> {
    label?: string
    error?: boolean
    errorMessage?: string
    onChange?: (value: number) => void
    typeNumber?: "default" | "currency-USD" | "currency-EUR" | "currency-GBP" | "percentage" | "decimal"
}

export const InputNumber = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            radius,
            size,
            label = "label",
            error,
            errorMessage,
            disabled,
            min = Number.MIN_SAFE_INTEGER,
            max = Number.MAX_SAFE_INTEGER,
            step = 1,
            value: controlledValue,
            typeNumber = "default",
            onChange,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState<string>("0")
        const [isEditing, setIsEditing] = useState(false)

        const isControlled = controlledValue !== undefined
        const value = isControlled ? Number(controlledValue) : Number(internalValue)

        const formatValue = (value: string | number): string => {
            if (value === "" || isNaN(Number(value))) return ""

            const numericValue = Number(value);
            switch (typeNumber) {
                case "currency-USD":
                case "currency-EUR":
                case "currency-GBP":
                    return numericValue.toFixed(2)
                case "percentage":
                    return `${numericValue}`
                case "decimal":
                    return numericValue.toFixed(2)
                default:
                    return numericValue.toString()
            }
        };

        const parseValue = (input: string): string => {
            return input.replace(/[^\d.-]/g, "")
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist()
            const inputValue = parseValue(e.target.value)

            // Permite solo valores válidos en el input
            if (/^$|^-?\d*\.?\d*$/.test(inputValue)) {
                if (!isControlled) {
                    setInternalValue(inputValue)
                }
                onChange?.(Number(inputValue))
            }
        }

        const handleBlur = () => {
            setIsEditing(false) // Detiene la edición
            if (!isControlled) {
                setInternalValue(formatValue(internalValue));
            }
        }

        const handleFocus = () => {
            setIsEditing(true) // Permite edición manual
        }

        const increment = () => {
            const numericValue = Number(parseValue(value.toString()) || 0)
            const newValue = Math.min(Number(max), numericValue + Number(step))
            if (!isControlled) {
                setInternalValue(newValue.toString())
            }

            onChange?.(newValue)
        }

        const decrement = () => {
            const numericValue = Number(parseValue(value.toString()) || 0)
            const newValue = Math.max(Number(min), numericValue - Number(step))
            if (!isControlled) {
                setInternalValue(newValue.toString())
            }

            onChange?.(newValue)
        }

        const getIcon = () => {
            switch (typeNumber) {
                case "currency-USD":
                    return <DollarSignIcon className={styles.type_icon} />
                case "currency-EUR":
                    return <EuroIcon className={styles.type_icon} />
                case "currency-GBP":
                    return <PoundSterlingIcon className={styles.type_icon} />
                case "percentage":
                    return <PercentIcon className={styles.type_icon} />
                default:
                    return null
            }
        }

        const displayedValue = isEditing ? internalValue : formatValue(value)

        return (
            <div className={clsx(styles['lambda_number--wrapper'], { [styles['lambda_number--wrapper-disabled']]: disabled })}>
                {label && <label className={labels({ radius, size })}>{label}</label>}
                <div className={inputNumber({ variant, disabled, radius, typeNumber, size, error, className })}>
                    <div className={styles['lambda_number--container']}>
                        <div className={typeCurrency({ typeNumber, size, variant })}>{getIcon()}</div>
                        <input
                            ref={ref}
                            value={displayedValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            type="text"
                            role="number"
                            disabled={disabled || undefined}
                            className={number({ size, typeNumber })}
                            step={step}
                            min={min}
                            max={max}
                            {...props}
                        />
                        <div className={arrows({ size, variant })}>
                            <button
                                type="button"
                                /*className={`${styles.btn} ${styles.btn_increment} ${size === "small" && styles.btn_sm} ${size === "medium" && styles.btn_md}`}*/
                                className={clsx(styles['lambda_number--btn'], styles['lambda_number--btn-increment'], { [styles['lambda_number--btn-small']]: size === "small", [styles['lambda_number--btn-medium']]: size === "medium" })}
                                onClick={increment}
                                disabled={disabled || (max !== undefined && Number(value) >= Number(max))}
                            >
                                <ChevronUp className={styles.icon} />
                            </button>
                            <hr className={styles.separator} />
                            <button
                                type="button"
                                className={clsx(styles['lambda_number--btn'], styles['lambda_number--btn-decrement'], { [styles['lambda_number--btn-small']]: size === "small", [styles['lambda_number--btn-medium']]: size === "medium" })}

                                onClick={decrement}
                                disabled={disabled || (min !== undefined && Number(value) <= Number(min))}
                            >
                                <ChevronDown className={styles.icon} />
                            </button>
                        </div>
                    </div>
                </div>
                {error && errorMessage && <span className={errorlabel({ size })}>{errorMessage}</span>}
            </div>
        );
    }
);
