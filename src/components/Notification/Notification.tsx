import { forwardRef, useEffect, useState } from "react";
import styles from "./notification.module.css";
import { Bell, CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import clsx from "clsx";
import {
	notificationFooterVariants,
	notificationVariants,
	notificationTimeVariants,
} from "./notification.variant";
import { NotificationProps } from "./notifications.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

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
		const [isVisible, setIsVisible] = useState(true);
		const [closing, setClosing] = useState(false);
		const { radiusBox } = useUIConfig();
		const radiusValue = radius ?? radiusBox;

		// Cerrar automáticamente después de la duración especificada
		useEffect(() => {
			const timer = setTimeout(() => {
				setClosing(true); // Comienza la animación de cierre
			}, duration);

			return () => clearTimeout(timer);
		}, [duration, onClose]);

		// Después de la animación de cierre, la notificación desaparece
		useEffect(() => {
			if (closing) {
				const timer = setTimeout(() => {
					setIsVisible(false);
					if (onClose) onClose(); // Notificamos que cerró
				}, 600); // Duración de la animación de salida

				return () => clearTimeout(timer);
			}
		}, [closing, onClose]);

		const handleOnCancel = () => {
			setClosing(true);
			if (onCancel) onCancel(); // Notificamos que canceló
		};
		const handleOnConfirm = () => {
			setClosing(true);
			if (onConfirm) onConfirm(); // Notificamos que confirmó
		};

		// No renderizamos si la notificación no es visible
		if (!isVisible) return null;

		return (
			<div
				className={clsx(
					notificationVariants({ notificationType, placement, variant, radius: radiusValue }),
					closing ? styles["notification-exit"] : styles["notification-active"]
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
							onClick={() => setClosing(true)}
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
