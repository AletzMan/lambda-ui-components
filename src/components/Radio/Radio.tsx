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
	orientation: RadioGroupVariants["orientation"];
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
			orientation,
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
			orientation,
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

const RadioComponent = forwardRef<
	HTMLInputElement,
	RadioProps & {
		type: "radio" | "button" | "card" | undefined | null;
		title?: string;
		content?: string;
	}
>(
	(
		{
			className,
			label = "Label",
			disabled,
			positionLabel = "right",
			type = "radio",
			title,
			content,
			...props
		},
		ref
	) => {
		const {
			selectedValue,
			color,
			size,
			variant,
			orientation,
			radius,
			onChange,
			disabled: groupDisabled,
			name,
		} = useRadioGroup();

		const isChecked = selectedValue === props.value;
		const isDisabled = disabled || groupDisabled;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value);
		};

		return (
			<label
				className={wrapper({
					positionLabel,
					color,
					disabled: isDisabled,
					size,
					type,
					orientation,
					radius,
					variant,
					checked: isChecked,
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
							size,
							variant,
							color,
							disabled: isDisabled,
						}),
						className
					)}
					{...props}
				/>

				<div
					className={view({
						variant,
						size,
						color,
						disabled: isDisabled,
						type,
						checked: isChecked,
					})}
				>
					<span
						className={iconView({
							size,
							color,
							disabled: isDisabled,
							checked: isChecked,
							type,
						})}
					/>
				</div>

				{((label && type === "radio") || type === "button") && (
					<span
						className={labelName({
							size,
							disabled: isDisabled,
							orientation,
							radius,
							type,
						})}
					>
						{label}
					</span>
				)}
				{type === "card" && (
					<div
						className={labelName({
							size,
							disabled: isDisabled,
							orientation,
							radius,
							type,
						})}
					>
						<h3>{title}</h3>
						<p>{content}</p>
					</div>
				)}
			</label>
		);
	}
);

const Default = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	return <RadioComponent {...props} ref={ref} type="radio" />;
});

const Button = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	return <RadioComponent {...props} ref={ref} type="button" />;
});

const Card = forwardRef<HTMLInputElement, RadioProps & { title?: string; content?: string }>(
	(props, ref) => {
		return (
			<RadioComponent
				{...props}
				ref={ref}
				type="card"
				title={props.title}
				content={props.content}
			/>
		);
	}
);

export const Radio = Object.assign(Default, {
	Button: Button,
	Card: Card,
});
