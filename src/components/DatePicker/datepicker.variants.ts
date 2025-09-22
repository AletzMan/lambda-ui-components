import { cva, VariantProps } from "class-variance-authority";
import styles from "./datepicker.module.css";

export const datepickerWrapperVariants = cva(styles["lambda-datepicker-wrapper"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-wrapper-inline"],
			dropdown: styles["lambda-datepicker-wrapper-dropdown"],
		},
		size: {
			tiny: styles["lambda-datepicker-wrapper-tiny"],
			small: styles["lambda-datepicker-wrapper-small"],
			medium: styles["lambda-datepicker-wrapper-medium"],
			large: styles["lambda-datepicker-wrapper-large"],
		},
	},
});

export const datepickerVariants = cva(styles["lambda-datepicker"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-inline"],
			dropdown: styles["lambda-datepicker-dropdown"],
		},
		size: {
			tiny: styles["lambda-datepicker-tiny"],
			small: styles["lambda-datepicker-small"],
			medium: styles["lambda-datepicker-medium"],
			large: styles["lambda-datepicker-large"],
		},
		radius: {
			none: styles["lambda-datepicker-radius-none"],
			tiny: styles["lambda-datepicker-radius-tiny"],
			small: styles["lambda-datepicker-radius-small"],
			medium: styles["lambda-datepicker-radius-medium"],
			large: styles["lambda-datepicker-radius-large"],
			full: styles["lambda-datepicker-radius-full"],
		},
		variant: {
			solid: styles["lambda-datepicker-variant-solid"],
			soft: styles["lambda-datepicker-variant-soft"],
		},
	},
	defaultVariants: {
		type: "inline",
		size: "small",
		radius: "small",
		variant: "solid",
	},
});

export const datepickerDayLabelVariants = cva(styles["lambda-datepicker-day-label"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-day-label-inline"],
			dropdown: styles["lambda-datepicker-day-label-dropdown"],
		},
		size: {
			tiny: styles["lambda-datepicker-day-label-tiny"],
			small: styles["lambda-datepicker-day-label-small"],
			medium: styles["lambda-datepicker-day-label-medium"],
			large: styles["lambda-datepicker-day-label-large"],
		},
	},
	defaultVariants: {
		type: "inline",
		size: "small",
	},
});

export const datepickerCellVariants = cva(styles["lambda-datepicker-cell"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-cell-inline"],
			dropdown: styles["lambda-datepicker-cell-dropdown"],
		},
		size: {
			tiny: styles["lambda-datepicker-cell-tiny"],
			small: styles["lambda-datepicker-cell-small"],
			medium: styles["lambda-datepicker-cell-medium"],
			large: styles["lambda-datepicker-cell-large"],
		},
		variant: {
			solid: styles["lambda-datepicker-cell-solid"],
			soft: styles["lambda-datepicker-cell-soft"],
		},
		selected: {
			true: styles["lambda-datepicker-cell-selected"],
			false: styles["lambda-datepicker-cell-not-selected"],
		},
		today: {
			true: styles["lambda-datepicker-cell-today"],
			false: styles["lambda-datepicker-cell-not-today"],
		},
		month: {
			true: styles["lambda-datepicker-cell-month"],
			false: styles["lambda-datepicker-cell-not-month"],
		},
		disabled: {
			true: styles["lambda-datepicker-cell-disabled"],
			false: styles["lambda-datepicker-cell-not-disabled"],
		},
	},
});

export const datepickerDropdownVariants = cva(styles["lambda-datepicker-dropdown"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-dropdown-inline"],
			dropdown: styles["lambda-datepicker-dropdown-dropdown"],
		},
		direction: {
			up: styles["lambda-datepicker-dropdown-up"],
			down: styles["lambda-datepicker-dropdown-down"],
		},
	},
});

export type DatePickerVariants = VariantProps<typeof datepickerVariants>;
