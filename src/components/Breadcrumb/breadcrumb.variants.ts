import { cva } from "class-variance-authority";
import styles from "./breadcrumb.module.css";

export const breadcrumb = cva(styles["breadcrumb"], {
	variants: {
		size: {
			tiny: styles["breadcrumb-tiny"],
			small: styles["breadcrumb-small"],
			medium: styles["breadcrumb-medium"],
			large: styles["breadcrumb-large"],
		},
		variant: {
			outline: styles["breadcrumb-outline"],
			flat: styles["breadcrumb-flat"],
			solid: styles["breadcrumb-solid"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
	},
});

export const breadcrumbItem = cva(styles["breadcrumb-item"], {
	variants: {
		size: {
			tiny: styles["breadcrumb-item-tiny"],
			small: styles["breadcrumb-item-small"],
			medium: styles["breadcrumb-item-medium"],
			large: styles["breadcrumb-item-large"],
		},
		variant: {
			outline: styles["breadcrumb-item-outline"],
			flat: styles["breadcrumb-item-flat"],
			solid: styles["breadcrumb-item-solid"],
		},
		color: {
			primary: styles["breadcrumb-item-primary"],
			secondary: styles["breadcrumb-item-secondary"],
			success: styles["breadcrumb-item-success"],
			danger: styles["breadcrumb-item-danger"],
			warning: styles["breadcrumb-item-warning"],
			info: styles["breadcrumb-item-info"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
		color: "primary",
	},
});

export const breadcrumbSeparator = cva(styles["breadcrumb-separator"], {
	variants: {
		size: {
			tiny: styles["breadcrumb-separator-tiny"],
			small: styles["breadcrumb-separator-small"],
			medium: styles["breadcrumb-separator-medium"],
			large: styles["breadcrumb-separator-large"],
		},
		variant: {
			outline: styles["breadcrumb-separator-outline"],
			flat: styles["breadcrumb-separator-flat"],
			solid: styles["breadcrumb-separator-solid"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
	},
});

export const breadcrumbContainer = cva(styles["breadcrumb-container"], {
	variants: {
		size: {
			tiny: styles["breadcrumb-container-tiny"],
			small: styles["breadcrumb-container-small"],
			medium: styles["breadcrumb-container-medium"],
			large: styles["breadcrumb-container-large"],
		},
		variant: {
			outline: styles["breadcrumb-container-outline"],
			flat: styles["breadcrumb-container-flat"],
			solid: styles["breadcrumb-container-solid"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "solid",
	},
});
