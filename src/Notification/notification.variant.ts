import { VariantProps, cva } from "class-variance-authority";
import styles from "./notification.module.css";

export const notificationProp = cva(styles["notification"], {
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
});

export const barClass = cva(styles["notification-time"], {
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
});

export const footer = cva(styles["notification-footer"], {
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
});

export type NotificationVariants = VariantProps<typeof notificationProp>;