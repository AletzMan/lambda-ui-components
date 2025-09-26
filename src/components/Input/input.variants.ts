import styles from "./input.module.css";
import { VariantProps, cva } from "class-variance-authority";

export const lambdaInput = cva(styles["lambda-input"], {
	variants: {
		size: {
			tiny: styles["lambda-input-tiny"],
			small: styles["lambda-input-small"],
			medium: styles["lambda-input-medium"],
			large: styles["lambda-input-large"],
		},
		radius: {
			none: styles["lambda-input-radius-none"],
			tiny: styles["lambda-input-radius-none"],
			small: styles["lambda-input-radius-small"],
			medium: styles["lambda-input-radius-medium"],
			large: styles["lambda-input-radius-large"],
			full: styles["lambda-input-radius-full"],
		},
		disabled: {
			false: styles["lambda-input-enabled"],
			true: styles["lambda-input-disabled"],
		},
		invalid: {
			true: styles["lambda-input-invalid"],
			false: "",
		},
		hasLabel: {
			true: styles["lambda-input-has-label"],
			false: "",
		},
		hasHelper: {
			true: styles["lambda-input-has-helper"],
			false: "",
		},
	},
	defaultVariants: {
		radius: "tiny",
		disabled: false,
		hasLabel: false,
	},
});
export const input = cva(styles["lambda-input-wrapper"], {
	variants: {
		size: {
			tiny: styles["lambda-input-wrapper-tiny"],
			small: styles["lambda-input-wrapper-small"],
			medium: styles["lambda-input-wrapper-medium"],
			large: styles["lambda-input-wrapper-large"],
		},
		variant: {
			outline: styles["lambda-input-wrapper-outline"],
			soft: styles["lambda-input-wrapper-soft"],
			underline: styles["lambda-input-wrapper-underline"],
		},
		type: {
			text: styles["lambda-input-wrapper-text"],
			search: styles["lambda-input-wrapper-search"],
			password: styles["lambda-input-wrapper-password"],
			email: styles["lambda-input-wrapper-email"],
		},
		radius: {
			none: styles["lambda-input-wrapper-radius-none"],
			tiny: styles["lambda-input-wrapper-radius-tiny"],
			small: styles["lambda-input-wrapper-radius-small"],
			medium: styles["lambda-input-wrapper-radius-medium"],
			large: styles["lambda-input-wrapper-radius-large"],
			full: styles["lambda-input-wrapper-radius-full"],
		},
		invalid: {
			true: styles["lambda-input-wrapper-invalid"],
			false: "",
		},
		hasElements: {
			none: styles["lambda-input-wrapper-elements-none"],
			first: styles["lambda-input-wrapper-elements-first"],
			last: styles["lambda-input-wrapper-elements-last"],
			both: styles["lambda-input-wrapper-elements-both"],
		},
		disabled: {
			false: styles["lambda-input-wrapper-enabled"],
			true: styles["lambda-input-wrapper-disabled"],
		},
		joinposition: {
			first: styles["lambda-input-wrapper-first"],
			middle: styles["lambda-input-wrapper-middle"],
			last: styles["lambda-input-wrapper-last"],
			single: styles["lambda-input-wrapper-single"],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "tiny",
		type: "text",
		hasElements: "none",
		invalid: false,
		disabled: false,
		joinposition: "single",
	},
});

export const labels = cva(styles["lambda-input-label"], {
	variants: {
		size: {
			tiny: styles["lambda-input-label-tiny"],
			small: styles["lambda-input-label-small"],
			medium: styles["lambda-input-label-medium"],
			large: styles["lambda-input-label-large"],
		},
		radius: {
			none: styles["lambda-input-label-radius-none"],
			tiny: styles["lambda-input-label-radius-tiny"],
			small: styles["lambda-input-label-radius-small"],
			medium: styles["lambda-input-label-radius-medium"],
			large: styles["lambda-input-label-radius-large"],
			full: styles["lambda-input-label-radius-full"],
		},
		hasElements: {
			none: styles["lambda-input-label-elements-none"],
			first: styles["lambda-input-label-elements-first"],
			last: styles["lambda-input-label-elements-last"],
			both: styles["lambda-input-label-elements-both"],
		},
	},
	defaultVariants: {
		radius: "tiny",
		size: "medium",
	},
});

export const textInput = cva(styles["lambda-input-field"], {
	variants: {
		size: {
			tiny: styles["lambda-input-field-tiny"],
			small: styles["lambda-input-field-small"],
			medium: styles["lambda-input-field-medium"],
			large: styles["lambda-input-field-large"],
		},
		disabled: {
			false: styles["lambda-input-field-disabled"],
			true: styles["lambda-input-field-enabled"],
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
	},
});

export const buttonPassword = cva(styles["lambda-input-toggle-password"], {
	variants: {
		size: {
			tiny: styles["lambda-input-toggle-password-tiny"],
			small: styles["lambda-input-toggle-password-small"],
			medium: styles["lambda-input-toggle-password-medium"],
			large: styles["lambda-input-toggle-password-large"],
		},
		variant: {
			outline: styles["lambda-input-toggle-password-outline"],
			soft: styles["lambda-input-toggle-password-soft"],
			underline: styles["lambda-input-toggle-password-underline"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "outline",
	},
});

export type InputVariants = VariantProps<typeof input>;
