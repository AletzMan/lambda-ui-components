import { cva } from "class-variance-authority";
import styles from "./Alert.module.css";

export const alertVariants = cva(styles["lambda-alert"], {
	variants: {
		variant: {
			outline: styles["lambda-alert-outline"],
			soft: styles["lambda-alert-soft"],
			solid: styles["lambda-alert-solid"],
		},
		color: {
			default: styles["lambda-alert-default"],
			primary: styles["lambda-alert-primary"],
			danger: styles["lambda-alert-danger"],
			success: styles["lambda-alert-success"],
			warning: styles["lambda-alert-warning"],
			info: styles["lambda-alert-info"],
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
		color: "default",
		variant: "soft",
	},
});
