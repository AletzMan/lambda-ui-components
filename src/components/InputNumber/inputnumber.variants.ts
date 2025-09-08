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
			none: styles["lambda-number-radius-none"],
			small: styles["lambda-number-radius-small"],
			medium: styles["lambda-number-radius-medium"],
			large: styles["lambda-number-radius-large"],
			pill: styles["lambda-number-radius-pill"],
		},
		invalid: {
			true: styles["lambda-number-invalid"],
			false: "",
		},
		disabled: {
			false: styles["lambda-number-enabled"],
			true: styles["lambda-number-disabled"],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "small",
		typeNumber: "default",
		invalid: false,
		disabled: false,
	},
});
export const wrapper = cva(styles["lambda-number-wrapper"], {
	variants: {
		disabled: {
			false: styles["lambda-number-wrapper-enabled"],
			true: styles["lambda-number-wrapper-disabled"],
		},
	},
	defaultVariants: {
		disabled: false,
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
			none: styles["lambda-number-label-radius-none"],
			small: styles["lambda-number-label-radius-small"],
			medium: styles["lambda-number-label-radius-medium"],
			large: styles["lambda-number-label-radius-large"],
			pill: styles["lambda-number-label-radius-pill"],
		},
		required: {
			true: styles["lambda-number-label-required"],
		},
	},
	defaultVariants: {
		radius: "small",
		size: "medium",
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
	},
	defaultVariants: {
		size: "medium",
		typeNumber: "default",
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
			none: styles["lambda-number-handler-radius-none"],
			small: styles["lambda-number-handler-radius-small"],
			medium: styles["lambda-number-handler-radius-medium"],
			large: styles["lambda-number-handler-radius-large"],
			pill: styles["lambda-number-handler-radius-pill"],
		},
		variant: {
			outline: styles["lambda-number-handler-outline"],
			soft: styles["lambda-number-handler-soft"],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "small",
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
			none: styles["lambda-number-currency-radius-none"],
			small: styles["lambda-number-currency-radius-small"],
			medium: styles["lambda-number-currency-radius-medium"],
			large: styles["lambda-number-currency-radius-large"],
			pill: styles["lambda-number-currency-radius-pill"],
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
	},
	defaultVariants: {
		size: "medium",
		variant: "outline",
		typeNumber: "default",
		radius: "small",
	},
});

export const button = cva(styles["lambda-number-btn"], {
	variants: {
		size: {
			tiny: styles["lambda-number-btn-tiny"],
			small: styles["lambda-number-btn-small"],
			medium: styles["lambda-number-btn-medium"],
			large: styles["lambda-number-btn-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type InputNumberVariants = VariantProps<typeof inputNumber>;
