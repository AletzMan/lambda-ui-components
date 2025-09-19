import styles from "./inputGroup.module.css";
import { cva } from "class-variance-authority";

export const inputGroup = cva(styles["lambda-input-group"], {
	variants: {
		size: {
			tiny: styles["lambda-input-group-tiny"],
			small: styles["lambda-input-group-small"],
			medium: styles["lambda-input-group-medium"],
			large: styles["lambda-input-group-large"],
		},
		variant: {
			outline: styles["lambda-input-group-outline"],
			soft: styles["lambda-input-group-soft"],
			underline: styles["lambda-input-group-underline"],
		},
		radius: {
			none: styles["lambda-input-group-radius-none"],
			tiny: styles["lambda-input-group-radius-tiny"],
			small: styles["lambda-input-group-radius-small"],
			medium: styles["lambda-input-group-radius-medium"],
			large: styles["lambda-input-group-radius-large"],
			full: styles["lambda-input-group-radius-full"],
		},
		hasElements: {
			none: styles["lambda-input-group-elements-none"],
			first: styles["lambda-input-group-elements-first"],
			last: styles["lambda-input-group-elements-last"],
			both: styles["lambda-input-group-elements-both"],
		},
		invalid: {
			true: styles["lambda-input-group-invalid"],
			false: "",
		},
		disabled: {
			false: styles["lambda-input-group-enabled"],
			true: styles["lambda-input-group-disabled"],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "tiny",
		invalid: false,
		disabled: false,
	},
});

export const inputGroupWrapper = cva(styles["lambda-input-group-wrapper"], {
	variants: {
		variant: {
			outline: styles["lambda-input-group-wrapper-outline"],
			soft: styles["lambda-input-group-wrapper-soft"],
			underline: styles["lambda-input-group-wrapper-underline"],
		},
	},
});
