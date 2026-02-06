import { cva, VariantProps } from "class-variance-authority";
import styles from "./table.module.css";

export const containerVariants = cva(styles["lambda-table-container"], {
	variants: {
		variant: {
			soft: styles["lambda-table-container-soft"],
			underlined: styles["lambda-table-container-underlined"],
			striped: styles["lambda-table-container-striped"],
			bordered: styles["lambda-table-container-bordered"],
			"bordered-transparent": styles["lambda-table-container-bordered-transparent"],
		},
	},
	defaultVariants: {
		variant: "bordered",
	},
});

export const containerTableVariants = cva(styles["lambda-table-container-table"], {
	variants: {
		variant: {
			soft: styles["lambda-table-container-table-soft"],
			underlined: styles["lambda-table-container-table-underlined"],
			striped: styles["lambda-table-container-table-striped"],
			bordered: styles["lambda-table-container-table-bordered"],
			"bordered-transparent": styles["lambda-table-container-table-bordered-transparent"],
		},
	},
	defaultVariants: {
		variant: "bordered",
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
			soft: styles["lambda-table-soft"],
			underlined: styles["lambda-table-underlined"],
			striped: styles["lambda-table-striped"],
			bordered: styles["lambda-table-bordered"],
			"bordered-transparent": styles["lambda-table-bordered-transparent"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "bordered",
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
			soft: styles["lambda-table-header-soft"],
			underlined: styles["lambda-table-header-underlined"],
			striped: styles["lambda-table-header-striped"],
			bordered: styles["lambda-table-header-bordered"],
			"bordered-transparent": styles["lambda-table-header-bordered-transparent"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "bordered",
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
			soft: styles["lambda-table-header-cell-soft"],
			underlined: styles["lambda-table-header-cell-underlined"],
			striped: styles["lambda-table-header-cell-striped"],
			bordered: styles["lambda-table-header-cell-bordered"],
			"bordered-transparent": styles["lambda-table-header-cell-bordered-transparent"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "bordered",
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
			soft: styles["lambda-table-body-soft"],
			underlined: styles["lambda-table-body-underlined"],
			striped: styles["lambda-table-body-striped"],
			bordered: styles["lambda-table-body-bordered"],
			"bordered-transparent": styles["lambda-table-body-bordered-transparent"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "bordered",
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
			soft: styles["lambda-table-row-soft"],
			underlined: styles["lambda-table-row-underlined"],
			striped: styles["lambda-table-row-striped"],
			bordered: styles["lambda-table-row-bordered"],
			"bordered-transparent": styles["lambda-table-row-bordered-transparent"],
		},
		highlightOnHover: {
			true: styles["lambda-table-row-highlight-on-hover"],
			false: styles["lambda-table-row-no-highlight-on-hover"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "bordered",
		highlightOnHover: false,
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
			soft: styles["lambda-table-cell-soft"],
			underlined: styles["lambda-table-cell-underlined"],
			striped: styles["lambda-table-cell-striped"],
			bordered: styles["lambda-table-cell-bordered"],
			"bordered-transparent": styles["lambda-table-cell-bordered-transparent"],
		},
		align: {
			left: styles["lambda-table-cell-align-left"],
			center: styles["lambda-table-cell-align-center"],
			right: styles["lambda-table-cell-align-right"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "bordered",
		align: "left",
	},
});

export type TableVariants = VariantProps<typeof tableVariants>;
