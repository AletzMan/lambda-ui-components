"use client";
import { Notification, NotificationProps } from "./Notification";
import { notificationGroup } from "./notification.variant";

const validPlacements = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
] as const;


interface NotificationContainerProps {
    notifications: NotificationProps[]
    maxNotifications?: number
}

export const NotificationContainer = ({ notifications, maxNotifications }: NotificationContainerProps) => {
    const groupedNotifications = notifications.reduce((acc, notification) => {
        const key = validPlacements.includes(notification.placement as typeof validPlacements[number])
            ? notification.placement!
            : "top-center";

        acc[key] = acc[key] || [];
        acc[key].push(notification);
        return acc;
    }, {} as Record<typeof validPlacements[number], NotificationProps[]>);

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
