import { forwardRef, InputHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useRadioGroup } from "../RadioGroup/RadioGroup"; // Importamos el contexto
import styles from "./radio.module.css";

// Definimos las variantes para el estilo de los radio buttons
const radioprop = cva(styles.radio, {
    variants: {
        color: {
            primary: styles.radio_primary,
            secondary: styles.radio_secondary,
            danger: styles.radio_danger,
            success: styles.radio_success,
            warning: styles.radio_warning,
        },
        size: {
            small: styles.radio_small,
            medium: styles.radio_medium,
            large: styles.radio_large,
        },
        variant: {
            bordered: styles.radio_brd,
            flat: styles.radio_flat,
        },
        type: {
            default: styles.radio_default,
            button: styles.radio_button
        },
        disabled: {
            true: styles.radio_disabled,
            false: "",
        },
    }, compoundVariants: [

    ],
    defaultVariants: {
        size: "medium",
        variant: "bordered",
        color: "primary",
        disabled: false,
    },
})



const bg_view = cva(styles.bg_view, {
    variants: {
        color: {
            primary: styles.bg_view_primary,
            secondary: styles.bg_view_secondary,
            danger: styles.bg_view_danger,
            success: styles.bg_view_success,
            warning: styles.bg_view_warning,
        },
        size: {
            small: styles.bg_view_small,
            medium: styles.bg_view_medium,
            large: styles.bg_view_large,
        },
        variant: {
            bordered: styles.bg_view_brd,
            flat: styles.bg_view_flat,
        },
        type: {
            default: styles.bg_view_default,
            button: styles.bg_view_button
        },
        disabled: {
            true: styles.bg_view_disabled,
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "bordered",
        color: "primary",
        disabled: false,
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
        color: {
            primary: styles.lb_primary,
            secondary: styles.lb_secondary,
            danger: styles.lb_danger,
            success: styles.lb_success,
            warning: styles.lb_warning,
        },
        size: {
            small: styles.lb_small,
            medium: styles.lb_medium,
            large: styles.lb_large,
        },
        variant: {
            bordered: styles.lb_brd,
            flat: styles.lb_flat,
        },
        type: {
            default: styles.lb_default,
            button: styles.lb_button
        },
        disabled: {
            true: styles.lb_disabled,
            false: "",
        },
    },
    defaultVariants: {
        position_label: "right",
        color: "primary",
        size: "medium",
        type: "default",
        variant: "bordered"
    },
})

const icon = cva(styles.icon, {
    variants: {
        color: {
            primary: styles.icon_primary,
            secondary: styles.icon_secondary,
            danger: styles.icon_danger,
            success: styles.icon_success,
            warning: styles.icon_warning,
        },
        size: {
            small: styles.icon_small,
            medium: styles.icon_medium,
            large: styles.icon_large,
        },
        type: {
            default: styles.icon_default,
            button: styles.icon_button
        },
        disabled: {
            true: styles.icon_disabled,
            false: "",
        },
        checked: {
            true: styles.icon_checked,
            false: "",
        },
    },
    defaultVariants: {
        color: "primary",
        disabled: false,
        size: "medium",
        type: "default"
    },
})
const labelName = cva(styles.label, {
    variants: {
        color: {
            primary: styles.label_primary,
            secondary: styles.label_secondary,
            danger: styles.label_danger,
            success: styles.label_success,
            warning: styles.label_warning,
        },
        type: {
            default: styles.label_default,
            button: styles.label_button
        },
        disabled: {
            true: styles.label_disabled,
            false: "",
        },
    },
    defaultVariants: {
        color: "primary",
    },
})


export interface Radioprops
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "size" | "disabled" | "checked" | "color" | "type"
    >,
    VariantProps<typeof radioprop> {
    label?: string
    position_label?: "right" | "left" | "top" | "bottom"
    type?: "default" | "button"
}

export const Radio = forwardRef<HTMLInputElement, Radioprops>(
    (
        {
            className,
            size,
            variant,
            label = "Label",
            disabled,
            type,
            position_label = "right",
            color,
            ...props
        },
        ref
    ) => {

        const {
            selectedValue,
            onChange,
            size: groupSize,
            color: groupColor,
            variant: groupVariant,
            type: groupType,
            disabled: groupDisabled,
            name,
        } = useRadioGroup()


        const isChecked = selectedValue === props.value
        const isDisabled = disabled || groupDisabled

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
        }

        return (
            <label className={pos_lb({ position_label, color, disabled, size, type: type || groupType, variant })}>

                <input
                    ref={ref}
                    type="radio"
                    name={name}
                    value={props.value}
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={isDisabled}
                    className={`${radioprop({
                        size: size || groupSize,
                        variant: variant || groupVariant,
                        color: color || groupColor,
                        disabled: isDisabled,
                    })} ${className}`}
                    {...props}
                />

                <div className={bg_view({ variant: variant || groupVariant, size: size || groupSize, color: color || groupColor, disabled: isDisabled, type: type || groupType })}>
                    <span className={icon({ size: size || groupSize, color: color || groupColor, disabled: isDisabled, checked: isChecked, type: type || groupType })} />
                </div>

                {label && (
                    <span className={labelName({ disabled, color, type: type || groupType })}>
                        {label}
                    </span>
                )}
            </label>
        )
    }
)

