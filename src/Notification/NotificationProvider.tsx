/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react"
import { NotificationProps } from "./Notification"
import { NotificationContainer } from "./NotificationContainer"
import { v4 as uuidv4 } from "uuid"

type NotificationContextType = {
    showNotification: (props: Omit<NotificationProps, "id">) => void
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children, maxNotifications = 4, placement: defaultPlacement, duration: defaultDuration }: { children?: ReactNode, maxNotifications?: number, placement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right", duration?: number }) => {
    const [notifications, setNotifications] = useState<NotificationProps[]>([])

    const showNotification = (props: Omit<NotificationProps, "id">) => {
        const id = uuidv4();
        const newNotification: NotificationProps = {
            ...props,
            placement: props.placement ?? defaultPlacement, // Prioriza props.placement
            duration: props.duration ?? defaultDuration, // Prioriza props.duration
            id,
            onClose: () => {
                // Marcamos la notificación como "cerrando" antes de eliminarla
                setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, closing: true } : n))
                );

                // Esperamos a que la animación de salida termine antes de eliminar
                setTimeout(() => {
                    setNotifications((prev) => prev.filter((n) => n.id !== id))
                    props.onClose?.()
                }, 510)
            },
        };

        setNotifications((prev) => {
            const updatedNotifications = [...prev, newNotification]
            // Si excede el límite, elimina las más antiguas
            if (updatedNotifications.length > maxNotifications) {
                return updatedNotifications.slice(updatedNotifications.length - maxNotifications)
            }
            return updatedNotifications
        })

        if (newNotification.duration && newNotification.duration > 0) {
            setTimeout(() => {
                newNotification.onClose?.()
            }, newNotification.duration)
        }
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <NotificationContainer notifications={notifications} maxNotifications={maxNotifications} />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context
};