import { cva, VariantProps } from "class-variance-authority";
import styles from "./calendar.module.css";

export const calendarWrapperVariants = cva(styles["lambda-calendar-wrapper"], {
	variants: {
		variant: {
			solid: styles["lambda-calendar-wrapper-solid"],
			soft: styles["lambda-calendar-wrapper-soft"],
		},
	},
	defaultVariants: {
		variant: "solid",
	},
});

export const calendarVariants = cva(styles["lambda-calendar"], {
	variants: {
		variant: {
			solid: styles["lambda-calendar-variant-solid"],
			soft: styles["lambda-calendar-variant-soft"],
		},
	},
	defaultVariants: {
		variant: "solid",
	},
});

export const calendarGridVariants = cva(styles["lambda-calendar-grid"], {
	variants: {
		variant: {
			solid: styles["lambda-calendar-grid-solid"],
			soft: styles["lambda-calendar-grid-soft"],
		},
	},
	defaultVariants: {
		variant: "solid",
	},
});

export const calendarDayLabelVariants = cva(styles["lambda-calendar-day-label"], {
	variants: {
		variant: {
			solid: styles["lambda-calendar-day-label-solid"],
			soft: styles["lambda-calendar-day-label-soft"],
		},
	},
	defaultVariants: {
		variant: "solid",
	},
});

export const calendarCellVariants = cva(styles["lambda-calendar-cell"], {
	variants: {
		variant: {
			solid: styles["lambda-calendar-cell-solid"],
			soft: styles["lambda-calendar-cell-soft"],
		},
		selected: {
			true: styles["lambda-calendar-cell-selected"],
			false: styles["lambda-calendar-cell-not-selected"],
		},
		today: {
			true: styles["lambda-calendar-cell-today"],
			false: styles["lambda-calendar-cell-not-today"],
		},
		month: {
			true: styles["lambda-calendar-cell-month"],
			false: styles["lambda-calendar-cell-not-month"],
		},
		disabled: {
			true: styles["lambda-calendar-cell-disabled"],
			false: styles["lambda-calendar-cell-not-disabled"],
		},
	},
	defaultVariants: {
		variant: "solid",
		selected: false,
		today: false,
		month: false,
		disabled: false,
	},
});

export const calendarDropdownVariants = cva(styles["lambda-calendar-dropdown"], {
	variants: {
		variant: {
			solid: styles["lambda-calendar-dropdown-solid"],
			soft: styles["lambda-calendar-dropdown-soft"],
		},
		direction: {
			up: styles["lambda-calendar-dropdown-up"],
			down: styles["lambda-calendar-dropdown-down"],
		},
	},
	defaultVariants: {
		variant: "solid",
		direction: "down",
	},
});

export type CalendarVariants = VariantProps<typeof calendarVariants>;
