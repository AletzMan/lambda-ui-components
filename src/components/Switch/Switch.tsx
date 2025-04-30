import { forwardRef, useState } from "react";
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
        ref
    ) => {
        const [internalChecked, setInternalChecked] = useState(checked);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = e.target.checked;
            setInternalChecked(newChecked);
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <label className={pos_label({ position_label, checked: internalChecked, disabled })}>
                <div className={background({ variant, size, color, checked: internalChecked, disabled, shape })}>
                    <input
                        ref={ref}
                        type={"checkbox"}
                        disabled={disabled || undefined}
                        checked={internalChecked}
                        onChange={handleChange}
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
