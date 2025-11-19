"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../Button/Button";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import type { ButtonThemeProps, ButtonThemeAnimation } from "./buttonTheme.types";
import React from "react";
import { buttonThemeIconVariants } from "./buttonTheme.variants";

const lightThemes = ["light", "retro"];
//const darkThemes = ["dark", "slate"];

const iconVariants: Record<ButtonThemeAnimation, any> = {
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.3 },
	},
	rotate: {
		initial: { rotate: -180, opacity: 0 },
		animate: { rotate: 0, opacity: 1 },
		exit: { rotate: 180, opacity: 0 },
		transition: { type: "stiffness", stiffness: 300, damping: 20 },
	},
	scale: {
		initial: { scale: 0.5, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		exit: { scale: 0.5, opacity: 0 },
		transition: { type: "stiffness", stiffness: 300, damping: 20 },
	},
	flip: {
		initial: { rotateY: 90, opacity: 0 },
		animate: { rotateY: 0, opacity: 1 },
		exit: { rotateY: -90, opacity: 0 },
		transition: { duration: 0.4 },
	},
	slide: {}, // Se define dinámicamente abajo
	none: {
		initial: {},
		animate: {},
		exit: {},
		transition: {},
	},
};

export const ButtonTheme: React.FC<ButtonThemeProps> = ({
	animation = "scale",
	color = "neutral",
	size = "medium",
	...rest
}) => {
	const { setTheme, theme, lightTheme, darkTheme } = useTheme();
	const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
	const key = theme;
	const isDark = theme === "dark" || theme === "slate";
	const Icon = isDark ? MoonIcon : SunIcon;
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	// Detectar dirección del cambio de tema para slide
	const prevTheme = React.useRef(theme);
	const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr");
	React.useEffect(() => {
		if (theme !== prevTheme.current) {
			if (prevTheme.current === "light" && theme === "dark") {
				setDirection("rtl"); // Sun sale a la izquierda, Moon entra de la derecha
			} else if (prevTheme.current === "dark" && theme === "light") {
				setDirection("ltr"); // Moon sale a la derecha, Sun entra de la izquierda
			}
			prevTheme.current = theme;
		}
	}, [theme]);

	let variants = iconVariants[animation] || iconVariants.fade;
	if (animation === "slide") {
		if (direction === "rtl") {
			// Sun sale a la izquierda, Moon entra desde la izquierda
			variants = {
				initial: { x: -24, opacity: 0 }, // entra de la izquierda
				animate: { x: 0, opacity: 1 },
				exit: { x: -24, opacity: 0 }, // sale a la izquierda
				transition: { type: "spring", stiffness: 250, damping: 24 },
			};
		} else {
			// Moon sale a la derecha, Sun entra desde la derecha
			variants = {
				initial: { x: 24, opacity: 0 }, // entra de la derecha
				animate: { x: 0, opacity: 1 },
				exit: { x: 24, opacity: 0 }, // sale a la derecha
				transition: { type: "spring", stiffness: 250, damping: 24 },
			};
		}
	}

	const toggleTheme = () => {
		if (lightThemes.includes(theme ?? "")) {
			setTheme(darkTheme); // o "slate"
		} else {
			setTheme(lightTheme); // o "retro"
		}
	};

	return (
		<Button
			variant="soft"
			color={color}
			size={size}
			onClick={toggleTheme}
			aria-label={label}
			suppressHydrationWarning
			icon={
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						className={buttonThemeIconVariants({ size })}
						key={key}
						initial={variants.initial}
						animate={variants.animate}
						exit={variants.exit}
						transition={variants.transition}
					>
						{isMounted && <Icon suppressHydrationWarning />}
					</motion.span>
				</AnimatePresence>
			}
			{...rest}
		/>
	);
};
