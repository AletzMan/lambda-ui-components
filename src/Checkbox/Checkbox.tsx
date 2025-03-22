import { forwardRef, useState, InputHTMLAttributes, ChangeEvent } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./checkbox.module.css";
import { CheckIcon } from "lucide-react";
import clsx from 'clsx';

const checkboxprop = cva(styles["lambda-checkbox"], {
    variants: {
        color: {
            primary: styles["lambda-checkbox--color-primary"],
            secondary: styles["lambda-checkbox--color-secondary"],
            danger: styles["lambda-checkbox--color-danger"],
            success: styles["lambda-checkbox--color-success"],
            warning: styles["lambda-checkbox--color-warning"],
            info: styles["lambda-checkbox--color-info"],
        },
        size: {
            small: styles["lambda-checkbox--size-small"],
            medium: styles["lambda-checkbox--size-medium"],
            large: styles["lambda-checkbox--size-large"],
        },
        variant: {
            bordered: styles["lambda-checkbox--variant-bordered"],
            flat: styles["lambda-checkbox--variant-flat"],
        },
        disabled: {
            true: styles["lambda-checkbox--disabled-true"],
            false: "",
        },
        checked: {
            true: styles["lambda-checkbox--checked-true"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "bordered",
        color: "primary",
        disabled: false,
        checked: false,
    },
});

const bg = cva(styles["lambda-checkbox-bg"], {
    variants: {
        color: {
            primary: styles["lambda-checkbox-bg--color-primary"],
            secondary: styles["lambda-checkbox-bg--color-secondary"],
            danger: styles["lambda-checkbox-bg--color-danger"],
            success: styles["lambda-checkbox-bg--color-success"],
            warning: styles["lambda-checkbox-bg--color-warning"],
            info: styles["lambda-checkbox-bg--color-info"],
        },
        size: {
            small: styles["lambda-checkbox-bg--size-small"],
            medium: styles["lambda-checkbox-bg--size-medium"],
            large: styles["lambda-checkbox-bg--size-large"],
        },
        variant: {
            bordered: styles["lambda-checkbox-bg--variant-bordered"],
            flat: styles["lambda-checkbox-bg--variant-flat"],
        },
        radius: {
            none: styles["lambda-checkbox-bg--radius-none"],
            small: styles["lambda-checkbox-bg--radius-small"],
            medium: styles["lambda-checkbox-bg--radius-medium"],
            pill: styles["lambda-checkbox-bg--radius-pill"],
        },
        disabled: {
            true: styles["lambda-checkbox-bg--disabled-true"],
            false: "",
        },
        checked: {
            true: styles["lambda-checkbox-bg--checked-true"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "bordered",
        radius: 'small',
        color: "primary",
        disabled: false,
        checked: false,
    },
});

const pos_lb = cva(styles["lambda-checkbox-label-wrapper"], {
    variants: {
        positionLabel: {
            left: styles["lambda-checkbox-label-wrapper--position-left"],
            right: styles["lambda-checkbox-label-wrapper--position-right"],
            top: styles["lambda-checkbox-label-wrapper--position-top"],
            bottom: styles["lambda-checkbox-label-wrapper--position-bottom"],
        },
        disabled: {
            true: styles["lambda-checkbox-label-wrapper--disabled-true"],
            false: "",
        },
    },
    defaultVariants: {
        positionLabel: "right",
        disabled: false,
    },
});

const textLabel = cva(styles["lambda-checkbox-label"], {
    variants: {
        size: {
            small: styles["lambda-checkbox-label--size-small"],
            medium: styles["lambda-checkbox-label--size-medium"],
            large: styles["lambda-checkbox-label--size-large"],
        },
        disabled: {
            true: styles["lambda-checkbox-label--disabled-true"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false,
    },
});

export interface Checkboxprops
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | 'checked' | "color" | "type">,
    VariantProps<typeof checkboxprop> {
    label?: string;
    positionLabel?: "right" | "left" | "top" | "bottom";
    radius?: "none" | 'small' | 'medium' | 'pill' | null | undefined;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, Checkboxprops>(
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
            const newChecked = e.target.checked;
            setInternalChecked(newChecked);
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <label className={pos_lb({ positionLabel, disabled })}>
                <div className={bg({ variant, size, radius, color, checked: internalChecked, disabled })}>
                    <input
                        ref={ref}
                        type={"checkbox"}
                        disabled={disabled || undefined}
                        checked={internalChecked}
                        onChange={handleChange}
                        className={clsx(
                            checkboxprop({
                                size,
                                variant,
                                disabled,
                                checked: internalChecked,
                            }),
                            className
                        )}
                        {...props}
                    />
                    {<CheckIcon className={clsx(
                        styles["lambda-checkbox-icon"],
                        internalChecked ? styles["lambda-checkbox-icon--active"] : styles["lambda-checkbox-icon--inactive"],
                        size === 'large' && styles["lambda-checkbox-icon--size-large"],
                        size === 'medium' && styles["lambda-checkbox-icon--size-medium"],
                        size === 'small' && styles["lambda-checkbox-icon--size-small"],
                        disabled && styles["lambda-checkbox-icon--disabled-true"]
                    )} />}
                </div>
                {label && <span className={textLabel({ size, disabled })}>{label}</span>}
            </label>
        );
    }
);