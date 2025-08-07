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
	variant?: "outline" | "flat" | "none" | undefined;

	/**
	 * Separator of the breadcrumb
	 */
	separator?: "chevron" | "slash" | "dot" | "arrow" | undefined;
	/**
	 * Color of the breadcrumb
	 */
	color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | undefined;
	/**
	 * Maximun number of items to show
	 */
	maxItems?: number;
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
