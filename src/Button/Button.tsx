/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonHTMLAttributes, ReactNode, forwardRef, isValidElement } from "react";
import styles from "./button.module.css";
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import clsx from 'clsx';
import { useInputGroup } from "../InputGroup/InputGroup";

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
            solid: styles[`lambda-btn--variant-solid`],
            outline: styles[`lambda-btn--variant-outline`],
            dashed: styles[`lambda-btn--variant-dashed`],
            ghost: styles[`lambda-btn--variant-ghost`],
        },
        size: {
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
    compoundVariants: [
        { color: "primary", variant: 'solid', className: styles[`lambda-btn--primary-solid`] },
        { color: "primary", variant: 'outline', className: styles[`lambda-btn--primary-outline`] },
        { color: "primary", variant: 'dashed', className: styles[`lambda-btn--primary-dashed`] },
        { color: "primary", variant: 'ghost', className: styles[`lambda-btn--primary-ghost`] },
        { color: "secondary", variant: 'solid', className: styles[`lambda-btn--secondary-solid`] },
        { color: "secondary", variant: 'outline', className: styles[`lambda-btn--secondary-outline`] },
        { color: "secondary", variant: 'dashed', className: styles[`lambda-btn--secondary-dashed`] },
        { color: "secondary", variant: 'ghost', className: styles[`lambda-btn--secondary-ghost`] },
        { color: "danger", variant: 'solid', className: styles[`lambda-btn--danger-solid`] },
        { color: "danger", variant: 'outline', className: styles[`lambda-btn--danger-outline`] },
        { color: "danger", variant: 'dashed', className: styles[`lambda-btn--danger-dashed`] },
        { color: "danger", variant: 'ghost', className: styles[`lambda-btn--danger-ghost`] },
        { color: "success", variant: 'solid', className: styles[`lambda-btn--success-solid`] },
        { color: "success", variant: 'outline', className: styles[`lambda-btn--success-outline`] },
        { color: "success", variant: 'dashed', className: styles[`lambda-btn--success-dashed`] },
        { color: "success", variant: 'ghost', className: styles[`lambda-btn--success-ghost`] },
        { color: "warning", variant: 'solid', className: styles[`lambda-btn--warning-solid`] },
        { color: "warning", variant: 'outline', className: styles[`lambda-btn--warning-outline`] },
        { color: "warning", variant: 'dashed', className: styles[`lambda-btn--warning-dashed`] },
        { color: "warning", variant: 'ghost', className: styles[`lambda-btn--warning-ghost`] },
        { color: "info", variant: 'solid', className: styles[`lambda-btn--info-solid`] },
        { color: "info", variant: 'outline', className: styles[`lambda-btn--info-outline`] },
        { color: "info", variant: 'dashed', className: styles[`lambda-btn--info-dashed`] },
        { color: "info", variant: 'ghost', className: styles[`lambda-btn--info-ghost`] },
    ],
    defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "medium",
        radius: 'medium',
        disabled: false,
        iconPosition: "left",
        loading: false,
    },
});

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "color">, VariantProps<typeof button> {
    icon?: ReactNode | undefined | null;
    label?: string;
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
            loading,
            disabled,
            ...props
        },
        ref
    ) => {
        let contextSize
        try {
            const context = useInputGroup();
            contextSize = context.size;
        } catch (e) {
            contextSize = size;
        }
        return (
            <button
                ref={ref}
                className={clsx(
                    button({
                        variant,
                        size: contextSize,
                        color,
                        disabled,
                        radius,
                        loading,
                        iconPosition,
                        className,
                    }),
                    { [styles["lambda-btn--only-icon"]]: !(isValidElement<ReactNode>(props.children) || label) }
                )}
                disabled={disabled || undefined}
                {...props}
            >
                {(icon || loading) && (
                    <span className={clsx(styles["lambda-btn-icon"], { [styles["lambda-btn-icon--only"]]: !label })}>
                        {loading ? <Loader className={styles["lambda-btn-icon--loading"]} /> : icon}
                    </span>
                )}
                {label && <span className={styles["lambda-btn-label"]}>{label}</span>}
                {props.children}
            </button>
        );
    }
);