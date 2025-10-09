import { ReactNode } from "react";
import { TreeViewVariants } from "./treeview.variants";

export interface TreeNode {
	id: string;
	label: string;
	icon?: ReactNode;
	children?: TreeNode[];
	disabled?: boolean;
	// Puedes agregar más campos según tus necesidades
}

export interface TreeViewProps {
	data: TreeNode[];
	defaultExpanded?: string[];
	selectedId?: string;
	size?: TreeViewVariants["size"];
	onNodeSelect?: (id: string) => void;
	renderLabel?: (node: TreeNode) => ReactNode;
	className?: string;
	style?: React.CSSProperties;
	isDirectory?: boolean;
	showLines?: boolean;
	styleLines?: TreeViewVariants["styleLines"];
}

export interface TreeViewItemProps {
	node: TreeNode;
	level?: number;
	isFirst?: boolean;
	isLast?: boolean;
}

export interface TreeViewLabelProps {
	node: TreeNode;
	selected?: boolean;
	onClick?: () => void;
}

export interface TreeViewChildrenProps {
	nodes: TreeNode[];
	level?: number;
}
