import { forwardRef, useState, InputHTMLAttributes, ChangeEvent } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./checkbox.module.css"
import { CheckIcon } from "lucide-react";


const checkboxprop = cva(styles.checkbox, {
    variants: {
        color: {
            primary: styles.checkbox_primary,
            secondary: styles.checkbox_secondary,
            danger: styles.checkbox_danger,
            success: styles.checkbox_success,
            warning: styles.checkbox_warning,
            info: styles.checkbox_info,
        },
        size: {
            small: styles.checkbox_small,
            medium: styles.checkbox_medium,
            large: styles.checkbox_large,
        },
        variant: {
            bordered: styles.checkbox_brd,
            flat: styles.checkbox_flat,
        },

        disabled: {
            true: styles.checkbox_disabled,
            false: "",
        },
        checked: {
            true: styles.checkbox_checked,
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
})

const bg = cva(styles.bg, {
    variants: {
        color: {
            primary: styles.bg_primary,
            secondary: styles.bg_secondary,
            danger: styles.bg_danger,
            success: styles.bg_success,
            warning: styles.bg_warning,
            info: styles.bg_info,
        },
        size: {
            small: styles.bg_small,
            medium: styles.bg_medium,
            large: styles.bg_large,
        },
        variant: {
            bordered: styles.bg_brd,
            flat: styles.bg_flat,
        },
        radius: {
            none: styles.bg_rd_none,
            small: styles.bg_rd_small,
            medium: styles.bg_rd_medium,
            pill: styles.bg_rd_pill,
        },
        disabled: {
            true: styles.bg_disabled,
            false: "",
        },
        checked: {
            true: styles.bg_checked,
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
})

const pos_lb = cva(styles.lb, {
    variants: {
        position_label: {
            left: styles.lb_left,
            right: styles.lb_right,
            top: styles.lb_top,
            bottom: styles.lb_bottom,
        },
        disabled: {
            true: styles.lb_disabled,
            false: "",
        },
    },
    defaultVariants: {
        position_label: "right",
        disabled: false
    },
})

const textLabel = cva(styles.label, {
    variants: {
        size: {
            small: styles.label_small,
            medium: styles.label_medium,
            large: styles.label_large,
        },
        disabled: {
            true: styles.label_disabled,
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false
    },
})

export interface Checkboxprops
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | 'checked' | "color" | "type">,
    VariantProps<typeof checkboxprop> {
    label?: string
    position_label?: "right" | "left" | "top" | "bottom"
    radius?: "none" | 'small' | 'medium' | 'pill' | null | undefined
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
            position_label = "right",
            color,
            checked,
            onChange,
            ...props
        },
        ref
    ) => {
        const [internalChecked, setInternalChecked] = useState(checked)

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const newChecked = e.target.checked
            setInternalChecked(newChecked)
            if (onChange) {
                onChange(e)
            }
        }

        return (
            <label className={pos_lb({ position_label, disabled })}>
                <div className={bg({ variant, size, radius, color, checked: internalChecked, disabled })}>
                    <input
                        ref={ref}
                        type={"checkbox"}
                        disabled={disabled || undefined}
                        checked={internalChecked}
                        onChange={handleChange}
                        className={`${checkboxprop({
                            size,
                            variant,
                            disabled,
                            checked: internalChecked,
                        })} ${className}`}
                        {...props}
                    />
                    {<CheckIcon className={`${styles.icon} ${internalChecked ? styles.icon_active : styles.icon_inactive} ${size === 'large' && styles.icon_large}  ${size === 'medium' && styles.icon_medium} ${size === 'small' && styles.icon_small} ${disabled && styles.icon_disabled}`} />}
                </div>
                {label && <span className={textLabel({ size, disabled })}>{label}</span>}
            </label>
        );
    }
)
