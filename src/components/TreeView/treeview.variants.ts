import { cva, VariantProps } from "class-variance-authority";
import styles from "./treeview.module.css";

export const treeViewVariants = cva(styles["lambda-treeview"], {
	variants: {
		size: {
			small: styles["lambda-treeview-small"],
			medium: styles["lambda-treeview-medium"],
			large: styles["lambda-treeview-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export const treeViewItemVariants = cva(styles["lambda-treeview-item"], {
	variants: {
		selected: {
			true: styles["lambda-treeview-item-selected"],
			false: "",
		},
		disabled: {
			true: styles["lambda-treeview-item-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		selected: false,
		disabled: false,
	},
});

export const treeViewItemContentVariants = cva(styles["lambda-treeview-item-content"], {
	variants: {
		selected: {
			true: styles["lambda-treeview-item-content-selected"],
			false: "",
		},
		disabled: {
			true: styles["lambda-treeview-item-content-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		selected: false,
		disabled: false,
	},
});

export const treeViewExpandedIconVariants = cva(styles["lambda-treeview-expanded-icon"], {
	variants: {
		size: {
			small: styles["lambda-treeview-expanded-icon-small"],
			medium: styles["lambda-treeview-expanded-icon-medium"],
			large: styles["lambda-treeview-expanded-icon-large"],
		},
		expanded: {
			true: styles["lambda-treeview-expanded-icon-expanded"],
			false: styles["lambda-treeview-expanded-icon-collapsed"],
		},
	},
	defaultVariants: {
		size: "medium",
		expanded: false,
	},
});

export const treeViewLabelVariants = cva(styles["lambda-treeview-label"], {
	variants: {
		size: {
			small: styles["lambda-treeview-label-small"],
			medium: styles["lambda-treeview-label-medium"],
			large: styles["lambda-treeview-label-large"],
		},
		selected: {
			true: styles["lambda-treeview-label-selected"],
			false: "",
		},
		hasChildren: {
			true: styles["lambda-treeview-label-children"],
			false: "",
		},
	},
	defaultVariants: {
		size: "medium",
		selected: false,
		hasChildren: false,
	},
});

export type TreeViewVariants = VariantProps<typeof treeViewVariants>;
