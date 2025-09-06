import React, {
	createContext,
	FC,
	forwardRef,
	HTMLAttributes,
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
	setType: React.Dispatch<React.SetStateAction<RadioGroupVariants["type"]>>;
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
	const [type, setType] = useState<RadioGroupVariants["type"]>("radio");

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
			radius,
			variant,
			orientation,
			disabled,
			type,
			setType,
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
	}
>(
	(
		{
			className,
			label,
			disabled,
			positionLabel = "right",
			type = "radio",
			title,
			subtitle,
			body,
			showRadio,
			icon,
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
			type: groupType,
		} = useRadioGroup();
		console.log(groupType);

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
					type: groupType,
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

				{(groupType === "radio" || groupType === "button") && (
					<div
						className={view({
							variant,
							size,
							color,
							disabled: isDisabled,
							type: groupType,
							checked: isChecked,
						})}
					>
						<span
							className={iconView({
								size,
								color,
								disabled: isDisabled,
								checked: isChecked,
								type: groupType,
							})}
						/>
					</div>
				)}

				{label && groupType === "radio" && (
					<span
						className={labelName({
							size,
							disabled: isDisabled,
							orientation,
							radius,
							type: groupType,
						})}
					>
						{label}
					</span>
				)}
				{groupType === "button" && (
					<span
						className={labelName({
							size,
							disabled: isDisabled,
							orientation,
							radius,
							type: groupType,
						})}
					>
						{label && label}
						{icon && icon}
					</span>
				)}
				{groupType === "card" && (
					<div
						className={contentCard({
							size,
							disabled: isDisabled,
							variant,
							color,
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
										color,
										disabled: isDisabled,
										type: groupType,
										checked: isChecked,
									})}
								>
									<span
										className={iconView({
											size,
											color,
											disabled: isDisabled,
											checked: isChecked,
											type: groupType,
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
	const { setType } = useRadioGroup();
	useEffect(() => {
		setType("radio");
	}, [ref]);
	return <RadioComponent {...props} ref={ref} type="radio" />;
});

const Button = forwardRef<HTMLInputElement, RadioProps & { icon?: ReactNode }>((props, ref) => {
	const { setType } = useRadioGroup();
	useEffect(() => {
		setType("button");
	}, [ref]);
	return <RadioComponent {...props} ref={ref} type="button" icon={props.icon} />;
});

const Card = forwardRef<
	HTMLInputElement,
	RadioProps & { title?: string; subtitle?: string; body?: React.ReactElement; showRadio?: boolean }
>((props, ref) => {
	const { setType } = useRadioGroup();
	useEffect(() => {
		setType("card");
	}, [ref]);
	return (
		<RadioComponent
			{...props}
			ref={ref}
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
