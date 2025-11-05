// Archivo renombrado, el contenido está en menu.types..ts (ahora navigationMenu.types.ts).
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { NavigationMenuVariants } from "./navigationMenu.variants";

export interface NavigationMenuData {
	id: string;
	label: string;
	icon?: ReactNode;
	children?: NavigationMenuData[];
	disabled?: boolean;
	path?: string;
	target?: HTMLAttributeAnchorTarget;
	// Puedes agregar más campos según tus necesidades
}

export interface NavigationMenuProps {
	data: NavigationMenuData[];
	defaultExpanded?: string[];

	size?: NavigationMenuVariants["size"];
	onNodeSelect?: (id: string) => void;
	renderLabel?: (node: NavigationMenuData) => ReactNode;
	className?: string;
	style?: React.CSSProperties;
	showLines?: boolean;
	styleLines?: NavigationMenuVariants["styleLines"];
	alwaysOpen?: boolean;
	selectedStyle?: NavigationMenuVariants["selectedStyle"];
	currentPath: string;
}

export interface NavigationMenuItemProps {
	node: NavigationMenuData;
	level?: number;
	isFirst?: boolean;
	isLast?: boolean;
	currentPath?: string;
	onNavigate?: (path: string) => void;
}

export interface NavigationMenuLabelProps {
	node: NavigationMenuData;
	selected?: boolean;
	onClick?: () => void;
}

export interface NavigationMenuItemChildrenProps {
	nodes: NavigationMenuData[];
	level?: number;
}
