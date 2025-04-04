
import { forwardRef, useEffect, useState } from "react"
import { cva, VariantProps } from "class-variance-authority"
import styles from "./notification.module.css"
import { Bell, CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react"

const notificationProp = cva(styles["notification"], {
    variants: {
        notificationType: {
            default: styles["notification-default"],
            success: styles["notification-success"],
            warning: styles["notification-warning"],
            info: styles["notification-info"],
            danger: styles["notification-danger"],
        },
        variant: {
            themed: styles["notification-themed"],
            solid: styles["notification-solid"],
            darked: styles["notification-darked"],
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
        notificationType: "default",
        placement: "top-center",
        variant: "themed",
    },
})
const barClass = cva(styles["notification-time"], {
    variants: {
        notificationType: {
            default: styles["notification-time-default"],
            success: styles["notification-time-success"],
            warning: styles["notification-time-warning"],
            info: styles["notification-time-info"],
            danger: styles["notification-time-danger"],
        },
        variant: {
            themed: styles["notification-time-themed"],
            solid: styles["notification-time-solid"],
            darked: styles["notification-time-darked"],
            flat: styles["notification-time-flat"],
        },
    },
    defaultVariants: {
        notificationType: "default",
        variant: "themed",
    },
})


export interface NotificationProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "size">,
    VariantProps<typeof notificationProp> {
    title?: string
    message: string
    placement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
    notificationType?: "default" | "success" | "warning" | "info" | "danger"
    icon?: React.ReactNode
    variant?: "themed" | "flat" | "solid" | "darked"
    duration?: number
    onClose?: () => void
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
            onClose,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(true)
        const [closing, setClosing] = useState(false)
        const [timeLeft, setTimeLeft] = useState(duration)

        useEffect(() => {
            setTimeLeft(prev => prev - 1000)
        }, [])

        useEffect(() => {
            if (timeLeft > 0) {
                const timer = setInterval(() => {
                    setTimeLeft(prev => prev - 1000)
                }, 1000);
                return () => clearInterval(timer)
            }
        }, [timeLeft])

        // Cerrar automáticamente después de la duración especificada
        useEffect(() => {
            const timer = setTimeout(() => {
                setClosing(true) // Comienza la animación de cierre
                if (onClose) onClose()
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

        // No renderizamos si la notificación no es visible
        if (!isVisible) return null

        return (
            <div
                className={`${notificationProp({ notificationType, placement, variant })} ${closing ? styles["notification-exit"] : styles["notification-active"]}`}
                {...props}
                ref={ref}
                role="alert"
            >
                <div className={styles["notification-icon"]}>
                    {notificationType === "success" && <CircleCheck />}
                    {notificationType === "warning" && <CircleAlert />}
                    {notificationType === "info" && <Info />}
                    {notificationType === "danger" && <CircleX />}
                    {!["success", "warning", "info", "danger",
                        undefined
                    ].includes(notificationType) &&
                        (icon ?? <Bell />)}
                </div>


                <div className={styles["notification-content"]}>
                    {title && <h1 className={styles["notification-title"]}>{title}</h1>}
                    <p className={styles["notification-message"]}>{message}</p>
                </div>
                <button
                    className={styles["notification-close-button"]}
                    onClick={() => {
                        setClosing(true);
                        if (onClose) onClose();
                    }}
                >
                    <X className={styles["notification-close-button-icon"]} />
                </button>
                <div
                    className={barClass({ variant, notificationType })}
                    style={{ width: `${(timeLeft / duration) * 100}%` }}
                />
            </div>
        );
    }
);

Notification.displayName = "Notification";
