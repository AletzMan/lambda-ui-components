import { forwardRef, useState, ChangeEvent } from "react";
import styles from "./checkbox.module.css";
import { CheckIcon } from "lucide-react";
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
                <div className={checkboxprop({ variant, size, radius, color, checked: internalChecked, disabled, className })}>
                    <input
                        ref={ref}
                        type={"checkbox"}
                        disabled={disabled || undefined}
                        checked={internalChecked}
                        onChange={handleChange}
                        className={styles["lambda-checkbox"]}
                        {...props}
                    />
                    {<CheckIcon className={icon({ size, disabled, checked: internalChecked })} />}
                </div>
                {label && <span className={textLabel({ size, disabled })}>{label}</span>}
            </label>
        );
    }
);