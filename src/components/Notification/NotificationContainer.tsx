"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Notification } from "./Notification";
import { notificationGroupVariants } from "./notification.variant";
import { NotificationProps } from "./notifications.types";

const validPlacements = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
] as const;

interface NotificationContainerProps {
	notifications: NotificationProps[];
	/**
	 * Número máximo de notificaciones a mostrar en cada grupo.
	 * @default 5
	 */
	maxNotifications?: number;
}
export const NotificationContainer = ({
	notifications,
	maxNotifications,
}: NotificationContainerProps) => {
	const groupedNotifications = notifications.reduce((acc, notification) => {
		const key = validPlacements.includes(notification.placement as (typeof validPlacements)[number])
			? notification.placement!
			: "top-center";

		acc[key] = acc[key] || [];
		acc[key].push(notification);
		return acc;
	}, {} as Record<(typeof validPlacements)[number], NotificationProps[]>);

	return (
		<>
			{Object.entries(groupedNotifications).map(([placement, notifs]) => (
				<div
					key={placement}
					className={notificationGroupVariants({
						placement: placement as (typeof validPlacements)[number],
					})}
				>
					<AnimatePresence initial={false}>
						{notifs.slice(0, maxNotifications).map((notification) => (
							<motion.div
								key={notification.id}
								layout // <-- ESTA LÍNEA ES LA CLAVE PARA ANIMAR EL REORDENAMIENTO
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: -24 }}
								transition={{
									opacity: { duration: 0.22 },
									y: { type: "spring", stiffness: 500, damping: 32, mass: 1 },
									scale: { duration: 0.16 },
								}}
								style={{ width: "100%" }}
							>
								<Notification {...notification} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			))}
		</>
	);
};
