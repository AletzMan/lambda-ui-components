import { VariantProps, cva } from "class-variance-authority";
import styles from "./dropdown.module.css";

export const dropdownVariants = cva(styles[`lambda-dropdown`], {
	variants: {
		variant: {
			solid: styles[`lambda-dropdown-solid`],
			soft: styles[`lambda-dropdown-soft`],
			subtle: styles[`lambda-dropdown-subtle`],
			text: styles[`lambda-dropdown-text`],
		},
		size: {
			tiny: styles[`lambda-dropdown-tiny`],
			small: styles[`lambda-dropdown-small`],
			medium: styles[`lambda-dropdown-medium`],
			large: styles[`lambda-dropdown-large`],
		},
		radius: {
			none: styles[`lambda-dropdown-radius-none`],
			tiny: styles[`lambda-dropdown-radius-tiny`],
			small: styles[`lambda-dropdown-radius-small`],
			medium: styles[`lambda-dropdown-radius-medium`],
			large: styles[`lambda-dropdown-radius-large`],
			full: styles[`lambda-dropdown-radius-full`],
		},
		disabled: {
			false: styles[`lambda-dropdown-enabled`],
			true: styles[`lambda-dropdown-disabled`],
		},
		joinposition: {
			first: styles[`lambda-dropdown-first`],
			middle: styles[`lambda-dropdown-middle`],
			last: styles[`lambda-dropdown-last`],
			single: styles[`lambda-dropdown-single`],
		},
		menuPosition: {
			above: styles[`lambda-dropdown-above`],
			below: styles[`lambda-dropdown-below`],
		},
		iconOnly: {
			true: styles[`lambda-dropdown-icon-only`],
			false: "",
		},
		active: {
			true: styles[`lambda-dropdown-active`],
			false: "",
		},
	},
	defaultVariants: {
		variant: "solid",
		size: "medium",
		radius: "small",
		disabled: false,
		joinposition: "single",
		menuPosition: "below",
		iconOnly: false,
		active: false,
	},
});

export const dropdownMenuVariants = cva(styles[`lambda-dropdown-menu`], {
	variants: {
		menuPosition: {
			above: styles[`lambda-dropdown-menu-position-above`],
			below: styles[`lambda-dropdown-menu-position-below`],
		},
	},
	defaultVariants: {
		menuPosition: "below",
	},
});

export const dropdownItemVariants = cva(styles[`lambda-dropdown-item`], {
	variants: {
		size: {
			tiny: styles[`lambda-dropdown-item-tiny`],
			small: styles[`lambda-dropdown-item-small`],
			medium: styles[`lambda-dropdown-item-medium`],
			large: styles[`lambda-dropdown-item-large`],
		},
		active: {
			true: styles[`lambda-dropdown-item-active`],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		active: false,
	},
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
