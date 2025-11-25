import { cva, VariantProps } from "class-variance-authority";
import styles from "./navigationMenu.module.css";

export const navigationMenuVariants = cva(styles["lambda-navigation-menu"], {
	variants: {
		size: {
			small: styles["lambda-navigation-menu-small"],
			medium: styles["lambda-navigation-menu-medium"],
			large: styles["lambda-navigation-menu-large"],
		},
		showLines: {
			true: styles["lambda-navigation-menu-show-lines"],
			false: styles["lambda-navigation-menu-hide-lines"],
		},
		styleLines: {
			solid: styles["lambda-navigation-menu-line-solid"],
			dashed: styles["lambda-navigation-menu-line-dashed"],
			dotted: styles["lambda-navigation-menu-line-dotted"],
		},
		selectedStyle: {
			highlight: styles["lambda-navigation-menu-item-selected-style-highlight"],
			border: styles["lambda-navigation-menu-item-selected-style-border"],
		},
	},
	defaultVariants: {
		size: "medium",
		showLines: false,
		styleLines: "solid",
		selectedStyle: "highlight",
	},
});

export const navigationMenuItemVariants = cva(styles["lambda-navigation-menu-item"], {
	variants: {
		selected: {
			true: styles["lambda-navigation-menu-item-selected"],
			false: "",
		},
		disabled: {
			true: styles["lambda-menu-item-disabled"],
			false: "",
		},
		isLast: {
			true: styles["lambda-navigation-menu-item-last"],
			false: "",
		},
		hasChildren: {
			true: styles["lambda-navigation-menu-item-has-children"],
			false: "",
		},
		isChildrenSelected: {
			true: styles["lambda-navigation-menu-item-children-selected"],
			false: "",
		},
		alwaysOpen: {
			true: styles["lambda-navigation-menu-item-always-open"],
			false: "",
		},
		selectedStyle: {
			highlight: styles["lambda-navigation-menu-item-selected-style-highlight"],
			border: styles["lambda-navigation-menu-item-selected-style-border"],
		},
	},
	defaultVariants: {
		selected: false,
		disabled: false,
		isLast: false,
		hasChildren: false,
		isChildrenSelected: false,
		alwaysOpen: false,
		selectedStyle: "highlight",
	},
});

export const navigationMenuItemContentVariants = cva(
	styles["lambda-navigation-menu-item-content"],
	{
		variants: {
			selected: {
				true: styles["lambda-navigation-menu-item-content-selected"],
				false: "",
			},
			disabled: {
				true: styles["lambda-navigation-menu-item-content-disabled"],
				false: "",
			},
			hasChildren: {
				true: styles["lambda-navigation-menu-item-content-has-children"],
				false: "",
			},
		},
		defaultVariants: {
			selected: false,
			disabled: false,
			hasChildren: false,
		},
	}
);

export const navigationMenuItemExpandedIconVariants = cva(
	styles["lambda-navigation-menu-expanded-icon"],
	{
		variants: {
			size: {
				small: styles["lambda-navigation-menu-expanded-icon-small"],
				medium: styles["lambda-navigation-menu-expanded-icon-medium"],
				large: styles["lambda-navigation-menu-expanded-icon-large"],
			},
			expanded: {
				true: styles["lambda-navigation-menu-expanded-icon-expanded"],
				false: styles["lambda-navigation-menu-expanded-icon-collapsed"],
			},
			alwaysOpen: {
				true: styles["lambda-navigation-menu-expanded-icon-always-open"],
				false: "",
			},
		},
		defaultVariants: {
			size: "medium",
			expanded: false,
			alwaysOpen: false,
		},
	}
);

export const navigationMenuItemLabelVariants = cva(styles["lambda-navigation-menu-label"], {
	variants: {
		size: {
			tiny: styles["lambda-navigation-menu-label-tiny"],
			small: styles["lambda-navigation-menu-label-small"],
			medium: styles["lambda-navigation-menu-label-medium"],
			large: styles["lambda-navigation-menu-label-large"],
		},
		selected: {
			true: styles["lambda-navigation-menu-label-selected"],
			false: "",
		},
		hasChildren: {
			true: styles["lambda-navigation-menu-label-children"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		selected: false,
		hasChildren: false,
	},
});

export const navigationMenuItemLabelIconVariants = cva(
	styles["lambda-navigation-menu-label-icon"],
	{
		variants: {
			size: {
				tiny: styles["lambda-navigation-menu-label-icon-tiny"],
				small: styles["lambda-navigation-menu-label-icon-small"],
				medium: styles["lambda-navigation-menu-label-icon-medium"],
				large: styles["lambda-navigation-menu-label-icon-large"],
			},
		},
		defaultVariants: {
			size: "medium",
		},
	}
);

export type NavigationMenuVariants = VariantProps<typeof navigationMenuVariants>;
