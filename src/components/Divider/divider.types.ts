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
	 * Type of the divider (full, inset, between)
	 * @default full
	 */
	type?: DividerVariants["type"];
}
