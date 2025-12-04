import { VariantProps, cva } from "class-variance-authority";
import styles from "./select.module.css";

export const selectWrapper = cva(styles["select-wrapper"], {
	variants: {
		variant: {
			outline: styles["select-wrapper-outline"],
			soft: styles["select-wrapper-soft"],
			underline: styles["select-wrapper-underline"],
		},
		color: {
			primary: styles["select-wrapper-primary"],
			neutral: styles["select-wrapper-neutral"],
			secondary: styles["select-wrapper-secondary"],
			info: styles["select-wrapper-info"],
			warning: styles["select-wrapper-warning"],
			danger: styles["select-wrapper-danger"],
			success: styles["select-wrapper-success"],
		},
		disabled: {
			true: styles["select-wrapper-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		disabled: false,
		color: "primary",
	},
});

export const selectContainerVariants = cva(styles["select-container"], {
	variants: {
		size: {
			tiny: styles["select-container-tiny"],
			small: styles["select-container-small"],
			medium: styles["select-container-medium"],
			large: styles["select-container-large"],
		},
		variant: {
			outline: styles["select-container-outline"],
			soft: styles["select-container-soft"],
			underline: styles["select-container-underline"],
		},
		color: {
			primary: styles["select-container-primary"],
			neutral: styles["select-container-neutral"],
			secondary: styles["select-container-secondary"],
			info: styles["select-container-info"],
			warning: styles["select-container-warning"],
			danger: styles["select-container-danger"],
			success: styles["select-container-success"],
		},
		radius: {
			default: styles["select-container-radius-default"],
			none: styles["select-container-radius-none"],
			tiny: styles["select-container-radius-tiny"],
			small: styles["select-container-radius-small"],
			medium: styles["select-container-radius-medium"],
			large: styles["select-container-radius-large"],
			full: styles["select-container-radius-full"],
		},
		disabled: {
			true: styles["select-container-disabled"],
			false: styles["select-container-enabled"],
		},
		invalid: {
			true: styles["select-container-invalid"],
			false: "",
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "default",
		disabled: false,
		invalid: false,
		color: "primary",
	},
});
export const selectBtnVariants = cva(styles["select-btn"], {
	variants: {
		size: {
			tiny: styles["select-btn-tiny"],
			small: styles["select-btn-small"],
			medium: styles["select-btn-medium"],
			large: styles["select-btn-large"],
		},
		variant: {
			outline: styles["select-btn-outline"],
			soft: styles["select-btn-soft"],
			underline: styles["select-btn-underline"],
		},
		color: {
			primary: styles["select-btn-primary"],
			neutral: styles["select-btn-neutral"],
			secondary: styles["select-btn-secondary"],
			info: styles["select-btn-info"],
			warning: styles["select-btn-warning"],
			danger: styles["select-btn-danger"],
			success: styles["select-btn-success"],
		},
		radius: {
			default: styles["select-btn-radius-default"],
			none: styles["select-btn-radius-none"],
			tiny: styles["select-btn-radius-tiny"],
			small: styles["select-btn-radius-small"],
			medium: styles["select-btn-radius-medium"],
			large: styles["select-btn-radius-large"],
			full: styles["select-btn-radius-full"],
		},
		disabled: {
			true: styles["select-btn-disabled"],
			false: styles["select-btn-enabled"],
		},
		invalid: {
			true: styles["select-btn-invalid"],
			false: "",
		},
		joinposition: {
			first: styles["select-btn-first"],
			last: styles["select-btn-last"],
			middle: styles["select-btn-middle"],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "default",
		disabled: false,
		invalid: false,
		color: "primary",
	},
});

export const selectIconVariants = cva(styles["select-icon"], {
	variants: {
		variant: {
			outline: styles["select-icon-outline"],
			soft: styles["select-icon-soft"],
			underline: styles["select-icon-underline"],
		},
		color: {
			primary: styles["select-icon-primary"],
			neutral: styles["select-icon-neutral"],
			secondary: styles["select-icon-secondary"],
			info: styles["select-icon-info"],
			warning: styles["select-icon-warning"],
			danger: styles["select-icon-danger"],
			success: styles["select-icon-success"],
		},
		size: {
			tiny: styles["select-icon-tiny"],
			small: styles["select-icon-small"],
			medium: styles["select-icon-medium"],
			large: styles["select-icon-large"],
		},
		disabled: {
			true: styles["select-icon-disabled"],
			false: styles["select-icon-enabled"],
		},
		invalid: {
			true: styles["select-icon-invalid"],
			false: "",
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		disabled: false,
		invalid: false,
		color: "primary",
	},
});

export const selectDropdownVariants = cva(styles["select-dropdown"], {
	variants: {
		size: {
			tiny: styles["select-dropdown-tiny"],
			small: styles["select-dropdown-small"],
			medium: styles["select-dropdown-medium"],
			large: styles["select-dropdown-large"],
		},
		direction: {
			above: styles["select-dropdown-above"],
			below: styles["select-dropdown-below"],
		},
		variant: {
			outline: styles["select-dropdown-outline"],
			soft: styles["select-dropdown-soft"],
			underline: styles["select-dropdown-underline"],
		},
		color: {
			primary: styles["select-dropdown-primary"],
			neutral: styles["select-dropdown-neutral"],
			secondary: styles["select-dropdown-secondary"],
			info: styles["select-dropdown-info"],
			warning: styles["select-dropdown-warning"],
			danger: styles["select-dropdown-danger"],
			success: styles["select-dropdown-success"],
		},
		radius: {
			default: styles["select-dropdown-radius-default"],
			none: styles["select-dropdown-radius-none"],
			tiny: styles["select-dropdown-radius-tiny"],
			small: styles["select-dropdown-radius-small"],
			medium: styles["select-dropdown-radius-medium"],
			large: styles["select-dropdown-radius-large"],
			full: styles["select-dropdown-radius-full"],
		},
		isOpen: {
			true: styles["select-dropdown-opn"],
			false: styles["select-dropdown-cls"],
		},
	},
	defaultVariants: {
		direction: "below",
		isOpen: false,
		radius: "default",
		size: "medium",
		variant: "outline",
		color: "primary",
	},
});

export const labelSelectVariants = cva(styles["select-label"], {
	variants: {
		size: {
			tiny: styles["select-label-tiny"],
			small: styles["select-label-small"],
			medium: styles["select-label-medium"],
			large: styles["select-label-large"],
		},
		direction: {
			above: styles["select-label-above"],
			below: styles["select-label-below"],
		},
		radius: {
			default: styles["select-label-radius-default"],
			none: styles["select-label-radius-none"],
			tiny: styles["select-label-radius-tiny"],
			small: styles["select-label-radius-small"],
			medium: styles["select-label-radius-medium"],
			large: styles["select-label-radius-large"],
			full: styles["select-label-radius-full"],
		},
		required: {
			true: styles["select-label-required"],
		},
	},
	defaultVariants: {
		direction: "below",
		radius: "default",
		size: "medium",
		required: false,
	},
});

export const selectedViewVariants = cva(styles["select-view"], {
	variants: {
		size: {
			tiny: styles["select-view-tiny"],
			small: styles["select-view-small"],
			medium: styles["select-view-medium"],
			large: styles["select-view-large"],
		},
		variant: {
			outline: styles["select-view-outline"],
			soft: styles["select-view-soft"],
			underline: styles["select-view-underline"],
		},
		disabled: {
			true: styles["select-view-disabled"],
			false: styles["select-view-enabled"],
		},
		selected: {
			true: styles["select-view-selected"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		selected: false,
	},
});
export const textContentVariants = cva(styles["select-option-text-content"], {
	variants: {
		size: {
			tiny: styles["select-option-text-content-tiny"],
			small: styles["select-option-text-content-small"],
			medium: styles["select-option-text-content-medium"],
			large: styles["select-option-text-content-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export const selectOptionVariants = cva(styles["select-option"], {
	variants: {
		size: {
			tiny: styles["select-option-tiny"],
			small: styles["select-option-small"],
			medium: styles["select-option-medium"],
			large: styles["select-option-large"],
		},
		selected: {
			true: styles["select-option-selected"],
			false: "",
		},
		active: {
			true: styles["select-option-active"],
			false: "",
		},
		color: {
			primary: styles["select-option-primary"],
			neutral: styles["select-option-neutral"],
			secondary: styles["select-option-secondary"],
			info: styles["select-option-info"],
			warning: styles["select-option-warning"],
			danger: styles["select-option-danger"],
			success: styles["select-option-success"],
		},
	},
	defaultVariants: {
		size: "medium",
		selected: false,
		active: false,
		color: "primary",
	},
});

export type SelectVariants = VariantProps<typeof selectContainerVariants>;
