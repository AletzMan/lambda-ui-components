"use client"
import React from "react"
import { Notification, NotificationProps } from "./Notification"
import styles from "./notification.module.css"
import { cva } from "class-variance-authority"
import { validPlacements } from "./const"

const notificationGroup = cva(styles["notification-group"], {
    variants: {
        placement: {
            "top-left": styles["notification-group-top-left"],
            "top-center": styles["notification-group-top-center"],
            "top-right": styles["notification-group-top-right"],
            "bottom-left": styles["notification-group-bottom-left"],
            "bottom-center": styles["notification-group-bottom-center"],
            "bottom-right": styles["notification-group-bottom-right"],
        },
    },
    defaultVariants: {
        placement: "top-center",
    },
})


interface NotificationContainerProps {
    notifications: NotificationProps[]
    maxNotifications?: number
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, maxNotifications }) => {
    const groupedNotifications = notifications.reduce((acc, notification) => {
        const key = validPlacements.includes(notification.placement as typeof validPlacements[number])
            ? notification.placement!
            : "top-center"

        acc[key] = acc[key] || []
        acc[key].push(notification)
        return acc;
    }, {} as Record<typeof validPlacements[number], NotificationProps[]>)

    return (
        <>
            {Object.entries(groupedNotifications).map(([placement, notifs]) => (
                <div
                    key={placement}
                    className={` ${notificationGroup({ placement: placement as typeof validPlacements[number] })}`}
                >
                    {notifs.slice(0, maxNotifications).map((notification) => (
                        <Notification key={notification.id} {...notification} />
                    ))}
                </div>
            ))}
        </>
    );
};
