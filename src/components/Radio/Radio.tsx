import {
	createContext,
	FC,
	forwardRef,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	iconView,
	labelName,
	RadioGroups,
	RadioGroupVariants,
	radioprop,
	view,
	wrapper,
} from "./radio.variants";
import clsx from "clsx";
import { RadioGroupProps, RadioProps } from "./radio.types";

export type RadioGroupContextType = {
	name: string;
	selectedValue: string | undefined;
	onChange: (value: string) => void;
	size: RadioGroupVariants["size"];
	color: RadioGroupVariants["color"];
	type: RadioGroupVariants["type"];
	radius: RadioGroupVariants["radius"];
	variant: RadioGroupVariants["variant"];
	disabled: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export const useRadioGroup = () => {
	const context = useContext(RadioGroupContext);
	if (!context) {
		throw new Error("useRadioGroup must be used within a RadioGroup");
	}
	return context;
};

export const RadioGroup: FC<PropsWithChildren<RadioGroupProps>> = ({
	name = `radio-group-${Math.random().toString(36).slice(2, 9)}`,
	selectedOption,
	onChange,
	defaultValue,
	size = "medium",
	color = "primary",
	type = "radio",
	variant = "solid", // Default variant
	disabled = false,
	radius = "medium",
	orientation = "vertical",
	gap = "8px",
	children,
}) => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
	const refGroup = useRef<HTMLDivElement | null>(null);
	const defaultNameId = useId();
	const effectiveName = name ?? `radio-group-${defaultNameId}`;

	const handleChange = useCallback(
		(newValue: string) => {
			if (onChange) {
				onChange(newValue);
			}
			setSelectedValue(newValue);
		},
		[onChange]
	);

	useEffect(() => {
		const conainer = refGroup.current;
		if (conainer && type === "radio") {
			conainer.style.setProperty("--gap-radio-size", gap);
		}
	}, [gap, type]);

	const contextValue = useMemo(
		() => ({
			name: effectiveName,
			selectedValue: selectedOption ?? selectedValue,
			onChange: handleChange,
			size,
			color,
			type,
			radius,
			variant,
			disabled,
		}),
		[
			effectiveName,
			selectedOption,
			selectedValue,
			handleChange,
			size,
			color,
			type,
			variant,
			radius,
			disabled,
		]
	);

	return (
		<RadioGroupContext.Provider value={contextValue}>
			<div
				role="radiogroup"
				ref={refGroup}
				className={RadioGroups({ orientation, size, type, radius, variant, color })}
			>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			className,
			size,
			variant,
			label = "Label",
			disabled,
			type,
			positionLabel = "right",
			color,
			...props
		},
		ref
	) => {
		const {
			selectedValue,
			onChange,
			size: groupSize,
			color: groupColor,
			variant: groupVariant,
			type: groupType,
			disabled: groupDisabled,
			name,
		} = useRadioGroup();

		const isChecked = selectedValue === props.value;
		const isDisabled = disabled || groupDisabled;

		// Calcular valores efectivos combinando prop local y valor del grupo
		const effectiveSize = size || groupSize;
		const effectiveColor = color || groupColor;
		const effectiveVariant = variant || groupVariant;
		const effectiveType = type || groupType;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value);
		};

		return (
			<label
				className={wrapper({
					positionLabel,
					color: effectiveColor,
					disabled: isDisabled,
					size: effectiveSize,
					type: effectiveType,
					variant: effectiveVariant,
				})}
			>
				<input
					ref={ref}
					type="radio"
					name={name}
					checked={isChecked}
					onChange={handleChange}
					disabled={isDisabled}
					className={clsx(
						radioprop({
							size: effectiveSize,
							variant: effectiveVariant,
							color: effectiveColor,
							disabled: isDisabled,
						}),
						className
					)}
					{...props}
				/>

				<div
					className={view({
						variant: effectiveVariant,
						size: effectiveSize,
						color: effectiveColor,
						disabled: isDisabled,
						type: effectiveType,
						checked: isChecked,
					})}
				>
					<span
						className={iconView({
							size: effectiveSize,
							color: effectiveColor,
							disabled: isDisabled,
							checked: isChecked,
							type: effectiveType,
						})}
					/>
				</div>

				{label && (
					<span
						className={labelName({
							size: effectiveSize,
							disabled: isDisabled,
							type: effectiveType,
						})}
					>
						{label}
					</span>
				)}
			</label>
		);
	}
);
