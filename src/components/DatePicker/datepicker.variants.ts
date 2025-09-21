import { cva, VariantProps } from "class-variance-authority";
import styles from "./datepicker.module.css";

export const datepickerVariants = cva(styles["lambda-datepicker"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-inline"],
			modal: styles["lambda-datepicker-modal"],
		},
		size: {
			compact: styles["lambda-datepicker-compact"],
			full: styles["lambda-datepicker-full"],
		},
		radius: {
			none: styles["lambda-datepicker-radius-none"],
			tiny: styles["lambda-datepicker-radius-tiny"],
			small: styles["lambda-datepicker-radius-small"],
			medium: styles["lambda-datepicker-radius-medium"],
			large: styles["lambda-datepicker-radius-large"],
		},
		variant: {
			solid: styles["lambda-datepicker-variant-solid"],
			soft: styles["lambda-datepicker-variant-soft"],
		},
	},
	defaultVariants: {
		type: "inline",
		size: "compact",
		radius: "small",
		variant: "solid",
	},
});

export type DatePickerVariants = VariantProps<typeof datepickerVariants>;
