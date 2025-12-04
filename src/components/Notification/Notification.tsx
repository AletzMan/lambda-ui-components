import { forwardRef } from "react";
import styles from "./notification.module.css";
import { Bell, CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import clsx from "clsx";
import {
	notificationFooterVariants,
	notificationVariants,
	notificationTimeVariants,
} from "./notification.variant";
import { NotificationProps } from "./notifications.types";

const NOTIFICATION_ICONS = {
	success: <CircleCheck />,
	warning: <CircleAlert />,
	info: <Info />,
	danger: <CircleX />,
	neutral: <Bell />, // O el ícono por defecto que prefieras
};

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
	(
		{
			notificationType,
			message,
			title,
			placement,
			radius,
			icon,
			duration = 5000,
			variant,
			closable,
			onClose,
			onConfirm,
			onCancel,
			cancelText,
			confirmText,
			...props
		},
		ref
	) => {
		// El cierre lo gestiona AnimatePresence/remoción del estado
		const handleOnCancel = () => {
			if (onCancel) onCancel();
			if (onClose) onClose();
		};
		const handleOnConfirm = () => {
			if (onConfirm) onConfirm();
			if (onClose) onClose();
		};

		return (
			<div
				className={clsx(
					notificationVariants({ notificationType, placement, variant, radius })
				)}
				{...props}
				ref={ref}
				role={onConfirm || onCancel ? "alertdialog" : "alert"}
			>
				<div className={styles["notification-header"]}>
					<div className={styles["notification-icon"]}>
						{icon ?? NOTIFICATION_ICONS[notificationType ?? "neutral"] ?? <Bell />}
					</div>

					<div className={styles["notification-content"]}>
						{title && <span className={styles["notification-title"]}>{title}</span>}
						{message && <p className={styles["notification-message"]}>{message}</p>}
					</div>
					{closable && (
						<button
							className={styles["notification-close-button"]}
							aria-label="Close notification"
							onClick={handleOnCancel}
						>
							<X className={styles["notification-close-button-icon"]} />
						</button>
					)}
				</div>
				{(onCancel || onConfirm) && (
					<footer className={notificationFooterVariants({ notificationType, variant })}>
						{onConfirm && (
							<button
								className={clsx(
									styles["notification-footer-button"],
									styles["notification-footer-button-confirm"]
								)}
								onClick={handleOnConfirm}
							>
								{confirmText || "Confirm"}
							</button>
						)}
						{onCancel && (
							<button
								className={clsx(
									styles["notification-footer-button"],
									styles["notification-footer-button-cancel"]
								)}
								onClick={handleOnCancel}
							>
								{cancelText || "Cancel"}
							</button>
						)}
					</footer>
				)}
				<div className={styles["notification-time-container"]}>
					<div
						className={notificationTimeVariants({ variant, notificationType })}
						style={{ animationDuration: `${duration}ms` }}
					/>
				</div>
			</div>
		);
	}
);

Notification.displayName = "Notification";
