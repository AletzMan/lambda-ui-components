import {
	forwardRef,
	useEffect,
	useState,
	useRef,
	PointerEvent as PointerEventReact,
	useCallback,
	RefObject,
	KeyboardEvent,
	useLayoutEffect,
} from "react";
import { ColorPickerProps } from "./colorpicker.types";
import {
	colorpickerBoxVariants,
	colorpickerGroupVariants,
	colorpickerTextVariants,
	colorpickerVariants,
} from "./colorpicker.variants";
import clsx from "clsx";
import styles from "./colorpicker.module.css";
import { InputNumber } from "../InputNumber/InputNumber";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { CheckIcon, CopyIcon, Pipette } from "lucide-react";
import useEyeDropper from "use-eye-dropper";
// Importa el componente Slider
import { Slider } from "../Slider/Slider";
import { Tooltip } from "../ToolTip/ToolTip";
import {
	useTranslation,
	useUIConfig,
} from "../../_internal/hooks/translation/LambdaConfigProvider";
import { createPortal } from "react-dom";
import { usePopover } from "../../_internal/hooks/translation/usePopover/usePopover";

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
	const { minX, minY, usableWidth, usableHeight } = getUsableArea(pickerRect);
	const x = minX + (s / 100) * usableWidth;
	const y = minY + ((100 - v) / 100) * usableHeight;
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

// Utilidades para conversión entre posición y saturación/brillo
const PICKER_BUTTON_SIZE = 14; // px, según el CSS

function getUsableArea(rect: DOMRect) {
	const minX = PICKER_BUTTON_SIZE / 2;
	const maxX = rect.width - PICKER_BUTTON_SIZE / 2;
	const minY = PICKER_BUTTON_SIZE / 2;
	const maxY = rect.height - PICKER_BUTTON_SIZE / 2;
	const usableWidth = rect.width - PICKER_BUTTON_SIZE;
	const usableHeight = rect.height - PICKER_BUTTON_SIZE;
	return { minX, maxX, minY, maxY, usableWidth, usableHeight };
}

function clamp(v: number, min: number, max: number) {
	return Math.max(min, Math.min(max, v));
}

function colorToPosition(s: number, v: number, rect: DOMRect) {
	const { minX, minY, usableWidth, usableHeight } = getUsableArea(rect);
	const x = minX + (s / 100) * usableWidth;
	const y = minY + ((100 - v) / 100) * usableHeight;
	return { x, y };
}

