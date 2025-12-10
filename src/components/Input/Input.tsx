import {
	ChangeEvent,
	forwardRef,
	HTMLInputTypeAttribute,
	useState,
	MouseEvent,
	useId,
	InputHTMLAttributes,
	useRef,
	useMemo,
} from "react";
import styles from "./input.module.css";
import { CircleX, Eye, EyeOff, X } from "lucide-react";
import clsx from "clsx";
import { useJoin } from "../Join/Join";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { HelperText } from "../../_internal/components/HelperText/HelperText";
import { buttonPassword, input, labels, lambdaInput, textInput } from "./input.variants";
import { InputProps } from "./input.types";
import { motion } from "framer-motion";

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			variant,
			size,
			radius,
			label,
			invalid,
			errorMessage,
			disabled,
			prefix,
			suffix,
			type = "text",
			value: controlledValue,
			onChangeValue,
			color,
			required,
			floatingLabel,
			placeholder,
			helperText,
			joinposition,
			...props
		},
		ref
	) => {
		let contextRadius, contextSize, contextDisabled;
		try {
			const context = useJoin();
			contextRadius = context.radius;
			contextSize = context.size;
			contextDisabled = disabled || context.disabled;
		} catch (_e) {
			contextRadius = radius;
			contextSize = size;
			contextDisabled = disabled;
		}
		const [showPassword, setShowPassword] = useState(false);
		const [internalValue, setInternalValue] = useState("");
		const [isLabelFloating, setIsLabelFloating] = useState(false);
		const [isFocused, setIsFocused] = useState(false);
		const inputId = useId();
		const prefixRef = useRef<HTMLDivElement>(null);

		const errorId = errorMessage ? `${inputId}-error` : undefined;
		const helperId = helperText ? `${inputId}-helper` : undefined;
		const describedByIds = [errorId, helperId].filter(Boolean).join(" ");

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
				if (onChangeValue) onChangeValue("");
			}
		};

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			if (!isControlled) {
				setInternalValue(newValue);
			}
			if (onChangeValue) {
				onChangeValue(e.currentTarget.value);
			}
			if (floatingLabel) {
				setIsLabelFloating(!!newValue || isFocused);
			}
		};

		const handleFocus = () => {
			setIsFocused(true);
			if (floatingLabel) {
				setIsLabelFloating(true);
			}
		};

		const handleBlur = () => {
			setIsFocused(false);
			if (floatingLabel && !value) {
				setIsLabelFloating(false);
			}
		};

		const inputPlaceholder = floatingLabel ? "" : placeholder;
		const paddingInputSize =
			contextSize === "tiny"
				? 20
				: contextSize === "small"
					? 20
					: contextSize === "medium"
						? 32
						: contextSize === "large"
							? 28
							: 28;
		const heightInputSize =
			contextSize === "tiny"
				? 13
				: contextSize === "small"
					? 14
					: contextSize === "medium"
						? 10
						: contextSize === "large"
							? 8
							: 6;

		console.log(paddingInputSize);
		console.log(heightInputSize);

		const labelVariants = useMemo(() => {
			return {
				default: {
					y: `calc(100% - ${heightInputSize}px)`,
					x: prefixRef.current?.offsetWidth
						? `calc(${prefixRef.current?.offsetWidth}px + ${paddingInputSize}px)`
						: `calc(${paddingInputSize}px)`,
					//scale: 1,
					color: "var(--placeholder-color)",
					/*fontSize: "1rem",*/
					left: 0, // o el padding que uses
				},
				floating: {
					y: "-105%",
					x: 0,
					//scale: 0.85,
					color: "var(--foreground-label-color)",
					//fontSize: "0.85rem",
					left: 0, // ajusta si quieres que se mueva a la izquierda
				},
			};
		}, [paddingInputSize, heightInputSize, prefixRef.current]);

		return (
			<div
				className={clsx(
					lambdaInput({
						radius: contextRadius,
						disabled: contextDisabled,
						size: contextSize,
						invalid,
						hasLabel: floatingLabel || label !== undefined,
						hasHelper: helperText !== undefined,
						join: joinposition !== undefined,
					}),
					{
						[styles["lambda-input-group-helper"]]: helperText,
					}
				)}
			>
				{label && floatingLabel ? (
					<motion.label
						aria-label="ComponentLabel"
						variants={labelVariants}
						initial={isLabelFloating ? "floating" : "default"}
						animate={isLabelFloating ? "floating" : "default"}
						transition={{ type: "spring", stiffness: 400, damping: 28 }}
						className={clsx(
							labels({
								radius: contextRadius,
								size: contextSize,
								hasElements: prefix
									? "first"
									: suffix
										? "last"
										: prefix && suffix
											? "both"
											: "none",
							}),
							{
								[styles["lambda-input-label-floating"]]: floatingLabel && isLabelFloating,
								[styles["lambda-input-label-default"]]: floatingLabel && !isLabelFloating,
								[styles["lambda-input-label-placeholder"]]: floatingLabel && !isLabelFloating,
								[styles["lambda-input-label-required"]]: required,
							}
						)}
						htmlFor={inputId}
					>
						{`${label as string}`}
					</motion.label>
				) : (
					<label
						htmlFor={inputId}
						aria-label="ComponentLabel"
						className={clsx(
							labels({
								radius: contextRadius,
								size: contextSize,
								hasElements: prefix
									? "first"
									: suffix
										? "last"
										: prefix && suffix
											? "both"
											: "none",
							}),
							{ [styles["lambda-input-label-required"]]: required }
						)}
					>
						{label}
					</label>
				)}
				{helperText && (
					<HelperText
						id={helperId}
						text={helperText}
						size={contextSize}
						disabled={contextDisabled}
					/>
				)}

				<div
					className={clsx(
						input({
							variant,
							disabled: contextDisabled,
							radius: contextRadius,
							size: contextSize,
							invalid,
							type,
							color,
							hasElements: "none",
							joinposition,
						}),
						{
							[styles["lambda-input-wrapper-read-only"]]: props.readOnly,
						}
					)}
				>
					{prefix && (
						<div ref={prefixRef} className={styles["lambda-input-prefix"]}>
							{prefix}
						</div>
					)}
					<div
						className={clsx(styles["lambda-input-input-wrapper"], {
							[styles["lambda-input-input-wrapper-password"]]: isPasswordType || isSearchType,
							className,
						})}
					>
						<input
							ref={ref}
							value={value}
							id={inputId}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							required={required}
							aria-invalid={invalid || undefined}
							aria-describedby={describedByIds || undefined}
							type={inputType as HTMLInputTypeAttribute}
							className={clsx(textInput({ size: contextSize, disabled: contextDisabled, color, showPassword: isPasswordType && !showPassword && value.length > 0 }))}
							disabled={contextDisabled || undefined}
							placeholder={inputPlaceholder}
							{...(props as InputHTMLAttributes<HTMLInputElement>)}
						/>
						{isPasswordType && (
							<button
								onClick={togglePasswordVisibility}
								className={buttonPassword({ size: contextSize, variant, color })}
								type="button"
								aria-label={showPassword ? "Hide password" : "Show password"}
								aria-pressed={showPassword}
							>
								{showPassword ? (
									<Eye className={styles["lambda-input-icon"]} />
								) : (
									<EyeOff className={styles["lambda-input-icon"]} />
								)}
							</button>
						)}
						{isSearchType && value && (
							<button // Cambiar span a button
								type="button" // Añadir tipo
								onClick={clearInput}
								aria-label="Limpiar búsqueda" // Añadir ARIA label
								className={styles["lambda-input-clear-search"]} // Asegúrate que los estilos funcionen en un button
							>
								<X className={styles["lambda-input-clear-search-icon"]} />
							</button>
						)}
						{invalid && (
							<CircleX
								className={clsx(styles["lambda-input-invalid-icon"], {
									[styles["lambda-input-invalid-icon-password"]]: isPasswordType || isSearchType,
								})}
							/>
						)}
					</div>

					{suffix && <div className={styles["lambda-input-suffix"]}>{suffix}</div>}
				</div>
				{invalid && errorMessage && (
					<InvalidMessage
						id={errorId}
						errorMessage={errorMessage}
						invalid={invalid}
						size={contextSize}
					/>
				)}
			</div>
		);
	}
);
