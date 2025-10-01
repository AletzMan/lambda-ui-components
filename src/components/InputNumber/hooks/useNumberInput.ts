/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { InputNumberProps } from "../inputnumber.types";

const DEFAULT_MIN = -Infinity;
const DEFAULT_MAX = Infinity;
const DEFAULT_STEP = 1;

export function useNumberInput({
	controlledValue,
	onChange,
	min = DEFAULT_MIN,
	max = DEFAULT_MAX,
	step = DEFAULT_STEP,
	typeNumber,
	disabled,
}: {
	controlledValue: number | undefined;
	onChange?: (value: number | undefined) => void;
	min?: number;
	max?: number;
	step?: number;
	typeNumber?: InputNumberProps["typeNumber"];
	disabled?: boolean;
}) {
	const [internalValue, setInternalValue] = useState<string>(
		controlledValue !== undefined && controlledValue !== null ? controlledValue.toString() : ""
	);
	const [isEditing, setIsEditing] = useState(false);
	const isControlled = controlledValue !== undefined && controlledValue !== null;

	const intervalRef = useRef<number | NodeJS.Timeout | null>(null);
	const initialDelayRef = useRef<number | NodeJS.Timeout | null>(null);

	// --- Ref para almacenar los valores más recientes ---
	const latestValuesRef = useRef({
		isEditing: isEditing,
		internalValue: internalValue,
		isControlled: isControlled,
		controlledValue: controlledValue,
		min: min,
		max: max,
		step: step,
		numericValue: undefined as number | undefined | null,
		parseValue: ((_input: string | undefined | null) => "") as (
			input: string | undefined | null
		) => string,
		formatValue: ((_value: number | undefined | null) => "") as (
			value: number | undefined | null
		) => string,
		onChange: undefined as ((value: number | undefined) => void) | undefined,
	});

	// --- Efecto para mantener latestValuesRef actualizado ---
	useEffect(() => {
		// Calcula el numericValue más reciente aquí antes de actualizar la ref
		// Leer los valores para este cálculo directamente de las dependencias del useEffect
		// (que son los valores más recientes), no de latestValuesRef.current
		// para evitar depender de la ref que estamos actualizando en este mismo efecto.
		const currentNumericValue = isEditing // Usar isEditing de las dependencias
			? Number(parseValue(internalValue)) // Usar parseValue y internalValue de las dependencias
			: isControlled && controlledValue !== undefined && controlledValue !== null
			? controlledValue
			: Number(parseValue(internalValue)); // Usar parseValue y internalValue de las dependencias

		latestValuesRef.current = {
			isEditing: isEditing,
			internalValue: internalValue,
			isControlled: isControlled,
			controlledValue: controlledValue,
			min: min,
			max: max,
			step: step,
			numericValue: isNaN(currentNumericValue) ? undefined : currentNumericValue,
			parseValue: parseValue, // Asignar la función useCallback real aquí
			formatValue: formatValue, // Asignar la función useCallback real aquí
			onChange: onChange, // Asignar la función useCallback real aquí
		};
	}, [isEditing, internalValue, isControlled, controlledValue, min, max, step, onChange]);

	// --- Funciones de Parseo y Formato ---
	const formatValue = useCallback(
		(value: number | undefined | null): string => {
			if (value === undefined || value === null || isNaN(value)) return "";
			const numericValue = value;
			switch (typeNumber) {
				case "currency-USD":
				case "currency-EUR":
				case "currency-GBP":
					return numericValue.toFixed(2);
				case "percentage":
					return numericValue.toString();
				case "decimal":
					return numericValue.toFixed(2);
				default:
					return numericValue.toString();
			}
		},
		[typeNumber]
	);

	useEffect(() => {
		if (isControlled && !isEditing) {
			const valueToFormat =
				controlledValue !== undefined && controlledValue !== null ? controlledValue : undefined;
			setInternalValue(formatValue(valueToFormat));
		}
	}, [controlledValue, isControlled, isEditing, formatValue]);

	const parseValue = useCallback((input: string | undefined | null): string => {
		if (input === undefined || input === null) return "";
		const cleaned = input.replace(/[^\d.-]/g, "");
		const parts = cleaned.split("-");
		const negativeSign = parts.length > 1 && parts[0] === "" ? "-" : "";
		const numberPart = parts.filter((part, index) => index > 0 || part !== "").join("");
		const decimalParts = numberPart.split(".");
		const integerPart = decimalParts[0];
		const decimalPart = decimalParts.length > 1 ? "." + decimalParts.slice(1).join("") : "";
		const result = negativeSign + integerPart + decimalPart;
		return result;
	}, []);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			const parsedValue = parseValue(inputValue);
			setInternalValue(parsedValue);

			if (parsedValue === "" || parsedValue === "-") {
				onChange?.(undefined);
			} else {
				const numericValue = Number(parsedValue);
				if (!isNaN(numericValue)) {
					onChange?.(numericValue);
				}
			}
		},
		[onChange, parseValue]
	);

	const handleBlur = useCallback(() => {
		setIsEditing(false);
		const numericValue = Number(parseValue(internalValue));

		let finalNumericValue: number | undefined;
		let formattedFinalValue: string;

		if (!isNaN(numericValue)) {
			finalNumericValue = Math.max(Number(min), Math.min(Number(max), numericValue));
			formattedFinalValue = formatValue(finalNumericValue);
			setInternalValue(formattedFinalValue);

			if (isControlled) {
				if (finalNumericValue !== controlledValue) {
					onChange?.(finalNumericValue);
				} else {
					setInternalValue(formatValue(controlledValue));
				}
			} else {
				onChange?.(finalNumericValue);
			}
		} else {
			setInternalValue("");
			onChange?.(undefined);
		}
	}, [internalValue, onChange, parseValue, formatValue, min, max, isControlled, controlledValue]);

	const handleFocus = useCallback(() => {
		setIsEditing(true);
		const valueToParse = isControlled ? controlledValue : Number(parseValue(internalValue));
		const rawStringValue =
			valueToParse !== undefined && valueToParse !== null && !isNaN(valueToParse)
				? valueToParse.toString()
				: "";
		const parsedRawStringValue = parseValue(rawStringValue);
		setInternalValue(parsedRawStringValue);
	}, [isControlled, controlledValue, internalValue, parseValue]);

	// --- Lógica de Incremento y Decremento (paso único) - LEER DESDE latestValuesRef ---
	// Estas funciones ahora leen los valores más recientes desde latestValuesRef.current
	// Por lo tanto, no necesitan incluir dependencias de estado/props en su array de deps.
	const performDecrementStep = useCallback(() => {
		// Leer los valores más recientes desde la ref
		const {
			isEditing: latestIsEditing,
			internalValue: latestInternalValue,
			isControlled: latestIsControlled,
			min: latestMin,
			step: latestStep,
			numericValue: latestNumericValue,
			parseValue: latestParseValue,
			onChange: latestOnChange,
			formatValue: latestFormatValue,
		} = latestValuesRef.current;

		// Calcular el valor numérico actual usando los valores más recientes de la ref
		const currentNumericValue =
			!latestIsEditing &&
			latestNumericValue !== undefined &&
			latestNumericValue !== null &&
			!isNaN(latestNumericValue)
				? latestNumericValue
				: Number(latestParseValue(latestInternalValue)) || 0;

		const newValue = Math.max(Number(latestMin), currentNumericValue - Number(latestStep));

		// Llamar a la última versión de onChange
		latestOnChange?.(newValue);

		// Si NO es controlado, actualizamos internalValue localmente para feedback visual inmediato.
		// Esto es seguro porque performDecrementStep se llama desde el intervalo,
		// y la actualización de estado aquí (setInternalValue) eventualmente
		// disparará el useEffect para actualizar latestValuesRef para la próxima llamada del intervalo.
		if (!latestIsControlled) {
			setInternalValue(latestFormatValue(newValue));
		}
	}, []);

	const performIncrementStep = useCallback(() => {
		// Leer los valores más recientes desde la ref
		const {
			isEditing: latestIsEditing,
			internalValue: latestInternalValue,
			isControlled: latestIsControlled,
			max: latestMax,
			step: latestStep,
			numericValue: latestNumericValue,
			parseValue: latestParseValue,
			onChange: latestOnChange,
			formatValue: latestFormatValue,
		} = latestValuesRef.current;

		const currentNumericValue =
			!latestIsEditing &&
			latestNumericValue !== undefined &&
			latestNumericValue !== null &&
			!isNaN(latestNumericValue)
				? latestNumericValue
				: Number(latestParseValue(latestInternalValue)) || 0;

		const newValue = Math.min(Number(latestMax), currentNumericValue + Number(latestStep));
		latestOnChange?.(newValue);

		if (!latestIsControlled) {
			setInternalValue(latestFormatValue(newValue));
		}
	}, []);

	// --- Lógica para mantener presionado (start/stop actions) ---

	const stopAction = useCallback(() => {
		if (intervalRef.current !== null) {
			// Limpiar usando el valor actual de la ref
			clearInterval(intervalRef.current);
		}
		if (initialDelayRef.current !== null) {
			// Limpiar usando el valor actual de la ref
			clearTimeout(initialDelayRef.current);
		}
		intervalRef.current = null;
		initialDelayRef.current = null;
	}, []);

	const startAction = useCallback(
		(action: () => void) => {
			if (disabled) {
				return;
			}

			stopAction(); // Limpiar cualquier temporizador existente

			// Ejecutar el primer paso inmediatamente
			action();

			// Configurar un retraso inicial antes de que comience la repetición rápida
			initialDelayRef.current = setTimeout(() => {
				// Usamos 'as any' aquí solo para evitar posibles errores de tipado persistentes si la unión no basta,
				// aunque idealmente 'as number' o sin as debería funcionar con la unión de tipos en la ref.
				intervalRef.current = setInterval(action, 100);
			}, 300);
		},
		[stopAction, disabled]
	);

	// Efecto de limpieza al desmontar
	useEffect(() => {
		return () => {
			stopAction();
		};
	}, [stopAction]);

	// --- Valores y Handlers expuestos ---
	// numericValue y formattedDisplayedValue dependen del estado del hook y props,
	// se recalculan automáticamente cuando estos cambian.
	const numericValue = useMemo(() => {
		if (isEditing) {
			const parsed = Number(parseValue(internalValue));
			return isNaN(parsed) ? undefined : parsed;
		} else {
			const valueToParse = isControlled
				? controlledValue !== undefined && controlledValue !== null
					? controlledValue.toString()
					: ""
				: internalValue;
			const parsed = Number(parseValue(valueToParse));
			return isNaN(parsed) ? undefined : parsed;
		}
	}, [isEditing, internalValue, parseValue, isControlled, controlledValue]);

	const formattedDisplayedValue = useMemo(() => {
		if (isEditing) {
			return internalValue;
		} else {
			const formatted =
				numericValue !== undefined && numericValue !== null && !isNaN(numericValue)
					? formatValue(numericValue)
					: "";
			return formatted;
		}
	}, [isEditing, internalValue, numericValue, formatValue]);

	return {
		displayedValue: formattedDisplayedValue,
		handleChange,
		handleBlur,
		handleFocus,
		// Funciones para manejar la acción de mantener presionado en los botones
		startIncrementing: () => startAction(performIncrementStep),
		stopIncrementing: stopAction,
		startDecrementing: () => startAction(performDecrementStep),
		stopDecrementing: stopAction,
		isEditing,
		isControlled,
		internalValue,
		numericValue,
	};
}
