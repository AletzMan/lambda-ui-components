"use client";
import React, {
	Children,
	createContext,
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

export type RadioGroupContextType = {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	selectedValue: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange: (value: any) => void;
	size: RadioGroupVariants["size"];
	color: RadioGroupVariants["color"];
	radiusSelector: RadioVariants["radius"];
	radiusCard: RadioVariants["radius"];
	variant: RadioGroupVariants["variant"];
	orientation: RadioGroupVariants["orientation"] | (string & {});
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

// Utility to merge refs
const useMergeRefs = <T,>(...refs: (React.Ref<T> | undefined)[]) => {
	return useMemo(() => {
		if (refs.every((ref) => ref == null)) {
			return null;
		}
		return (node: T | null) => {
			refs.forEach((ref) => {
				if (typeof ref === "function") {
					ref(node);
				} else if (ref != null) {
					(ref as { current: T | null }).current = node;
				}
			});
		};
	}, [refs]);
};

export const RadioGroup = forwardRef<HTMLDivElement, PropsWithChildren<RadioGroupProps>>(
	(
		{
			name,
			selectedOption,
			onChangeOption,
			value,
			onChange,
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
			className,
			style,
			...props
		},
		ref
	) => {
		const isControlled = value !== undefined || selectedOption !== undefined;
		const controlledValue = value ?? selectedOption;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const [internalValue, setInternalValue] = useState<any>(defaultValue);

		// Si es controlado, usamos la prop. Si no, el estado interno.
		// Si cambiamos de no controlado a controlado, o viceversa, esto maneja la transición suavemente.
		const finalSelectedValue = isControlled ? controlledValue : internalValue;

		const internalRef = useRef<HTMLDivElement | null>(null);
		const mergedRef = useMergeRefs(internalRef, ref);
		const defaultNameId = useId();
		const effectiveName = name ?? `radio-group-${defaultNameId}`;

		const handleChange = useCallback(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(newValue: any) => {
				if (!isControlled) {
					setInternalValue(newValue);
				}
				if (onChange) {
					onChange(newValue);
				}
				if (onChangeOption) {
					// Legacy string callback
					onChangeOption(String(newValue));
				}
			},
			[isControlled, onChange, onChangeOption]
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
			const conainer = internalRef.current;
			if (conainer && inferredType === "radio") {
				conainer.style.setProperty("--spacing-radio-size", gap);
			}
		}, [gap, inferredType]);

		const contextValue = useMemo(
			() => ({
				name: effectiveName,
				selectedValue: finalSelectedValue,
				onChange: handleChange,
				size,
				color,
				radiusSelector: radius,
				radiusCard: radius,
				hideRadio,
				variant,
				orientation,
				disabled,
				type: inferredType,
			}),
			[
				effectiveName,
				finalSelectedValue,
				handleChange,
				size,
				color,
				variant,
				radius,
				hideRadio,
				orientation,
				disabled,
				inferredType,
			]
		);

		return (
			<RadioGroupContext.Provider value={contextValue}>
				<RadioGroupComponent refGroup={mergedRef} className={className} style={style} {...props}>
					{children}
				</RadioGroupComponent>
			</RadioGroupContext.Provider>
		);
	}
);

RadioGroup.displayName = "RadioGroup";

const RadioGroupComponent = ({
	children,
	refGroup,
	className,
	style,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	refGroup: React.RefCallback<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null> | null;
}) => {
	const { size, variant, orientation, radiusSelector, color, type } = useRadioGroup();

	return (
		<div
			role="radiogroup"
			ref={refGroup}
			className={clsx(
				RadioGroups({
					orientation: orientation as RadioGroupVariants["orientation"],
					size,
					radius: radiusSelector,
					variant,
					color,
					type,
				}),
				className
			)}
			style={style}
			{...props}
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
			onChange, // Extraemos onChange de las props
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
			onChange: contextOnChange,
			disabled: groupDisabled,
			name,
		} = useRadioGroup();

		const isChecked = selectedValue === props.value;
		const isDisabled = disabled || groupDisabled;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			// Llama al onChange del contexto para actualizar el estado visual e interno
			contextOnChange(e.target.value);

			// Llama al onChange pasado por props (fundamental para react-hook-form)
			if (onChange) {
				onChange(e);
			}
		};

		return (
			<label
				className={wrapper({
					positionLabel,
					color: color || groupColor,
					disabled: isDisabled,
					size,
					type,
					orientation: orientation as RadioGroupVariants["orientation"],
					radius: type === "card" ? radiusCard : radiusSelector,
					variant,
					checked: isChecked,
				})}
			>
				<input
					ref={ref}
					type="radio"
					name={name} // react-hook-form sobrescribirá esto via ...props si es necesario
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
							orientation: orientation as RadioGroupVariants["orientation"],
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
							orientation: orientation as RadioGroupVariants["orientation"],
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
