import { VariantProps, cva } from "class-variance-authority";
import styles from "./notification.module.css";

export const notificationVariants = cva(styles["notification"], {
	variants: {
		notificationType: {
			neutral: styles["notification-neutral"],
			success: styles["notification-success"],
			warning: styles["notification-warning"],
			info: styles["notification-info"],
			danger: styles["notification-danger"],
		},
		radius: {
			default: styles["notification-radius-default"],
			none: styles["notification-radius-none"],
			tiny: styles["notification-radius-tiny"],
			small: styles["notification-radius-small"],
			medium: styles["notification-radius-medium"],
			large: styles["notification-radius-large"],
		},
		variant: {
			themed: styles["notification-themed"],
			solid: styles["notification-solid"],
			darkened: styles["notification-darkened"],
			lightened: styles["notification-lightened"],
			soft: styles["notification-soft"],
		},
		placement: {
			"top-left": styles["notification-top-left"],
			"top-center": styles["notification-top-center"],
			"top-right": styles["notification-top-right"],
			"bottom-left": styles["notification-bottom-left"],
			"bottom-center": styles["notification-bottom-center"],
			"bottom-right": styles["notification-bottom-right"],
		},
	},
	defaultVariants: {
		notificationType: "neutral",
		placement: "top-center",
		variant: "themed",
		radius: "default",
	},
});

export const notificationTimeVariants = cva(styles["notification-time"], {
	variants: {
		notificationType: {
			neutral: styles["notification-time-neutral"],
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
			soft: styles["notification-time-soft"],
		},
	},
	defaultVariants: {
		notificationType: "neutral",
		variant: "themed",
	},
});

export const notificationFooterVariants = cva(styles["notification-footer"], {
	variants: {
		notificationType: {
			neutral: styles["notification-footer-neutral"],
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
			soft: styles["notification-footer-soft"],
		},
	},
	defaultVariants: {
		notificationType: "neutral",
		variant: "themed",
	},
});

export const notificationGroupVariants = cva(styles["notification-group"], {
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
});

export type NotificationVariants = VariantProps<typeof notificationVariants>;
