import { cva, VariantProps } from "class-variance-authority";
import styles from "./calendar.module.css";

export const calendarWrapperVariants = cva(styles["lambda-calendar-wrapper"], {
	variants: {
		type: {
			inline: styles["lambda-calendar-wrapper-inline"],
			dropdown: styles["lambda-calendar-wrapper-dropdown"],
		},
		size: {
			compact: styles["lambda-calendar-wrapper-compact"],
			full: styles["lambda-calendar-wrapper-full"],
		},
	},
});

export const calendarVariants = cva(styles["lambda-calendar"], {
	variants: {
		type: {
			inline: styles["lambda-calendar-inline"],
			dropdown: styles["lambda-calendar-dropdown"],
		},
		size: {
			compact: styles["lambda-calendar-compact"],
			full: styles["lambda-calendar-full"],
		},
		radius: {
			none: styles["lambda-calendar-radius-none"],
			tiny: styles["lambda-calendar-radius-tiny"],
			small: styles["lambda-calendar-radius-small"],
			medium: styles["lambda-calendar-radius-medium"],
			large: styles["lambda-calendar-radius-large"],
		},
		variant: {
			solid: styles["lambda-calendar-variant-solid"],
			soft: styles["lambda-calendar-variant-soft"],
		},
	},
	defaultVariants: {
		type: "inline",
		size: "compact",
		radius: "small",
		variant: "solid",
	},
});

export const calendarGridVariants = cva(styles["lambda-calendar-grid"], {
	variants: {
		type: {
			inline: styles["lambda-calendar-grid-inline"],
			dropdown: styles["lambda-calendar-grid-dropdown"],
		},
		size: {
			compact: styles["lambda-calendar-grid-compact"],
			full: styles["lambda-calendar-grid-full"],
		},
	},
});

export const calendarDayLabelVariants = cva(styles["lambda-calendar-day-label"], {
	variants: {
		type: {
			inline: styles["lambda-calendar-day-label-inline"],
			dropdown: styles["lambda-calendar-day-label-dropdown"],
		},
		size: {
			compact: styles["lambda-calendar-day-label-compact"],
			full: styles["lambda-calendar-day-label-full"],
		},
	},
});

export const calendarCellVariants = cva(styles["lambda-calendar-cell"], {
	variants: {
		type: {
			inline: styles["lambda-calendar-cell-inline"],
			dropdown: styles["lambda-calendar-cell-dropdown"],
		},
		size: {
			compact: styles["lambda-calendar-cell-compact"],
			full: styles["lambda-calendar-cell-full"],
		},
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
});

export const calendarDropdownVariants = cva(styles["lambda-calendar-dropdown"], {
	variants: {
		type: {
			inline: styles["lambda-calendar-dropdown-inline"],
			dropdown: styles["lambda-calendar-dropdown-dropdown"],
		},
		direction: {
			up: styles["lambda-calendar-dropdown-up"],
			down: styles["lambda-calendar-dropdown-down"],
		},
	},
});

export type CalendarVariants = VariantProps<typeof calendarVariants>;
