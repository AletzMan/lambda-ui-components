import { ButtonHTMLAttributes, ReactNode, forwardRef, isValidElement } from "react"
import styles from "./button.module.css"
import { VariantProps } from "class-variance-authority"
import { Loader } from "lucide-react"
import clsx from 'clsx'
import { useInputGroup } from "../InputGroup/InputGroup"
import { button } from "./button.variants"



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
        } catch (_e) {
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
                    { [styles["lambda-btn-only-icon"]]: !(isValidElement<ReactNode>(props.children) || label) }
                )}
                disabled={contextDisabled || undefined}
                {...props}
            >
                {(icon || loading) && (
                    <span className={clsx(styles["lambda-btn-icon"], { [styles["lambda-btn-icon-only"]]: !label })}>
                        {loading ? <Loader className={styles["lambda-btn-icon-loading"]} /> : icon}
                    </span>
                )}
                {label && <span className={styles["lambda-btn-label"]}>{(loading && loadingText) ? loadingText : label}</span>}
                {props.children}
            </button>
        )
    }
)