/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonHTMLAttributes, ReactNode, forwardRef, isValidElement } from "react"
import styles from "./button.module.css"
import { cva, VariantProps } from "class-variance-authority"
import { Loader } from "lucide-react"
import clsx from 'clsx'
import { useInputGroup } from "../InputGroup/InputGroup"

const button = cva(styles[`lambda-btn`], {
    variants: {
        color: {
            primary: styles[`lambda-btn--color-primary`],
            secondary: styles[`lambda-btn--color-secondary`],
            danger: styles[`lambda-btn--color-danger`],
            success: styles[`lambda-btn--color-success`],
            warning: styles[`lambda-btn--color-warning`],
            info: styles[`lambda-btn--color-info`],
        },
        variant: {
            classic: styles[`lambda-btn--variant-classic`],
            solid: styles[`lambda-btn--variant-solid`],
            outline: styles[`lambda-btn--variant-outline`],
            dashed: styles[`lambda-btn--variant-dashed`],
            ghost: styles[`lambda-btn--variant-ghost`],
            text: styles[`lambda-btn--variant-text`],
        },
        size: {
            tiny: styles[`lambda-btn--size-tiny`],
            small: styles[`lambda-btn--size-small`],
            medium: styles[`lambda-btn--size-medium`],
            large: styles[`lambda-btn--size-large`],
        },
        radius: {
            none: styles[`lambda-btn--radius-none`],
            small: styles[`lambda-btn--radius-small`],
            medium: styles[`lambda-btn--radius-medium`],
            large: styles[`lambda-btn--radius-large`],
            pill: styles[`lambda-btn--radius-pill`],
            circle: styles[`lambda-btn--radius-circle`],
        },
        iconPosition: {
            left: styles[`lambda-btn--icon-left`],
            right: styles[`lambda-btn--icon-right`],
        },
        loading: {
            true: styles[`lambda-btn--loading-true`],
            false: styles[`lambda-btn--loading-false`],
        },
        disabled: {
            false: styles[`lambda-btn--disabled-false`],
            true: styles[`lambda-btn--disabled-true`],
        },
    },
    defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "medium",
        radius: 'medium',
        disabled: false,
        iconPosition: "left",
        loading: false,
    },
})

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "color">, VariantProps<typeof button> {
    icon?: ReactNode | undefined | null
    label?: string
    loadingText?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "solid",
            color = "primary",
            size = "medium",
            radius = "small",
            icon,
            label,
            iconPosition = "left",
            loadingText,
            loading,
            disabled,
            ...props
        },
        ref
    ) => {
        let contextSize, contextDisabled
        try {
            const context = useInputGroup()
            contextSize = context.size
            contextDisabled = context.disabled
        } catch (e) {
            contextSize = size
            contextDisabled = disabled
        }
        return (
            <button
                ref={ref}
                className={clsx(
                    button({
                        variant,
                        size: contextSize,
                        color,
                        disabled: contextDisabled,
                        radius,
                        loading,
                        iconPosition,
                        className,
                    }),
                    { [styles["lambda-btn--only-icon"]]: !(isValidElement<ReactNode>(props.children) || label) }
                )}
                disabled={contextDisabled || undefined}
                {...props}
            >
                {(icon || loading) && (
                    <span className={clsx(styles["lambda-btn-icon"], { [styles["lambda-btn-icon--only"]]: !label })}>
                        {loading ? <Loader className={styles["lambda-btn-icon--loading"]} /> : icon}
                    </span>
                )}
                {label && <span className={styles["lambda-btn-label"]}>{(loading && loadingText) ? loadingText : label}</span>}
                {props.children}
            </button>
        )
    }
)