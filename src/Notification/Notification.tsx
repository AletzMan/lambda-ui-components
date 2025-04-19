
import { forwardRef, useEffect, useState } from "react"
import { cva, VariantProps } from "class-variance-authority"
import styles from "./notification.module.css"
import { Bell, CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react"
import clsx from "clsx"

const notificationProp = cva(styles["notification"], {
    variants: {
        notificationType: {
            secondary: styles["notification-secondary"],
            success: styles["notification-success"],
            warning: styles["notification-warning"],
            info: styles["notification-info"],
            danger: styles["notification-danger"],
        },
        variant: {
            themed: styles["notification-themed"],
            solid: styles["notification-solid"],
            darkened: styles["notification-darkened"],
            lightened: styles["notification-lightened"],
            flat: styles["notification-flat"],
        },
        placement: {
            "top-left": styles["notification-top-left"],
            "top-center": styles["notification-top-center"],
            "top-right": styles["notification-top-right"],
            "bottom-left": styles["notification-bottom-left"],
            "bottom-center": styles["notification-bottom-center"],
            "bottom-right": styles["notification-bottom-right"],
        }
    },
    defaultVariants: {
        notificationType: "secondary",
        placement: "top-center",
        variant: "themed",
    },
})

const barClass = cva(styles["notification-time"], {
    variants: {
        notificationType: {
            secondary: styles["notification-time-secondary"],
            success: styles["notification-time-success"],
            warning: styles["notification-time-warning"],
            info: styles["notification-time-info"],
            danger: styles["notification-time-danger"],
        },
        variant: {
            themed: styles["notification-time-themed"],
            solid: styles["notification-time-solid"],
            darkened: styles["notification-time-darkened"],
            lightened: styles["notification-time-lightened"],
            flat: styles["notification-time-flat"],
        },
    },
    defaultVariants: {
        notificationType: "secondary",
        variant: "themed",
    },
})

const footer = cva(styles["notification-footer"], {
    variants: {
        notificationType: {
            secondary: styles["notification-footer-secondary"],
            success: styles["notification-footer-success"],
            warning: styles["notification-footer-warning"],
            info: styles["notification-footer-info"],
            danger: styles["notification-footer-danger"],
        },
        variant: {
            themed: styles["notification-footer-themed"],
            solid: styles["notification-footer-solid"],
            darkened: styles["notification-footer-darkened"],
            lightened: styles["notification-footer-lightened"],
            flat: styles["notification-footer-flat"],
        },
    },
    defaultVariants: {
        notificationType: "secondary",
        variant: "themed",
    },
})

const NOTIFICATION_ICONS = {
    success: <CircleCheck />,
    warning: <CircleAlert />,
    info: <Info />,
    danger: <CircleX />,
    secondary: <Bell /> // O el ícono por defecto que prefieras
};


export interface NotificationProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "size">,
    VariantProps<typeof notificationProp> {
    title?: string
    message?: string
    placement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
    notificationType?: "secondary" | "success" | "warning" | "info" | "danger"
    icon?: React.ReactNode
    variant?: "themed" | "flat" | "solid" | "darkened" | "lightened"
    closable?: boolean
    duration?: number
    onClose?: () => void
    onConfirm?: () => void
    onCancel?: () => void
    cancelText?: string
    confirmText?: string
}

export const Notification = forwardRef<HTMLInputElement, NotificationProps>(
    (
        {
            notificationType,
            message,
            title,
            placement,
            icon,
            duration = 5000,
            variant,
            closable = true,
            onClose,
            onConfirm,
            onCancel,
            cancelText,
            confirmText,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(true)
        const [closing, setClosing] = useState(false)

        // Cerrar automáticamente después de la duración especificada
        useEffect(() => {
            const timer = setTimeout(() => {
                setClosing(true) // Comienza la animación de cierre 
            }, duration)

            return () => clearTimeout(timer)
        }, [duration, onClose])

        // Después de la animación de cierre, la notificación desaparece
        useEffect(() => {
            if (closing) {
                const timer = setTimeout(() => {
                    setIsVisible(false)
                    if (onClose) onClose() // Notificamos que cerró
                }, 600) // Duración de la animación de salida

                return () => clearTimeout(timer)
            }
        }, [closing, onClose])

        const handleOnCancel = () => {
            setClosing(true)
            if (onCancel) onCancel() // Notificamos que canceló
        }
        const handleOnConfirm = () => {
            setClosing(true)
            if (onConfirm) onConfirm() // Notificamos que confirmó
        }

        // No renderizamos si la notificación no es visible
        if (!isVisible) return null


        return (
            <div
                className={clsx(
                    notificationProp({ notificationType, placement, variant }),
                    closing ? styles["notification-exit"] : styles["notification-active"]
                )}
                {...props}
                ref={ref}
                role="alert"
            >
                <div className={styles["notification-header"]}>
                    <div className={styles["notification-icon"]}>
                        {icon ?? NOTIFICATION_ICONS[notificationType ?? "secondary"] ?? <Bell />}
                    </div>

                    <div className={styles["notification-content"]}>
                        {title &&
                            <h1 className={styles["notification-title"]}>{title}</h1>
                        }
                        <p className={styles["notification-message"]}>{message}</p>
                    </div>
                    {closable && <button
                        className={styles["notification-close-button"]}
                        onClick={() => setClosing(true)}>
                        <X className={styles["notification-close-button-icon"]} />
                    </button>}
                </div>
                {(onCancel || onConfirm) && <footer className={footer({ notificationType, variant })}>
                    {onConfirm && <button className={clsx(styles["notification-footer-button"], styles["notification-footer-button-confirm"])} onClick={handleOnConfirm}>{confirmText || "Confirm"}</button>}
                    {onCancel && <button className={clsx(styles["notification-footer-button"], styles["notification-footer-button-cancel"])} onClick={handleOnCancel}>{cancelText || "Cancel"}</button>}
                </footer>}
                <div
                    className={barClass({ variant, notificationType })}
                    style={{ animationDuration: `${duration}ms` }}
                />
            </div>
        );
    }
);

Notification.displayName = "Notification";
