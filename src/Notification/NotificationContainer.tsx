"use client"
import React from "react"
import { Notification, NotificationProps } from "./Notification"
import styles from "./notification.module.css"
import { cva } from "class-variance-authority"
import { validPlacements } from "./const"

const notificationGroup = cva(styles.notifgroup, {
    variants: {
        placement: {
            "top-left": styles.notifgroup_top_left,
            "top-center": styles.notifgroup_top_center,
            "top-right": styles.notifgroup_top_right,
            "bottom-left": styles.notifgroup_bottom_left,
            "bottom-center": styles.notifgroup_bottom_center,
            "bottom-right": styles.notifgroup_bottom_right,
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
