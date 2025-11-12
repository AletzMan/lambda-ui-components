import { forwardRef, useState, ChangeEvent, useRef } from "react";
import styles from "./checkbox.module.css";
import {
	checkboxContainerVariants,
	checkBoxIconVariants,
	checkboxTextLabelVariants,
	checkboxWrapperVariants,
} from "./checkbox.variants";
import { CheckBoxProps } from "./checkbox.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { useJoin } from "../Join/Join";

export const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
	(
		{
			className,
			size,
			variant,
			label,
			icon,
			disabled,
			radius,
			positionLabel = "right",
			color,
			checked,
			joinposition,
			onChange,
			onCheckedChange,
			...props
		},
		ref
	) => {
		const isControlled = typeof checked === "boolean";
		const [internalChecked, setInternalChecked] = useState(!!checked);
		const actualChecked = isControlled ? checked! : internalChecked;
		const inputRef = useRef<HTMLInputElement>(null);

		function setRefs(el: HTMLInputElement | null) {
			inputRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
		}
		const { radiusSelector } = useUIConfig();
		let sizeValue, radiusValue, disabledValue;

		try {
			const joinContext = useJoin();
			sizeValue = joinContext.size;
			radiusValue = joinContext.radius;
			disabledValue = joinContext.disabled;
		} catch (error) {
			radiusValue = radius || radiusSelector;
			sizeValue = size;
			disabledValue = disabled;
		}

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const newChecked = e.target.checked;
			if (!isControlled) setInternalChecked(newChecked);
			if (onCheckedChange) onCheckedChange(newChecked);
			if (onChange) onChange(e);
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				if (inputRef.current) inputRef.current.click();
			}
		};

		return (
			<label
				className={checkboxContainerVariants({ positionLabel, disabled: disabledValue })}
				onKeyDown={handleKeyDown}
				tabIndex={disabledValue ? -1 : 0}
			>
				<div
					className={checkboxWrapperVariants({
						variant,
						size: sizeValue,
						radius: radiusValue,
						color,
						checked: actualChecked,
						disabled: disabledValue,
						joinposition,
						join: joinposition !== undefined,
						className,
					})}
				>
					<input
						ref={setRefs}
						type={"checkbox"}
						disabled={disabled || undefined}
						checked={actualChecked}
						onChange={handleChange}
						className={styles["lambda-checkbox"]}
						tabIndex={-1}
						{...props}
					/>
					{joinposition === undefined && icon === undefined && (
						<svg
							className={checkBoxIconVariants({
								size: sizeValue,
								disabled: disabledValue,
								checked: actualChecked,
							})}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M4 12l5 5 11-11"></path>
						</svg>
					)}
					{icon && joinposition !== undefined && (
						<span
							className={checkBoxIconVariants({
								size: sizeValue,
								disabled: disabledValue,
								join: joinposition !== undefined,
							})}
						>
							{icon}
						</span>
					)}
					{label && joinposition !== undefined && (
						<span
							className={checkboxTextLabelVariants({ size: sizeValue, disabled: disabledValue })}
						>
							{label}
						</span>
					)}
				</div>
				{label && joinposition === undefined && (
					<span className={checkboxTextLabelVariants({ size: sizeValue, disabled: disabledValue })}>
						{label}
					</span>
				)}
			</label>
		);
	}
);
