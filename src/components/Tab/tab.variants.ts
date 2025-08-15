import { cva } from "class-variance-authority";
import styles from "./tab.module.css";

export const tabWrapper = cva(styles["tab-wrapper"], {
	variants: {
		size: {
			tiny: styles["tab-wrapper-tiny"],
			small: styles["tab-wrapper-small"],
			medium: styles["tab-wrapper-medium"],
			large: styles["tab-wrapper-large"],
		},
		variant: {
			underline: styles["tab-wrapper-underline"],
			flat: styles["tab-wrapper-flat"],
			box: styles["tab-wrapper-box"],
			border: styles["tab-wrapper-border"],
		},
		color: {
			primary: styles["tab-wrapper-primary"],
			secondary: styles["tab-wrapper-secondary"],
			success: styles["tab-wrapper-success"],
			danger: styles["tab-wrapper-danger"],
			warning: styles["tab-wrapper-warning"],
			info: styles["tab-wrapper-info"],
		},
		radius: {
			none: styles["tab-wrapper-radius-none"],
			tiny: styles["tab-wrapper-radius-tiny"],
			small: styles["tab-wrapper-radius-small"],
			medium: styles["tab-wrapper-radius-medium"],
			large: styles["tab-wrapper-radius-large"],
			full: styles["tab-wrapper-radius-full"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "underline",
		color: "secondary",
	},
});

export const tabContainer = cva(styles["tab-container"], {
	variants: {
		size: {
			tiny: styles["tab-container-tiny"],
			small: styles["tab-container-small"],
			medium: styles["tab-container-medium"],
			large: styles["tab-container-large"],
		},
		variant: {
			underline: styles["tab-container-underline"],
			flat: styles["tab-container-flat"],
			box: styles["tab-container-box"],
			border: styles["tab-container-border"],
		},
		color: {
			primary: styles["tab-container-primary"],
			secondary: styles["tab-container-secondary"],
			success: styles["tab-container-success"],
			danger: styles["tab-container-danger"],
			warning: styles["tab-container-warning"],
			info: styles["tab-container-info"],
		},
		radius: {
			none: styles["tab-container-radius-none"],
			tiny: styles["tab-container-radius-tiny"],
			small: styles["tab-container-radius-small"],
			medium: styles["tab-container-radius-medium"],
			large: styles["tab-container-radius-large"],
			full: styles["tab-container-radius-full"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "underline",
		radius: "small",
		color: "secondary",
	},
});

export const tabItem = cva(styles["tab-item"], {
	variants: {
		size: {
			tiny: styles["tab-item-tiny"],
			small: styles["tab-item-small"],
			medium: styles["tab-item-medium"],
			large: styles["tab-item-large"],
		},
		variant: {
			underline: styles["tab-item-underline"],
			flat: styles["tab-item-flat"],
			box: styles["tab-item-box"],
			border: styles["tab-item-border"],
		},
		color: {
			primary: styles["tab-item-primary"],
			secondary: styles["tab-item-secondary"],
			success: styles["tab-item-success"],
			danger: styles["tab-item-danger"],
			warning: styles["tab-item-warning"],
			info: styles["tab-item-info"],
		},
		radius: {
			none: styles["tab-item-radius-none"],
			tiny: styles["tab-item-radius-tiny"],
			small: styles["tab-item-radius-small"],
			medium: styles["tab-item-radius-medium"],
			large: styles["tab-item-radius-large"],
			full: styles["tab-item-radius-full"],
		},
		disabled: {
			true: styles["tab-item-disabled"],
			false: styles["tab-item-not-disabled"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "underline",
		disabled: false,
		radius: "small",
		color: "secondary",
	},
});

export const tabInput = cva(styles["tab-input"], {
	variants: {
		size: {
			tiny: styles["tab-input-tiny"],
			small: styles["tab-input-small"],
			medium: styles["tab-input-medium"],
			large: styles["tab-input-large"],
		},
		variant: {
			underline: styles["tab-input-underline"],
			flat: styles["tab-input-flat"],
			box: styles["tab-input-box"],
			border: styles["tab-input-border"],
		},
		disabled: {
			true: styles["tab-input-disabled"],
			false: styles["tab-input-not-disabled"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "underline",
		disabled: false,
	},
});

export const tabLabel = cva(styles["tab-label"], {
	variants: {
		size: {
			tiny: styles["tab-label-tiny"],
			small: styles["tab-label-small"],
			medium: styles["tab-label-medium"],
			large: styles["tab-label-large"],
		},
		variant: {
			underline: styles["tab-label-underline"],
			flat: styles["tab-label-flat"],
			box: styles["tab-label-box"],
			border: styles["tab-label-border"],
		},
		disabled: {
			true: styles["tab-label-disabled"],
			false: styles["tab-label-not-disabled"],
		},
		radius: {
			none: styles["tab-label-radius-none"],
			tiny: styles["tab-label-radius-tiny"],
			small: styles["tab-label-radius-small"],
			medium: styles["tab-label-radius-medium"],
			large: styles["tab-label-radius-large"],
			full: styles["tab-label-radius-full"],
		},
		color: {
			primary: styles["tab-label-primary"],
			secondary: styles["tab-label-secondary"],
			success: styles["tab-label-success"],
			danger: styles["tab-label-danger"],
			warning: styles["tab-label-warning"],
			info: styles["tab-label-info"],
		},
		selected: {
			true: styles["tab-label-selected"],
			false: styles["tab-label-not-selected"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "underline",
		radius: "small",
		disabled: false,
		color: "secondary",
		selected: false,
	},
});

export const tabCurrent = cva(styles["tab-current"], {
	variants: {
		variant: {
			underline: styles["tab-current-underline"],
			flat: styles["tab-current-flat"],
			box: styles["tab-current-box"],
			border: styles["tab-current-border"],
		},
		radius: {
			none: styles["tab-current-radius-none"],
			tiny: styles["tab-current-radius-tiny"],
			small: styles["tab-current-radius-small"],
			medium: styles["tab-current-radius-medium"],
			large: styles["tab-current-radius-large"],
			full: styles["tab-current-radius-full"],
		},
		color: {
			primary: styles["tab-current-primary"],
			secondary: styles["tab-current-secondary"],
			success: styles["tab-current-success"],
			danger: styles["tab-current-danger"],
			warning: styles["tab-current-warning"],
			info: styles["tab-current-info"],
		},
	},
	defaultVariants: {
		variant: "underline",
		radius: "small",
		color: "secondary",
	},
});

export const tabContent = cva(styles["tab-content"], {
	variants: {
		size: {
			tiny: styles["tab-content-tiny"],
			small: styles["tab-content-small"],
			medium: styles["tab-content-medium"],
			large: styles["tab-content-large"],
		},
		variant: {
			underline: styles["tab-content-underline"],
			flat: styles["tab-content-flat"],
			box: styles["tab-content-box"],
			border: styles["tab-content-border"],
		},
		disabled: {
			true: styles["tab-content-disabled"],
			false: styles["tab-content-not-disabled"],
		},
		color: {
			primary: styles["tab-content-primary"],
			secondary: styles["tab-content-secondary"],
			success: styles["tab-content-success"],
			danger: styles["tab-content-danger"],
			warning: styles["tab-content-warning"],
			info: styles["tab-content-info"],
		},
		radius: {
			none: styles["tab-content-radius-none"],
			tiny: styles["tab-content-radius-tiny"],
			small: styles["tab-content-radius-small"],
			medium: styles["tab-content-radius-medium"],
			large: styles["tab-content-radius-large"],
			full: styles["tab-content-radius-full"],
		},
		selected: {
			true: styles["tab-content-selected"],
			false: styles["tab-content-not-selected"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "underline",
		disabled: false,
		color: "secondary",
		radius: "small",
		selected: false,
	},
});
