import { cva, VariantProps } from "class-variance-authority";
import styles from "./breadcrumb.module.css";

export const variantBreadcrumb = cva(styles["lambda-breadcrumb"], {
	variants: {
		size: {
			tiny: styles["lambda-breadcrumb-tiny"],
			small: styles["lambda-breadcrumb-small"],
			medium: styles["lambda-breadcrumb-medium"],
			large: styles["lambda-breadcrumb-large"],
		},
		variant: {
			chevron: styles["lambda-breadcrumb-chevron"],
			slash: styles["lambda-breadcrumb-slash"],
			dot: styles["lambda-breadcrumb-dot"],
			arrow: styles["lambda-breadcrumb-arrow"],
			stepped: styles["lambda-breadcrumb-stepped"],
		},
		radius: {
			default: styles["lambda-breadcrumb-radius-default"],
			none: styles["lambda-breadcrumb-radius-none"],
			tiny: styles["lambda-breadcrumb-radius-tiny"],
			small: styles["lambda-breadcrumb-radius-small"],
			medium: styles["lambda-breadcrumb-radius-medium"],
			large: styles["lambda-breadcrumb-radius-large"],
			full: styles["lambda-breadcrumb-radius-full"],
		},
	},
	defaultVariants: {
		size: "small",
		variant: "chevron",
		radius: "default",
	},
});

export const variantBreadcrumbItem = cva(styles["lambda-breadcrumb-item"], {
	variants: {
		size: {
			tiny: styles["lambda-breadcrumb-item-tiny"],
			small: styles["lambda-breadcrumb-item-small"],
			medium: styles["lambda-breadcrumb-item-medium"],
			large: styles["lambda-breadcrumb-item-large"],
		},
		radius: {
			default: styles["lambda-breadcrumb-item-radius-default"],
			none: styles["lambda-breadcrumb-item-radius-none"],
			tiny: styles["lambda-breadcrumb-item-radius-tiny"],
			small: styles["lambda-breadcrumb-item-radius-small"],
			medium: styles["lambda-breadcrumb-item-radius-medium"],
			large: styles["lambda-breadcrumb-item-radius-large"],
			full: styles["lambda-breadcrumb-item-radius-full"],
		},
		variant: {
			chevron: styles["lambda-breadcrumb-item-chevron"],
			slash: styles["lambda-breadcrumb-item-slash"],
			dot: styles["lambda-breadcrumb-item-dot"],
			arrow: styles["lambda-breadcrumb-item-arrow"],
			stepped: styles["lambda-breadcrumb-item-stepped"],
		},
		color: {
			neutral: styles["lambda-breadcrumb-item-neutral"],
			primary: styles["lambda-breadcrumb-item-primary"],
			secondary: styles["lambda-breadcrumb-item-secondary"],
			success: styles["lambda-breadcrumb-item-success"],
			danger: styles["lambda-breadcrumb-item-danger"],
			warning: styles["lambda-breadcrumb-item-warning"],
			info: styles["lambda-breadcrumb-item-info"],
		},
	},
	defaultVariants: {
		size: "small",
		variant: "chevron",
		radius: "default",
		color: "primary",
	},
});

export const variantBreadcrumbSeparator = cva(styles["lambda-breadcrumb-separator"], {
	variants: {
		size: {
			tiny: styles["lambda-breadcrumb-separator-tiny"],
			small: styles["lambda-breadcrumb-separator-small"],
			medium: styles["lambda-breadcrumb-separator-medium"],
			large: styles["lambda-breadcrumb-separator-large"],
		},
		variant: {
			chevron: styles["lambda-breadcrumb-separator-chevron"],
			slash: styles["lambda-breadcrumb-separator-slash"],
			dot: styles["lambda-breadcrumb-separator-dot"],
			arrow: styles["lambda-breadcrumb-separator-arrow"],
			stepped: styles["lambda-breadcrumb-separator-stepped"],
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "chevron",
	},
});

export const variantBreadcrumbContainer = cva(styles["lambda-breadcrumb-container"], {
	variants: {
		size: {
			tiny: styles["lambda-breadcrumb-container-tiny"],
			small: styles["lambda-breadcrumb-container-small"],
			medium: styles["lambda-breadcrumb-container-medium"],
			large: styles["lambda-breadcrumb-container-large"],
		},
		variant: {
			chevron: styles["lambda-breadcrumb-container-chevron"],
			slash: styles["lambda-breadcrumb-container-slash"],
			dot: styles["lambda-breadcrumb-container-dot"],
			arrow: styles["lambda-breadcrumb-container-arrow"],
			stepped: styles["lambda-breadcrumb-container-stepped"],
		},
	},
	defaultVariants: {
		size: "small",
		variant: "chevron",
	},
});

export const variantBreadcrumbEllipsis = cva(styles["lambda-breadcrumb-ellipsis"], {
	variants: {
		radius: {
			default: styles["lambda-breadcrumb-ellipsis-radius-default"],
			none: styles["lambda-breadcrumb-ellipsis-radius-none"],
			tiny: styles["lambda-breadcrumb-ellipsis-radius-tiny"],
			small: styles["lambda-breadcrumb-ellipsis-radius-small"],
			medium: styles["lambda-breadcrumb-ellipsis-radius-medium"],
			large: styles["lambda-breadcrumb-ellipsis-radius-large"],
			full: styles["lambda-breadcrumb-ellipsis-radius-full"],
		},
		size: {
			tiny: styles["lambda-breadcrumb-ellipsis-tiny"],
			small: styles["lambda-breadcrumb-ellipsis-small"],
			medium: styles["lambda-breadcrumb-ellipsis-medium"],
			large: styles["lambda-breadcrumb-ellipsis-large"],
		},
	},
	defaultVariants: {
		size: "small",
		radius: "default",
	},
});

export type BreadcrumbVariants = VariantProps<typeof variantBreadcrumbItem>;
