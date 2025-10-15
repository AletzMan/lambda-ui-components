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

	const allPlacements: (typeof validPlacements)[number][] = [
		"top-left",
		"top-center",
		"top-right",
		"bottom-left",
		"bottom-center",
		"bottom-right",
	];

	return (
		<>
			{allPlacements.map((placement) => {
				const notifs = groupedNotifications[placement] || [];
				return (
					<div key={placement} className={notificationGroupVariants({ placement })}>
						<AnimatePresence initial={false}>
							{notifs.slice(0, maxNotifications).map((notification) => {
								const animation = getAnimationByPlacement(placement);
								return (
									<motion.div
										key={notification.id}
										layout
										initial={animation.initial}
										animate={animation.animate}
										exit={animation.exit}
										transition={{
											opacity: { duration: 0.22 },
											y: { type: "spring", stiffness: 500, damping: 32, mass: 1 },
											scale: { duration: 0.16 },
										}}
										style={{ width: "100%" }}
									>
										<Notification {...notification} />
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
				);
			})}
		</>
	);
};

const getAnimationByPlacement = (placement: string) => {
	switch (placement) {
		case "top-left":
			return {
				initial: { opacity: 0, x: -140, y: 0, zIndex: 1 },
				animate: { opacity: 1, x: 0, y: 0, zIndex: 2 },
				exit: { opacity: 0, x: -140, y: 0, scale: 0.95, zIndex: 1 },
			};
		case "top-center":
			return {
				initial: { opacity: 0, y: -40, zIndex: 1 },
				animate: { opacity: 1, y: 0, zIndex: 2 },
				exit: { opacity: 0, y: -40, scale: 0.95, zIndex: 1 },
			};
		case "top-right":
			return {
				initial: { opacity: 0, x: 140, y: 0, zIndex: 1 },
				animate: { opacity: 1, x: 0, y: 0, zIndex: 2 },
				exit: { opacity: 0, x: 140, y: 0, scale: 0.95, zIndex: 1 },
			};
		case "bottom-left":
			return {
				initial: { opacity: 0, x: -40, y: 24 },
				animate: { opacity: 1, x: 0, y: 0 },
				exit: { opacity: 0, x: -40, y: 24, scale: 0.95 },
			};
		case "bottom-center":
			return {
				initial: { opacity: 0, y: 40 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 40, scale: 0.95 },
			};
		case "bottom-right":
			return {
				initial: { opacity: 0, x: 40, y: 24 },
				animate: { opacity: 1, x: 0, y: 0 },
				exit: { opacity: 0, x: 40, y: 24, scale: 0.95 },
			};
		default:
			return {
				initial: { opacity: 0, y: 24 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -24, scale: 0.95 },
			};
	}
};
