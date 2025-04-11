
import { TextareaHTMLAttributes, forwardRef, FocusEvent, useState } from "react"
import styles from "./textarea.module.css"
import { cva, VariantProps } from "class-variance-authority"
import { InvalidMessage } from "../_util/InvalidMessage/InvalidMessage"
import clsx from "clsx"
import { CircleX } from "lucide-react"
import { HelperText } from "../_util/HelperText/HelperText"

const textarea = cva(styles[`lambda-textarea`], {
    variants: {
        size: {
            tiny: styles["lambda-textarea-tiny"],
            small: styles["lambda-textarea-small"],
            medium: styles["lambda-textarea-medium"],
            large: styles["lambda-textarea-large"],
        },
        radius: {
            none: styles["lambda-textarea-radius-none"],
            small: styles["lambda-textarea-radius-small"],
            medium: styles["lambda-textarea-radius-medium"],
            large: styles["lambda-textarea-radius-large"],
        },
        variant: {
            outline: styles["lambda-textarea-outline"],
            borderless: styles["lambda-textarea-borderless"],
        },
        invalid: {
            true: styles["lambda-textarea-invalid"],
            false: "",
        },
        disabled: {
            false: styles["lambda-textarea-enabled"],
            true: styles["lambda-textarea-disabled"],
        },
    },
    defaultVariants: {
        variant: "outline",
        radius: 'medium',
    },
})

const labelString = cva(styles[`lambda-textarea-label`], {
    variants: {
        radius: {
            none: styles["lambda-textarea-label-radius-none"],
            small: styles["lambda-textarea-label-radius-small"],
            medium: styles["lambda-textarea-label-radius-medium"],
            large: styles["lambda-textarea-label-radius-large"],
        },
        size: {
            tiny: styles["lambda-textarea-label-tiny"],
            small: styles["lambda-textarea-label-small"],
            medium: styles["lambda-textarea-label-medium"],
            large: styles["lambda-textarea-label-large"],
        },
        disabled: {
            false: styles["lambda-textarea-label-enabled"],
            true: styles["lambda-textarea-label-disabled"],
        }

    },
    defaultVariants: {
        disabled: false,
        radius: 'medium',
        size: 'medium',
    },
})


export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled"> {
    variant?: VariantProps<typeof textarea>["variant"]
    radius?: VariantProps<typeof textarea>["radius"]
    size?: VariantProps<typeof textarea>["size"]
    invalid?: VariantProps<typeof textarea>["invalid"]
    disabled?: VariantProps<typeof textarea>["disabled"]
    label?: string
    errorMessage?: string
    helperText?: string
    required?: boolean

}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
            onFocus,
            onBlur,
            helperText,
            required = false,
            ...props
        },
        ref
    ) => {
        const [focused, setFocused] = useState(false)

        const handleOnFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
            setFocused(true)
            if (onFocus) {
                onFocus(e)
            }
        }

        const handleOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
            setFocused(false)
            if (onBlur) {
                onBlur(e)
            }
        }

        return (
            <div
                className={clsx(styles['lambda-textarea-wrapper'], { [styles['lambda-textarea-wrapper-disabled']]: disabled })}
            >
                {label && <label className={clsx(labelString({ disabled, radius, size }), { [styles["lambda-textarea-label-required"]]: required })}>
                    {label}
                </label>}
                <textarea
                    className={clsx("scrollBar", textarea({ variant, radius, className, size, invalid, disabled }))}
                    ref={ref}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    {...props}
                />
                {invalid && <CircleX className={clsx(styles["lambda-textarea-invalid-icon"], { [styles["lambda-textarea-invalid-icon-whitlabel"]]: label })} />}
                {helperText && !invalid && <HelperText text={helperText} size={size} disabled={disabled} focused={focused} />}
                {invalid && errorMessage && <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />}
            </div>
        )
    }
)