import { HTMLAttributes, InputHTMLAttributes } from "react";
import { RadioGroupVariants, RadioVariants } from "./radio.variants";

export interface RadioGroupProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "color"> {
	/**
	 * 	Defines the layout direction of the radio buttons within the group (e.g., 'horizontal' or 'vertical').
	 */
	orientation?: RadioGroupVariants["orientation"];

	/**
	 * Controls the overall size of the radio group and its influence on individual radio buttons.
	 */
	size?: RadioGroupVariants["size"];

	/**
	 * Sets the border radius for the group, typically affecting the visual container or the radios themselves.
	 */
	radius?: RadioGroupVariants["radius"];

	/**
	 * Establishes the color scheme for all contained radio buttons.
	 */
	color?: RadioGroupVariants["color"];

	/**
	 * Controls the general visual style or aesthetic of the radio group (e.g., 'solid', 'outline').
	 */
	variant?: RadioGroupVariants["variant"];

	/**
	 * Controls the visibility of the radio input circle/dot itself.
	 * @default false
	 */
	hideRadio?: boolean;

	/**
	 * If set to true, disables all individual radio buttons within this group.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * The HTML `name` attribute applied to all radio buttons. Essential for grouping and ensuring only one option can be selected at a time.
	 */
	name?: string;

	/**
	 * The current value of the selected radio button (controlled mode).
	 * Accepts string, number, or any primitive value compatible with form libraries.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value?: any;

	/**
	 * Callback fired when a radio button is selected.
	 * Takes precedence over onChangeOption.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange?: (value: any) => void;

	/**
	 * The currently selected radio button's `value` (for use as a controlled component).
	 * Legacy prop: Prefer `value` for standard form integration.
	 */
	selectedOption?: string;

	/**
	 * Callback function executed when the user selects a different radio button. Receives the `value` of the newly selected radio.
	 * Legacy prop: Prefer `onChange` for standard form integration.
	 */
	onChangeOption?: (value: string) => void;

	/**
	 * The initial selected `value` when the component is first mounted (for use as an uncontrolled component).
	 */
	defaultValue?: string;

	/**
	 * Defines the spacing (margin) between individual radio buttons inside the group, using a valid CSS value (e.g., '8px', '1rem').
	 */
	gap?: string;

	/**
	 * The individual radio buttons (`<Radio />`) passed as children to the group.
	 */
	children: React.ReactNode;
}

export interface RadioProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"size" | "disabled" | "checked" | "color" | "type" | "value"
	> {
	/**
	 * Controls the placement of the text label (`label`) relative to the radio control (e.g., 'left' or 'right').
	 */
	positionLabel?: RadioVariants["positionLabel"];

	/**
	 * Disables this specific radio button, preventing user interaction.
	 */
	disabled?: RadioVariants["disabled"];

	/**
	 * The descriptive text displayed next to the radio control, semantically associated with it.
	 */
	label?: string;

	/**
	 * The unique value associated with this specific radio option. This value is used by the parent RadioGroup to determine selection.
	 * Note: The `checked` state is managed externally by the `RadioGroup` based on this value.
	 */
	value: string | number | ReadonlyArray<string>;
}
