import { useEffect, useState } from "react";
import { InputNumberProps } from "./InputNumber";

export function useNumberInput({ controlledValue, onChange, min, max, step, typeNumber }: {
    controlledValue: number | undefined;
    onChange?: (value: number | undefined) => void;
    min: number;
    max: number;
    step: number;
    typeNumber: InputNumberProps["typeNumber"];
    disabled?: boolean;
}) {
    const [internalValue, setInternalValue] = useState<string>(controlledValue?.toString() ?? "0");

    const [isEditing, setIsEditing] = useState(false);

    const isControlled = controlledValue !== undefined;

    useEffect(() => {
        if (isControlled && !isEditing && controlledValue !== undefined) {
            setInternalValue(controlledValue.toString());

        }
    }, [controlledValue, isControlled, isEditing]);


    const value = isControlled ? controlledValue : Number(internalValue);

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
        const inputValue = parseValue(e.target.value);

        if (/^$|^-?\d*\.?\d*$/.test(inputValue)) {
            if (!isControlled) {
                setInternalValue(inputValue);
            }
            const numericValue = Number(inputValue);
            // Si inputValue es "" o "-", Number() da 0 o NaN. Decide si quieres emitir NaN/0 o undefined.
            onChange?.(isNaN(numericValue) ? undefined : numericValue);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        // Aplicar formato al internalValue al perder foco si no está controlado
        if (!isControlled) {
            const numericValue = Number(parseValue(internalValue));
            setInternalValue(formatValue(isNaN(numericValue) ? "" : numericValue));
        }
        // Opcional: podrías querer revalidar/emitir onChange(undefined) si el valor final con formato es inválido
    };

    const handleFocus = () => {
        setIsEditing(true);
        // Opcional: podrías querer "desformatear" el valor al enfocar para facilitar la edición
        if (!isControlled) {
            setInternalValue(parseValue(internalValue)); // Mostrar valor crudo
        }
    };

    const increment = () => {
        const numericValue = Number(parseValue(isEditing ? internalValue : value.toString()) || 0);
        const newValue = Math.min(Number(max), numericValue + Number(step));
        if (!isControlled) {
            setInternalValue(newValue.toString());
        }
        onChange?.(newValue);
    };

    const decrement = () => {
        const numericValue = Number(parseValue(isEditing ? internalValue : value.toString()) || 0);
        const newValue = Math.max(Number(min), numericValue - Number(step));
        if (!isControlled) {
            setInternalValue(newValue.toString());
        }
        onChange?.(newValue);
    };

    // Valor a mostrar en el input (string)
    const displayedValue = isEditing ? internalValue : formatValue(value);


    return {
        displayedValue,
        internalValue,
        value,
        isEditing,
        handleChange,
        handleBlur,
        handleFocus,
        increment,
        decrement,
    };
}