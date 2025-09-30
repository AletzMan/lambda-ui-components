import { forwardRef, useState, ChangeEvent } from "react";
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
			...props
		},
		ref
	) => {
		const [internalChecked, setInternalChecked] = useState(checked);
		const { radiusSelector } = useUIConfig();
		let sizeValue, radiusValue, disabledValue;

		try {
			const joinContext = useJoin();
			sizeValue = joinContext.size;
			radiusValue = joinContext.radius;
			disabledValue = joinContext.disabled;
		} catch (error) {
			radiusValue = radiusSelector || radius;
			sizeValue = size;
			disabledValue = disabled;
		}

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const newChecked = e.currentTarget.checked;
			setInternalChecked(newChecked);
			if (onChange) {
				onChange(e);
			}
		};

		return (
			<label className={checkboxContainerVariants({ positionLabel, disabled })}>
				<div
					className={checkboxWrapperVariants({
						variant,
						size: sizeValue,
						radius: radiusValue,
						color,
						checked: internalChecked,
						disabled: disabledValue,
						joinposition,
						join: joinposition !== undefined,
						className,
					})}
				>
					<input
						ref={ref}
						type={"checkbox"}
						disabled={disabled || undefined}
						checked={internalChecked}
						onChange={handleChange}
						className={styles["lambda-checkbox"]}
						{...props}
					/>
					{joinposition === undefined && icon === undefined && (
						<svg
							className={checkBoxIconVariants({
								size: sizeValue,
								disabled: disabledValue,
								checked: internalChecked,
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
