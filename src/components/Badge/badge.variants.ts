import { cva, VariantProps } from "class-variance-authority";
import styles from "./badge.module.css";

export const badgeStyles = cva(styles["lambda-badge"], {
	variants: {
		size: {
			tiny: styles["lambda-badge-tiny"],
			small: styles["lambda-badge-small"],
			medium: styles["lambda-badge-medium"],
			large: styles["lambda-badge-large"],
		},
		radius: {
			none: styles["lambda-badge-radius-none"],
			tiny: styles["lambda-badge-radius-tiny"],
			small: styles["lambda-badge-radius-small"],
			medium: styles["lambda-badge-radius-medium"],
			large: styles["lambda-badge-radius-large"],
			full: styles["lambda-badge-radius-full"],
		},
		color: {
			default: styles["lambda-badge-color-default"],
			primary: styles["lambda-badge-color-primary"],
			secondary: styles["lambda-badge-color-secondary"],
			success: styles["lambda-badge-color-success"],
			danger: styles["lambda-badge-color-danger"],
			warning: styles["lambda-badge-color-warning"],
			info: styles["lambda-badge-color-info"],
		},
		hasCount: {
			true: styles["lambda-badge-has-count"],
			false: "",
		},
		hasText: {
			true: styles["lambda-badge-has-text"],
			false: "",
		},
	},
	defaultVariants: {
		size: "small",
		radius: "small",
		hasCount: false,
		hasText: false,
	},
});

export type BadgeVariants = VariantProps<typeof badgeStyles>;
