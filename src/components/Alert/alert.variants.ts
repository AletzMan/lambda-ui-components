import { cva, VariantProps } from "class-variance-authority";
import styles from "./Alert.module.css";

export const alertVariants = cva(styles["lambda-alert"], {
	variants: {
		variant: {
			outline: styles["lambda-alert-outline"],
			soft: styles["lambda-alert-soft"],
			solid: styles["lambda-alert-solid"],
		},
		color: {
			neutral: styles["lambda-alert-neutral"],
			primary: styles["lambda-alert-primary"],
			secondary: styles["lambda-alert-secondary"],
			danger: styles["lambda-alert-danger"],
			success: styles["lambda-alert-success"],
			warning: styles["lambda-alert-warning"],
			info: styles["lambda-alert-info"],
		},
		radius: {
			none: styles["lambda-alert-radius-none"],
			tiny: styles["lambda-alert-radius-tiny"],
			small: styles["lambda-alert-radius-small"],
			medium: styles["lambda-alert-radius-medium"],
			large: styles["lambda-alert-radius-large"],
		},
		size: {
			tiny: styles["lambda-alert-tiny"],
			small: styles["lambda-alert-small"],
			medium: styles["lambda-alert-medium"],
			large: styles["lambda-alert-large"],
		},
	},
	defaultVariants: {
		size: "medium",
		color: "neutral",
		variant: "soft",
	},
});

export type AlertVariants = VariantProps<typeof alertVariants>;
