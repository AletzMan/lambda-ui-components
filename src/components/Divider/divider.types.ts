import { DividerVariants } from "./divider.variants";

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
	/*
	 * Variant of the divider (solid, dashed, dotted)
	 * @default solid
	 */
	variant?: DividerVariants["variant"];
	/*
	 * Orientation of the divider (horizontal, vertical)
	 * @default horizontal
	 */
	orientation?: DividerVariants["orientation"];
	/*
	 * Color of the divider (primary, secondary, danger, success, warning, info)
	 * @default primary
	 */
	color?: DividerVariants["color"];
	/*
	 * Size of the divider (xs, sm, md, lg)
	 * @default sm
	 */
	size?: DividerVariants["size"];

	/*
	 * Spacing of the divider in pixels
	 * @default 5
	 */
	spacing?: number;
	/*
	 * Content position of the divider (center, start, end)
	 * @default center
	 */
	contentPosition?: DividerVariants["contentPosition"];
}
