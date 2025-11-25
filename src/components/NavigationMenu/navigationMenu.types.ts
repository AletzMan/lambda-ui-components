// Archivo renombrado, el contenido está en menu.types..ts (ahora navigationMenu.types.ts).
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { NavigationMenuVariants } from "./navigationMenu.variants";

export interface NavigationMenuData {
	/**
	 * Unique identifier for the menu item.
	 */
	id: string;
	/**
	 * Text label to display for the item.
	 */
	label: string;
	/**
	 * Optional icon to display next to the label.
	 */
	icon?: ReactNode;
	/**
	 * Nested menu items (sub-menus).
	 */
	children?: NavigationMenuData[];
	/**
	 * If true, the item is disabled and cannot be interacted with.
	 */
	disabled?: boolean;
	/**
	 * URL path for navigation.
	 */
	path?: string;
	/**
	 * HTML target attribute for the link (e.g., "_blank").
	 */
	target?: HTMLAttributeAnchorTarget;
}

export interface NavigationMenuProps {
	/**
	 * Array of menu items to render.
	 */
	data: NavigationMenuData[];
	/**
	 * Array of item IDs that should be expanded by default.
	 */
	defaultExpanded?: string[];
	/**
	 * Controls the size of the menu items.
	 * @default "medium"
	 */
	size?: NavigationMenuVariants["size"];
	/**
	 * Callback fired when a node is selected.
	 */
	onNodeSelect?: (id: string) => void;
	/**
	 * Custom renderer for the menu item label.
	 */
	renderLabel?: (node: NavigationMenuData) => ReactNode;
	/**
	 * Additional CSS class names.
	 */
	className?: string;
	/**
	 * Inline styles.
	 */
	style?: React.CSSProperties;
	/**
	 * If true, displays connecting lines between parent and child items.
	 * @default false
	 */
	showLines?: boolean;
	/**
	 * Style of the connecting lines (if shown).
	 * @default "solid"
	 */
	styleLines?: NavigationMenuVariants["styleLines"];
	/**
	 * If true, keeps all menu items expanded by default.
	 * @default false
	 */
	alwaysOpen?: boolean;
	/**
	 * Visual style for the selected item.
	 * @default "highlight"
	 */
	selectedStyle?: NavigationMenuVariants["selectedStyle"];
	/**
	 * The current active path for highlighting.
	 */
	currentPath: string;
}

export interface NavigationMenuItemProps {
	/**
	 * The data object representing this menu item.
	 */
	node: NavigationMenuData;
	/**
	 * The depth level of the item in the hierarchy (0-based).
	 */
	level?: number;
	/**
	 * If true, this is the first item in its group.
	 */
	isFirst?: boolean;
	/**
	 * If true, this is the last item in its group.
	 */
	isLast?: boolean;
	/**
	 * The current active path used for highlighting selected items.
	 */
	currentPath?: string;
	/**
	 * Callback function to handle navigation.
	 */
	onNavigate?: (path: string) => void;
}

export interface NavigationMenuLabelProps {
	/**
	 * The data object for the menu item label.
	 */
	node: NavigationMenuData;
	/**
	 * If true, the item is currently selected.
	 */
	selected?: boolean;
	/**
	 * Click handler for the label.
	 */
	onClick?: () => void;
}

export interface NavigationMenuItemChildrenProps {
	/**
	 * Array of child menu items to render.
	 */
	nodes: NavigationMenuData[];
	/**
	 * The depth level of the children (parent level + 1).
	 */
	level?: number;
}
