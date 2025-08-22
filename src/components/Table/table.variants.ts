import { cva, VariantProps } from "class-variance-authority";
import styles from "./table.module.css";

export const containerVariants = cva(styles["lambda-table-container"], {
	variants: {
		variant: {
			flat: styles["lambda-table-container-flat"],
			underlined: styles["lambda-table-container-underlined"],
			striped: styles["lambda-table-container-striped"],
			bordered: styles["lambda-table-container-bordered"],
		},
	},
	defaultVariants: {
		variant: "flat",
	},
});

export const tableVariants = cva(styles["lambda-table"], {
	variants: {
		size: {
			tiny: styles["lambda-table-tiny"],
			small: styles["lambda-table-small"],
			medium: styles["lambda-table-medium"],
			large: styles["lambda-table-large"],
		},
		variant: {
			flat: styles["lambda-table-flat"],
			underlined: styles["lambda-table-underlined"],
			striped: styles["lambda-table-striped"],
			bordered: styles["lambda-table-bordered"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "flat",
	},
});

export const headerVariants = cva(styles["lambda-table-header"], {
	variants: {
		size: {
			tiny: styles["lambda-table-header-tiny"],
			small: styles["lambda-table-header-small"],
			medium: styles["lambda-table-header-medium"],
			large: styles["lambda-table-header-large"],
		},
		variant: {
			flat: styles["lambda-table-header-flat"],
			underlined: styles["lambda-table-header-underlined"],
			striped: styles["lambda-table-header-striped"],
			bordered: styles["lambda-table-header-bordered"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "flat",
	},
});

export const headerCellVariants = cva(styles["lambda-table-header-cell"], {
	variants: {
		size: {
			tiny: styles["lambda-table-header-cell-tiny"],
			small: styles["lambda-table-header-cell-small"],
			medium: styles["lambda-table-header-cell-medium"],
			large: styles["lambda-table-header-cell-large"],
		},
		variant: {
			flat: styles["lambda-table-header-cell-flat"],
			underlined: styles["lambda-table-header-cell-underlined"],
			striped: styles["lambda-table-header-cell-striped"],
			bordered: styles["lambda-table-header-cell-bordered"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "flat",
	},
});

export const bodyVariants = cva(styles["lambda-table-body"], {
	variants: {
		size: {
			tiny: styles["lambda-table-body-tiny"],
			small: styles["lambda-table-body-small"],
			medium: styles["lambda-table-body-medium"],
			large: styles["lambda-table-body-large"],
		},
		variant: {
			flat: styles["lambda-table-body-flat"],
			underlined: styles["lambda-table-body-underlined"],
			striped: styles["lambda-table-body-striped"],
			bordered: styles["lambda-table-body-bordered"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "flat",
	},
});

export const rowVariants = cva(styles["lambda-table-row"], {
	variants: {
		size: {
			tiny: styles["lambda-table-row-tiny"],
			small: styles["lambda-table-row-small"],
			medium: styles["lambda-table-row-medium"],
			large: styles["lambda-table-row-large"],
		},
		variant: {
			flat: styles["lambda-table-row-flat"],
			underlined: styles["lambda-table-row-underlined"],
			striped: styles["lambda-table-row-striped"],
			bordered: styles["lambda-table-row-bordered"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "flat",
	},
});

export const cellVariants = cva(styles["lambda-table-cell"], {
	variants: {
		size: {
			tiny: styles["lambda-table-cell-tiny"],
			small: styles["lambda-table-cell-small"],
			medium: styles["lambda-table-cell-medium"],
			large: styles["lambda-table-cell-large"],
		},
		variant: {
			flat: styles["lambda-table-cell-flat"],
			underlined: styles["lambda-table-cell-underlined"],
			striped: styles["lambda-table-cell-striped"],
			bordered: styles["lambda-table-cell-bordered"],
		},
		align: {
			left: styles["lambda-table-cell-align-left"],
			center: styles["lambda-table-cell-align-center"],
			right: styles["lambda-table-cell-align-right"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "flat",
	},
});

export type TableVariants = VariantProps<typeof tableVariants>;
