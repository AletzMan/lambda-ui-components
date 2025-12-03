import React from "react";
import clsx from "clsx";
import styles from "./avatar.module.css";
import type { AvatarProps, AvatarGroupProps } from "./avatar.types";
import { avatarVariants } from "./avatar.variants";
import { motion } from "framer-motion";

// Paleta de colores para iniciales
const COLORS = [
	"var(--lambda-color-purple-500)",
	"var(--lambda-color-green-500)",
	"var(--lambda-color-yellow-500)",
	"var(--lambda-color-red-500)",
	"var(--lambda-color-sky-500)",
	"var(--lambda-color-teal-500)",
	"var(--lambda-color-orange-500)",
	"var(--lambda-color-pink-500)",
	"var(--lambda-color-blue-500)",
	"var(--lambda-color-green-500)",
	"var(--lambda-color-amber-500)",
];

const stringToColor = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return COLORS[Math.abs(hash) % COLORS.length];
};

const getInitials = (name: string) => {
	if (!name) return "";
	const words = name.split(" ").filter(Boolean);
	if (words.length === 1) return words[0][0]?.toUpperCase() || "";
	return (words[0][0] + words[1][0]).toUpperCase();
};

const AvatarItem: React.FC<AvatarProps> = ({
	name,
	src,
	size = "medium",
	className,
	style,
	animate = false,
}) => {
	const initials = getInitials(name);
	const bgColor = stringToColor(name);

	return (
		<motion.span
			whileHover={animate ? { scale: 1.1, zIndex: 2 } : undefined}
			whileTap={animate ? { scale: 0.9, zIndex: 2 } : undefined}
			whileFocus={animate ? { scale: 1.1, zIndex: 2 } : undefined}
			transition={{ type: "spring", stiffness: 300 }}
			className={clsx(avatarVariants({ size }), className)}
			style={{
				background: src ? undefined : bgColor,
				border: src ? undefined : `2px solid ${bgColor}`,
				...style,
			}}
			title={name}
		>
			{src ? <img src={src} alt={name} className={styles["lambda-avatar-img"]} /> : initials}
		</motion.span>
	);
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
	users,
	max = 5,
	size = "medium",
	className,
	style,
	children,
}) => {
	const visibleUsers = users.slice(0, max);
	const overflow = users.length - max;

	return (
		<span className={clsx(styles["lambda-avatar-group"], className)} style={style}>
			{visibleUsers.map((user, idx) => (
				<AvatarItem
					key={user.name + idx}
					name={user.name}
					src={user.src}
					size={size}
					animate={true}
				/>
			))}
			{overflow > 0 && (
				<span className={clsx(avatarVariants({ size, overflow: true }))}>+{overflow}</span>
			)}
			{children}
		</span>
	);
};

export const Avatar = Object.assign(AvatarItem, {
	Group: AvatarGroup,
});
