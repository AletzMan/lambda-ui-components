import {
	ChangeEvent,
	forwardRef,
	HTMLInputTypeAttribute,
	useState,
	MouseEvent,
	useId,
	InputHTMLAttributes,
} from "react";
import styles from "./input.module.css";
import { CircleX, Eye, EyeOff, X } from "lucide-react";
import clsx from "clsx";
import { useJoin } from "../Join/Join";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { HelperText } from "../../_internal/components/HelperText/HelperText";
import { buttonPassword, input, labels, lambdaInput, textInput } from "./input.variants";
import { InputProps } from "./input.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			variant,
			size: propSize,
			radius: propRadius,
			label,
			invalid,
			errorMessage,
			disabled,
			prefix,
			suffix,
			type = "text",
			value: controlledValue,
			onChange,
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
			contextRadius = propRadius;
			contextSize = propSize;
			contextDisabled = disabled;
		}
		const [showPassword, setShowPassword] = useState(false);
		const [internalValue, setInternalValue] = useState("");
		const [isLabelFloating, setIsLabelFloating] = useState(false);
		const [isFocused, setIsFocused] = useState(false);
		const inputId = useId();
		const { radiusField } = useUIConfig();
		const radiusValue = contextRadius ?? radiusField;

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
				if (onChange) onChange("");
			}
		};

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			if (!isControlled) {
				setInternalValue(newValue);
			}
			if (onChange) {
				onChange(e.currentTarget.value);
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

		return (
			<div
				className={clsx(
					lambdaInput({
						radius: radiusValue,
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
				{label && (
					<label
						aria-label="ComponentLabel"
						className={clsx(
							labels({
								radius: radiusField,
								size: contextSize,
								hasElements: prefix ? "first" : "none",
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
							radius: radiusValue,
							size: contextSize,
							invalid,
							type,
							hasElements: "none",
							joinposition,
						}),
						{
							[styles["lambda-input-wrapper-read-only"]]: props.readOnly,
						}
					)}
				>
					{prefix && <div className={styles["lambda-input-prefix"]}>{prefix}</div>}
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
							className={clsx(textInput({ size: contextSize, disabled: contextDisabled }), {
								[styles["lambda-input-field-showPassword"]]:
									isPasswordType && !showPassword && value.length > 0,
							})}
							disabled={contextDisabled || undefined}
							placeholder={inputPlaceholder}
							{...(props as InputHTMLAttributes<HTMLInputElement>)}
						/>
						{isPasswordType && (
							<button
								onClick={togglePasswordVisibility}
								className={buttonPassword({ size: contextSize, variant })}
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
