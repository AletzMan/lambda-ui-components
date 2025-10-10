import { ReactNode } from "react";
import { MenuVariants } from "./Menu.variants";
import { TreeViewVariants } from "../TreeView/treeview.variants";

export interface MenuNode {
	id: string;
	label: string;
	icon?: ReactNode;
	children?: MenuNode[];
	disabled?: boolean;
	path?: string;
	// Puedes agregar más campos según tus necesidades
}

export interface MenuProps {
	data: MenuNode[];
	defaultExpanded?: string[];
	selectedId?: string;
	size?: MenuVariants["size"];
	onNodeSelect?: (id: string) => void;
	renderLabel?: (node: MenuNode) => ReactNode;
	className?: string;
	style?: React.CSSProperties;
	isDirectory?: boolean;
	showLines?: boolean;
	styleLines?: TreeViewVariants["styleLines"];
}

export interface MenuItemProps {
	node: MenuNode;
	level?: number;
	isFirst?: boolean;
	isLast?: boolean;
}

export interface MenuLabelProps {
	node: MenuNode;
	selected?: boolean;
	onClick?: () => void;
}

export interface MenuItemChildrenProps {
	nodes: MenuNode[];
	level?: number;
}
