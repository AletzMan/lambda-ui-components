"use client";
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
	RadioVariants,
	view,
	wrapper,
} from "./radio.variants";
import clsx from "clsx";
import { RadioGroupProps, RadioProps } from "./radio.types";
import styles from "./radio.module.css";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

export type RadioGroupContextType = {
	name: string;
	selectedValue: string | undefined;
	onChange: (value: string) => void;
	size: RadioGroupVariants["size"];
	color: RadioGroupVariants["color"];
	radiusSelector: RadioVariants["radius"];
	radiusCard: RadioVariants["radius"];
	variant: RadioGroupVariants["variant"];
	orientation: RadioGroupVariants["orientation"];
	hideRadio: boolean;
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
	name,
	selectedOption,
	onChangeOption,
	defaultValue,
	size,
	radius,
	color,
	variant,
	disabled = false,
	hideRadio = false,
	orientation,
	gap = "8px",
	children,
}) => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
	const refGroup = useRef<HTMLDivElement | null>(null);
	const defaultNameId = useId();
	const effectiveName = name ?? `radio-group-${defaultNameId}`;
	const { radiusSelector, radiusBox } = useUIConfig();
	const radiusValueSelector = radius || radiusSelector;
	const radiusValueCard = radius || radiusBox;

	const handleChange = useCallback(
		(newValue: string) => {
			if (onChangeOption) {
				onChangeOption(newValue);
			}
			setSelectedValue(newValue);
		},
		[onChangeOption]
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
			conainer.style.setProperty("--spacing-radio-size", gap);
		}
	}, [gap, inferredType]);
	const contextValue = useMemo(
		() => ({
			name: effectiveName,
			selectedValue: selectedOption ?? selectedValue,
			onChange: handleChange,
			size,
			color,
			radiusSelector: radiusValueSelector,
			radiusCard: radiusValueCard,
			hideRadio,
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
			radiusSelector,
			radiusBox,
			radius,
			hideRadio,
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
	const { size, variant, orientation, radiusSelector, color, type } = useRadioGroup();

	return (
		<div
			role="radiogroup"
			ref={refGroup}
			className={RadioGroups({ orientation, size, radius: radiusSelector, variant, color, type })}
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
			radiusSelector,
			radiusCard,
			hideRadio,
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
					radius: type === "card" ? radiusCard : radiusSelector,
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
								variant,
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
							radius: radiusSelector,
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
							radius: radiusSelector,
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
							{!hideRadio && (
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
						{body && <div className={styles["lambda-radio-card-body"]}>{body}</div>}
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
			body={props.body}
		/>
	);
});

export const Radio = Object.assign(Default, {
	Button: Button,
	Card: Card,
});
