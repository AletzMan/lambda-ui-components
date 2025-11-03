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

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
				className={pos_label({ position_label, checked: actualChecked, disabled })}
				style={props.style}
				tabIndex={disabled ? -1 : 0}
				onKeyDown={handleKeyDown}
			>
				<div
					className={background({
						variant,
						size,
						color,
						checked: actualChecked,
						disabled,
						shape,
					})}
				>
					<input
						ref={setRefs}
						type={"checkbox"}
						disabled={disabled || undefined}
						checked={actualChecked}
						onChange={handleChange}
						tabIndex={-1}
						className={clsx(
							switchprop({
								size,
								variant,
								disabled,
								checked: actualChecked,
							}),
							className
						)}
						{...props}
					/>
					{<span className={handle({ checked: actualChecked, disabled, size, shape })} />}
				</div>
				{label && <span className={text({ size, disabled })}>{label}</span>}
			</label>
		);
	}
);
