import { cva, VariantProps } from "class-variance-authority";
import styles from "./badge.module.css";

export const badgeStyles = cva(styles["lambda-badge"], {
	variants: {
		color: {
			primary: styles["lambda-badge-primary"],
			secondary: styles["lambda-badge-secondary"],
			danger: styles["lambda-badge-danger"],
			success: styles["lambda-badge-success"],
			warning: styles["lambda-badge-warning"],
			info: styles["lambda-badge-info"],
		},
		size: {
			tiny: styles["lambda-badge-tiny"],
			small: styles["lambda-badge-small"],
			medium: styles["lambda-badge-medium"],
			large: styles["lambda-badge-large"],
		},
		variant: {
			solid: styles["lambda-badge-solid"],
			flat: styles["lambda-badge-flat"],
			outline: styles["lambda-badge-outline"],
			dashed: styles["lambda-badge-dashed"],
			subtle: styles["lambda-badge-subtle"],
		},
		radius: {
			none: styles["lambda-badge-radius-none"],
			tiny: styles["lambda-badge-radius-tiny"],
			small: styles["lambda-badge-radius-small"],
			medium: styles["lambda-badge-radius-medium"],
			large: styles["lambda-badge-radius-large"],
			full: styles["lambda-badge-radius-full"],
		},
		hasCount: {
			true: styles["lambda-badge-has-count"],
			false: "",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "medium",
		variant: "solid",
		radius: "small",
		hasCount: false,
	},
});

export const countStyles = cva(styles["lambda-badge-count"], {
	variants: {
		size: {
			tiny: styles["lambda-badge-count-tiny"],
			small: styles["lambda-badge-count-small"],
			medium: styles["lambda-badge-count-medium"],
			large: styles["lambda-badge-count-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export const closeButtonStyles = cva(styles["lambda-badge-close-button"], {
	variants: {
		size: {
			tiny: styles["lambda-badge-close-button-tiny"],
			small: styles["lambda-badge-close-button-small"],
			medium: styles["lambda-badge-close-button-medium"],
			large: styles["lambda-badge-close-button-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type BadgeProps = VariantProps<typeof badgeStyles> & VariantProps<typeof countStyles>;
