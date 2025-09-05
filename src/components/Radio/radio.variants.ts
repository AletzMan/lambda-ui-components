import { VariantProps, cva } from "class-variance-authority";
import styles from "./radio.module.css";
export const RadioGroups = cva(styles["lambda-radio-group"], {
	variants: {
		orientation: {
			vertical: styles["lambda-radio-group-vertical"],
			horizontal: styles["lambda-radio-group-horizontal"],
		},
		size: {
			tiny: styles["lambda-radio-group-tiny"],
			small: styles["lambda-radio-group-small"],
			medium: styles["lambda-radio-group-medium"],
			large: styles["lambda-radio-group-large"],
		},
		color: {
			primary: styles["lambda-radio-group-primary"],
			secondary: styles["lambda-radio-group-secondary"],
			danger: styles["lambda-radio-group-danger"],
			success: styles["lambda-radio-group-success"],
			warning: styles["lambda-radio-group-warning"],
			info: styles["lambda-radio-group-info"],
		},
		type: {
			radio: styles["lambda-radio-group-radio"],
			button: styles["lambda-radio-group-button"],
			card: styles["lambda-radio-group-card"],
		},
		variant: {
			solid: styles["lambda-radio-group-solid"],
			flat: styles["lambda-radio-group-flat"],
			outline: styles["lambda-radio-group-outline"],
		},
		radius: {
			none: styles["lambda-radio-group-radius-none"],
			small: styles["lambda-radio-group-radius-small"],
			medium: styles["lambda-radio-group-radius-medium"],
			pill: styles["lambda-radio-group-radius-pill"],
		},
	},
	compoundVariants: [],
	defaultVariants: {
		orientation: "vertical",
		radius: "small",
		size: "medium",
		type: "radio",
		variant: "solid",
		color: "primary",
	},
});

export type RadioGroupVariants = VariantProps<typeof RadioGroups>;

export const radioprop = cva(styles["lambda-radio"], {
	variants: {
		color: {
			primary: styles["lambda-radio-primary"],
			secondary: styles["lambda-radio-secondary"],
			danger: styles["lambda-radio-danger"],
			success: styles["lambda-radio-success"],
			warning: styles["lambda-radio-warning"],
			info: styles["lambda-radio-info"],
		},
		size: {
			tiny: styles["lambda-radio-tiny"],
			small: styles["lambda-radio-small"],
			medium: styles["lambda-radio-medium"],
			large: styles["lambda-radio-large"],
		},
		variant: {
			solid: styles["lambda-radio-solid"],
			flat: styles["lambda-radio-flat"],
			outline: styles["lambda-radio-outline"],
		},
		type: {
			radio: styles["lambda-radio-radio"],
			button: styles["lambda-radio-button"],
			card: styles["lambda-radio-card"],
		},
		disabled: {
			true: styles["lambda-radio-disabled"],
			false: "",
		},
	},
	compoundVariants: [],
	defaultVariants: {
		size: "medium",
		variant: "solid",
		color: "primary",
		disabled: false,
		type: "radio",
	},
});

