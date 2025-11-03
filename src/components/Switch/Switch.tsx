import { forwardRef, useRef, useState } from "react";
import { background, handle, pos_label, switchprop, text } from "./switch.variants";
import clsx from "clsx";
import { SwitchProps } from "./switch.types";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(
		{
			className,
			size,
			variant,
			label,
			disabled,
			position_label = "right",
			color,
			shape,
			checked,
			onChange,
			...props
		},
		_ref
	) => {
		const [internalChecked, setInternalChecked] = useState(checked);
		const inputRef = useRef<HTMLInputElement>(null);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newChecked = e.target.checked;
			setInternalChecked(newChecked);
			if (onChange) {
				onChange(e);
			}
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
			console.log(e.key);
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				setInternalChecked((prev) => !prev);
				if (inputRef.current) {
					inputRef.current.click();
				}
			}
		};

		return (
			<label
				className={pos_label({ position_label, checked: internalChecked, disabled })}
				style={props.style}
				tabIndex={disabled ? -1 : 0}
				onKeyDown={handleKeyDown}
			>
				<div
					className={background({
						variant,
						size,
						color,
						checked: internalChecked,
						disabled,
						shape,
					})}
				>
					<input
						ref={inputRef}
						type={"checkbox"}
						disabled={disabled || undefined}
						checked={internalChecked}
						onChange={handleChange}
						tabIndex={-1}
						className={clsx(
							switchprop({
								size,
								variant,
								disabled,
								checked: internalChecked,
							}),
							className
						)}
						{...props}
					/>
					{<span className={handle({ checked: internalChecked, disabled, size, shape })} />}
				</div>
				{label && <span className={text({ size, disabled })}>{label}</span>}
			</label>
		);
	}
);