function positionToColor(x: number, y: number, rect: DOMRect) {
	const { minX, minY, usableWidth, usableHeight } = getUsableArea(rect);
	const s = clamp(((x - minX) / usableWidth) * 100, 0, 100);
	const v = clamp(100 - ((y - minY) / usableHeight) * 100, 0, 100);
	return { s, v };
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
	(
		{ className, size, variant, disabled, value, onChange, format: formatProp, showText, ...props },
		ref
	) => {
		const { open, isSupported } = useEyeDropper();
		const {
			triggerRef,
			contentRef,
			menuPosition,
			isOpen: viewPicker,
			setIsOpen: setViewPicker,
			handleKeyDown,
		} = usePopover({ x: -3, y: -39 });
		const { t } = useTranslation();
		const { radiusField, radiusBox } = useUIConfig();
		const [internalValue, setInternalValue] = useState<string>(value || "hsl(0, 100%, 50%)");
		const [alpha, setAlpha] = useState(100);
		const [format, setFormat] = useState<"hex" | "hsl" | "rgb" | "rgba" | "hsla">(
			formatProp || "hex"
		);
		const [inputValue, setInputValue] = useState(internalValue);
		const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
		const [copied, setCopied] = useState(false);
		const [pickerX, setPickerX] = useState(0);
		const [pickerY, setPickerY] = useState(0);

		const pickerRef = useRef<HTMLDivElement>(null);
		const pickerButtonRef = useRef<HTMLButtonElement>(null);
		const viewRef = useRef<HTMLDivElement>(null);
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

		useEffect(() => {
			setFormat(formatProp || "hex");
		}, [formatProp]);

		useLayoutEffect(() => {
			if (!pickerRef.current) return;
			const rect = pickerRef.current.getBoundingClientRect();
			const match = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
			if (!match) return;
			const h = parseInt(match[1]);
			const s = parseInt(match[2]);
			const l = parseInt(match[3]);
			const hsv = hslToHsv(h, s, l);
			const { x, y } = hsvToXy(hsv.s, hsv.v, rect);
			setPickerX(x);
			setPickerY(y);
		}, [internalValue, viewPicker]);

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
			} else if (format === "rgba") {
				setInputValue(`rgba(${r}, ${g}, ${b}, ${alpha / 100})`);
			} else if (format === "hsl") {
				setInputValue(`hsl(${hue}, ${s}%, ${l}%)`);
			} else if (format === "hsla") {
				setInputValue(`hsla(${hue}, ${s}%, ${l}%, ${alpha / 100})`);
			} else {
				setInputValue(internalValue);
			}
		}, [internalValue, format, alpha]);

		// Lógica de arrastre del picker, el resto es manejado por el componente Slider
		useEffect(() => {
			const handlePointerMove = (event: PointerEvent) => {
				let newColor: string | undefined;

				if (isDraggingPicker && pickerRef.current && pickerButtonRef.current) {
					const rect = pickerRef.current.getBoundingClientRect();
					const { minX, maxX, minY, maxY } = getUsableArea(rect);
					let x = clamp(event.clientX - rect.left, minX, maxX);
					let y = clamp(event.clientY - rect.top, minY, maxY);

					lastPointerPosition.current.x = x;
					lastPointerPosition.current.y = y;

					setPickerX(x);
					setPickerY(y);

					const match = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
					const currentHue = match ? parseInt(match[1]) : 0;
					const { s, v } = positionToColor(x, y, rect);
					const newHsl = hsvToHsl(currentHue, s, v);
					newColor = `hsl(${Math.round(newHsl.h)}, ${Math.round(newHsl.s)}%, ${Math.round(
						newHsl.l
					)}%)`;
				}

				if (newColor && viewRef.current) {
					viewRef.current.style.backgroundColor = newColor;
				}
			};

			const handlePointerUp = (event?: PointerEvent) => {
				const match = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
				const currentHue = match ? parseInt(match[1]) : 0;
				let finalColor: string | undefined;

				if (isDraggingPicker && pickerRef.current && pickerButtonRef.current) {
					const rect = pickerRef.current.getBoundingClientRect();
					const { minX, maxX, minY, maxY } = getUsableArea(rect);
					// Usa la posición real del cursor si viene del evento, si no, usa la última conocida
					const x = event
						? clamp(event.clientX - rect.left, minX, maxX)
						: clamp(lastPointerPosition.current.x, minX, maxX);
					const y = event
						? clamp(event.clientY - rect.top, minY, maxY)
						: clamp(lastPointerPosition.current.y, minY, maxY);

					setPickerX(x);
					setPickerY(y);

					const { s, v } = positionToColor(x, y, rect);
					const newHsl = hsvToHsl(currentHue, s, v);
					finalColor = `hsl(${Math.round(newHsl.h)}, ${Math.round(newHsl.s)}%, ${Math.round(
						newHsl.l
					)}%)`;

					setPickerX(x);
					setPickerY(y);
				}

				if (finalColor) {
					setInternalValue(finalColor);
					onChange?.(finalColor);
				}

				setIsDraggingPicker(false);
			};

			document.addEventListener("pointermove", handlePointerMove);
			document.addEventListener("pointerup", handlePointerUp, false);
			return () => {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp);
			};
		}, [isDraggingPicker, internalValue, onChange]);

		const handlePickerDown = (event: PointerEventReact) => {
			if (disabled || !pickerRef.current || !pickerButtonRef.current) return;
			const rect = pickerRef.current.getBoundingClientRect();
			const { minX, maxX, minY, maxY } = getUsableArea(rect);
			// Clamp el click para que el centro del botón nunca se salga
			const x = clamp(event.clientX - rect.left, minX, maxX);
			const y = clamp(event.clientY - rect.top, minY, maxY);

			lastPointerPosition.current.x = x;
			lastPointerPosition.current.y = y;

			setPickerX(x);
			setPickerY(y);

			setIsDraggingPicker(true);
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

			if (format === "hsl") {
				if (part === "h") h = Math.min(360, Math.max(0, value));
				if (part === "s") s = Math.min(100, Math.max(0, value));
				if (part === "l") l = Math.min(100, Math.max(0, value));
				const newColor = `hsl(${h}, ${s}%, ${l}%)`;
				setInternalValue(newColor);
				onChange?.(newColor);
			} else {
				// format === "rgb"
				let { r, g, b } = rgbValues;
				if (part === "r") r = Math.min(255, Math.max(0, value));
				if (part === "g") g = Math.min(255, Math.max(0, value));
				if (part === "b") b = Math.min(255, Math.max(0, value));
				const newHsl = rgbToHsl(r, g, b);
				const newColor = `hsl(${newHsl.h}, ${newHsl.s}%, ${newHsl.l}%)`;
				setInternalValue(newColor);
				onChange?.(newColor);
				setRgbValues({ r, g, b });
			}
		};

		const handleCopyClick = async () => {
			let valueToCopy = getFormatValue();

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

		const getFormatValue = () => {
			const hueMatch = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
			const hue = hueMatch ? parseInt(hueMatch[1]) : 0;
			const s = hueMatch ? parseInt(hueMatch[2]) : 0;
			const l = hueMatch ? parseInt(hueMatch[3]) : 0;
			if (format === "hex") {
				const hexColor = hslToHex(hue, s, l);
				return alpha === 100 ? hexColor : `${hexColor}${alphaToHex(alpha)}`;
			} else if (format === "rgb") {
				const { r, g, b } = hslToRgb(hue, s, l);
				if (alpha === 100) {
					return `rgb(${r}, ${g}, ${b})`;
				}
				return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
			} else if (format === "rgba") {
				const { r, g, b } = hslToRgb(hue, s, l);
				return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
			} else if (format === "hsl") {
				return `hsl(${hue}, ${s}%, ${l}%)`;
			} else if (format === "hsla") {
				return `hsla(${hue}, ${s}%, ${l}%, ${alpha / 100})`;
			} else {
				return internalValue;
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
				} catch (_e) {
					//if (!e.canceled) setError(e)
				}
			};
			openPicker();
		}, [open, onChange]);

		const handlePickerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
			const pickerRect = pickerRef.current?.getBoundingClientRect();
			if (!pickerRect) return;

			const match = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
			if (!match) return;
			const h = parseInt(match[1]);
			const s0 = hslToHsv(h, parseInt(match[2]), parseInt(match[3])).s;
			const v0 = hslToHsv(h, parseInt(match[2]), parseInt(match[3])).v;

			let s = s0;
			let v = v0;
			let moved = false;

			const step = 2; // Cambia este valor para sensibilidad

			if (e.key === "ArrowUp") {
				e.preventDefault();
				v = clamp(v + step, 0, 100);
				moved = true;
			}
			if (e.key === "ArrowDown") {
				e.preventDefault();
				v = clamp(v - step, 0, 100);
				moved = true;
			}
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				s = clamp(s - step, 0, 100);
				moved = true;
			}
			if (e.key === "ArrowRight") {
				e.preventDefault();
				s = clamp(s + step, 0, 100);
				moved = true;
			}
			if (e.key === "Enter") {
				e.preventDefault();
			}

			if (moved) {
				const { x, y } = colorToPosition(s, v, pickerRect);
				setPickerX(x);
				setPickerY(y);

				const newHsl = hsvToHsl(h, s, v);
				const finalColor = `hsl(${Math.round(newHsl.h)}, ${Math.round(newHsl.s)}%, ${Math.round(
					newHsl.l
				)}%)`;
				setInternalValue(finalColor);
				onChange?.(finalColor);
			}
		};

		const hueMatch = internalValue.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
		const hue = hueMatch ? parseInt(hueMatch[1]) : 0;
		const s = hueMatch ? parseInt(hueMatch[2]) : 0;
		const l = hueMatch ? parseInt(hueMatch[3]) : 0;

		const pickerButtonRect = pickerButtonRef.current?.getBoundingClientRect();
		const finalPickerX = pickerX - (pickerButtonRect?.width || 0) / 2;
		const finalPickerY = pickerY - (pickerButtonRect?.height || 0) / 2;

		return (
			<div
				className={clsx(
					colorpickerVariants({ size, variant, radius: radiusField, disabled, showText }),
					className
				)}
				ref={ref}
				{...props}
				role="colorpicker"
			>
				<div
					className={clsx(colorpickerGroupVariants({ size, radius: radiusField }))}
					ref={triggerRef as RefObject<HTMLDivElement>}
				>
					<div className={styles["lambda-colorpicker-border"]}></div>
					<div className={styles["lambda-colorpicker-pattern"]}></div>
					<button
						type="button"
						className={clsx(styles["lambda-colorpicker-button"])}
						onClick={() => setViewPicker((prev) => !prev)}
						style={{ backgroundColor: internalValue, opacity: alpha / 100 }}
					></button>
				</div>

				{viewPicker &&
					createPortal(
						<div
							className={clsx(
								colorpickerBoxVariants({ radius: radiusBox, position: menuPosition.position }),
								{
									[styles["lambda-colorpicker-box-view"]]: viewPicker,
								}
							)}
							style={{
								left: menuPosition.left,
								top: menuPosition.top,
							}}
							role="colorpicker"
							tabIndex={0}
							onKeyDown={handleKeyDown}
							ref={contentRef as RefObject<HTMLDivElement>}
						>
							<div className={styles["lambda-colorpicker-preview"]}>
								<div className={styles["lambda-colorpicker-preview-background"]}></div>
								<div
									className={styles["lambda-colorpicker-preview-color"]}
									ref={viewRef}
									style={{ backgroundColor: internalValue, opacity: alpha / 100 }}
								/>
								<Tooltip
									color="neutral"
									content={copied ? t("color-picker.copy-success") : t("color-picker.copy")}
									className={styles["lambda-colorpicker-preview-copy"]}
								>
									<Button
										type="button"
										variant="soft"
										color="neutral"
										size="tiny"
										onClick={handleCopyClick}
										icon={copied ? <CheckIcon /> : <CopyIcon />}
									/>
								</Tooltip>
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
									onKeyDown={handlePickerKeyDown}
									style={{
										transform: `translate(${finalPickerX}px, ${finalPickerY}px)`,
									}}
								/>
							</div>
							<div className={styles["lambda-colorpicker-controls"]}>
								<div className={styles["lambda-colorpicker-controls-colors"]}>
									<div className={styles["lambda-colorpicker-controls-slider"]}></div>

									<Slider
										size="small"
										value={hue}
										min={0}
										max={360}
										step={1}
										label="Hue"
										radius="full"
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
										onChange={(e) => {
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
										<Tooltip content={t("color-picker.eye-dropper")} color="neutral">
											<Button
												variant="soft"
												color="neutral"
												size="tiny"
												icon={<Pipette />}
												onClick={pickColor}
												ref={buttonSliderRef}
												className={styles["lambda-colorpicker-dropper"]}
											/>
										</Tooltip>
									)}
								</div>
								<div className={styles["lambda-colorpicker-controls-alpha"]}>
									<div className={styles["lambda-colorpicker-controls-slider-pattern"]}></div>
									<div
										className={styles["lambda-colorpicker-controls-slider-alpha"]}
										style={{
											background: `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, ${internalValue} 100%)`,
										}}
									></div>
									<Slider
										size="small"
										value={alpha}
										min={0}
										max={100}
										label="Alpha"
										radius="full"
										ariaLabel="Alpha Slider"
										viewValue={false}
										viewBar={false}
										onInput={(e) => {
											setAlpha(e as number);
											onChange?.(`hsla(${hue}, ${s}%, ${l}%, ${(e as number) / 100})`);
										}}
										onChange={(e) => {
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
											<Tooltip content={t("color-picker.format")} color="neutral">
												<Button
													variant="soft"
													color="neutral"
													size="tiny"
													label={format.toUpperCase()}
													onClick={handleChangeFormat}
													className={styles["lambda-colorpicker-input-format"]}
												/>
											</Tooltip>
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
											<Tooltip content={t("color-picker.format")}>
												<Button
													variant="soft"
													color="secondary"
													size="tiny"
													label={format.toUpperCase()}
													onClick={handleChangeFormat}
													ref={buttonAlphaRef}
													className={styles["lambda-colorpicker-input-format"]}
												/>
											</Tooltip>
										</div>
									)}
								</div>
							</div>
						</div>,
						document.body
					)}

				{showText && (
					<span className={clsx(colorpickerTextVariants({ size }))}>{getFormatValue()}</span>
				)}
			</div>
		);
	}
);

ColorPicker.displayName = "ColorPicker";
