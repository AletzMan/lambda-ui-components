
import { forwardRef, useEffect, useState } from "react"
import { cva, VariantProps } from "class-variance-authority"
import styles from "./notification.module.css"
import { Bell, CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react"

const notificationProp = cva(styles.notif, {
    variants: {
        notificationType: {
            default: styles.notif_def,
            success: styles.notif_suc,
            warning: styles.notif_war,
            info: styles.notif_inf,
            error: styles.notif_err,
        },
        variant: {
            flat: styles.notif_flat,
            bordered: styles.notif_bordered,
        },
        placement: {
            "top-left": styles.notif_top_left,
            "top-center": styles.notif_top_center,
            "top-right": styles.notif_top_right,
            "bottom-left": styles.notif_bottom_left,
            "bottom-center": styles.notif_bottom_center,
            "bottom-right": styles.notif_bottom_right,
        }
    },
    defaultVariants: {
        notificationType: "default",
        placement: "top-center",
        variant: "flat",
    },
})
const barClass = cva(styles.bar, {
    variants: {
        notificationType: {
            default: styles.bar_def,
            success: styles.bar_suc,
            warning: styles.bar_war,
            info: styles.bar_inf,
            error: styles.bar_err,
        },
        variant: {
            flat: styles.bar_flat,
            bordered: styles.bar_bordered,
        },
    },
    defaultVariants: {
        notificationType: "default",
        variant: "flat",
    },
})


export interface NotificationProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "size">,
    VariantProps<typeof notificationProp> {
    message: string
    placement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
    notificationType?: "default" | "success" | "warning" | "info" | "error"
    variant?: "flat" | "bordered"
    duration?: number
    onClose?: () => void
}

export const Notification = forwardRef<HTMLInputElement, NotificationProps>(
    (
        {
            notificationType,
            message,
            placement,
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
                className={`${notificationProp({ notificationType, placement, variant })} ${!closing ? styles.active : ""}`}
                {...props}
                ref={ref}
                role="alert"
            >
                {notificationType === "success" && <CircleCheck className={styles.icon}>✔</CircleCheck>}
                {notificationType === "warning" && <CircleAlert className={styles.icon}>!</CircleAlert>}
                {notificationType === "info" && <Info className={styles.icon}>i</Info>}
                {notificationType === "error" && <CircleX className={styles.icon}>✖</CircleX>}
                {notificationType === "default" && <Bell className={styles.icon}>i</Bell>}
                <p className={styles.mess}>{message}</p>
                <button
                    className={styles.closeButton}
                    onClick={() => {
                        setClosing(true);
                        if (onClose) onClose();
                    }}
                >
                    <X className={styles.closeButton_icon} />
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
