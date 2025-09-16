import React, {
	Children,
	createContext,
	FC,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	PropsWithChildren,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	contentCard,
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
import styles from "./radio.module.css";

export type RadioGroupContextType = {
	name: string;
	selectedValue: string | undefined;
	onChange: (value: string) => void;
	size: RadioGroupVariants["size"];
	color: RadioGroupVariants["color"];
	radius: RadioGroupVariants["radius"];
	variant: RadioGroupVariants["variant"];
	orientation: RadioGroupVariants["orientation"];
	disabled: boolean;
	type: RadioGroupVariants["type"];
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
	size,
	color,
	variant,
	disabled = false,
	radius,
	orientation,
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

	const inferredType: RadioGroupVariants["type"] = useMemo(() => {
		let type: RadioGroupVariants["type"] = "radio";
		Children.forEach(children, (child) => {
			if (isValidElement(child)) {
				if (child.type === Radio.Button) {
					type = "button";
				} else if (child.type === Radio.Card) {
					type = "card";
				}
			}
		});
		return type;
	}, [children]);

	useEffect(() => {
		const conainer = refGroup.current;
		if (conainer && inferredType === "radio") {
			conainer.style.setProperty("--gap-radio-size", gap);
		}
	}, [gap, inferredType]);
	const contextValue = useMemo(
		() => ({
			name: effectiveName,
			selectedValue: selectedOption ?? selectedValue,
			onChange: handleChange,
			size,
			color,
			radius,
			variant,
			orientation,
			disabled,
			type: inferredType,
		}),
		[
			effectiveName,
			selectedOption,
			selectedValue,
			handleChange,
			size,
			color,
			variant,
			radius,
			orientation,
			disabled,
			inferredType,
		]
	);

	return (
		<RadioGroupContext.Provider value={contextValue}>
			<RadioGroupComponent refGroup={refGroup}>{children}</RadioGroupComponent>
		</RadioGroupContext.Provider>
	);
};

const RadioGroupComponent = ({
	children,
	refGroup,
}: HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	refGroup: React.RefObject<HTMLDivElement | null>;
}) => {
	const { size, variant, orientation, radius, color, type } = useRadioGroup();

	return (
		<div
			role="radiogroup"
			ref={refGroup}
			className={RadioGroups({ orientation, size, radius, variant, color, type })}
		>
			{children}
		</div>
	);
};

const RadioComponent = forwardRef<
	HTMLInputElement,
	RadioProps & {
		type: "radio" | "button" | "card" | undefined | null;
		title?: string;
		subtitle?: string;
		body?: React.ReactElement;
		showRadio?: boolean;
		icon?: ReactNode;
		color?: RadioGroupVariants["color"];
	}
>(
	(
		{
			className,
			label,
			disabled,
			positionLabel = "right",
			type,
			title,
			subtitle,
			body,
			showRadio,
			icon,
			color,
			...props
		},
		ref
	) => {
		const {
			selectedValue,
			color: groupColor,
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
					color: color || groupColor,
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
							color: color || groupColor,
							disabled: isDisabled,
						}),
						className
					)}
					{...props}
				/>

				{(type === "radio" || type === "button") && (
					<div
						className={view({
							variant,
							size,
							color: color || groupColor,
							disabled: isDisabled,
							type,
							checked: isChecked,
						})}
					>
						<span
							className={iconView({
								size,
								color: color || groupColor,
								disabled: isDisabled,
								checked: isChecked,
								type,
							})}
						/>
					</div>
				)}

				{label && type === "radio" && (
					<span
						className={labelName({
							size,
							disabled: isDisabled,
							orientation,
							radius,
							type,
							color: color || groupColor,
						})}
					>
						{label}
					</span>
				)}
				{type === "button" && (
					<span
						className={labelName({
							size,
							disabled: isDisabled,
							orientation,
							radius,
							type,
							color: color || groupColor,
							typeContent: icon && label ? "iconLabel" : icon ? "icon" : label ? "label" : "none",
						})}
					>
						{icon && icon}
						{label && label}
					</span>
				)}
				{type === "card" && (
					<div
						className={contentCard({
							size,
							disabled: isDisabled,
							variant,
							color: color || groupColor,
							checked: isChecked,
						})}
					>
						<header className={styles["lambda-radio-card-header"]}>
							<h1>{title}</h1>
							{showRadio && (
								<div
									className={view({
										variant,
										size,
										color: color || groupColor,
										disabled: isDisabled,
										type,
										checked: isChecked,
									})}
								>
									<span
										className={iconView({
											size,
											color: color || groupColor,
											disabled: isDisabled,
											checked: isChecked,
											type,
										})}
									/>
								</div>
							)}
						</header>
						<h2>{subtitle}</h2>
						{body && <p className={styles["lambda-radio-card-body"]}>{body}</p>}
					</div>
				)}
			</label>
		);
	}
);

const Default = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	return <RadioComponent {...props} ref={ref} type="radio" />;
});

const Button = forwardRef<HTMLInputElement, RadioProps & { icon?: ReactNode }>((props, ref) => {
	return <RadioComponent {...props} ref={ref} type="button" icon={props.icon} />;
});

const Card = forwardRef<
	HTMLInputElement,
	RadioProps & {
		title?: string;
		subtitle?: string;
		body?: React.ReactElement;
		showRadio?: boolean;
		color?: RadioGroupVariants["color"];
	}
>((props, ref) => {
	return (
		<RadioComponent
			{...props}
			ref={ref}
			color={props.color}
			type="card"
			title={props.title}
			subtitle={props.subtitle}
			showRadio={props.showRadio}
			body={props.body}
		/>
	);
});

export const Radio = Object.assign(Default, {
	Button: Button,
	Card: Card,
});
