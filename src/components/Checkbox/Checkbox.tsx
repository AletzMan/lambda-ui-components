import { forwardRef, useState, ChangeEvent, useRef } from "react";
import styles from "./checkbox.module.css";
import {
	checkboxContainerVariants,
	checkBoxIconVariants,
	checkboxTextLabelVariants,
	checkboxWrapperVariants,
} from "./checkbox.variants";
import { CheckBoxProps } from "./checkbox.types";
import { useJoin } from "../Join/Join";

// Utility to merge refs (copied from Radio for consistency)
const useMergeRefs = <T,>(...refs: (React.Ref<T> | undefined)[]) => {
	return (node: T) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(node);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
};

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
			defaultChecked,
			joinposition,
			required,
			invalid,
			onChange,
			onCheckedChange,
			...props
		},
		ref
	) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const mergedRef = useMergeRefs(inputRef, ref);

		// Determine control mode
		const isControlled = checked !== undefined;

		// Internal state only for visual feedback when UNCONTROLLED and NOT using external state manager
		// We initialize this to handle strict visual updates if needed, but rely on DOM for values
		const [internalChecked, setInternalChecked] = useState(!!defaultChecked);

		// Derived state for visuals
		const isChecked = isControlled ? checked : internalChecked;

		let sizeValue, radiusValue, disabledValue;

		try {
			const joinContext = useJoin();
			sizeValue = joinContext.size;
			radiusValue = joinContext.radius;
			disabledValue = joinContext.disabled;
		} catch (error) {
			radiusValue = radius;
			sizeValue = size;
			disabledValue = disabled;
		}

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			if (disabled || disabledValue) return;

			const newChecked = e.target.checked;

			// Only update internal state if uncontrolled
			if (!isControlled) {
				setInternalChecked(newChecked);
			}

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
				// tabIndex 0 allows focus on label for a11y, but input is hidden
				tabIndex={disabledValue ? -1 : 0}
			>
				<div
					className={checkboxWrapperVariants({
						variant,
						size: sizeValue,
						radius: radiusValue,
						color,
						checked: isChecked, // Visual state
						disabled: disabledValue,
						joinposition,
						join: joinposition !== undefined,
						invalid,
						className,
					})}
				>
					<input
						ref={mergedRef}
						type="checkbox"
						disabled={disabled || undefined}
						// If controlled, use 'checked'. If uncontrolled, use 'defaultChecked' initially,
						// but allow DOM to handle subsequent updates. 
						// However, to keep visual sync with 'internalChecked', we can't fully detach.
						// The safest hybrid for RHF is: pass checked if controlled.
						// If not controlled, we normally use defaultChecked.
						// BUT, since we built a custom UI that needs 'isChecked' for styling,
						// we MUST track state even in uncontrolled mode.
						checked={isControlled ? checked : undefined}
						defaultChecked={!isControlled ? defaultChecked : undefined}
						onChange={handleChange}
						className={styles["lambda-checkbox"]}
						tabIndex={-1}
						required={required}
						{...props}
					/>
					{joinposition === undefined && icon === undefined && (
						<svg
							className={checkBoxIconVariants({
								size: sizeValue,
								disabled: disabledValue,
								checked: isChecked,
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
					{icon && isChecked && (
						<span
							className={checkBoxIconVariants({
								size: sizeValue,
								disabled: disabledValue,
							})}
						>
							{icon}
						</span>
					)}
					{label && joinposition !== undefined && (
						<span
							className={checkboxTextLabelVariants({
								size: sizeValue,
								disabled: disabledValue,
							})}
						>
							{label}
						</span>
					)}
				</div>
				{label && joinposition === undefined && (
					<span
						className={checkboxTextLabelVariants({
							size: sizeValue,
							disabled: disabledValue,
							required,
						})}
					>
						{label}
					</span>
				)}
			</label>
		);
	}
);
