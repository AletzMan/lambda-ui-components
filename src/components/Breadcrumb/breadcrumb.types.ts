import { BreadcrumbVariants } from "./breadcrumb.variants";

export interface BreadcrumbProps {
	/**
	 * Array of breadcrumb items
	 */
	items: BreadcrumbItem[];
	/**
	 * Size of the breadcrumb
	 */
	size?: BreadcrumbVariants["size"];
	/**
	 * Radius of the breadcrumb
	 */
	radius?: BreadcrumbVariants["radius"];
	/**
	 * Variant of the breadcrumb separator
	 */
	variant?: BreadcrumbVariants["variant"];
	/**
	 * Color of the breadcrumb
	 */
	color?: BreadcrumbVariants["color"];
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
