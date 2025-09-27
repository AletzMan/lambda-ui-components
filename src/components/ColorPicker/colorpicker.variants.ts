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
		radius: {
			none: styles["lambda-colorpicker-radius-none"],
			tiny: styles["lambda-colorpicker-radius-tiny"],
			small: styles["lambda-colorpicker-radius-small"],
			medium: styles["lambda-colorpicker-radius-medium"],
			large: styles["lambda-colorpicker-radius-large"],
			full: styles["lambda-colorpicker-radius-full"],
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
		radius: "small",
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
		radius: {
			none: styles["lambda-colorpicker-group-radius-none"],
			tiny: styles["lambda-colorpicker-group-radius-tiny"],
			small: styles["lambda-colorpicker-group-radius-small"],
			medium: styles["lambda-colorpicker-group-radius-medium"],
			large: styles["lambda-colorpicker-group-radius-large"],
			full: styles["lambda-colorpicker-group-radius-full"],
		},
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
		radius: {
			none: styles["lambda-colorpicker-box-radius-none"],
			tiny: styles["lambda-colorpicker-box-radius-tiny"],
			small: styles["lambda-colorpicker-box-radius-small"],
			medium: styles["lambda-colorpicker-box-radius-medium"],
			large: styles["lambda-colorpicker-box-radius-large"],
		},
		position: {
			below: styles["lambda-colorpicker-box-position-below"],
			above: styles["lambda-colorpicker-box-position-above"],
		},
	},
	defaultVariants: {
		radius: "small",
		position: "below",
	},
});

export type ColorPickerVariants = VariantProps<typeof colorpickerVariants>;
export type ColorPickerTextVariants = VariantProps<typeof colorpickerTextVariants>;
export type ColorPickerGroupVariants = VariantProps<typeof colorpickerGroupVariants>;
