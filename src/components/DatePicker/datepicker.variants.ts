import { cva, VariantProps } from "class-variance-authority";
import styles from "./datepicker.module.css";

export const datepickerWrapperVariants = cva(styles["lambda-datepicker-wrapper"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-wrapper-inline"],
			dropdown: styles["lambda-datepicker-wrapper-dropdown"],
			modal: styles["lambda-datepicker-wrapper-modal"],
		},
		size: {
			tiny: styles["lambda-datepicker-wrapper-tiny"],
			small: styles["lambda-datepicker-wrapper-small"],
			medium: styles["lambda-datepicker-wrapper-medium"],
			large: styles["lambda-datepicker-wrapper-large"],
		},
		hasLabel: {
			true: styles["lambda-datepicker-wrapper-has-label"],
			false: "",
		},
		disabled: {
			true: styles["lambda-datepicker-wrapper-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		type: "dropdown",
		size: "small",
		hasLabel: false,
		disabled: false,
	},
});

export const datepickerContainerVariants = cva(styles["lambda-datepicker-container"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-container-inline"],
			dropdown: styles["lambda-datepicker-container-dropdown"],
			modal: styles["lambda-datepicker-container-modal"],
		},
		invalid: {
			true: styles["lambda-datepicker-container-invalid"],
			false: styles["lambda-datepicker-container-not-invalid"],
		},
	},
	defaultVariants: {
		type: "dropdown",
		invalid: false,
	},
});

export const datepickerVariants = cva(styles["lambda-datepicker"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-inline"],
			dropdown: styles["lambda-datepicker-dropdown"],
			modal: styles["lambda-datepicker-modal"],
		},
		size: {
			tiny: styles["lambda-datepicker-tiny"],
			small: styles["lambda-datepicker-small"],
			medium: styles["lambda-datepicker-medium"],
			large: styles["lambda-datepicker-large"],
		},
		radius: {
			default: styles["lambda-datepicker-radius-default"],
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
		invalid: {
			true: styles["lambda-datepicker-invalid"],
			false: styles["lambda-datepicker-not-invalid"],
		},
	},
	defaultVariants: {
		type: "dropdown",
		size: "small",
		radius: "default",
		variant: "solid",
		invalid: false,
	},
});

export const datepickerDayLabelVariants = cva(styles["lambda-datepicker-day-label"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-day-label-inline"],
			dropdown: styles["lambda-datepicker-day-label-dropdown"],
			modal: styles["lambda-datepicker-day-label-modal"],
		},
		size: {
			tiny: styles["lambda-datepicker-day-label-tiny"],
			small: styles["lambda-datepicker-day-label-small"],
			medium: styles["lambda-datepicker-day-label-medium"],
			large: styles["lambda-datepicker-day-label-large"],
		},
	},
	defaultVariants: {
		type: "dropdown",
		size: "small",
	},
});

export const datepickerCellVariants = cva(styles["lambda-datepicker-cell"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-cell-inline"],
			dropdown: styles["lambda-datepicker-cell-dropdown"],
			modal: styles["lambda-datepicker-cell-modal"],
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
	defaultVariants: {
		type: "dropdown",
		size: "small",
		variant: "solid",
		disabled: false,
		selected: false,
		today: false,
		month: false,
	},
});

export const datepickerCalendarVariants = cva(styles["lambda-datepicker-calendar"], {
	variants: {
		type: {
			inline: styles["lambda-datepicker-calendar-inline"],
			dropdown: styles["lambda-datepicker-calendar-dropdown"],
			modal: styles["lambda-datepicker-calendar-modal"],
		},
		direction: {
			above: styles["lambda-datepicker-calendar-above"],
			below: styles["lambda-datepicker-calendar-below"],
		},
		invalid: {
			true: styles["lambda-datepicker-calendar-invalid"],
			false: styles["lambda-datepicker-calendar-not-invalid"],
		},
	},
	defaultVariants: {
		type: "dropdown",
		direction: "below",
		invalid: false,
	},
});

export const datepickerInlineSectionVariants = cva(styles["lambda-datepicker-inline-section"], {
	variants: {
		variant: {
			solid: styles["lambda-datepicker-inline-section-solid"],
			soft: styles["lambda-datepicker-inline-section-soft"],
		},
		radius: {
			default: styles["lambda-datepicker-inline-section-radius-default"],
			none: styles["lambda-datepicker-inline-section-radius-none"],
			tiny: styles["lambda-datepicker-inline-section-radius-tiny"],
			small: styles["lambda-datepicker-inline-section-radius-small"],
			medium: styles["lambda-datepicker-inline-section-radius-medium"],
			large: styles["lambda-datepicker-inline-section-radius-large"],
			full: styles["lambda-datepicker-inline-section-radius-full"],
		},
		invalid: {
			true: styles["lambda-datepicker-inline-section-invalid"],
			false: styles["lambda-datepicker-inline-section-not-invalid"],
		},
	},
	defaultVariants: {
		variant: "solid",
		radius: "default",
		invalid: false,
	},
});

export type DatePickerVariants = VariantProps<typeof datepickerVariants>;
