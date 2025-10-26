import { cva, VariantProps } from "class-variance-authority";
import styles from "./tooltip.module.css";

export const tooltipContainer = cva(styles["lambda-tooltip-container"], {
	variants: {
		radius: {
			none: styles["lambda-tooltip-container-radius-none"],
			tiny: styles["lambda-tooltip-container-radius-tiny"],
			small: styles["lambda-tooltip-container-radius-small"],
			medium: styles["lambda-tooltip-container-radius-medium"],
			large: styles["lambda-tooltip-container-radius-large"],
			full: styles["lambda-tooltip-container-radius-full"],
		},
		color: {
			neutral: styles["lambda-tooltip-container-neutral"],
			primary: styles["lambda-tooltip-container-primary"],
			secondary: styles["lambda-tooltip-container-secondary"],
			success: styles["lambda-tooltip-container-success"],
			danger: styles["lambda-tooltip-container-danger"],
			warning: styles["lambda-tooltip-container-warning"],
			info: styles["lambda-tooltip-container-info"],
		},
		position: {
			"top-left": styles["lambda-tooltip-container-top-left"],
			"top-center": styles["lambda-tooltip-container-top-center"],
			"top-right": styles["lambda-tooltip-container-top-right"],
			"bottom-left": styles["lambda-tooltip-container-bottom-left"],
			"bottom-center": styles["lambda-tooltip-container-bottom-center"],
			"bottom-right": styles["lambda-tooltip-container-bottom-right"],
			"left-center": styles["lambda-tooltip-container-left-center"],
			"right-center": styles["lambda-tooltip-container-right-center"],
		},
	},
	defaultVariants: {
		radius: "tiny",
		color: "neutral",
		position: "top-center",
	},
});

export const tooltipArrow = cva(styles["lambda-tooltip-arrow"], {
	variants: {
		// La "posición" de la flecha es la opuesta a la posición principal del tooltip
		// Si el tooltip está "top", la flecha está en la "bottom" del tooltip box.
		// Si el tooltip está "bottom", la flecha está en la "top" del tooltip box.
		// La alineación horizontal (left/center/right) también importa.
		arrowPosition: {
			"bottom-left": styles["lambda-tooltip-arrow-bottom-left"],
			"bottom-center": styles["lambda-tooltip-arrow-bottom-center"],
			"bottom-right": styles["lambda-tooltip-arrow-bottom-right"],
			"top-left": styles["lambda-tooltip-arrow-top-left"],
			"top-center": styles["lambda-tooltip-arrow-top-center"],
			"top-right": styles["lambda-tooltip-arrow-top-right"],
			"left-center": styles["lambda-tooltip-arrow-left-center"],
			"right-center": styles["lambda-tooltip-arrow-right-center"],
		},
		color: {
			neutral: styles["lambda-tooltip-arrow-neutral"],
			primary: styles["lambda-tooltip-arrow-primary"],
			secondary: styles["lambda-tooltip-arrow-secondary"],
			success: styles["lambda-tooltip-arrow-success"],
			danger: styles["lambda-tooltip-arrow-danger"],
			warning: styles["lambda-tooltip-arrow-warning"],
			info: styles["lambda-tooltip-arrow-info"],
		},
	},
	defaultVariants: {
		arrowPosition: "bottom-center",
		color: "neutral",
	},
});

export type TooltipContainerVariants = VariantProps<typeof tooltipContainer>;
export type TooltipArrowVariants = VariantProps<typeof tooltipArrow>;
