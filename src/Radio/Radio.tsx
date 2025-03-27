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
            bordered: styles["radio-brd"],
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

const bgView = cva(styles["bg-view"], {
    variants: {
        color: {
            primary: styles["bg-view-primary"],
            secondary: styles["bg-view-secondary"],
            danger: styles["bg-view-danger"],
            success: styles["bg-view-success"],
            warning: styles["bg-view-warning"],
        },
        size: {
            small: styles["bg-view-small"],
            medium: styles["bg-view-medium"],
            large: styles["bg-view-large"],
        },
        variant: {
            bordered: styles["bg-view-brd"],
            flat: styles["bg-view-flat"],
        },
        type: {
            default: styles["bg-view-default"],
            button: styles["bg-view-button"]
        },
        disabled: {
            true: styles["bg-view-disabled"],
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
            bordered: styles["radio-wrapper-brd"],
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

const iconCva = cva(styles.icon, {
    variants: {
        color: {
            primary: styles["icon-primary"],
            secondary: styles["icon-secondary"],
            danger: styles["icon-danger"],
            success: styles["icon-success"],
            warning: styles["icon-warning"],
        },
        size: {
            small: styles["icon-small"],
            medium: styles["icon-medium"],
            large: styles["icon-large"],
        },
        type: {
            default: styles["icon-default"],
            button: styles["icon-button"]
        },
        disabled: {
            true: styles["icon-disabled"],
            false: "",
        },
        checked: {
            true: styles["icon-checked"],
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
            primary: styles["label-primary"],
            secondary: styles["label-secondary"],
            danger: styles["label-danger"],
            success: styles["label-success"],
            warning: styles["label-warning"],
        },
        type: {
            default: styles["label-default"],
            button: styles["label-button"]
        },
        disabled: {
            true: styles["label-disabled"],
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

                <div className={bgView({ variant: variant || groupVariant, size: size || groupSize, color: color || groupColor, disabled: isDisabled, type: type || groupType })}>
                    <span className={iconCva({ size: size || groupSize, color: color || groupColor, disabled: isDisabled, checked: isChecked, type: type || groupType })} />
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