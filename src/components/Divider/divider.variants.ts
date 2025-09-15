import { cva, VariantProps } from "class-variance-authority";
import styles from "./divider.module.css";

export const dividerVariants = cva(styles["lambda-divider"], {
	variants: {
		variant: {
			solid: styles["lambda-divider-solid"],
			dashed: styles["lambda-divider-dashed"],
			dotted: styles["lambda-divider-dotted"],
		},
		orientation: {
			horizontal: styles["lambda-divider-horizontal"],
			vertical: styles["lambda-divider-vertical"],
		},
		color: {
			neutral: styles["lambda-divider-neutral"],
			primary: styles["lambda-divider-primary"],
			secondary: styles["lambda-divider-secondary"],
			danger: styles["lambda-divider-danger"],
			success: styles["lambda-divider-success"],
			warning: styles["lambda-divider-warning"],
			info: styles["lambda-divider-info"],
			white: styles["lambda-divider-white"],
			black: styles["lambda-divider-black"],
		},
		contentPosition: {
			center: styles["lambda-divider-center"],
			start: styles["lambda-divider-start"],
			end: styles["lambda-divider-end"],
		},
		size: {
			tiny: styles["lambda-divider-tiny"],
			small: styles["lambda-divider-small"],
			medium: styles["lambda-divider-medium"],
			large: styles["lambda-divider-large"],
		},
		hasContent: {
			true: styles["lambda-divider-has-content"],
			false: styles["lambda-divider-no-content"],
		},
	},
	defaultVariants: {
		variant: "solid",
		orientation: "horizontal",
		color: "primary",
		contentPosition: "center",
		size: "tiny",
	},
});

export type DividerVariants = VariantProps<typeof dividerVariants>;