export const view = cva(styles["lambda-radio-view"], {
	variants: {
		color: {
			primary: styles["lambda-radio-view-primary"],
			secondary: styles["lambda-radio-view-secondary"],
			danger: styles["lambda-radio-view-danger"],
			success: styles["lambda-radio-view-success"],
			warning: styles["lambda-radio-view-warning"],
			info: styles["lambda-radio-view-info"],
		},
		size: {
			tiny: styles["lambda-radio-view-tiny"],
			small: styles["lambda-radio-view-small"],
			medium: styles["lambda-radio-view-medium"],
			large: styles["lambda-radio-view-large"],
		},
		variant: {
			solid: styles["lambda-radio-view-solid"],
			flat: styles["lambda-radio-view-flat"],
			outline: styles["lambda-radio-view-outline"],
		},
		type: {
			radio: styles["lambda-radio-view-radio"],
			button: styles["lambda-radio-view-button"],
			card: styles["lambda-radio-view-card"],
		},
		checked: {
			true: styles["lambda-radio-view-checked"],
			false: "",
		},
		disabled: {
			true: styles["lambda-radio-view-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
		color: "primary",
		checked: false,
		type: "radio",
		disabled: false,
	},
});

export const wrapper = cva(styles["lambda-radio-wrapper"], {
	variants: {
		orientation: {
			horizontal: styles["lambda-radio-wrapper-horizontal"],
			vertical: styles["lambda-radio-wrapper-vertical"],
		},
		positionLabel: {
			left: styles["lambda-radio-wrapper-left"],
			right: styles["lambda-radio-wrapper-right"],
			top: styles["lambda-radio-wrapper-top"],
			bottom: styles["lambda-radio-wrapper-bottom"],
		},
		color: {
			primary: styles["lambda-radio-wrapper-primary"],
			secondary: styles["lambda-radio-wrapper-secondary"],
			danger: styles["lambda-radio-wrapper-danger"],
			success: styles["lambda-radio-wrapper-success"],
			warning: styles["lambda-radio-wrapper-warning"],
			info: styles["lambda-radio-wrapper-info"],
		},
		size: {
			tiny: styles["lambda-radio-wrapper-tiny"],
			small: styles["lambda-radio-wrapper-small"],
			medium: styles["lambda-radio-wrapper-medium"],
			large: styles["lambda-radio-wrapper-large"],
		},
		variant: {
			solid: styles["lambda-radio-wrapper-solid"],
			flat: styles["lambda-radio-wrapper-flat"],
			outline: styles["lambda-radio-wrapper-outline"],
		},
		type: {
			radio: styles["lambda-radio-wrapper-radio"],
			button: styles["lambda-radio-wrapper-button"],
			card: styles["lambda-radio-wrapper-card"],
		},
		radius: {
			none: styles["lambda-radio-wrapper-radius-none"],
			small: styles["lambda-radio-wrapper-radius-small"],
			medium: styles["lambda-radio-wrapper-radius-medium"],
			pill: styles["lambda-radio-wrapper-radius-pill"],
		},
		disabled: {
			true: styles["lambda-radio-wrapper-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-radio-wrapper-checked"],
			false: "",
		},
	},
	defaultVariants: {
		orientation: "horizontal",
		positionLabel: "right",
		color: "primary",
		size: "medium",
		type: "radio",
		variant: "solid",
		radius: "small",
		disabled: false,
		checked: false,
	},
});

export const iconView = cva(styles["lambda-radio-icon"], {
	variants: {
		color: {
			primary: styles["lambda-radio-icon-primary"],
			secondary: styles["lambda-radio-icon-secondary"],
			danger: styles["lambda-radio-icon-danger"],
			success: styles["lambda-radio-icon-success"],
			warning: styles["lambda-radio-icon-warning"],
			info: styles["lambda-radio-icon-info"],
		},
		size: {
			tiny: styles["lambda-radio-icon-tiny"],
			small: styles["lambda-radio-icon-small"],
			medium: styles["lambda-radio-icon-medium"],
			large: styles["lambda-radio-icon-large"],
		},
		type: {
			radio: styles["lambda-radio-icon-radio"],
			button: styles["lambda-radio-icon-button"],
			card: styles["lambda-radio-icon-card"],
		},
		disabled: {
			true: styles["lambda-radio-icon-disabled"],
			false: "",
		},
		checked: {
			true: styles["lambda-radio-icon-checked"],
			false: "",
		},
	},
	defaultVariants: {
		color: "primary",
		disabled: false,
		size: "medium",
		type: "radio",
		checked: false,
	},
});

export const labelName = cva(styles["lambda-radio-label"], {
	variants: {
		type: {
			radio: styles["lambda-radio-label-radio"],
			button: styles["lambda-radio-label-button"],
			card: styles["lambda-radio-label-card"],
		},
		radius: {
			none: styles["lambda-radio-label-radius-none"],
			small: styles["lambda-radio-label-radius-small"],
			medium: styles["lambda-radio-label-radius-medium"],
			pill: styles["lambda-radio-label-radius-pill"],
		},
		size: {
			tiny: styles["lambda-radio-label-tiny"],
			small: styles["lambda-radio-label-small"],
			medium: styles["lambda-radio-label-medium"],
			large: styles["lambda-radio-label-large"],
		},
		orientation: {
			vertical: styles["lambda-radio-label-vertical"],
			horizontal: styles["lambda-radio-label-horizontal"],
		},
		disabled: {
			true: styles["lambda-radio-label-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		disabled: false,
		type: "radio",
		size: "medium",
		orientation: "horizontal",
		radius: "small",
	},
});

export const contentCard = cva(styles["lambda-radio-content-card"], {
	variants: {
		size: {
			tiny: styles["lambda-radio-content-card-tiny"],
			small: styles["lambda-radio-content-card-small"],
			medium: styles["lambda-radio-content-card-medium"],
			large: styles["lambda-radio-content-card-large"],
		},
		variant: {
			solid: styles["lambda-radio-content-card-solid"],
			flat: styles["lambda-radio-content-card-flat"],
			outline: styles["lambda-radio-content-card-outline"],
		},
		color: {
			primary: styles["lambda-radio-content-card-primary"],
			secondary: styles["lambda-radio-content-card-secondary"],
			danger: styles["lambda-radio-content-card-danger"],
			success: styles["lambda-radio-content-card-success"],
			warning: styles["lambda-radio-content-card-warning"],
			info: styles["lambda-radio-content-card-info"],
		},
		checked: {
			true: styles["lambda-radio-content-card-checked"],
			false: "",
		},
		disabled: {
			true: styles["lambda-radio-content-card-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
		color: "primary",
		disabled: false,
		checked: false,
	},
});

export type RadioVariants = VariantProps<typeof wrapper>;
