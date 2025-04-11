
import { TextareaHTMLAttributes, forwardRef } from "react"
import styles from "./textarea.module.css"
import { cva, VariantProps } from "class-variance-authority"
import { InvalidMessage } from "../_util/InvalidMessage/InvalidMessage"
import clsx from "clsx"

const card = cva(styles[`lambda-textarea`], {
    variants: {
        variant: {
            outline: styles["lambda-textarea-wrapper-outline"],
            flat: styles["lambda-textarea-wrapper-flat"],
            underline: styles["lambda-textarea-wrapper-underline"],
        },
        radius: {
            none: styles["lambda-textarea-wrapper-radius-none"],
            small: styles["lambda-textarea-wrapper-radius-small"],
            medium: styles["lambda-textarea-wrapper-radius-medium"],
            large: styles["lambda-textarea-wrapper-radius-large"],
            pill: styles["lambda-textarea-wrapper-radius-pill"],
        },
        size: {
            tiny: styles["lambda-textarea-wrapper-tiny"],
            small: styles["lambda-textarea-wrapper-small"],
            medium: styles["lambda-textarea-wrapper-medium"],
            large: styles["lambda-textarea-wrapper-large"],
        },
        invalid: {
            true: styles["lambda-textarea-wrapper-invalid"],
            false: "",
        },
        disabled: {
            false: styles["lambda-textarea-wrapper-enabled"],
            true: styles["lambda-textarea-wrapper-disabled"],
        },
    },
    defaultVariants: {
        variant: "outline",
        radius: 'medium',
    },
})


export interface CardProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled"> {
    variant?: VariantProps<typeof card>["variant"]
    radius?: VariantProps<typeof card>["radius"]
    size?: VariantProps<typeof card>["size"]
    invalid?: VariantProps<typeof card>["invalid"]
    disabled?: VariantProps<typeof card>["disabled"]
    label?: string
    errorMessage?: string
    helperText?: string
    isRequired?: boolean

}

export const TextArea = forwardRef<HTMLTextAreaElement, CardProps>(
    (
        {
            className,
            variant = "outline",
            radius = "small",
            size = "medium",
            invalid = false,
            disabled = false,
            label,
            errorMessage,
            helperText,
            isRequired = false,
            ...props
        },
        ref
    ) => {
        return (
            <div
                className={card({ variant, radius, className, size, invalid, disabled })}
            >
                {label && <label className={clsx(styles["lambda-textarea-label"], { [styles["lambda-textarea-label-required"]]: isRequired })}>
                    {label}
                </label>}
                <TextArea
                    ref={ref}
                    className={styles["lambda-textarea"]}
                    {...props}
                />
                {helperText && <span className={styles["lambda-textarea-helper"]}>
                    {helperText}
                </span>}
                {invalid && errorMessage && <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />}
            </div>
        )
    }
)