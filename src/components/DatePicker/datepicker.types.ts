import { DatePickerVariants } from "./datepicker.variants";
export interface DatePickerProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
	/**
	 * The currently selected date value in the calendar.
	 * If not provided, the field will be empty (uncontrolled component).
	 */
	value?: Date;
	/**
	 * Callback function that is triggered when the user selects a new date.
	 *
	 * @param date - The newly selected date (Date), or `undefined` if the field is cleared.
	 */
	onChange?: (date: Date | undefined) => void;
	/**
	 * The earliest date the user can select.
	 * Dates prior to this will be disabled.
	 */
	minDate?: Date;
	/**
	 * The furthest (future) date the user can select.
	 * Dates after this will be disabled.
	 */
	maxDate?: Date;
	/**
	 * Completely disables the input field and the calendar, preventing user interaction.
	 */
	disabled?: boolean;
	/**
	 * Defines the visual size of the component (e.g., `sm`, `md`, `lg`).
	 *
	 * @default md
	 */
	size?: DatePickerVariants["size"];
	/**
	 * Specifies the selection mode for the calendar (e.g., day, month, year).
	 * The 'date' value allows selection of day, month, and year.
	 *
	 * @default date
	 */
	type?: DatePickerVariants["type"];
	/**
	 * Defines the corner shape (radius) of the input field and the calendar dropdown.
	 *
	 * @default md
	 */
	radius?: DatePickerVariants["radius"];
	/**
	 * The visual style (variant) of the component (e.g., 'filled', 'outline', 'ghost').
	 *
	 * @default filled
	 */
	variant?: DatePickerVariants["variant"];
	/**
	 * Custom function to disable specific dates in the calendar.
	 * Useful for restricting holidays, weekends, etc.
	 *
	 * @param date - The date to evaluate.
	 * @returns `true` if the date should be disabled, `false` otherwise.
	 */
	isDateDisabled?: (date: Date) => boolean;
	/**
	 * Label text that appears above the input field (Input Label).
	 *
	 * @default ""
	 */
	label?: string;
	/**
	 * The display format of the date shown in the input field.
	 * Defines how the selected date is presented to the user (e.g., 'full' as "Thursday, November 13, 2025").
	 *
	 * @default medium
	 */
	displayFormat?: "full" | "long" | "medium" | "short";

	/**
	 * Optional text that provides **additional guidance** or context to the user about the expected input format or purpose. It is displayed below the date input.
	 *
	 * @default ""
	 */
	helperText?: string;
	/**
	 * Error message displayed below the input field when a validation issue occurs.
	 * Setting this value automatically implies an `invalid` state.
	 *
	 * @default ""
	 */
	errorMessage?: string;
	/**
	 * Forces the component into an error (invalid) state, applying corresponding error styles.
	 * Useful for showing visual error feedback even without an explicit `errorMessage`.
	 *
	 * @default false
	 */
	invalid?: boolean;
}
