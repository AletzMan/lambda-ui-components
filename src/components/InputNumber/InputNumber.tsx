import { forwardRef, useId } from "react";
import styles from "./inputnumber.module.css";
import {
	ChevronDown,
	ChevronUp,
	EuroIcon,
	DollarSignIcon,
	PercentIcon,
	PoundSterlingIcon,
	CircleX,
} from "lucide-react";
import clsx from "clsx";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import {
	button,
	handler,
	inputNumber,
	labels,
	number,
	typeCurrency,
	wrapper,
} from "./inputnumber.variants";
import { HelperText } from "../../_internal/components/HelperText/HelperText";
import { useNumberInput } from "./hooks/useNumberInput";
import { InputNumberProps } from "./inputnumber.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { useJoin } from "../Join/Join";

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
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
			required,
			helperText,
			min = Number.MIN_SAFE_INTEGER,
			max = Number.MAX_SAFE_INTEGER,
			step = 1,
			value: controlledValue,
			typeNumber = "default",
			defaultValue,
			onChangeValue,
			joinposition,
			...props
		},
		ref
	) => {
		const { radiusField } = useUIConfig();
		let radiusValue, sizeValue, disabledValue;
		try {
			const { radius: radiusJoin, size: sizeJoin, disabled: disabledJoin } = useJoin();
			radiusValue = radiusJoin || radiusField || radiusValue;
			sizeValue = sizeJoin || sizeValue;
			disabledValue = disabledJoin || disabled;
		} catch (error) {
			radiusValue = radius || radiusField;
			sizeValue = size || sizeValue;
			disabledValue = disabled || disabledValue;
		}
		const {
			displayedValue,
			numericValue,
			handleChange,
			handleBlur,
			handleFocus,
			startIncrementing,
			stopIncrementing,
			startDecrementing,
			stopDecrementing,
		} = useNumberInput({
			controlledValue,
			onChangeValue,
			defaultValue,
			min: min ?? Number.MIN_SAFE_INTEGER,
			max: max ?? Number.MAX_SAFE_INTEGER,
			step: step ?? 1,
			typeNumber: typeNumber ?? "default",
		});

		const getIcon = () => {
			switch (typeNumber) {
				case "currency-USD":
					return <DollarSignIcon className={styles["lambda-number-currency-icon"]} />;
				case "currency-EUR":
					return <EuroIcon className={styles["lambda-number-currency-icon"]} />;
				case "currency-GBP":
					return <PoundSterlingIcon className={styles["lambda-number-currency-icon"]} />;
				case "percentage":
					return <PercentIcon className={styles["lambda-number-currency-icon"]} />;
				default:
					return null;
			}
		};

		const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "ArrowUp") {
				startIncrementing();
				stopIncrementing();
			}
			if (event.key === "ArrowDown") {
				startDecrementing();
				stopDecrementing();
			}
		};

		const inputId = useId();
		const errorId = errorMessage && invalid ? `${inputId}-error` : undefined;
		const helperId = helperText ? `${inputId}-helper` : undefined;
		const describedByIds = [errorId, helperId].filter(Boolean).join(" ");

		return (
			<div
				className={clsx(
					wrapper({
						disabled: disabledValue,
						joinposition,
						hasHelper: helperText !== undefined,
					})
				)}
			>
				{label && (
					<label
						aria-label="ComponentLabel"
						htmlFor={inputId}
						className={labels({ radius: radiusValue, size, required })}
					>
						{label}
					</label>
				)}
				<div
					className={inputNumber({
						variant,
						disabled: disabledValue,
						radius: radiusValue,
						typeNumber,
						size: sizeValue,
						invalid,
						joinposition,
						className,
					})}
				>
					<div className={styles["lambda-number-container"]}>
						<div
							className={typeCurrency({
								typeNumber,
								size: sizeValue,
								variant,
								radius: radiusValue,
							})}
						>
							{getIcon()}
						</div>
						<input
							ref={ref}
							id={inputId}
							aria-describedby={describedByIds || undefined}
							aria-invalid={invalid || undefined}
							value={displayedValue}
							onChange={handleChange}
							onBlur={handleBlur}
							onFocus={handleFocus}
							onKeyDown={handleKeyDown}
							type="text"
							role="number"
							inputMode="numeric"
							disabled={disabledValue || undefined}
							className={number({ size: sizeValue, typeNumber })}
							step={step}
							min={min}
							max={max}
							{...props}
						/>
						{invalid && <CircleX className={clsx(styles["lambda-number-invalid-icon"])} />}
						<div
							className={handler({ size: sizeValue, variant, radius: radiusValue, joinposition })}
						>
							<button
								type="button"
								className={clsx(button({ size: sizeValue }), styles["lambda-number-btn-increment"])}
								onMouseDown={startIncrementing}
								onMouseUp={stopIncrementing}
								aria-label="Increase value"
								disabled={disabled || (max !== undefined && Number(numericValue) >= Number(max))}
								tabIndex={-1}
							>
								<ChevronUp className={styles["lambda-number-icon"]} />
							</button>
							<hr className={styles["lambda-number-separator"]} />
							<button
								type="button"
								className={clsx(button({ size: sizeValue }), styles["lambda-number-btn-decrement"])}
								aria-label="Decrease value"
								onMouseDown={startDecrementing}
								onMouseUp={stopDecrementing}
								disabled={
									disabledValue || (min !== undefined && Number(numericValue) <= Number(min))
								}
								tabIndex={-1}
							>
								<ChevronDown className={styles["lambda-number-icon"]} />
							</button>
						</div>
					</div>
					{helperText && (
						<HelperText id={helperId} text={helperText} disabled={disabledValue} size={sizeValue} />
					)}
				</div>
				{invalid && errorMessage && (
					<InvalidMessage errorMessage={errorMessage} invalid={invalid} size={sizeValue} />
				)}
			</div>
		);
	}
);
