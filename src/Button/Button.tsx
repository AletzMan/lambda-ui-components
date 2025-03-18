/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ButtonHTMLAttributes, createElement, forwardRef, useState } from "react";
import styles from "./button.module.css"
import { cva, VariantProps } from "class-variance-authority";
import { MouseEvent } from "react"

const button = cva(styles[`l-btn`], {
    variants: {
        color: {
            primary: styles.color_primary,
            secondary: styles.color_secondary,
            danger: styles.color_danger,
            success: styles.color_success,
            warning: styles.color_warning,
            info: styles.color_info,
        },
        variant: {
            solid: styles.variant_solid,
            outline: styles.variant_outline,
            dashed: styles.variant_dashed,
            ghost: styles.variant_ghost,
        },
        size: {
            small: styles.size_sm,
            medium: styles.size_md,
            large: styles.size_lg

        },
        icon_only: {
            false: styles.noticon,
            true: styles.icon_only,
        },
        radius: {
            none: styles.radius_none,
            small: styles.radius_small,
            medium: styles.radius_medium,
            large: styles.radius_large,
            pill: styles.radius_pill,
            circle: styles.radius_circle
        },
        disabled: {
            false: styles.enabled,
            true: styles.disabled,
        },
    },
    compoundVariants: [
        { color: "secondary", variant: 'outline', className: styles.secondary_outline },
        { color: "secondary", variant: 'dashed', className: styles.secondary_dashed },
        { color: "secondary", variant: 'ghost', className: styles.secondary_ghost },
        { color: "danger", variant: 'outline', className: styles.danger_outline },
        { color: "danger", variant: 'dashed', className: styles.danger_dashed },
        { color: "danger", variant: 'ghost', className: styles.danger_ghost },
        { color: "success", variant: 'outline', className: styles.success_outline },
        { color: "success", variant: 'dashed', className: styles.success_dashed },
        { color: "success", variant: 'ghost', className: styles.success_ghost },
        { color: "warning", variant: 'outline', className: styles.warning_outline },
        { color: "warning", variant: 'dashed', className: styles.warning_dashed },
        { color: "warning", variant: 'ghost', className: styles.warning_ghost },
        { color: "info", variant: 'outline', className: styles.info_outline },
        { color: "info", variant: 'dashed', className: styles.info_dashed },
        { color: "info", variant: 'ghost', className: styles.info_ghost },
        { icon_only: true, size: "small", className: styles.icon_only_sm },
        { icon_only: true, size: "medium", className: styles.icon_only_md },
        { icon_only: true, size: "large", className: styles.icon_only_lg },
    ],
    defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "medium",
        radius: 'medium',
        icon_only: false,
        disabled: false,
    },
})

const shadow = cva(styles[`l-btn-shadow`], {
    variants: {
        radius: {
            none: styles[`l-btn-shadow-rad-none`],
            small: styles[`l-btn-shadow-rad-sm`],
            medium: styles[`l-btn-shadow-rad-md`],
            large: styles[`l-btn-shadow-rad-lg`],
            pill: styles[`l-btn-shadow-rad-pill`],
            circle: styles[`l-btn-shadow-rad-circle`]
        },
        color: {
            primary: styles[`l-btn-shadow-primary`],
            secondary: styles[`l-btn-shadow-secondary`],
            danger: styles[`l-btn-shadow-danger`],
            success: styles[`l-btn-shadow-success`],
            warning: styles[`l-btn-shadow-warning`],
            info: styles[`l-btn-shadow-info`],
        },
    },
    defaultVariants: {
        radius: 'medium'
    }
})

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "color">,
    VariantProps<typeof button> { }


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "solid",
            color = "primary",
            size = "medium",
            radius = "small",
            icon_only,
            disabled,
            ...props
        },
        ref
    ) => {
        const [isPressed, setIsPressed] = useState(false)
        const handleMouseUp = (event: MouseEvent<HTMLButtonElement>) => {
            props.onMouseUp && props.onMouseUp(event)
            setIsPressed(true)
            setTimeout(() => {
                setIsPressed(false)
            }, 500)
        }

        return (
            <button
                ref={ref}
                className={button({
                    variant,
                    size,
                    color,
                    disabled,
                    radius,
                    icon_only,
                    className,
                })}
                onMouseUp={handleMouseUp}
                disabled={disabled || undefined}
                {...props}
            >
                {isPressed && createElement('div', { className: shadow({ radius, color }) })}
                {props.children}
            </button>
        )
    }
)
