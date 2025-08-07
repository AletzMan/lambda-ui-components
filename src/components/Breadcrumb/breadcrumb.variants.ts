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
			none: styles["breadcrumb-none"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "none",
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
			none: styles["breadcrumb-item-none"],
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
		variant: "none",
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
			none: styles["breadcrumb-separator-none"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "none",
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
			none: styles["breadcrumb-container-none"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "none",
	},
});

export const breadcrumbEllipsis = cva(styles["breadcrumb-ellipsis"], {
	variants: {
		size: {
			tiny: styles["breadcrumb-ellipsis-tiny"],
			small: styles["breadcrumb-ellipsis-small"],
			medium: styles["breadcrumb-ellipsis-medium"],
			large: styles["breadcrumb-ellipsis-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});
