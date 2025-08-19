import {
	forwardRef,
	useEffect,
	useState,
	useRef,
	PointerEvent as PointerEventReact,
	useCallback,
} from "react";
import { ColorPickerProps } from "./colorpicker.types";
import { colorpickerVariants } from "./colorpicker.variants";
import clsx from "clsx";
import styles from "./colorpicker.module.css";
import { InputNumber } from "../InputNumber/InputNumber";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { CheckIcon, CopyIcon, Pipette } from "lucide-react";
import useEyeDropper from "use-eye-dropper";
// Importa el componente Range
import { Range } from "../Range/Range";

// Helper para convertir HSL a HSV
const hslToHsv = (h: number, s: number, l: number) => {
	const newSaturation = s / 100;
	const newLightness = l / 100;
	const v = newLightness + newSaturation * Math.min(newLightness, 1 - newLightness);
	const newS = v === 0 ? 0 : 2 * (1 - newLightness / v);
	return {
		h,
		s: Math.round(newS * 100),
		v: Math.round(v * 100),
	};
};

// Helper para convertir HSV a HSL
const hsvToHsl = (h: number, s: number, v: number) => {
	const newSaturation = s / 100;
	const newValue = v / 100;
	const newL = newValue * (1 - newSaturation / 2);
	const newS = newL === 0 || newL === 1 ? 0 : (newValue - newL) / Math.min(newL, 1 - newL);
	return {
		h,
		s: Math.round(newS * 100),
		l: Math.round(newL * 100),
	};
};

// Helper para convertir HSV a XY del picker
const hsvToXy = (s: number, v: number, pickerRect: DOMRect) => {
	const x = (s / 100) * pickerRect.width;
	const y = ((100 - v) / 100) * pickerRect.height;
	return { x, y };
};

// Helper para convertir HSL a HEX
const hslToHex = (h: number, s: number, l: number): string => {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0");
	};
	return `#${f(0)}${f(8)}${f(4)}`;
};

// Helper para convertir HEX a HSL y ALPHA
const hexToHslAndAlpha = (hex: string) => {
	const hexColor = hex.length > 7 ? hex.slice(0, 7) : hex;
	const hexAlpha = hex.length > 7 ? hex.slice(7) : null;
	const r = parseInt(hexColor.slice(1, 3), 16) / 255;
	const g = parseInt(hexColor.slice(3, 5), 16) / 255;
	const b = parseInt(hexColor.slice(5, 7), 16) / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0,
		s,
		l = (max + min) / 2;
	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	const alpha = hexAlpha ? Math.round((parseInt(hexAlpha, 16) / 255) * 100) : 100;
	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
		alpha,
	};
};

// Helper para convertir HSL a RGB
const hslToRgb = (h: number, s: number, l: number) => {
	s /= 100;
	l /= 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
	return {
		r: Math.round(255 * f(0)),
		g: Math.round(255 * f(8)),
		b: Math.round(255 * f(4)),
	};
};

// Helper para convertir RGB a HSL
const rgbToHsl = (r: number, g: number, b: number) => {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0,
		s,
		l = (max + min) / 2;
	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
};

