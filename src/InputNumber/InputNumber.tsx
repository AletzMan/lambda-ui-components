import { forwardRef, useState, useId } from "react";
import styles from "./inputnumber.module.css";
import { ChevronDown, ChevronUp, EuroIcon, DollarSignIcon, PercentIcon, PoundSterlingIcon, CircleX } from "lucide-react";
import clsx from "clsx";
import { InvalidMessage } from "../_util/InvalidMessage/InvalidMessage";
import { InputNumberVariants, button, handler, inputNumber, labels, number, typeCurrency, wrapper } from "./inputnumber.variants";
import { HelperText } from "../_util/HelperText/HelperText";




export interface InputNumberProps // Cambiado a InputNumberProps para evitar conflicto con Input
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size" | "type" | "onChange" | "value" | "min" | "max" | "step"> // Omitir también value, min, max, step si los re-tipas
{
    // Props de variantes (usando tipos exportados)
    variant?: InputNumberVariants["variant"];
    size?: InputNumberVariants["size"];
    radius?: InputNumberVariants["radius"];
    invalid?: InputNumberVariants["invalid"];
    disabled?: InputNumberVariants["disabled"];
    typeNumber?: InputNumberVariants["typeNumber"];
    min?: number;
    max?: number;
    step?: number;
    // Otras props específicas del componente
    label?: string;
    errorMessage?: string;
    helperText?: string;
    required?: boolean;
    onChange?: (value: number | undefined) => void;
    value?: number;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
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
            required,
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
        const [internalValue, setInternalValue] = useState<string>("0");
        const [isEditing, setIsEditing] = useState(false);

        const isControlled = controlledValue !== undefined;
        const value = isControlled ? Number(controlledValue) : Number(internalValue);

        const formatValue = (value: string | number): string => {
            if (value === "" || isNaN(Number(value))) return "";

            const numericValue = Number(value);
            switch (typeNumber) {
                case "currency-USD":
                case "currency-EUR":
                case "currency-GBP":
                    return numericValue.toFixed(2);
                case "percentage":
                    return `${numericValue}`;
                case "decimal":
                    return numericValue.toFixed(2);
                default:
                    return numericValue.toString();
            }
        };

        const parseValue = (input: string): string => {
            return input.replace(/[^\d.-]/g, "");
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            const inputValue = parseValue(e.target.value);

            // Permite solo valores válidos en el input
            if (/^$|^-?\d*\.?\d*$/.test(inputValue)) {
                if (!isControlled) {
                    setInternalValue(inputValue);
                }
                onChange?.(Number(inputValue));
            }
        };

        const handleBlur = () => {
            setIsEditing(false); // Detiene la edición
            if (!isControlled) {
                setInternalValue(formatValue(internalValue));
            }
        };

        const handleFocus = () => {
            setIsEditing(true); // Permite edición manual
        };

        const increment = () => {
            const numericValue = Number(parseValue(value.toString()) || 0);
            const newValue = Math.min(Number(max), numericValue + Number(step));
            if (!isControlled) {
                setInternalValue(newValue.toString());
            }

            onChange?.(newValue);
        };

        const decrement = () => {
            const numericValue = Number(parseValue(value.toString()) || 0);
            const newValue = Math.max(Number(min), numericValue - Number(step));
            if (!isControlled) {
                setInternalValue(newValue.toString());
            }

            onChange?.(newValue);
        };


        const getIcon = () => {
            switch (typeNumber) {
                case "currency-USD":
                    return <DollarSignIcon className={styles['lambda-number-currency-icon']} />;
                case "currency-EUR":
                    return <EuroIcon className={styles['lambda-number-currency-icon']} />;
                case "currency-GBP":
                    return <PoundSterlingIcon className={styles['lambda-number-currency-icon']} />;
                case "percentage":
                    return <PercentIcon className={styles['lambda-number-currency-icon']} />;
                default:
                    return null;
            }
        };

        const displayedValue = isEditing ? internalValue : formatValue(value);
        const inputId = useId(); // Usar useId para un id único
        const errorId = errorMessage && invalid ? `${inputId}-error` : undefined;
        const helperId = helperText ? `${inputId}-helper` : undefined;
        const describedByIds = [errorId, helperId].filter(Boolean).join(" ");


        return (
            <div className={clsx(wrapper({ disabled, className }))}>
                {label && <label htmlFor={inputId} className={labels({ radius, size, required })}>{label}</label>}
                <div className={inputNumber({ variant, disabled, radius, typeNumber, size, invalid })}>
                    <div className={styles['lambda-number-container']}>
                        <div className={typeCurrency({ typeNumber, size, variant, radius })}>{getIcon()}</div>
                        <input
                            ref={ref}
                            id={inputId}
                            aria-describedby={describedByIds || undefined}
                            aria-invalid={invalid || undefined}
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
                        {invalid && <CircleX className={clsx(styles["lambda-number-invalid-icon"])} />}
                        <div className={handler({ size, variant, radius })}>
                            <button
                                type="button"
                                className={clsx(button({ size }), styles['lambda-number-btn-increment'])}
                                onClick={increment}
                                aria-label="Increase value"
                                disabled={disabled || (max !== undefined && Number(value) >= Number(max))}
                            >
                                <ChevronUp className={styles['lambda-number-icon']} />
                            </button>
                            <hr className={styles['lambda-number-separator']} />
                            <button
                                type="button"
                                className={clsx(button({ size }), styles['lambda-number-btn-decrement'])}
                                aria-label="Decrease value"
                                onClick={decrement}
                                disabled={disabled || (min !== undefined && Number(value) <= Number(min))}
                            >
                                <ChevronDown className={styles['lambda-number-icon']} />
                            </button>
                        </div>
                    </div>
                    {helperText && <HelperText id={helperId} text={helperText} disabled={disabled} focused={isEditing} size={size} />}
                </div>
                {invalid && errorMessage && <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />}
            </div>
        );
    }
);
