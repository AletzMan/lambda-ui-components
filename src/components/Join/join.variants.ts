import styles from "./join.module.css";
import { cva, VariantProps } from "class-variance-authority";

export const join = cva(styles["lambda-join"], {
	variants: {
		size: {
			tiny: styles["lambda-join-tiny"],
			small: styles["lambda-join-small"],
			medium: styles["lambda-join-medium"],
			large: styles["lambda-join-large"],
		},
		radius: {
			default: styles["lambda-join-radius-default"],
			none: styles["lambda-join-radius-none"],
			tiny: styles["lambda-join-radius-tiny"],
			small: styles["lambda-join-radius-small"],
			medium: styles["lambda-join-radius-medium"],
			large: styles["lambda-join-radius-large"],
			full: styles["lambda-join-radius-full"],
		},
		hasElements: {
			none: styles["lambda-join-elements-none"],
			first: styles["lambda-join-elements-first"],
			last: styles["lambda-join-elements-last"],
			both: styles["lambda-join-elements-both"],
		},
		invalid: {
			true: styles["lambda-join-invalid"],
			false: "",
		},
		disabled: {
			false: styles["lambda-join-enabled"],
			true: styles["lambda-join-disabled"],
		},
	},
	defaultVariants: {
		size: "medium",
		radius: "default",
		invalid: false,
		disabled: false,
		hasElements: "none",
	},
});

export const joinWrapper = cva(styles["lambda-join-wrapper"], {
	variants: {
		size: {
			tiny: styles["lambda-join-wrapper-outline"],
			small: styles["lambda-join-wrapper-soft"],
			medium: styles["lambda-join-wrapper-underline"],
			large: styles["lambda-join-wrapper-underline"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type JoinVariants = VariantProps<typeof join>;
