import { forwardRef, useState, ChangeEvent } from "react";
import styles from "./checkbox.module.css";
import { checkboxprop, container, icon, textLabel } from "./checkbox.variants";
import { CheckBoxProps } from "./checkbox.types";

export const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
	(
		{
			className,
			size,
			variant,
			label = "Label",
			disabled,
			radius,
			positionLabel = "right",
			color,
			checked,
			onChange,
			...props
		},
		ref
	) => {
		const [internalChecked, setInternalChecked] = useState(checked);

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const newChecked = e.currentTarget.checked;
			setInternalChecked(newChecked);
			if (onChange) {
				onChange(e);
			}
		};

		return (
			<label className={container({ positionLabel, disabled })}>
				<div
					className={checkboxprop({
						variant,
						size,
						radius,
						color,
						checked: internalChecked,
						disabled,
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
					{
						<svg
							className={icon({ size, disabled, checked: internalChecked })}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M4 12l5 5 11-11"></path>
						</svg>
					}
				</div>
				{label && <span className={textLabel({ size, disabled })}>{label}</span>}
			</label>
		);
	}
);
