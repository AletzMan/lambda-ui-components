import { cva, VariantProps } from "class-variance-authority";
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
			soft: styles["lambda-colorpicker-soft"],
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

export const colorpickerGroupVariants = cva(styles["lambda-colorpicker-group"], {
	variants: {
		size: {
			tiny: styles["lambda-colorpicker-group-tiny"],
			small: styles["lambda-colorpicker-group-small"],
			medium: styles["lambda-colorpicker-group-medium"],
			large: styles["lambda-colorpicker-group-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export const colorpickerBoxVariants = cva(styles["lambda-colorpicker-box"], {
	variants: {
		position: {
			below: styles["lambda-colorpicker-box-position-below"],
			above: styles["lambda-colorpicker-box-position-above"],
		},
	},
	defaultVariants: {
		position: "below",
	},
});

export type ColorPickerVariants = VariantProps<typeof colorpickerVariants>;
export type ColorPickerTextVariants = VariantProps<typeof colorpickerTextVariants>;
export type ColorPickerGroupVariants = VariantProps<typeof colorpickerGroupVariants>;