// Nueva función para convertir porcentaje de transparencia a HEX
const alphaToHex = (a: number): string => {
	const alphaValue = Math.round((a / 100) * 255);
	return alphaValue.toString(16).padStart(2, "0").toUpperCase();
};

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
	({ className, size, variant, disabled, value, onChange, ...props }, ref) => {
		const { open, isSupported } = useEyeDropper();
		const [internalValue, setInternalValue] = useState<string>(value || "hsl(0, 100%, 50%)");
		const [alpha, setAlpha] = useState(100);
		const [format, setFormat] = useState<"hex" | "hsl" | "rgb">("hex");
		const [inputValue, setInputValue] = useState(internalValue);
		const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
		const [copied, setCopied] = useState(false);
		const [pickerX, setPickerX] = useState(0);
		const [pickerY, setPickerY] = useState(0);
		const [viewPicker, setViewPicker] = useState(false);

		const pickerRef = useRef<HTMLDivElement>(null);
		const pickerButtonRef = useRef<HTMLButtonElement>(null);
		const viewRef = useRef<HTMLDivElement>(null);
		const colorPickerRef = useRef<HTMLDivElement>(null);
		const buttonSliderRef = useRef<HTMLButtonElement>(null);
		const buttonAlphaRef = useRef<HTMLButtonElement>(null);

		const [isDraggingPicker, setIsDraggingPicker] = useState(false);
		const lastPointerPosition = useRef({ x: 0, y: 0 });

		// Sincroniza el estado interno con el valor de la prop "value"
		useEffect(() => {
			if (value) {
				setInternalValue(value);
			}
		}, [value]);

		// Sincroniza la interfaz visual con el estado interno
		useEffect(() => {
			const hueMatch = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
			const hue = hueMatch ? parseInt(hueMatch[1]) : 0;
			const s = hueMatch ? parseInt(hueMatch[2]) : 0;
			const l = hueMatch ? parseInt(hueMatch[3]) : 0;

			const { r, g, b } = hslToRgb(hue, s, l);
			setRgbValues({ r, g, b });

			if (pickerRef.current) {
				const pickerRect = pickerRef.current.getBoundingClientRect();
				const hsv = hslToHsv(hue, s, l);
				const { x, y } = hsvToXy(hsv.s, hsv.v, pickerRect);
				setPickerX(x);
				setPickerY(y);
			}

			// Inicializar el input según el formato por defecto
			if (format === "hex") {
				const hexColor = hslToHex(hue, s, l);
				const newDisplayValue = alpha === 100 ? hexColor : `${hexColor}${alphaToHex(alpha)}`;
				setInputValue(newDisplayValue);
			} else if (format === "rgb") {
				setInputValue(`rgb(${r}, ${g}, ${b})`);
			} else {
				setInputValue(internalValue);
			}
		}, [internalValue, format, alpha]);

		// Lógica de arrastre del picker, el resto es manejado por el componente Range
		useEffect(() => {
			const handlePointerMove = (event: PointerEvent) => {
				let newColor: string | undefined;

				if (isDraggingPicker && pickerRef.current && pickerButtonRef.current) {
					const rect = pickerRef.current.getBoundingClientRect();
					const buttonRect = pickerButtonRef.current.getBoundingClientRect();
					let x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
					let y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
					pickerButtonRef.current.style.transform = `translate(${x - buttonRect.width / 2}px, ${
						y - buttonRect.height / 2
					}px)`;
					lastPointerPosition.current.x = x;
					lastPointerPosition.current.y = y;

					const match = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
					const currentHue = match ? parseInt(match[1]) : 0;
					const newSaturation = (x / rect.width) * 100;
					const newBrillo = 100 - (y / rect.height) * 100;
					const newHsl = hsvToHsl(currentHue, newSaturation, newBrillo);
					newColor = `hsl(${Math.round(newHsl.h)}, ${Math.round(newHsl.s)}%, ${Math.round(
						newHsl.l
					)}%)`;
				}

				if (newColor && viewRef.current) {
					viewRef.current.style.backgroundColor = newColor;
				}
			};

			const handlePointerUp = () => {
				const match = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
				const currentHue = match ? parseInt(match[1]) : 0;
				let finalColor: string | undefined;

				if (isDraggingPicker && pickerRef.current && pickerButtonRef.current) {
					const rect = pickerRef.current.getBoundingClientRect();
					const buttonRect = pickerButtonRef.current.getBoundingClientRect();
					const x = lastPointerPosition.current.x;
					const y = lastPointerPosition.current.y;

					pickerButtonRef.current.style.transform = `translate(${x - buttonRect.width / 2}px, ${
						y - buttonRect.height / 2
					}px)`;

					const newSaturation = (x / rect.width) * 100;
					const newBrillo = 100 - (y / rect.height) * 100;
					const newHsl = hsvToHsl(currentHue, newSaturation, newBrillo);
					finalColor = `hsl(${Math.round(newHsl.h)}, ${Math.round(newHsl.s)}%, ${Math.round(
						newHsl.l
					)}%)`;
				}

				if (finalColor) {
					setInternalValue(finalColor);
					onChange?.(finalColor);
				}

				setIsDraggingPicker(false);
			};

			document.addEventListener("pointermove", handlePointerMove);
			document.addEventListener("pointerup", handlePointerUp);
			return () => {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp);
			};
		}, [isDraggingPicker, internalValue, onChange]);

		useEffect(() => {
			function handleClickOutside(event: MouseEvent) {
				// Utiliza la referencia del componente pasado a través de forwardRef
				console.log(colorPickerRef);
				const componentRef = (colorPickerRef as React.RefObject<HTMLDivElement>).current;

				// Si el componente existe y el clic no fue dentro de él
				if (componentRef && !componentRef.contains(event.target as Node)) {
					console.log(componentRef);
					console.log(event.target);
					setViewPicker(false);
				}
			}

			// Añade el event listener solo cuando el picker está visible
			if (viewPicker) {
				document.addEventListener("mousedown", handleClickOutside);
			}

			// Función de limpieza para eliminar el listener
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [viewPicker, colorPickerRef]); // Dependencias: viewPicker y ref

		const handlePickerDown = (event: PointerEventReact) => {
			if (disabled || !pickerRef.current || !pickerButtonRef.current) return;
			const rect = pickerRef.current.getBoundingClientRect();
			const buttonRect = pickerButtonRef.current.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			lastPointerPosition.current.x = x;
			lastPointerPosition.current.y = y;

			pickerButtonRef.current.style.transform = `translate(${x - buttonRect.width / 2}px, ${
				y - buttonRect.height / 2
			}px)`;
			setIsDraggingPicker(true);
		};

		const handleSliderDown = (event: PointerEventReact) => {
			if (disabled) return;
			const sliderRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
			const x = Math.max(0, Math.min(sliderRect.width, event.clientX - sliderRect.left));
			const newHue = Math.round((x / sliderRect.width) * 360);

			const hsv = hslToHsv(hue, s, l);
			const newHsl = hsvToHsl(newHue, hsv.s, hsv.v);
			const newColor = `hsl(${Math.round(newHsl.h)}, ${Math.round(newHsl.s)}%, ${Math.round(
				newHsl.l
			)}%)`;

			setInternalValue(newColor);
			onChange?.(newColor);
		};

		const handleAlphaDown = (event: PointerEventReact) => {
			if (disabled) return;
			const sliderRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
			const x = Math.max(0, Math.min(sliderRect.width, event.clientX - sliderRect.left));
			const newAlpha = Math.round((x / sliderRect.width) * 100);

			setAlpha(newAlpha);
			onChange?.(`hsla(${hue}, ${s}%, ${l}%, ${newAlpha / 100})`);
		};

		const handleChangeFormat = () => {
			setFormat((prevFormat) => {
				const hueMatch = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
				const hue = hueMatch ? parseInt(hueMatch[1]) : 0;
				const s = hueMatch ? parseInt(hueMatch[2]) : 0;
				const l = hueMatch ? parseInt(hueMatch[3]) : 0;

				if (prevFormat === "hsl") {
					const { r, g, b } = hslToRgb(hue, s, l);
					setInputValue(`rgb(${r}, ${g}, ${b})`);
					return "rgb";
				}
				if (prevFormat === "rgb") {
					const hexColor = hslToHex(hue, s, l);
					const newDisplayValue = alpha === 100 ? hexColor : `${hexColor}${alphaToHex(alpha)}`;
					setInputValue(newDisplayValue);
					return "hex";
				}

				// Si el formato es "hex" o cualquier otro, volvemos a "hsl"
				setInputValue(internalValue);
				return "hsl";
			});
		};

		const handleInputChange = (value: string) => {
			setInputValue(value);
			let newColorInHsl = null;
			if (/^#?([0-9A-Fa-f]{3}){1,2}$/.test(value) || /^#?([0-9A-Fa-f]{4}){1,2}$/.test(value)) {
				const {
					h,
					s,
					l,
					alpha: newAlpha,
				} = hexToHslAndAlpha(value.startsWith("#") ? value : `#${value}`);
				newColorInHsl = `hsl(${h}, ${s}%, ${l}%)`;
				setAlpha(newAlpha);
			} else if (/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i.test(value)) {
				newColorInHsl = value;
			} else if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.test(value)) {
				const rgbMatch = value.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i);
				if (rgbMatch) {
					const r = parseInt(rgbMatch[1]);
					const g = parseInt(rgbMatch[2]);
					const b = parseInt(rgbMatch[3]);
					const { h, s, l } = rgbToHsl(r, g, b);
					newColorInHsl = `hsl(${h}, ${s}%, ${l}%)`;
				}
			}
			if (newColorInHsl) {
				setInternalValue(newColorInHsl);
				onChange?.(newColorInHsl);
			}
		};

		const handleSingleInputChange = (value: number | undefined, part: string) => {
			if (value === undefined || value === null) return;
			const hueMatch = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
			if (!hueMatch) return;
			let [_, h, s, l] = hueMatch.map(Number);
			let newColor: string;

			if (format === "hsl") {
				if (part === "h") h = Math.min(360, Math.max(0, value));
				if (part === "s") s = Math.min(100, Math.max(0, value));
				if (part === "l") l = Math.min(100, Math.max(0, value));
				newColor = `hsl(${h}, ${s}%, ${l}%)`;
			} else {
				// format === "rgb"
				let { r, g, b } = rgbValues;
				if (part === "r") r = Math.min(255, Math.max(0, value));
				if (part === "g") g = Math.min(255, Math.max(0, value));
				if (part === "b") b = Math.min(255, Math.max(0, value));
				const newHsl = rgbToHsl(r, g, b);
				newColor = `hsl(${newHsl.h}, ${newHsl.s}%, ${newHsl.l}%)`;
				setRgbValues({ r, g, b });
			}

			setInternalValue(newColor);
			onChange?.(newColor);
		};

		const handleCopyClick = async () => {
			const hueMatch = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
			const hue = hueMatch ? parseInt(hueMatch[1]) : 0;
			const s = hueMatch ? parseInt(hueMatch[2]) : 0;
			const l = hueMatch ? parseInt(hueMatch[3]) : 0;
			let valueToCopy = "";

			if (format === "hex") {
				const hexColor = hslToHex(hue, s, l);
				valueToCopy = alpha === 100 ? hexColor : `${hexColor}${alphaToHex(alpha)}`;
			} else if (format === "rgb") {
				const { r, g, b } = hslToRgb(hue, s, l);
				valueToCopy = `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
			} else {
				valueToCopy = `hsla(${hue}, ${s}%, ${l}%, ${alpha / 100})`;
			}

			if (navigator.clipboard) {
				try {
					await navigator.clipboard.writeText(valueToCopy);
					setCopied(true);
					setTimeout(() => setCopied(false), 2000);
				} catch (err) {
					console.error("Error al copiar el color:", err);
				}
			}
		};

		const pickColor = useCallback(() => {
			// Using async/await (can be used as a promise as-well)
			const openPicker = async () => {
				try {
					const color = await open();
					const { h, s, l } = hexToHslAndAlpha(color.sRGBHex);
					setInternalValue(`hsl(${h}, ${s}%, ${l}%)`);
					onChange?.(`hsl(${h}, ${s}%, ${l}%)`);
				} catch (e) {
					console.log(e);
					// Ensures component is still mounted
					// before calling setState
					//if (!e.canceled) setError(e)
				}
			};
			openPicker();
		}, [open, onChange]);

		const hueMatch = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
		const hue = hueMatch ? parseInt(hueMatch[1]) : 0;
		const s = hueMatch ? parseInt(hueMatch[2]) : 0;
		const l = hueMatch ? parseInt(hueMatch[3]) : 0;

		const pickerButtonRect = pickerButtonRef.current?.getBoundingClientRect();
		const finalPickerX = pickerX - (pickerButtonRect?.width || 0) / 2;
		const finalPickerY = pickerY - (pickerButtonRect?.height || 0) / 2;

		return (
			<div
				className={clsx(colorpickerVariants({ size, variant, disabled }), className)}
				ref={ref}
				{...props}
				role="colorpicker"
			>
				<div className={styles["lambda-colorpicker-pattern"]}></div>
				<div className={styles["lambda-colorpicker-border"]}></div>
				<button
					type="button"
					className={clsx(styles["lambda-colorpicker-button"])}
					onClick={() => setViewPicker((prev) => !prev)}
					style={{ backgroundColor: internalValue, opacity: alpha / 100 }}
				></button>
				<div
					className={clsx(styles["lambda-colorpicker-box"], {
						[styles["lambda-colorpicker-box-view"]]: viewPicker,
					})}
					ref={colorPickerRef}
				>
					<div className={styles["lambda-colorpicker-preview"]}>
						<div className={styles["lambda-colorpicker-preview-background"]}></div>
						<div
							className={styles["lambda-colorpicker-preview-color"]}
							ref={viewRef}
							style={{ backgroundColor: internalValue, opacity: alpha / 100 }}
						/>

						<Button
							className={styles["lambda-colorpicker-preview-copy"]}
							type="button"
							variant="ghost"
							color="secondary"
							size="tiny"
							onClick={handleCopyClick}
							icon={copied ? <CheckIcon /> : <CopyIcon />}
						/>
					</div>
					<div
						className={styles["lambda-colorpicker-picker"]}
						onPointerDown={handlePickerDown}
						ref={pickerRef}
						style={{
							backgroundColor: `hsl(${hue}, 100%, 50%)`,
							backgroundImage: `
                                linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%),
                                linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)
                            `,
						}}
					>
						<button
							type="button"
							className={styles["lambda-colorpicker-picker-button"]}
							ref={pickerButtonRef}
							style={{
								transform: `translate(${finalPickerX}px, ${finalPickerY}px)`,
							}}
						/>
					</div>
					<div className={styles["lambda-colorpicker-controls"]}>
						<div className={styles["lambda-colorpicker-controls-colors"]}>
							<div
								className={styles["lambda-colorpicker-controls-slider"]}
								onPointerDown={handleSliderDown}
							></div>
							<Range
								size="small"
								value={hue}
								min={0}
								max={360}
								label="Hue"
								ariaLabel="Hue Slider"
								viewValue={false}
								viewBar={false}
								onInput={(e) => {
									const hsv = hslToHsv(hue, s, l);
									const newHsl = hsvToHsl(e as number, hsv.s, hsv.v);
									const newColor = `hsl(${Math.round(newHsl.h)}, ${Math.round(
										newHsl.s
									)}%, ${Math.round(newHsl.l)}%)`;
									setInternalValue(newColor);
									onChange?.(newColor);
								}}
							/>
							{isSupported() && (
								<Button
									variant="ghost"
									color="secondary"
									size="tiny"
									icon={<Pipette />}
									onClick={pickColor}
									ref={buttonSliderRef}
									className={styles["lambda-colorpicker-dropper"]}
								/>
							)}
						</div>
						<div className={styles["lambda-colorpicker-controls-alpha"]}>
							<div className={styles["lambda-colorpicker-controls-slider-pattern"]}></div>
							<div
								className={styles["lambda-colorpicker-controls-slider-alpha"]}
								onPointerDown={handleAlphaDown}
								style={{
									background: `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, ${internalValue} 100%)`,
								}}
							></div>
							<Range
								size="small"
								value={alpha}
								min={0}
								max={100}
								label="Alpha"
								ariaLabel="Alpha Slider"
								viewValue={false}
								viewBar={false}
								onInput={(e) => {
									setAlpha(e as number);
									onChange?.(`hsla(${hue}, ${s}%, ${l}%, ${(e as number) / 100})`);
								}}
							/>
							<InputNumber
								value={alpha}
								min={0}
								max={100}
								onChange={(value) => {
									setAlpha(Math.min(100, Math.max(0, value || 0)));
								}}
								size="tiny"
							/>
						</div>
						<div className={styles["lambda-colorpicker-controls-inputs"]}>
							{format === "hex" ? (
								<div className={styles["lambda-colorpicker-input-group"]}>
									<Input
										type="text"
										value={inputValue}
										id="lambda-colorpicker-input-hex"
										name="lambda-colorpicker-input-hex"
										size="tiny"
										onChange={handleInputChange}
										className={styles["lambda-colorpicker-input-single"]}
									/>
									<Button
										variant="ghost"
										color="secondary"
										size="tiny"
										label={format.toUpperCase()}
										onClick={handleChangeFormat}
										className={styles["lambda-colorpicker-input-format"]}
									/>
								</div>
							) : (
								<div className={styles["lambda-colorpicker-input-group"]}>
									<InputNumber
										value={format === "hsl" ? hue : rgbValues.r}
										size="tiny"
										min={0}
										max={format === "hsl" ? 360 : 255}
										onChange={(value) =>
											handleSingleInputChange(value, format === "hsl" ? "h" : "r")
										}
										className={styles["lambda-colorpicker-input-multiple"]}
									/>
									<InputNumber
										value={format === "hsl" ? s : rgbValues.g}
										onChange={(value) =>
											handleSingleInputChange(value, format === "hsl" ? "s" : "g")
										}
										min={0}
										max={format === "hsl" ? 100 : 255}
										size="tiny"
										className={styles["lambda-colorpicker-input-multiple"]}
									/>
									<InputNumber
										value={format === "hsl" ? l : rgbValues.b}
										onChange={(value) =>
											handleSingleInputChange(value, format === "hsl" ? "l" : "b")
										}
										min={0}
										max={format === "hsl" ? 100 : 255}
										size="tiny"
										className={styles["lambda-colorpicker-input-multiple"]}
									/>
									<Button
										variant="ghost"
										color="secondary"
										size="tiny"
										label={format.toUpperCase()}
										onClick={handleChangeFormat}
										ref={buttonAlphaRef}
										className={styles["lambda-colorpicker-input-format"]}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
);

ColorPicker.displayName = "ColorPicker";
