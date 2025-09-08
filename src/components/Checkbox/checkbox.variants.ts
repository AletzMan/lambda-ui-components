import { VariantProps, cva } from "class-variance-authority";
import styles from "./checkbox.module.css";

export const checkboxprop = cva(styles["lambda-checkbox-wrapper"], {
	variants: {
		color: {
			primary: styles["lambda-checkbox-wrapper-primary"],
			secondary: styles["lambda-checkbox-wrapper-secondary"],
			danger: styles["lambda-checkbox-wrapper-danger"],
			success: styles["lambda-checkbox-wrapper-success"],
			warning: styles["lambda-checkbox-wrapper-warning"],
			info: styles["lambda-checkbox-wrapper-info"],
		},
		size: {
			tiny: styles["lambda-checkbox-wrapper-tiny"],
			small: styles["lambda-checkbox-wrapper-small"],
			medium: styles["lambda-checkbox-wrapper-medium"],
			large: styles["lambda-checkbox-wrapper-large"],
		},
		variant: {
			solid: styles["lambda-checkbox-wrapper-solid"],
			soft: styles["lambda-checkbox-wrapper-soft"],
			outline: styles["lambda-checkbox-wrapper-outline"],
		},
		radius: {
			none: styles["lambda-checkbox-wrapper-radius-none"],
			small: styles["lambda-checkbox-wrapper-radius-small"],
			medium: styles["lambda-checkbox-wrapper-radius-medium"],
			circle: styles["lambda-checkbox-wrapper-radius-circle"],
		},
		disabled: {
			true: styles["lambda-checkbox-wrapper-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-checkbox-wrapper-checked"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
		radius: "small",
		color: "primary",
		disabled: false,
		checked: false,
	},
});

export const container = cva(styles["lambda-checkbox-container"], {
	variants: {
		positionLabel: {
			left: styles["lambda-checkbox-container-left"],
			right: styles["lambda-checkbox-container-right"],
			top: styles["lambda-checkbox-container-top"],
			bottom: styles["lambda-checkbox-container-bottom"],
		},
		disabled: {
			true: styles["lambda-checkbox-container-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		positionLabel: "right",
		disabled: false,
	},
});

export const textLabel = cva(styles["lambda-checkbox-label"], {
	variants: {
		size: {
			tiny: styles["lambda-checkbox-label-tiny"],
			small: styles["lambda-checkbox-label-small"],
			medium: styles["lambda-checkbox-label-medium"],
			large: styles["lambda-checkbox-label-large"],
		},
		disabled: {
			true: styles["lambda-checkbox-label-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
	},
});

export const icon = cva(styles["lambda-checkbox-icon"], {
	variants: {
		size: {
			tiny: styles["lambda-checkbox-icon-tyny"],
			small: styles["lambda-checkbox-icon-small"],
			medium: styles["lambda-checkbox-icon-medium"],
			large: styles["lambda-checkbox-icon-large"],
		},
		disabled: {
			true: styles["lambda-checkbox-icon-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-checkbox-icon-checked"],
			false: styles["lambda-checkbox-icon-unchecked"],
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		checked: false,
	},
});

export type CheckboxVariants = VariantProps<typeof checkboxprop>;
export type ContainerVariants = VariantProps<typeof container>;
export type IconVariants = VariantProps<typeof icon>;
export type TextLabelVariants = VariantProps<typeof textLabel>;
