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
			onChange,
			joinposition,
			...props
		},
		ref
	) => {
		const { radiusField } = useUIConfig();
		const radiusValue = radius ?? radiusField;
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
			onChange,
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

		const inputId = useId();
		const errorId = errorMessage && invalid ? `${inputId}-error` : undefined;
		const helperId = helperText ? `${inputId}-helper` : undefined;
		const describedByIds = [errorId, helperId].filter(Boolean).join(" ");

		return (
			<div className={clsx(wrapper({ disabled, className }))}>
				{label && (
					<label htmlFor={inputId} className={labels({ radius: radiusValue, size, required })}>
						{label}
					</label>
				)}
				<div
					className={inputNumber({
						variant,
						disabled,
						radius: radiusValue,
						typeNumber,
						size,
						invalid,
						joinposition,
					})}
				>
					<div className={styles["lambda-number-container"]}>
						<div className={typeCurrency({ typeNumber, size, variant, radius: radiusValue })}>
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
						<div className={handler({ size, variant, radius: radiusValue })}>
							<button
								type="button"
								className={clsx(button({ size }), styles["lambda-number-btn-increment"])}
								onMouseDown={startIncrementing}
								onMouseUp={stopIncrementing}
								aria-label="Increase value"
								disabled={disabled || (max !== undefined && Number(numericValue) >= Number(max))}
							>
								<ChevronUp className={styles["lambda-number-icon"]} />
							</button>
							<hr className={styles["lambda-number-separator"]} />
							<button
								type="button"
								className={clsx(button({ size }), styles["lambda-number-btn-decrement"])}
								aria-label="Decrease value"
								onMouseDown={startDecrementing}
								onMouseUp={stopDecrementing}
								disabled={disabled || (min !== undefined && Number(numericValue) <= Number(min))}
							>
								<ChevronDown className={styles["lambda-number-icon"]} />
							</button>
						</div>
					</div>
					{helperText && (
						<HelperText id={helperId} text={helperText} disabled={disabled} size={size} />
					)}
				</div>
				{invalid && errorMessage && (
					<InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />
				)}
			</div>
		);
	}
);
