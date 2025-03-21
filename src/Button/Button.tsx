import { ButtonHTMLAttributes, ReactNode, forwardRef, isValidElement } from "react";
import styles from "./button.module.css"
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

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
        radius: {
            none: styles.radius_none,
            small: styles.radius_small,
            medium: styles.radius_medium,
            large: styles.radius_large,
            pill: styles.radius_pill,
            circle: styles.radius_circle
        },
        icon_position: {
            left: styles.icon_left,
            right: styles.icon_right,
        },
        loading: {
            true: styles[`l-btn-loading`],
            false: styles.not_loading
        },
        disabled: {
            false: styles.enabled,
            true: styles.disabled,
        },
    },
    compoundVariants: [
        { color: "primary", variant: 'solid', className: styles.primary_solid },
        { color: "primary", variant: 'outline', className: styles.primary_outline },
        { color: "primary", variant: 'dashed', className: styles.primary_dashed },
        { color: "primary", variant: 'ghost', className: styles.primary_ghost },
        { color: "secondary", variant: 'solid', className: styles.secondary_solid },
        { color: "secondary", variant: 'outline', className: styles.secondary_outline },
        { color: "secondary", variant: 'dashed', className: styles.secondary_dashed },
        { color: "secondary", variant: 'ghost', className: styles.secondary_ghost },
        { color: "danger", variant: 'solid', className: styles.danger_solid },
        { color: "danger", variant: 'outline', className: styles.danger_outline },
        { color: "danger", variant: 'dashed', className: styles.danger_dashed },
        { color: "danger", variant: 'ghost', className: styles.danger_ghost },
        { color: "success", variant: 'solid', className: styles.success_solid },
        { color: "success", variant: 'outline', className: styles.success_outline },
        { color: "success", variant: 'dashed', className: styles.success_dashed },
        { color: "success", variant: 'ghost', className: styles.success_ghost },
        { color: "warning", variant: 'solid', className: styles.warning_solid },
        { color: "warning", variant: 'outline', className: styles.warning_outline },
        { color: "warning", variant: 'dashed', className: styles.warning_dashed },
        { color: "warning", variant: 'ghost', className: styles.warning_ghost },
        { color: "info", variant: 'solid', className: styles.info_solid },
        { color: "info", variant: 'outline', className: styles.info_outline },
        { color: "info", variant: 'dashed', className: styles.info_dashed },
        { color: "info", variant: 'ghost', className: styles.info_ghost },
    ],
    defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "medium",
        radius: 'medium',
        disabled: false,
        icon_position: "left",
        loading: false
    },
})



export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "color">,
    VariantProps<typeof button> {
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
            icon_position = "left",
            loading,
            disabled,
            ...props
        },
        ref
    ) => {

        return (
            <button
                ref={ref}
                className={`${button({
                    variant,
                    size,
                    color,
                    disabled,
                    radius,
                    loading,
                    icon_position,
                    className,
                })} ${(isValidElement<ReactNode>(props.children) || label) ? "" : styles["l-btn-only-icon"]}`}
                disabled={disabled || undefined}
                {...props}
            >
                {(icon || loading) && <span className={styles["l-btn-icon"]}>{loading ? <Loader className={styles["l-btn-icon-loading"]} /> : icon}</span>}
                {label && <span className={styles["l-btn-children"]}>{label}</span>}
                {props.children}
            </button>
        )
    }
)
