import { cva, VariantProps } from "class-variance-authority";
import styles from "./progress.module.css";

export const progressVariants = cva(styles["lambda-progress"], {
	variants: {
		color: {
			primary: styles["lambda-progress-primary"],
			secondary: styles["lambda-progress-secondary"],
			neutral: styles["lambda-progress-neutral"],
			success: styles["lambda-progress-success"],
			danger: styles["lambda-progress-danger"],
			warning: styles["lambda-progress-warning"],
			info: styles["lambda-progress-info"],
		},
		size: {
			tiny: styles["lambda-progress-tiny"],
			small: styles["lambda-progress-small"],
			medium: styles["lambda-progress-medium"],
			large: styles["lambda-progress-large"],
		},
		variant: {
			bar: styles["lambda-progress-bar"],
			circle: styles["lambda-progress-circle"],
		},
	},
	defaultVariants: {
		color: "primary",
		size: "small",
	},
});

export const progressBarVariants = cva(styles["lambda-progress-bar"], {
	variants: {
		size: {
			tiny: styles["lambda-progress-tiny"],
			small: styles["lambda-progress-small"],
			medium: styles["lambda-progress-medium"],
			large: styles["lambda-progress-large"],
		},
	},
	defaultVariants: {
		size: "small",
	},
});

export const progressInnerVariants = cva(styles["lambda-progress-bar-inner"], {
	variants: {
		color: {
			primary: styles["lambda-progress-inner-primary"],
			secondary: styles["lambda-progress-inner-secondary"],
			neutral: styles["lambda-progress-inner-neutral"],
			success: styles["lambda-progress-inner-success"],
			danger: styles["lambda-progress-inner-danger"],
			warning: styles["lambda-progress-inner-warning"],
			info: styles["lambda-progress-inner-info"],
		},
	},
	defaultVariants: {
		color: "primary",
	},
});

export const progressValueVariants = cva(styles["lambda-progress-value"], {
	variants: {
		size: {
			tiny: styles["lambda-progress-value-tiny"],
			small: styles["lambda-progress-value-small"],
			medium: styles["lambda-progress-value-medium"],
			large: styles["lambda-progress-value-large"],
		},
	},
	defaultVariants: {
		size: "small",
	},
});

export type ProgressVariants = VariantProps<typeof progressVariants>;
