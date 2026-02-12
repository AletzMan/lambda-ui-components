import { forwardRef, useRef, useState } from "react";
import { background, handle, pos_label, switchprop, text } from "./switch.variants";
import clsx from "clsx";
import { SwitchProps } from "./switch.types";

// Utility to merge refs (copied for consistency)
const useMergeRefs = <T,>(...refs: (React.Ref<T> | undefined)[]) => {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(node);
			} else if (ref != null) {
				(ref as { current: T | null }).current = node;
			}
		});
	};
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(
		{
			className,
			size,
			variant,
			label,
			disabled,
			positionLabel = "right",
			color,
			shape,
			checked,
			defaultChecked,
			onChange,
			onCheckedChange,
			style,
			...props
		},
		ref
	) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const mergedRef = useMergeRefs(inputRef, ref);

		const isControlled = checked !== undefined;
		const [internalChecked, setInternalChecked] = useState(!!defaultChecked);

		// Visual state: use checked if controlled, otherwise internal state
		const isChecked = isControlled ? checked : internalChecked;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newChecked = e.target.checked;
			if (!isControlled) {
				setInternalChecked(newChecked);
			}
			onCheckedChange?.(newChecked);
			onChange?.(e);
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				inputRef.current?.click();
			}
		};

		return (
			<label
				className={pos_label({ position_label: positionLabel, checked: isChecked, disabled })}
				style={style}
				tabIndex={disabled ? -1 : 0}
				onKeyDown={handleKeyDown}
			>
				<div
					className={background({
						variant,
						size,
						color,
						checked: isChecked,
						disabled,
						shape,
					})}
				>
					<input
						ref={mergedRef}
						type="checkbox"
						disabled={disabled}
						checked={isControlled ? checked : undefined}
						defaultChecked={!isControlled ? defaultChecked : undefined}
						onChange={handleChange}
						tabIndex={-1}
						className={clsx(
							switchprop({
								size,
								variant,
								disabled,
								checked: isChecked,
							}),
							className
						)}
						{...props}
					/>
					<span className={handle({ checked: isChecked, disabled, size, shape })} />
				</div>
				{label && <span className={text({ size, disabled })}>{label}</span>}
			</label>
		);
	}
);
