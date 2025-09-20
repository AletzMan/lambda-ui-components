import { VariantProps, cva } from "class-variance-authority";
import styles from "./select.module.css";

export const select = cva(styles["select-container"], {
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
		radius: {
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
		radius: "small",
		disabled: false,
		invalid: false,
	},
});
export const buttonSelect = cva(styles["select-btn"], {
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
		radius: {
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
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "small",
		disabled: false,
		invalid: false,
	},
});

export const selectIcon = cva(styles["select-icon"], {
	variants: {
		variant: {
			outline: styles["select-icon-outline"],
			soft: styles["select-icon-soft"],
			underline: styles["select-icon-underline"],
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
	},
});

export const dropdown = cva(styles["select-dropdown"], {
	variants: {
		size: {
			tiny: styles["select-dropdown-tiny"],
			small: styles["select-dropdown-small"],
			medium: styles["select-dropdown-medium"],
			large: styles["select-dropdown-large"],
		},
		direction: {
			up: styles["select-dropdown-up"],
			down: styles["select-dropdown-down"],
		},
		variant: {
			outline: styles["select-dropdown-outline"],
			soft: styles["select-dropdown-soft"],
			underline: styles["select-dropdown-underline"],
		},
		radius: {
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
		direction: "down",
		isOpen: false,
		radius: "small",
		size: "medium",
		variant: "outline",
	},
});

export const labelSelect = cva(styles["select-label"], {
	variants: {
		size: {
			tiny: styles["select-label-tiny"],
			small: styles["select-label-small"],
			medium: styles["select-label-medium"],
			large: styles["select-label-large"],
		},
		direction: {
			up: styles["select-label-up"],
			down: styles["select-label-down"],
		},
		radius: {
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
		direction: "down",
		radius: "small",
		size: "medium",
		required: false,
	},
});

export const selectedView = cva(styles["select-view"], {
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
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
	},
});
export const textContent = cva(styles["select-option-text-content"], {
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

export type SelectVariants = VariantProps<typeof select>;
