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
			chevron: styles["breadcrumb-chevron"],
			slash: styles["breadcrumb-slash"],
			dot: styles["breadcrumb-dot"],
			arrow: styles["breadcrumb-arrow"],
			stepped: styles["breadcrumb-stepped"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "chevron",
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
			chevron: styles["breadcrumb-item-chevron"],
			slash: styles["breadcrumb-item-slash"],
			dot: styles["breadcrumb-item-dot"],
			arrow: styles["breadcrumb-item-arrow"],
			stepped: styles["breadcrumb-item-stepped"],
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
		variant: "chevron",
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
			chevron: styles["breadcrumb-separator-chevron"],
			slash: styles["breadcrumb-separator-slash"],
			dot: styles["breadcrumb-separator-dot"],
			arrow: styles["breadcrumb-separator-arrow"],
			stepped: styles["breadcrumb-separator-stepped"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "chevron",
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
			chevron: styles["breadcrumb-container-chevron"],
			slash: styles["breadcrumb-container-slash"],
			dot: styles["breadcrumb-container-dot"],
			arrow: styles["breadcrumb-container-arrow"],
			stepped: styles["breadcrumb-container-stepped"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "chevron",
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
