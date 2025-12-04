import { VariantProps, cva } from "class-variance-authority";
import styles from "./inputnumber.module.css";

export const inputNumber = cva(styles["lambda-number"], {
	variants: {
		size: {
			tiny: styles["lambda-number-tiny"],
			small: styles["lambda-number-small"],
			medium: styles["lambda-number-medium"],
			large: styles["lambda-number-large"],
		},
		color: {
			primary: styles["lambda-number-primary"],
			neutral: styles["lambda-number-neutral"],
			secondary: styles["lambda-number-secondary"],
			info: styles["lambda-number-info"],
			warning: styles["lambda-number-warning"],
			danger: styles["lambda-number-danger"],
			success: styles["lambda-number-success"],
		},
		variant: {
			outline: styles["lambda-number-outline"],
			soft: styles["lambda-number-soft"],
		},
		typeNumber: {
			default: styles["lambda-number-default"],
			"currency-USD": styles["lambda-number-usd"],
			"currency-EUR": styles["lambda-number-eur"],
			"currency-GBP": styles["lambda-number-gbp"],
			percentage: styles["lambda-number-porcentage"],
			decimal: styles["lambda-number-decimal"],
		},
		radius: {
			default: styles["lambda-number-radius-default"],
			none: styles["lambda-number-radius-none"],
			tiny: styles["lambda-number-radius-tiny"],
			small: styles["lambda-number-radius-small"],
			medium: styles["lambda-number-radius-medium"],
			large: styles["lambda-number-radius-large"],
			full: styles["lambda-number-radius-full"],
		},
		invalid: {
			true: styles["lambda-number-invalid"],
			false: "",
		},
		disabled: {
			false: styles["lambda-number-enabled"],
			true: styles["lambda-number-disabled"],
		},
		joinposition: {
			first: styles["lambda-number-first"],
			last: styles["lambda-number-last"],
			middle: styles["lambda-number-middle"],
			single: styles["lambda-number-single"],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "default",
		typeNumber: "default",
		invalid: false,
		disabled: false,
		joinposition: "single",
	},
});
export const wrapper = cva(styles["lambda-number-wrapper"], {
	variants: {
		disabled: {
			false: styles["lambda-number-wrapper-enabled"],
			true: styles["lambda-number-wrapper-disabled"],
		},
		joinposition: {
			first: styles["lambda-number-first"],
			last: styles["lambda-number-last"],
			middle: styles["lambda-number-middle"],
			single: styles["lambda-number-single"],
		},
		hasHelper: {
			true: styles["lambda-number-has-helper"],
			false: "",
		},
	},
	defaultVariants: {
		disabled: false,
		joinposition: "single",
		hasHelper: false,
	},
});

export const labels = cva(styles["lambda-number-label"], {
	variants: {
		size: {
			tiny: styles["lambda-number-label-tiny"],
			small: styles["lambda-number-label-small"],
			medium: styles["lambda-number-label-medium"],
			large: styles["lambda-number-label-large"],
		},
		radius: {
			default: styles["lambda-number-label-radius-default"],
			none: styles["lambda-number-label-radius-none"],
			tiny: styles["lambda-number-label-radius-tiny"],
			small: styles["lambda-number-label-radius-small"],
			medium: styles["lambda-number-label-radius-medium"],
			large: styles["lambda-number-label-radius-large"],
			full: styles["lambda-number-label-radius-full"],
		},
		required: {
			true: styles["lambda-number-label-required"],
		},
	},
	defaultVariants: {
		radius: "default",
		size: "medium",
		required: false,
	},
});

export const number = cva(styles["lambda-number-field"], {
	variants: {
		size: {
			tiny: styles["lambda-number-field-tiny"],
			small: styles["lambda-number-field-small"],
			medium: styles["lambda-number-field-medium"],
			large: styles["lambda-number-field-large"],
		},
		typeNumber: {
			default: styles["lambda-number-field-default"],
			"currency-USD": styles["lambda-number-field-usd"],
			"currency-EUR": styles["lambda-number-field-eur"],
			"currency-GBP": styles["lambda-number-field-gbp"],
			percentage: styles["lambda-number-field-porc"],
			decimal: styles["lambda-number-field-dec"],
		},
		color: {
			primary: styles["lambda-number-field-primary"],
			neutral: styles["lambda-number-field-neutral"],
			secondary: styles["lambda-number-field-secondary"],
			info: styles["lambda-number-field-info"],
			warning: styles["lambda-number-field-warning"],
			danger: styles["lambda-number-field-danger"],
			success: styles["lambda-number-field-success"],
		},
	},
	defaultVariants: {
		size: "medium",
		typeNumber: "default",
		color: "primary",
	},
});

export const handler = cva(styles["lambda-number-handler"], {
	variants: {
		size: {
			tiny: styles["lambda-number-handler-tiny"],
			small: styles["lambda-number-handler-small"],
			medium: styles["lambda-number-handler-medium"],
			large: styles["lambda-number-handler-large"],
		},
		radius: {
			default: styles["lambda-number-handler-radius-default"],
			none: styles["lambda-number-handler-radius-none"],
			tiny: styles["lambda-number-handler-radius-tiny"],
			small: styles["lambda-number-handler-radius-small"],
			medium: styles["lambda-number-handler-radius-medium"],
			large: styles["lambda-number-handler-radius-large"],
			full: styles["lambda-number-handler-radius-full"],
		},
		variant: {
			outline: styles["lambda-number-handler-outline"],
			soft: styles["lambda-number-handler-soft"],
		},
		color: {
			primary: styles["lambda-number-handler-primary"],
			neutral: styles["lambda-number-handler-neutral"],
			secondary: styles["lambda-number-handler-secondary"],
			info: styles["lambda-number-handler-info"],
			warning: styles["lambda-number-handler-warning"],
			danger: styles["lambda-number-handler-danger"],
			success: styles["lambda-number-handler-success"],
		},
		joinposition: {
			first: styles["lambda-number-handler-first"],
			last: styles["lambda-number-handler-last"],
			middle: styles["lambda-number-handler-middle"],
			single: styles["lambda-number-handler-single"],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "default",
		joinposition: "single",
		color: "primary",
	},
});

export const typeCurrency = cva(styles["lambda-number-currency"], {
	variants: {
		size: {
			tiny: styles["lambda-number-currency-tiny"],
			small: styles["lambda-number-currency-small"],
			medium: styles["lambda-number-currency-medium"],
			large: styles["lambda-number-currency-large"],
		},
		radius: {
			default: styles["lambda-number-currency-radius-default"],
			none: styles["lambda-number-currency-radius-none"],
			tiny: styles["lambda-number-currency-radius-tiny"],
			small: styles["lambda-number-currency-radius-small"],
			medium: styles["lambda-number-currency-radius-medium"],
			large: styles["lambda-number-currency-radius-large"],
			full: styles["lambda-number-currency-radius-full"],
		},
		variant: {
			outline: styles["lambda-number-currency-outline"],
			soft: styles["lambda-number-currency-soft"],
		},
		typeNumber: {
			default: styles["lambda-number-currency-dafault"],
			"currency-USD": styles["lambda-number-currency-usd"],
			"currency-EUR": styles["lambda-number-currency-eur"],
			"currency-GBP": styles["lambda-number-currency-gbp"],
			percentage: styles["lambda-number-currency-porc"],
			decimal: styles["lambda-number-currency-dec"],
		},
		color: {
			primary: styles["lambda-number-currency-primary"],
			neutral: styles["lambda-number-currency-neutral"],
			secondary: styles["lambda-number-currency-secondary"],
			info: styles["lambda-number-currency-info"],
			warning: styles["lambda-number-currency-warning"],
			danger: styles["lambda-number-currency-danger"],
			success: styles["lambda-number-currency-success"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "outline",
		typeNumber: "default",
		radius: "default",
		color: "primary",
	},
});

export const button = cva(styles["lambda-number-btn"], {
	variants: {
		color: {
			primary: styles["lambda-number-btn-primary"],
			neutral: styles["lambda-number-btn-neutral"],
			secondary: styles["lambda-number-btn-secondary"],
			info: styles["lambda-number-btn-info"],
			warning: styles["lambda-number-btn-warning"],
			danger: styles["lambda-number-btn-danger"],
			success: styles["lambda-number-btn-success"],
		},
		size: {
			tiny: styles["lambda-number-btn-tiny"],
			small: styles["lambda-number-btn-small"],
			medium: styles["lambda-number-btn-medium"],
			large: styles["lambda-number-btn-large"],
		},
	},
	defaultVariants: {
		size: "medium",
		color: "primary",
	},
});

export type InputNumberVariants = VariantProps<typeof inputNumber>;
