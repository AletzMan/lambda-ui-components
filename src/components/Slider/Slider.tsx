import React, { forwardRef, useCallback, useRef, useState, useMemo } from "react";
import clsx from "clsx";

import {
	sliderContainer,
	sliderTrack,
	sliderFill,
	sliderHandle,
	sliderValue,
	sliderMark,
	sliderMarkContainer,
	sliderWrapper,
} from "./slider.variants";
import { SliderProps, SliderSingleProps, SliderRangeProps } from "./slider.types";

const SliderImpl = forwardRef<HTMLDivElement, SliderProps>(
	(
		{
			value,
			min = 0,
			max = 100,
			step = 1,
			onChangeValue,
			disabled = false,
			marks = [],
			orientation = "horizontal",
			size = "small",
			radius = "full",
			viewValue = true,
			defaultValue,
			viewBar = true,
			className,
			formatValue,
			color = "primary",
			...rest
		},
		ref
	) => {

		// Estado interno para manejar el valor (Controlled vs Uncontrolled)
		const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
			if (value !== undefined) return value;
			if (defaultValue !== undefined) return defaultValue;
			return min;
		});

		// Sincronizar estado interno si la prop value cambia (modo controlado)
		// Solo si value está definido (controlado)
		if (value !== undefined && value !== internalValue) {
			setInternalValue(value);
		}

		// Usar el valor apropiado para renderizar
		const currentValue = value !== undefined ? value : internalValue;

		// Determinar si es un slider de dos handles basado en el tipo de 'currentValue'
		const isDoubleHandled = Array.isArray(currentValue);

		// Obtener los valores de inicio y fin para el cálculo
		const startValue = isDoubleHandled ? currentValue[0] : min;
		const endValue = isDoubleHandled ? currentValue[1] : (currentValue as number);

		// Refs para el track del slider para obtener dimensiones
		const trackRef = useRef<HTMLDivElement>(null);

		// Estado interno para manejar el arrastre de los handles
		const [isDragging, setIsDragging] = useState<boolean>(false);
		// Estado para saber qué handle se está arrastrando (0 para el primero, 1 para el segundo, o null)
		const [draggingHandleIndex, setDraggingHandleIndex] = useState<number | null>(null);

		// --- Funciones de conversión entre valor y posición en el track ---

		// Convierte un valor numérico a una posición en porcentaje (0-100)
		const valueToPercentage = useCallback(
			(val: number) => {
				// Asegurar que min y max son diferentes para evitar división por cero
				if (max === min) return 0;
				const percentage = ((val - min) / (max - min)) * 100;
				// Asegurarse de que el porcentaje esté dentro del rango [0, 100]
				return Math.max(0, Math.min(100, percentage));
			},
			[min, max]
		);

		// --- Utilidad para orientación ---
		const isVertical = orientation === "vertical";

		// Convierte una posición en porcentaje (0-100) a un valor numérico, aplicando el step
		const percentageToValue = useCallback(
			(percentage: number) => {
				// Asegurarse de que el porcentaje esté dentro del rango [0, 100]
				const clampedPercentage = Math.max(0, Math.min(100, percentage));
				const rawValue = min + (max - min) * (clampedPercentage / 100);

				// Aplicar el step si es positivo
				if (step > 0) {
					// Redondear al múltiplo más cercano del step
					const steppedValue = Math.round(rawValue / step) * step;
					// Asegurarse de que el valor escalonado esté dentro del rango [min, max]
					return Math.max(min, Math.min(max, steppedValue));
				}

				// Si step es 0 o negativo, simplemente devolver el valor crudo (clampado)
				return Math.max(min, Math.min(max, rawValue));
			},
			[min, max, step]
		);

		// --- Calcular posiciones y tamaño del fill ---

		// Posición del handle izquierdo (o único) en porcentaje
		const startPosPercentage = valueToPercentage(startValue);
		// Posición del handle derecho (o único) en porcentaje
		const endPosPercentage = valueToPercentage(endValue);

		// Propiedades de estilo para el fill (barra de selección)
		const fillStyle = useMemo(() => {
			if (isVertical) {
				if (isDoubleHandled) {
					const top = 100 - Math.max(startPosPercentage, endPosPercentage);
					const height = Math.abs(endPosPercentage - startPosPercentage);
					return {
						top: `${top}%`,
						height: `${height}%`,
					};
				} else {
					const top = 100 - endPosPercentage;
					return {
						top: `${top}%`,
						height: `${endPosPercentage}%`,
					};
				}
			} else {
				if (isDoubleHandled) {
					const left = Math.min(startPosPercentage, endPosPercentage);
					const width = Math.abs(endPosPercentage - startPosPercentage);
					return {
						left: `${left}%`,
						width: `${width}%`,
					};
				} else {
					return {
						left: "0%",
						width: `${endPosPercentage}%`,
					};
				}
			}
		}, [isVertical, isDoubleHandled, startPosPercentage, endPosPercentage]);

		// --- Handlers de eventos de arrastre ---

		// Obtiene el valor basado en la posición del puntero dentro del track
		const getValueFromPointerEvent = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				if (!trackRef.current) return null;

				const trackRect = trackRef.current.getBoundingClientRect();
				let newPercentage = 0;

				if (isVertical) {
					const clientY = event.clientY;
					const positionOnTrack = clientY - trackRect.top;
					const trackHeight = trackRect.height;
					if (trackHeight === 0) return null;
					// Invertimos porque en vertical el 0 está arriba
					newPercentage = 100 - (positionOnTrack / trackHeight) * 100;
				} else {
					const clientX = event.clientX;
					const positionOnTrack = clientX - trackRect.left;
					const trackWidth = trackRect.width;
					if (trackWidth === 0) return null;
					newPercentage = (positionOnTrack / trackWidth) * 100;
				}
				newPercentage = Math.max(0, Math.min(100, newPercentage));
				return percentageToValue(newPercentage);
			},
			[percentageToValue, isVertical]
		);

		// Inicia el arrastre en un handle
		const handleHandlePointerDown = useCallback(
			(event: React.PointerEvent<HTMLDivElement>, handleIndex: number) => {
				if (disabled) {
					return;
				}

				event.preventDefault();
				setIsDragging(true);
				setDraggingHandleIndex(handleIndex);

				// Capturar el puntero para seguir el movimiento incluso fuera del handle que recibió el pointerdown
				try {
					(event.target as Element).setPointerCapture(event.pointerId);
				} catch (e) {
					console.error("Error al establecer captura de puntero:", e);
				}
			},
			[disabled]
		);

		// Maneja el movimiento del puntero (listeners en el contenedor principal)
		const handlePointerMove = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				// Solo si estamos arrastrando un handle válido y tenemos la referencia al track
				if (!isDragging || draggingHandleIndex === null || !trackRef.current) {
					return;
				}

				// Prevenir comportamiento por defecto como la selección de texto o arrastrar la página
				event.preventDefault();
				const potentialNewValue = getValueFromPointerEvent(event);
				if (potentialNewValue === null) {
					return;
				}

				let nextValue: number | [number, number];

				if (isDoubleHandled) {
					let [currentStart, currentEnd] = currentValue as [number, number];
					let handleIdx = draggingHandleIndex;
					if (handleIdx === 0) {
						let newStart = Math.max(min, Math.min(potentialNewValue, max));
						nextValue = [newStart, currentEnd];
					} else {
						let newEnd = Math.max(min, Math.min(potentialNewValue, max));
						nextValue = [currentStart, newEnd];
					}
				} else {
					// Para slider de handle único, el nuevo valor es simplemente el valor potencial, clampado entre min y max global
					nextValue = Math.max(min, Math.min(max, potentialNewValue));
				}

				// Actualizar estado interno si no es controlado
				if (value === undefined) {
					setInternalValue(nextValue);
				}

				// Llamar al handler onInput para retroalimentación en tiempo real (si existe)
				// Pasamos el 'nextValue' calculado (que es SliderValue: number | [number, number])
				if (isDoubleHandled) {
					(onChangeValue as (value: [number, number]) => void)?.(
						nextValue as [number, number]
					);
				} else {
					(onChangeValue as (value: number) => void)?.(nextValue as number);
				}

				// NOTA IMPORTANTE: En un componente controlado (usando 'value' prop),
				// NO LLAMAMOS setInternalSelectedFiles O setSingleValue/setSliderValues AQUI.
				// El componente padre debe manejar el 'onInput' o 'onChange' y actualizar la prop 'value',
				// lo que hará que el componente Slider se re-renderize con la nueva posición del handle.
			},
			[
				isDragging,
				draggingHandleIndex,
				trackRef,
				getValueFromPointerEvent,
				currentValue,
				isDoubleHandled,
				onChangeValue,
				min,
				max,
				value, // Dependencia de prop value para saber si es controlado
			]
		);

		// Finaliza el arrastre (listeners en el contenedor principal)
		const handlePointerUp = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				// Solo si estábamos arrastrando un handle válido y tenemos la referencia al track
				if (!isDragging || draggingHandleIndex === null || !trackRef.current) return;
				event.preventDefault();

				// Obtener el valor basado en la posición final del puntero
				const finalValue = getValueFromPointerEvent(event);
				// Si por alguna razón no pudimos obtener un valor válido del evento (ej. trackWidth === 0 o puntero fuera)
				// usamos el valor actual como valor final.
				const valueToFinalize = finalValue === null ? currentValue : finalValue;

				let nextValue: number | [number, number];

				if (isDoubleHandled) {
					let [currentStart, currentEnd] = currentValue as [number, number];
					let handleIdx = draggingHandleIndex;
					const valueToApply =
						finalValue === null
							? handleIdx === 0
								? currentStart
								: currentEnd
							: (valueToFinalize as number);

					if (handleIdx === 0) {
						let newStart = Math.max(min, Math.min(valueToApply, max));
						nextValue = [newStart, currentEnd];
					} else {
						let newEnd = Math.max(min, Math.min(valueToApply, max));
						nextValue = [currentStart, newEnd];
					}
					// Normaliza al soltar: menor primero
					if (Array.isArray(nextValue) && nextValue[0] > nextValue[1]) {
						nextValue = [nextValue[1], nextValue[0]];
					}
				} else {
					// Para slider de handle único, el valor final es simplemente el valor a aplicar, clampado
					const valueToApply =
						finalValue === null ? (currentValue as number) : (valueToFinalize as number);
					nextValue = Math.max(min, Math.min(max, valueToApply));
				}

				// Actualizar estado interno si no es controlado
				if (value === undefined) {
					setInternalValue(nextValue);
				}

				// Llamar al handler onChange (si existe) con el valor final calculado
				if (isDoubleHandled) {
					(onChangeValue as (value: [number, number]) => void)?.(
						nextValue as [number, number]
					);
				} else {
					(onChangeValue as (value: number) => void)?.(nextValue as number);
				}

				// Resetear estados de arrastre
				setIsDragging(false);
				setDraggingHandleIndex(null);

				// Liberar la captura del puntero (llamado en el elemento que la tiene, el handle original)
				// event.target es el *elemento que recibió el pointerup*, no necesariamente el que capturó.
				// Intentamos liberar la captura en el target del evento up, si falla, no es crítico.
				try {
					if ((event.target as Element).hasPointerCapture(event.pointerId)) {
						(event.target as Element).releasePointerCapture(event.pointerId);
					}
				} catch (e) {
					console.error("Failed to release pointer capture:", e);
					// La captura se perderá de todas formas eventualmente (ej. puntero fuera de ventana, otro pointerdown).
				}
			},
			[
				isDragging,
				draggingHandleIndex,
				trackRef,
				getValueFromPointerEvent,
				currentValue,
				isDoubleHandled,
				onChangeValue,
				min,
				max,
				value, // Dependencia para saber si es controlado
			]
		);

		// --- Manejar la navegación con teclado (Opcional pero recomendado para accesibilidad) ---
		// Se añadirían listeners onKeyDown a los handles
		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>, handleIndex: number) => {
				if (disabled) return;

				const handleStep = event.shiftKey ? step * 10 : step;
				let delta = 0; // Cambio en el valor

				// Detectar flechas izquierda/abajo y derecha/arriba
				if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
					delta = -handleStep;
					event.preventDefault();
				} else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
					delta = handleStep;
					event.preventDefault();
				} else if (event.key === "Home") {
					if (isDoubleHandled) {
						if (handleIndex === 0) delta = min - (currentValue as [number, number])[0];
						else delta = (currentValue as [number, number])[0] - (currentValue as [number, number])[1];
					} else {
						delta = min - (currentValue as number);
					}
					event.preventDefault();
				} else if (event.key === "End") {
					if (isDoubleHandled) {
						if (handleIndex === 0)
							delta = (currentValue as [number, number])[1] - (currentValue as [number, number])[0];
						else delta = max - (currentValue as [number, number])[1];
					} else {
						delta = max - (currentValue as number);
					}
					event.preventDefault();
				} else if (event.key === "PageDown") {
					delta = -handleStep * 10;
					event.preventDefault();
				} else if (event.key === "PageUp") {
					delta = handleStep * 10;
					event.preventDefault();
				}

				if (delta !== 0) {
					let nextValue: number | [number, number];

					if (isDoubleHandled) {
						const [currentStart, currentEnd] = currentValue as [number, number];
						if (handleIndex === 0) {
							const rawNext = currentStart + delta;
							const clampedStart = Math.max(min, Math.min(currentEnd, rawNext));
							nextValue = [clampedStart, currentEnd];
						} else {
							const rawNext = currentEnd + delta;
							const clampedEnd = Math.max(currentStart, Math.min(max, rawNext));
							nextValue = [currentStart, clampedEnd];
						}
					} else {
						const currentVal = currentValue as number;
						const rawNext = currentVal + delta;
						const clampedVal = Math.max(min, Math.min(max, rawNext));
						nextValue = clampedVal;
					}

					// Actualizar estado interno si no es controlado
					if (value === undefined) {
						setInternalValue(nextValue);
					}

					// Llamar a onChange (o quizás onInput para feedback más rápido, pero onChange es más común para teclado)
					if (isDoubleHandled) {
						(onChangeValue as (value: [number, number]) => void)?.(
							nextValue as [number, number]
						);
					} else {
						(onChangeValue as (value: number) => void)?.(nextValue as number);
					}
				}
			},
			[disabled, step, min, max, currentValue, isDoubleHandled, onChangeValue, value]
		);

		return (
			// Contenedor principal que captura eventos de movimiento y fin de arrastre
			// Añadimos onPointerMove y onPointerUp aquí para recibir eventos después de setPointerCapture en el handle
			<div
				ref={ref}
				className={clsx(sliderContainer({ disabled, orientation }), className)}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				// onTouchMove y onTouchEnd ya no son necesarios si onPointerMove/Up con setPointerCapture funciona
				{...rest} // Esparce otras props HTMLAttributes
			>
				{/* Pista del slider */}
				<div
					ref={trackRef}
					className={clsx(
						sliderTrack({ size, viewBar, disabled, orientation, radius })
					)}
					// onPointerDown en el track para manejar clicks/taps fuera de los handles (comportamiento "salto")
					onPointerDown={(event) => {
						// Prevenir comportamiento por defecto
						event.preventDefault();
						// No detener propagación aquí...

						if (disabled || event.nativeEvent.pointerType === "touch" || !trackRef.current) return;

						// Obtener el valor correspondiente a la posición del click/tap en el track
						const newValue = getValueFromPointerEvent(event);
						if (newValue === null) return;

						let finalValue: number | [number, number];
						let closestHandleIdx = 0;

						if (isDoubleHandled) {
							const [currentStart, currentEnd] = currentValue as [number, number];
							// Determinar qué handle está más cerca de la posición del click/tap
							const startPos = valueToPercentage(currentStart);
							const endPos = valueToPercentage(currentEnd);
							const pointerPos = valueToPercentage(newValue);

							const distToStart = Math.abs(pointerPos - startPos);
							const distToEnd = Math.abs(pointerPos - endPos);

							if (distToStart <= distToEnd) {
								// Mover el handle de inicio, asegurándose de no cruzar el handle de fin
								const clampedStart = Math.min(newValue, currentEnd);
								finalValue = [Math.max(min, clampedStart), currentEnd];
								closestHandleIdx = 0;
							} else {
								// Mover el handle de fin, asegurándose de no cruzar el handle de inicio
								const clampedEnd = Math.max(newValue, currentStart);
								finalValue = [currentStart, Math.min(max, clampedEnd)];
								closestHandleIdx = 1;
							}
						} else {
							// Mover el handle único
							finalValue = Math.max(min, Math.min(max, newValue));
							closestHandleIdx = 0;
						}

						// Actualizar estado interno si no es controlado
						if (value === undefined) {
							setInternalValue(finalValue);
						}

						// Llamar a onChange con el valor final calculado para el "salto"
						// El padre actualizará la prop 'value' basándose en esto.
						if (isDoubleHandled) {
							(onChangeValue as (value: [number, number]) => void)?.(
								finalValue as [number, number]
							);
						} else {
							(onChangeValue as (value: number) => void)?.(finalValue as number);
						}

						// Iniciar el drag sobre el handle más cercano
						// NOTA: Esto solo funcionará bien si el padre actualiza el valor inmediatamente (componente controlado)
						setTimeout(() => {
							handleHandlePointerDown(event, closestHandleIdx);
						}, 0);
					}}
				>
					{viewBar && marks.length > 0 && (
						<div className={clsx(sliderMarkContainer({ size, orientation }))}>
							{marks.map((mark, index) => {
								const percent = valueToPercentage(mark.value);
								return (
									<div
										key={index}
										className={clsx(
											sliderMark({
												size,
												inSlider: mark.value < max,
												hasLabel: !!mark.label,
												orientation,
											})
										)}
										data-value={mark.label}
										style={
											isVertical
												? {
													top: `${100 - percent}%`,
													display: mark.value <= max ? "block" : "none",
												}
												: {
													left: `${percent}%`,
													display: mark.value <= max ? "block" : "none",
												}
										}
									></div>
								);
							})}
						</div>
					)}
					{/* Relleno de la selección */}
					<div
						className={clsx(sliderFill({ size, disabled, orientation, radius, color }))}
						style={{ ...fillStyle, opacity: viewBar ? 1 : 0 }}
					></div>

					{/* Handle(s) */}
					{/* Handle izquierdo (o único) */}
					<div
						className={clsx(
							sliderHandle({
								size,
								disabled,
								isDragging: isDragging && draggingHandleIndex === 0,
								orientation,
								radius,
								color,
							})
						)}
						// Posiciona el handle único u izquierdo
						style={
							isVertical
								? { top: `${100 - (isDoubleHandled ? startPosPercentage : endPosPercentage)}%` }
								: { left: `${isDoubleHandled ? startPosPercentage : endPosPercentage}%` }
						}
						onPointerDown={(e) => handleHandlePointerDown(e, 0)}
						onKeyDown={(e) => handleKeyDown(e, 0)}
						role="slider"
						aria-label={
							isDoubleHandled
								? Array.isArray(currentValue)
									? currentValue[0].toString()
									: (currentValue as unknown as string) || "Inicio del rango"
								: currentValue.toString()
						}
						aria-valuemin={min}
						aria-valuemax={max}
						aria-valuenow={
							isDoubleHandled ? Number(startValue.toFixed(2)) : Number(endValue.toFixed(2))
						}
						aria-disabled={disabled}
						tabIndex={disabled ? -1 : 0}
					>
						{viewValue && (
							<div className={sliderValue({ size, orientation })}>
								{formatValue
									? formatValue(isDoubleHandled ? startValue : endValue)
									: isDoubleHandled
										? Number(startValue.toFixed(2))
										: Number(endValue.toFixed(2))}
							</div>
						)}
					</div>

					{/* Handle derecho (solo si es doble handle) */}
					{isDoubleHandled && (
						<div
							className={clsx(
								sliderHandle({
									size,
									disabled,
									isDragging: isDragging && draggingHandleIndex === 1,
									orientation,
									radius,
									color,
								})
							)}
							style={
								isVertical
									? { top: `${100 - endPosPercentage}%` }
									: { left: `${endPosPercentage}%` }
							}
							onPointerDown={(e) => handleHandlePointerDown(e, 1)}
							onKeyDown={(e) => handleKeyDown(e, 1)}
							role="slider"
							// *** CORRECCIÓN ARIA LABEL: Usa la segunda etiqueta si es array, o un fallback ***
							aria-label={
								Array.isArray(currentValue) ? currentValue[1].toString() : `${currentValue || "Fin del rango"}`
							}
							aria-valuemin={min}
							aria-valuemax={max}
							aria-valuenow={Number(endValue.toFixed(2))}
							aria-disabled={disabled}
							tabIndex={disabled ? -1 : 0}
						>
							{viewValue && (
								<div className={sliderValue({ size, orientation })}>
									{Number(endValue.toFixed(2))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
);

const SliderRoot = forwardRef<HTMLDivElement, SliderSingleProps>((props, ref) => {
	return (
		<div className={sliderWrapper({ size: props.size, orientation: props.orientation, hasMarks: (props?.marks?.length ?? 0) > 0 })}>
			<label>{props.label}</label>
			<SliderImpl {...props} ref={ref} />
		</div>
	);
});

const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
	return (
		<div className={sliderWrapper({ size: props.size, orientation: props.orientation, hasMarks: (props?.marks?.length ?? 0) > 0 })}>
			<label>{props.label}</label>
			<SliderImpl {...props} ref={ref} />
		</div>
	);
});

export const Slider = Object.assign(SliderRoot, { Range: SliderRange });
