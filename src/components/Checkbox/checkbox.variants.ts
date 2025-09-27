import { VariantProps, cva } from "class-variance-authority";
import styles from "./checkbox.module.css";

export const checkboxWrapperVariants = cva(styles["lambda-checkbox-wrapper"], {
	variants: {
		color: {
			neutral: styles["lambda-checkbox-wrapper-neutral"],
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
			tiny: styles["lambda-checkbox-wrapper-radius-tiny"],
			small: styles["lambda-checkbox-wrapper-radius-small"],
			medium: styles["lambda-checkbox-wrapper-radius-medium"],
			large: styles["lambda-checkbox-wrapper-radius-large"],
			full: styles["lambda-checkbox-wrapper-radius-full"],
		},
		disabled: {
			true: styles["lambda-checkbox-wrapper-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-checkbox-wrapper-checked"],
			false: "",
		},
		join: {
			true: styles["lambda-checkbox-wrapper-join"],
			false: "",
		},
		joinposition: {
			first: styles["lambda-checkbox-wrapper-first"],
			last: styles["lambda-checkbox-wrapper-last"],
			middle: styles["lambda-checkbox-wrapper-middle"],
			single: styles["lambda-checkbox-wrapper-single"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
		radius: "tiny",
		color: "primary",
		disabled: false,
		checked: false,
	},
});

export const checkboxContainerVariants = cva(styles["lambda-checkbox-container"], {
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

export const checkboxTextLabelVariants = cva(styles["lambda-checkbox-label"], {
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

export const checkBoxIconVariants = cva(styles["lambda-checkbox-icon"], {
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
		join: {
			true: styles["lambda-checkbox-icon-join"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		checked: false,
		join: false,
	},
});

export type CheckboxVariants = VariantProps<typeof checkboxWrapperVariants>;
export type ContainerVariants = VariantProps<typeof checkboxContainerVariants>;
export type IconVariants = VariantProps<typeof checkBoxIconVariants>;
export type TextLabelVariants = VariantProps<typeof checkboxTextLabelVariants>;
