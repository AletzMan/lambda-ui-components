import { HTMLAttributes } from "react";
import { SelectVariants } from "./select.variants";

export interface IListCollection {
	/**
	 * The visible label for this option in the dropdown list.
	 */
	label: string;

	/**
	 * The unique value associated with this option.
	 * Used to identify the selected item.
	 */
	value: string;

	/**
	 * Optional: URL of an image or an element to display as an avatar next to the option label.
	 */
	avatar?: string;

	/**
	 * Optional: Additional descriptive text for this option.
	 */
	description?: string;
}

export interface SelectProps
	extends Omit<
		HTMLAttributes<HTMLDivElement>,
		"size" | "disabled" | "value" | "onChange" | "placeholder" | "required" | "multiple" | "name"
	> {

	/**
	 * Controls the size of the select component, affecting its padding and font size.
	 */
	size?: SelectVariants["size"];

	/**
	 * Controls the border radius applied to the select trigger.
	 */
	radius?: SelectVariants["radius"];

	/**
	 * Visual styling variant of the select component.
	 */
	variant?: SelectVariants["variant"];

	/**
	 * Disables the select component, preventing user interaction.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Indicates whether the select is in an invalid validation state.
	 * @default false
	 */
	invalid?: boolean;

	/**
	 * Optional text label associated with the select control.
	 */
	label?: string;

	/**
	 * Array of option objects available for selection.
	 * Must follow the `IListCollection` structure.
	 */
	options: IListCollection[];

	/**
	 * Placeholder text displayed when no value is selected.
	 */
	placeholder?: string;

	/**
	 * Error message shown when `invalid` is true.
	 * Typically displayed below the select.
	 */
	errorMessage?: string;

	/**
	 * Optional helper text displayed below the select.
	 */
	helperText?: string;

	/**
	 * Indicates whether selecting a value is required.
	 * @default false
	 */
	required?: boolean;

	/**
	 * The currently selected value (for controlled usage).
	 */
	value?: string;

	/**
	 * Initial value for uncontrolled usage.
	 * Ignored when `value` is provided.
	 */
	defaultValue?: string;

	/**
	 * Callback fired when the user selects a new option.
	 * Receives the `value` of the selected option, or `undefined`
	 * when the selection is cleared (native behavior).
	 */
	onChange?: (value: string | undefined) => void;

	/**
	 * The `name` attribute for the underlying native `<select>` element.
	 * Useful for form serialization.
	 */
	name?: string;

	/**
	 * Indicates the select’s position inside a Join group (if used within one).
	 */
	joinposition?: "first" | "last" | "middle";
}
