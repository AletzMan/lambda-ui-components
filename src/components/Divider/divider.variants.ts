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
			primary: styles["lambda-divider-primary"],
			secondary: styles["lambda-divider-secondary"],
			danger: styles["lambda-divider-danger"],
			success: styles["lambda-divider-success"],
			warning: styles["lambda-divider-warning"],
			info: styles["lambda-divider-info"],
		},
		size: {
			xs: styles["lambda-divider-xs"],
			sm: styles["lambda-divider-sm"],
			md: styles["lambda-divider-md"],
			lg: styles["lambda-divider-lg"],
		},
		type: {
			full: styles["lambda-divider-full"],
			inset: styles["lambda-divider-inset"],
			between: styles["lambda-divider-between"],
		},
	},
	defaultVariants: {
		variant: "solid",
		orientation: "horizontal",
		color: "primary",
		type: "full",
		size: "xs",
	},
});

export type DividerVariants = VariantProps<typeof dividerVariants>;
