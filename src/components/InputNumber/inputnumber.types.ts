import { InputNumberVariants } from "./inputnumber.variants";

export interface InputNumberProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"disabled" | "size" | "type" | "onChange" | "value" | "min" | "max" | "step" | "color"
	> {
	/**
 * Controls the visual style of the numeric input, such as border color or background.
 */
	variant?: InputNumberVariants["variant"];

	/**
	 * Sets the visual size of the input, adjusting padding and text size.
	 */
	size?: InputNumberVariants["size"];

	/**
	 * Defines the border radius applied to the input.
	 */
	radius?: InputNumberVariants["radius"];

	/**
	 * Enables an error or invalid visual state, typically changing the border color to red.
	 */
	invalid?: InputNumberVariants["invalid"];

	/**
	 * Disables the input entirely, preventing interaction and applying a disabled appearance.
	 */
	disabled?: InputNumberVariants["disabled"];


	/**
	 * Sets the color of the input, typically changing the border color to red.
	 */
	color?: InputNumberVariants["color"]; 

	/**
	 * (Implementation-specific) Defines an internal subtype or variation of the numeric input component.
	 */
	typeNumber?: InputNumberVariants["typeNumber"];

	/**
	 * Specifies the minimum numeric value the user is allowed to enter.
	 */
	min?: number;

	/**
	 * Specifies the maximum numeric value the user is allowed to enter.
	 */
	max?: number;

	/**
	 * Determines the increment by which the value changes when using step controls
	 * (such as arrow buttons) or validating step multiples.
	 */
	step?: number;

	/**
	 * A visible text label that describes the purpose of the numeric input.
	 */
	label?: string;

	/**
	 * A message displayed below the input when it is marked as invalid (`invalid={true}`).
	 */
	errorMessage?: string;

	/**
	 * Additional text displayed below the input to provide guidance or context for the user.
	 */
	helperText?: string;

	/**
	 * Indicates that this field is required in order to submit a form.  
	 * Visually, it may display an asterisk.
	 */
	required?: boolean;

	/**
	 * Sets the default numeric value for the input when it is initially rendered.
	 */
	defaultValue?: number;

	/**
	 * Function called whenever the numeric value is changed by the user.
	 * Receives the updated number.
	 */
	onChangeValue?: (value: number) => void;

	/**
	 * The current numeric value to be displayed in the input.
	 * When provided, the component becomes controlled by the parent.
	 */
	value?: number;

	/**
	 * Indicates the input's position when used inside a joined input group.
	 */
	joinposition?: "first" | "last" | "middle";

}
