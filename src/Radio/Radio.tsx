import { forwardRef, InputHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useRadioGroup } from "../RadioGroup/RadioGroup"; // Importamos el contexto
import styles from "./radio.module.css";

// Definimos las variantes para el estilo de los radio buttons
const radioprop = cva(styles["radio"], {
    variants: {
        color: {
            primary: styles["radio-primary"],
            secondary: styles["radio-secondary"],
            danger: styles["radio-danger"],
            success: styles["radio-success"],
            warning: styles["radio-warning"],
        },
        size: {
            small: styles["radio-small"],
            medium: styles["radio-medium"],
            large: styles["radio-large"],
        },
        variant: {
            bordered: styles["radio-bordered"],
            flat: styles["radio-flat"],
        },
        type: {
            default: styles["radio-default"],
            button: styles["radio-button"]
        },
        disabled: {
            true: styles["radio-disabled"],
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

const view = cva(styles["radio-view"], {
    variants: {
        color: {
            primary: styles["radio-view-primary"],
            secondary: styles["radio-view-secondary"],
            danger: styles["radio-view-danger"],
            success: styles["radio-view-success"],
            warning: styles["radio-view-warning"],
            info: styles["radio-view-info"],
        },
        size: {
            small: styles["radio-view-small"],
            medium: styles["radio-view-medium"],
            large: styles["radio-view-large"],
        },
        variant: {
            bordered: styles["radio-view-bordered"],
            flat: styles["radio-view-flat"],
        },
        type: {
            default: styles["radio-view-default"],
            button: styles["radio-view-button"]
        },
        disabled: {
            true: styles["radio-view-disabled"],
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

const wrapper = cva(styles["radio-wrapper"], {
    variants: {
        positionLabel: {
            left: styles["radio-wrapper-left"],
            right: styles["radio-wrapper-right"],
            top: styles["radio-wrapper-top"],
            bottom: styles["radio-wrapper-bottom"],
        },
        color: {
            primary: styles["radio-wrapper-primary"],
            secondary: styles["radio-wrapper-secondary"],
            danger: styles["radio-wrapper-danger"],
            success: styles["radio-wrapper-success"],
            warning: styles["radio-wrapper-warning"],
        },
        size: {
            small: styles["radio-wrapper-small"],
            medium: styles["radio-wrapper-medium"],
            large: styles["radio-wrapper-large"],
        },
        variant: {
            bordered: styles["radio-wrapper-bordered"],
            flat: styles["radio-wrapper-flat"],
        },
        type: {
            default: styles["radio-wrapper-default"],
            button: styles["radio-wrapper-button"]
        },
        disabled: {
            true: styles["radio-wrapper-disabled"],
            false: "",
        },
    },
    defaultVariants: {
        positionLabel: "right",
        color: "primary",
        size: "medium",
        type: "default",
        variant: "bordered"
    },
})

const iconView = cva(styles["radio-icon"], {
    variants: {
        color: {
            primary: styles["radio-icon-primary"],
            secondary: styles["radio-icon-secondary"],
            danger: styles["radio-icon-danger"],
            success: styles["radio-icon-success"],
            warning: styles["radio-icon-warning"],
        },
        size: {
            small: styles["radio-icon-small"],
            medium: styles["radio-icon-medium"],
            large: styles["radio-icon-large"],
        },
        type: {
            default: styles["radio-icon-default"],
            button: styles["radio-icon-button"]
        },
        disabled: {
            true: styles["radio-icon-disabled"],
            false: "",
        },
        checked: {
            true: styles["radio-icon-checked"],
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

const labelName = cva(styles["radio-label"], {
    variants: {
        color: {
            primary: styles["radio-label-primary"],
            secondary: styles["radio-label-secondary"],
            danger: styles["radio-label-danger"],
            success: styles["radio-label-success"],
            warning: styles["radio-label-warning"],
        },
        type: {
            default: styles["radio-label-default"],
            button: styles["radio-label-button"]
        },
        disabled: {
            true: styles["radio-label-disabled"],
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
    positionLabel?: "right" | "left" | "top" | "bottom"
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
            positionLabel = "right",
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
            <label className={wrapper({ positionLabel, color, disabled, size, type: type || groupType, variant })}>
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

                <div className={view({ variant: variant || groupVariant, size: size || groupSize, color: color || groupColor, disabled: isDisabled, type: type || groupType })}>
                    <span className={iconView({ size: size || groupSize, color: color || groupColor, disabled: isDisabled, checked: isChecked, type: type || groupType })} />
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