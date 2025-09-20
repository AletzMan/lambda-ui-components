import { cva, VariantProps } from "class-variance-authority";
import styles from "./switch.module.css";

export const switchprop = cva(styles["lambda-switch"], {
	variants: {
		color: {
			neutral: styles["lambda-switch-neutral"],
			primary: styles["lambda-switch-primary"],
			secondary: styles["lambda-switch-secondary"],
			danger: styles["lambda-switch-danger"],
			success: styles["lambda-switch-success"],
			warning: styles["lambda-switch-warning"],
			info: styles["lambda-switch-info"],
		},
		size: {
			tiny: styles["lambda-switch-tiny"],
			small: styles["lambda-switch-small"],
			medium: styles["lambda-switch-medium"],
			large: styles["lambda-switch-large"],
		},
		variant: {
			solid: styles["lambda-switch-solid"],
			soft: styles["lambda-switch-soft"],
			outline: styles["lambda-switch-outline"],
		},
		shape: {
			square: styles["lambda-switch-square"],
			subtle: styles["lambda-switch-subtle"],
			rounded: styles["lambda-switch-rounded"],
		},
		disabled: {
			true: styles["lambda-switch-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-switch-checked"],
			false: "",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "medium",
		variant: "solid",
		shape: "rounded",
		disabled: false,
		checked: false,
	},
});

export const background = cva(styles["lambda-switch-background"], {
	variants: {
		color: {
			neutral: styles["lambda-switch-background-neutral"],
			primary: styles["lambda-switch-background-primary"],
			secondary: styles["lambda-switch-background-secondary"],
			danger: styles["lambda-switch-background-danger"],
			success: styles["lambda-switch-background-success"],
			warning: styles["lambda-switch-background-warning"],
			info: styles["lambda-switch-background-info"],
		},
		size: {
			tiny: styles["lambda-switch-background-tiny"],
			small: styles["lambda-switch-background-small"],
			medium: styles["lambda-switch-background-medium"],
			large: styles["lambda-switch-background-large"],
		},
		variant: {
			solid: styles["lambda-switch-background-solid"],
			soft: styles["lambda-switch-background-soft"],
			outline: styles["lambda-switch-background-outline"],
		},
		shape: {
			square: styles["lambda-switch-background-square"],
			subtle: styles["lambda-switch-background-subtle"],
			rounded: styles["lambda-switch-background-rounded"],
		},
		disabled: {
			true: styles["lambda-switch-background-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-switch-background-checked"],
			false: "",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "medium",
		variant: "solid",
		shape: "rounded",
		disabled: false,
		checked: false,
	},
});

export const pos_label = cva(styles["lambda-switch-wrapper"], {
	variants: {
		position_label: {
			left: styles["lambda-switch-wrapper-position-left"],
			right: styles["lambda-switch-wrapper-position-right"],
			top: styles["lambda-switch-wrapper-position-top"],
			bottom: styles["lambda-switch-wrapper-position-bottom"],
		},
		disabled: {
			true: styles["lambda-switch-wrapper-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-switch-wrapper-checked"],
			false: "",
		},
	},
	defaultVariants: {
		position_label: "right",
		disabled: false,
		checked: false,
	},
});

export const handle = cva(styles["lambda-switch-handle"], {
	variants: {
		size: {
			tiny: styles["lambda-switch-handle-tiny"],
			small: styles["lambda-switch-handle-small"],
			medium: styles["lambda-switch-handle-medium"],
			large: styles["lambda-switch-handle-large"],
		},
		shape: {
			square: styles["lambda-switch-handle-square"],
			subtle: styles["lambda-switch-handle-subtle"],
			rounded: styles["lambda-switch-handle-rounded"],
		},
		disabled: {
			true: styles["lambda-switch-handle-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-switch-handle-checked"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		shape: "rounded",
		disabled: false,
		checked: false,
	},
});

export const text = cva(styles["lambda-switch-text"], {
	variants: {
		size: {
			tiny: styles["lambda-switch-text-tiny"],
			small: styles["lambda-switch-text-small"],
			medium: styles["lambda-switch-text-medium"],
			large: styles["lambda-switch-text-large"],
		},
		disabled: {
			true: styles["lambda-switch-text-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
	},
});

export type SwitchVariants = VariantProps<typeof switchprop>;
export type SwitchLabelVariants = VariantProps<typeof pos_label>;
