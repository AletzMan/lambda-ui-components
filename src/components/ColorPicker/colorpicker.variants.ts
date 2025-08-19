import { cva } from "class-variance-authority";
import styles from "./colorpicker.module.css";

export const colorpickerVariants = cva(styles["lambda-colorpicker"], {
	variants: {
		size: {
			tiny: styles["lambda-colorpicker-tiny"],
			small: styles["lambda-colorpicker-small"],
			medium: styles["lambda-colorpicker-medium"],
			large: styles["lambda-colorpicker-large"],
		},
		variant: {
			solid: styles["lambda-colorpicker-solid"],
			flat: styles["lambda-colorpicker-flat"],
			outline: styles["lambda-colorpicker-outline"],
		},
		disabled: {
			true: styles["lambda-colorpicker-disabled"],
			false: "",
		},
		showText: {
			true: styles["lambda-colorpicker-show-text"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
		disabled: false,
		showText: false,
	},
});

export const colorpickerTextVariants = cva(styles["lambda-colorpicker-text"], {
	variants: {
		size: {
			tiny: styles["lambda-colorpicker-text-tiny"],
			small: styles["lambda-colorpicker-text-small"],
			medium: styles["lambda-colorpicker-text-medium"],
			large: styles["lambda-colorpicker-text-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});
