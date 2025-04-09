import { forwardRef, useState, InputHTMLAttributes, ChangeEvent } from "react"
import { cva, VariantProps } from "class-variance-authority"
import styles from "./checkbox.module.css"
import { CheckIcon } from "lucide-react"



const checkboxprop = cva(styles["lambda-checkbox-wrapper"], {
    variants: {
        color: {
            primary: styles["lambda-checkbox-wrapper-primary"],
            secondary: styles["lambda-checkbox-wrapper-secondary"],
            danger: styles["lambda-checkbox-wrapper-danger"],
            success: styles["lambda-checkbox-wrapper-success"],
            warning: styles["lambda-checkbox-wrapper-warning"],
            info: styles["lambda-checkbox-wrapper-info"],
        },
        size: {
            tiny: styles["lambda-checkbox-wrapper-tiny"],
            small: styles["lambda-checkbox-wrapper-small"],
            medium: styles["lambda-checkbox-wrapper-medium"],
            large: styles["lambda-checkbox-wrapper-large"],
        },
        variant: {
            solid: styles["lambda-checkbox-wrapper-solid"],
            flat: styles["lambda-checkbox-wrapper-flat"],
            outline: styles["lambda-checkbox-wrapper-outline"],
        },
        radius: {
            none: styles["lambda-checkbox-wrapper-radius-none"],
            small: styles["lambda-checkbox-wrapper-radius-small"],
            medium: styles["lambda-checkbox-wrapper-radius-medium"],
            circle: styles["lambda-checkbox-wrapper-radius-circle"],
        },
        disabled: {
            true: styles["lambda-checkbox-wrapper-disabled"],
            false: "",
        },
        checked: {
            true: styles["lambda-checkbox-wrapper-checked"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "solid",
        radius: 'small',
        color: "primary",
        disabled: false,
        checked: false,
    },
})

const container = cva(styles["lambda-checkbox-container"], {
    variants: {
        positionLabel: {
            left: styles["lambda-checkbox-container-left"],
            right: styles["lambda-checkbox-container-right"],
            top: styles["lambda-checkbox-container-top"],
            bottom: styles["lambda-checkbox-container-bottom"],
        },
        disabled: {
            true: styles["lambda-checkbox-container-disabled"],
            false: "",
        },
    },
    defaultVariants: {
        positionLabel: "right",
        disabled: false,
    },
})

const textLabel = cva(styles["lambda-checkbox-label"], {
    variants: {
        size: {
            tiny: styles["lambda-checkbox-label-tiny"],
            small: styles["lambda-checkbox-label-small"],
            medium: styles["lambda-checkbox-label-medium"],
            large: styles["lambda-checkbox-label-large"],
        },
        disabled: {
            true: styles["lambda-checkbox-label-disabled"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false,
    },
})

const icon = cva(styles["lambda-checkbox-icon"], {
    variants: {
        size: {
            tiny: styles["lambda-checkbox-icon-tyny"],
            small: styles["lambda-checkbox-icon-small"],
            medium: styles["lambda-checkbox-icon-medium"],
            large: styles["lambda-checkbox-icon-large"],
        },
        disabled: {
            true: styles["lambda-checkbox-icon-disabled"],
            false: "",
        },
        checked: {
            true: styles["lambda-checkbox-icon-checked"],
            false: styles["lambda-checkbox-icon-unchecked"],
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false,
        checked: false
    },
})

export interface Checkboxprops
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | 'checked' | "color" | "type">,
    VariantProps<typeof checkboxprop> {
    label?: string
    positionLabel?: "right" | "left" | "top" | "bottom"
    radius?: "none" | 'small' | 'medium' | 'circle' | null | undefined
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
            positionLabel = "right",
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
        )
    }
)