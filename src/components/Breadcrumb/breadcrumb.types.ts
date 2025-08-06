export interface BreadcrumbProps {
	/**
	 * Array of breadcrumb items
	 */
	items: BreadcrumbItem[];
	/**
	 * Size of the breadcrumb
	 */
	size?: "tiny" | "small" | "medium" | "large" | undefined;
	/**
	 * Variant of the breadcrumb
	 */
	variant?: "outline" | "flat" | "solid" | undefined;

	/**
	 * Separator of the breadcrumb
	 */
	separator?: "chevron" | "slash" | "dot" | "arrow" | undefined;
	/**
	 * Color of the breadcrumb
	 */
	color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | undefined;
}

export interface BreadcrumbItem {
	/**
	 * Label of the breadcrumb item
	 */
	label: string;
	/**
	 * URL of the breadcrumb item
	 */
	href: string;
	/**
	 * Icon of the breadcrumb item
	 */
	icon?: React.ReactNode;
}
