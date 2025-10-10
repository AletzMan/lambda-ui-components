import { cva, VariantProps } from "class-variance-authority";
import styles from "./menu.module.css";

export const menuVariants = cva(styles["lambda-menu"], {
	variants: {
		size: {
			small: styles["lambda-menu-small"],
			medium: styles["lambda-menu-medium"],
			large: styles["lambda-menu-large"],
		},
		showLines: {
			true: styles["lambda-menu-show-lines"],
			false: styles["lambda-menu-hide-lines"],
		},
		styleLines: {
			solid: styles["lambda-menu-line-solid"],
			dashed: styles["lambda-menu-line-dashed"],
			dotted: styles["lambda-menu-line-dotted"],
		},
	},
	defaultVariants: {
		size: "medium",
		showLines: false,
		styleLines: "solid",
	},
});

export const menuItemVariants = cva(styles["lambda-menu-item"], {
	variants: {
		selected: {
			true: styles["lambda-menu-item-selected"],
			false: "",
		},
		disabled: {
			true: styles["lambda-menu-item-disabled"],
			false: "",
		},
		isLast: {
			true: styles["lambda-menu-item-last"],
			false: "",
		},
		hasChildren: {
			true: styles["lambda-menu-item-has-children"],
			false: "",
		},
		isChildrenSelected: {
			true: styles["lambda-menu-item-children-selected"],
			false: "",
		},
	},
	defaultVariants: {
		selected: false,
		disabled: false,
		isLast: false,
		hasChildren: false,
		isChildrenSelected: false,
	},
});

export const menuItemContentVariants = cva(styles["lambda-menu-item-content"], {
	variants: {
		selected: {
			true: styles["lambda-menu-item-content-selected"],
			false: "",
		},
		disabled: {
			true: styles["lambda-menu-item-content-disabled"],
			false: "",
		},
		hasChildren: {
			true: styles["lambda-menu-item-content-has-children"],
			false: "",
		},
	},
	defaultVariants: {
		selected: false,
		disabled: false,
		hasChildren: false,
	},
});

export const menuItemExpandedIconVariants = cva(styles["lambda-menu-expanded-icon"], {
	variants: {
		size: {
			small: styles["lambda-menu-expanded-icon-small"],
			medium: styles["lambda-menu-expanded-icon-medium"],
			large: styles["lambda-menu-expanded-icon-large"],
		},
		expanded: {
			true: styles["lambda-menu-expanded-icon-expanded"],
			false: styles["lambda-menu-expanded-icon-collapsed"],
		},
	},
	defaultVariants: {
		size: "medium",
		expanded: false,
	},
});

export const menuItemLabelVariants = cva(styles["lambda-menu-label"], {
	variants: {
		size: {
			small: styles["lambda-menu-label-small"],
			medium: styles["lambda-menu-label-medium"],
			large: styles["lambda-menu-label-large"],
		},
		selected: {
			true: styles["lambda-menu-label-selected"],
			false: "",
		},
		hasChildren: {
			true: styles["lambda-menu-label-children"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		selected: false,
		hasChildren: false,
	},
});

export const menuItemLabelIconVariants = cva(styles["lambda-menu-label-icon"], {
	variants: {
		size: {
			small: styles["lambda-menu-label-icon-small"],
			medium: styles["lambda-menu-label-icon-medium"],
			large: styles["lambda-menu-label-icon-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type MenuVariants = VariantProps<typeof menuVariants>;
