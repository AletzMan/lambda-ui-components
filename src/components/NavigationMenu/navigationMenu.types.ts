// Archivo renombrado, el contenido está en menu.types..ts (ahora navigationMenu.types.ts).
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { NavigationMenuVariants } from "./navigationMenu.variants";

export interface NavigationMenuNode {
	id: string;
	label: string;
	icon?: ReactNode;
	children?: NavigationMenuNode[];
	disabled?: boolean;
	path?: string;
	target?: HTMLAttributeAnchorTarget;
	// Puedes agregar más campos según tus necesidades
}

export interface NavigationMenuProps {
	data: NavigationMenuNode[];
	defaultExpanded?: string[];

	size?: NavigationMenuVariants["size"];
	onNodeSelect?: (id: string) => void;
	renderLabel?: (node: NavigationMenuNode) => ReactNode;
	className?: string;
	style?: React.CSSProperties;
	showLines?: boolean;
	styleLines?: NavigationMenuVariants["styleLines"];
	alwaysOpen?: boolean;
	selectedStyle?: NavigationMenuVariants["selectedStyle"];
}

export interface NavigationMenuItemProps {
	node: NavigationMenuNode;
	level?: number;
	isFirst?: boolean;
	isLast?: boolean;
	currentPath?: string;
	onNavigate?: (path: string) => void;
}

export interface NavigationMenuLabelProps {
	node: NavigationMenuNode;
	selected?: boolean;
	onClick?: () => void;
}

export interface NavigationMenuItemChildrenProps {
	nodes: NavigationMenuNode[];
	level?: number;
}
