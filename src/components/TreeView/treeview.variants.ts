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
		isLast: {
			true: styles["lambda-treeview-item-last"],
			false: "",
		},
	},
	defaultVariants: {
		selected: false,
		disabled: false,
		isLast: false,
	},
});

export const treeViewItemBranchVariants = cva(styles["lambda-treeview-item-branch"], {
	variants: {
		hasChildren: {
			true: styles["lambda-treeview-item-branch-has-children"],
			false: "",
		},
		expanded: {
			true: styles["lambda-treeview-item-branch-expanded"],
			false: styles["lambda-treeview-item-branch-collapsed"],
		},
		isFirst: {
			true: styles["lambda-treeview-item-branch-first"],
			false: "",
		},
		isLast: {
			true: styles["lambda-treeview-item-branch-last"],
			false: "",
		},
	},
	defaultVariants: {
		hasChildren: false,
		expanded: false,
		isFirst: false,
		isLast: false,
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
		hasChildren: {
			true: styles["lambda-treeview-item-content-has-children"],
			false: "",
		},
	},
	defaultVariants: {
		selected: false,
		disabled: false,
		hasChildren: false,
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

export const treeViewLabelIconVariants = cva(styles["lambda-treeview-label-icon"], {
	variants: {
		size: {
			small: styles["lambda-treeview-label-icon-small"],
			medium: styles["lambda-treeview-label-icon-medium"],
			large: styles["lambda-treeview-label-icon-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type TreeViewVariants = VariantProps<typeof treeViewVariants>;
