import { forwardRef, useState } from "react"
import styles from "./inputnumber.module.css"
import { cva, VariantProps } from "class-variance-authority"
import { ChevronDown, ChevronUp, EuroIcon, DollarSignIcon, PercentIcon, PoundSterlingIcon } from "lucide-react"
import clsx from "clsx"

const inputNumber = cva(styles["lambda-number"], {
    variants: {
        size: {
            tiny: styles['lambda-number-tiny'],
            small: styles['lambda-number-small'],
            medium: styles['lambda-number-medium'],
            large: styles['lambda-number-large'],
        },
        variant: {
            outline: styles['lambda-number-outline'],
            flat: styles['lambda-number-flat'],
        },
        typeNumber: {
            default: styles['lambda-number-default'],
            'currency-USD': styles['lambda-number-usd'],
            'currency-EUR': styles['lambda-number-eur'],
            'currency-GBP': styles['lambda-number-gbp'],
            percentage: styles['lambda-number-porcentage'],
            decimal: styles['lambda-number-decimal'],
        },
        radius: {
            none: styles['lambda-number-radius-none'],
            small: styles['lambda-number-radius-small'],
            medium: styles['lambda-number-radius-medium'],
            large: styles['lambda-number-radius-large'],
            pill: styles['lambda-number-radius-pill'],
        },
        invalid: {
            true: styles['lambda-number-invalid'],
            false: "",
        },
        disabled: {
            false: styles['lambda-number-enabled'],
            true: styles['lambda-number-disabled'],
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "medium",
        typeNumber: 'default',
        invalid: false,
        disabled: false,
    },
})

const labels = cva(styles['lambda-number-label'], {
    variants: {
        size: {
            tiny: styles['lambda-number-label-tiny'],
            small: styles['lambda-number-label-small'],
            medium: styles['lambda-number-label-medium'],
            large: styles['lambda-number-label-large'],
        },
        radius: {
            none: styles['lambda-number-label-radius-none'],
            small: styles['lambda-number-label-radius-small'],
            medium: styles['lambda-number-label-radius-medium'],
            large: styles['lambda-number-label-radius-large'],
            pill: styles['lambda-number-label-radius-pill'],
        },
    },
    defaultVariants: {
        radius: "medium",
        size: "medium"
    },
})

const number = cva(styles['lambda-number-field'], {
    variants: {
        size: {
            tiny: styles['lambda-number-field-tiny'],
            small: styles['lambda-number-field-small'],
            medium: styles['lambda-number-field-medium'],
            large: styles['lambda-number-field-large'],
        },
        typeNumber: {
            default: styles['lambda-number-field-default'],
            'currency-USD': styles['lambda-number-field-usd'],
            'currency-EUR': styles['lambda-number-field-eur'],
            'currency-GBP': styles['lambda-number-field-gbp'],
            percentage: styles['lambda-number-field-porc'],
            decimal: styles['lambda-number-field-dec'],
        },
    },
    defaultVariants: {
        size: "medium",
        typeNumber: 'default'
    },
})

const handler = cva(styles['lambda-number-handler'], {
    variants: {
        size: {
            tiny: styles['lambda-number-handler-tiny'],
            small: styles['lambda-number-handler-small'],
            medium: styles['lambda-number-handler-medium'],
            large: styles['lambda-number-handler-large'],
        },
        variant: {
            outline: styles['lambda-number-handler-outline'],
            flat: styles['lambda-number-handler-flat'],
        }
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
    },
})

const errorlabel = cva(styles['lambda-number-error'], {
    variants: {
        size: {
            tiny: styles['lambda-number-error-tiny'],
            small: styles['lambda-number-error-small'],
            medium: styles['lambda-number-error-medium'],
            large: styles['lambda-number-error-large'],
        },
    },
    defaultVariants: {
        size: "medium"
    },
})

const typeCurrency = cva(styles['lambda-number-currency'], {
    variants: {
        size: {
            tiny: styles['lambda-number-currency-tiny'],
            small: styles['lambda-number-currency-small'],
            medium: styles['lambda-number-currency-medium'],
            large: styles['lambda-number-currency-large'],
        },
        variant: {
            outline: styles['lambda-number-currency-outline'],
            flat: styles['lambda-number-currency-flat'],
        },
        typeNumber: {
            default: styles['lambda-number-currency-dafault'],
            'currency-USD': styles['lambda-number-currency-usd'],
            'currency-EUR': styles['lambda-number-currency-eur'],
            'currency-GBP': styles['lambda-number-currency-gbp'],
            percentage: styles['lambda-number-currency-porc'],
            decimal: styles['lambda-number-currency-dec'],
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "outline",
        typeNumber: "default"
    },
})

const button = cva(styles['lambda-number-btn'], {
    variants: {
        size: {
            tiny: styles['lambda-number-btn-tiny'],
            small: styles['lambda-number-btn-small'],
            medium: styles['lambda-number-btn-medium'],
            large: styles['lambda-number-btn-large'],
        },
    },
    defaultVariants: {
        size: "medium"
    },
})

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type" | "onChange">,
    VariantProps<typeof inputNumber> {
    label?: string
    invalid?: boolean
    errorMessage?: string
    helperText?: string
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
            label,
            invalid,
            errorMessage,
            disabled,
            helperText,
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

            const numericValue = Number(value)
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
        }

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
                setInternalValue(formatValue(internalValue))
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
                    return <DollarSignIcon className={styles['lambda-number-currency-icon']} />
                case "currency-EUR":
                    return <EuroIcon className={styles['lambda-number-currency-icon']} />
                case "currency-GBP":
                    return <PoundSterlingIcon className={styles['lambda-number-currency-icon']} />
                case "percentage":
                    return <PercentIcon className={styles['lambda-number-currency-icon']} />
                default:
                    return null
            }
        }

        const displayedValue = isEditing ? internalValue : formatValue(value)

        return (
            <div className={clsx(styles['lambda-number-wrapper'], { [styles['lambda-number-wrapper-disabled']]: disabled })}>
                {label && <label className={labels({ radius, size })}>{label}</label>}
                <div className={inputNumber({ variant, disabled, radius, typeNumber, size, invalid, className })}>
                    {helperText && <label className={clsx(styles['lambda-number-helper'], { [styles["lambda-number-helper-disabled"]]: disabled })}>{helperText}</label>}
                    <div className={styles['lambda-number-container']}>
                        <div className={typeCurrency({ typeNumber, size, variant })}>{getIcon()}</div>
                        <input
                            ref={ref}
                            value={displayedValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            type="text"
                            role="number"
                            inputMode="numeric"
                            disabled={disabled || undefined}
                            className={number({ size, typeNumber })}
                            step={step}
                            min={min}
                            max={max}
                            {...props}
                        />
                        <div className={handler({ size, variant })}>
                            <button
                                type="button"
                                className={clsx(button({ size }), styles['lambda-number-btn-increment'])}
                                onClick={increment}
                                disabled={disabled || (max !== undefined && Number(value) >= Number(max))}
                            >
                                <ChevronUp className={styles['lambda-number-icon']} />
                            </button>
                            <hr className={styles['lambda-number-separator']} />
                            <button
                                type="button"
                                className={clsx(button({ size }), styles['lambda-number-btn-decrement'])}

                                onClick={decrement}
                                disabled={disabled || (min !== undefined && Number(value) <= Number(min))}
                            >
                                <ChevronDown className={styles['lambda-number-icon']} />
                            </button>
                        </div>
                    </div>
                </div>
                {invalid && errorMessage && <span className={errorlabel({ size })}>{errorMessage}</span>}
            </div>
        )
    }
)
