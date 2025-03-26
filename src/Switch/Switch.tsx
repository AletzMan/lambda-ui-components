import { forwardRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./switch.module.css";
import clsx from "clsx";

const switchprop = cva(styles["lambda-switch"], {
    variants: {
        color: {
            primary: styles["lambda-switch-primary"],
            secondary: styles["lambda-switch-secondary"],
            danger: styles["lambda-switch-danger"],
            success: styles["lambda-switch-success"],
            warning: styles["lambda-switch-warning"],
            info: styles["lambda-switch-info"],
        },
        size: {
            small: styles["lambda-switch-small"],
            medium: styles["lambda-switch-medium"],
            large: styles["lambda-switch-large"],
        },
        variant: {
            solid: styles["lambda-switch-solid"],
            flat: styles["lambda-switch-flat"],
            outline: styles["lambda-switch-outline"],
        },
        disabled: {
            true: styles["lambda-switch-disabled"],
            false: "",
        },
        checked: {
            true: styles["lambda-switch-checked"],
            false: "",
        },
    },
    defaultVariants: {
        color: "primary",
        size: "medium",
        variant: "solid",
        disabled: false,
        checked: false,
    },
});

const background = cva(styles["lambda-switch-background"], {
    variants: {
        color: {
            primary: styles["lambda-switch-background-primary"],
            secondary: styles["lambda-switch-background-secondary"],
            danger: styles["lambda-switch-background-danger"],
            success: styles["lambda-switch-background-success"],
            warning: styles["lambda-switch-background-warning"],
            info: styles["lambda-switch-background-info"],
        },
        size: {
            small: styles["lambda-switch-background-small"],
            medium: styles["lambda-switch-background-medium"],
            large: styles["lambda-switch-background-large"],
        },
        variant: {
            solid: styles["lambda-switch-background-solid"],
            flat: styles["lambda-switch-background-flat"],
            outline: styles["lambda-switch-background-outline"],
        },
        disabled: {
            true: styles["lambda-switch-background-disabled"],
            false: "",
        },
        checked: {
            true: styles["lambda-switch-background-checked"],
            false: "",
        },
    },
    defaultVariants: {
        color: "primary",
        size: "medium",
        variant: "solid",
        disabled: false,
        checked: false,
    },
});

const pos_label = cva(styles["lambda-switch-wrapper"], {
    variants: {
        position_label: {
            left: styles["lambda-switch-wrapper-position-left"],
            right: styles["lambda-switch-wrapper-position-right"],
            top: styles["lambda-switch-wrapper-position-top"],
            bottom: styles["lambda-switch-wrapper-position-bottom"],
        },
        disabled: {
            true: styles["lambda-switch-wrapper-disabled"],
            false: "",
        },
        checked: {
            true: styles["lambda-switch-wrapper-checked"],
            false: "",
        },
    },
    defaultVariants: {
        position_label: "right",
        disabled: false,
        checked: false
    },
});

const handle = cva(styles["lambda-switch-handle"], {
    variants: {
        size: {
            small: styles["lambda-switch-handle-small"],
            medium: styles["lambda-switch-handle-medium"],
            large: styles["lambda-switch-handle-large"],
        },
        disabled: {
            true: styles["lambda-switch-handle-disabled"],
            false: "",
        },
        checked: {
            true: styles["lambda-switch-handle-checked"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false,
        checked: false
    },
});

export interface SwitchProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | "checked" | "color">,
    VariantProps<typeof switchprop> {
    label?: string;
    position_label?: "right" | "left" | "top" | "bottom";
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
                <div className={background({ variant, size, color, checked: internalChecked, disabled })}>
                    <input
                        ref={ref}
                        type={"checkbox"}
                        disabled={disabled || undefined}
                        checked={internalChecked}
                        onChange={handleChange}
                        className={`${switchprop({
                            size,
                            variant,
                            disabled,
                            checked: internalChecked,
                        })} ${className}`}
                        {...props}
                    />
                    {<span className={handle({ checked: internalChecked, disabled, size })} />}
                </div>
                {label && <span className={clsx(styles["lambda-switch-text"], { [styles["lambda-switch-text-disabled"]]: disabled })}>{label}</span>}
            </label>
        );
    }
);
