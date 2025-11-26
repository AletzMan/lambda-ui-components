import { ReactNode } from "react";
import { TreeViewVariants } from "./treeview.variants";

export interface TreeNode {
	/** Unique identifier for the node */
	id: string;
	/** Label to display for the node */
	label: string;
	/** Optional icon to display next to the label */
	icon?: ReactNode;
	/** Array of child nodes */
	children?: TreeNode[];
	/** Whether the node is disabled */
	disabled?: boolean;
}

export interface TreeViewProps {
	/** Array of tree nodes to render */
	data: TreeNode[];
	/** Array of node IDs to expand by default */
	defaultExpanded?: string[];
	/** ID of the currently selected node */
	selectedId?: string;
	/** Size of the tree items */
	size?: TreeViewVariants["size"];
	/** Callback fired when a node is selected */
	onNodeSelect?: (id: string) => void;
	/** Custom render function for node labels */
	renderLabel?: (node: TreeNode) => ReactNode;
	/** Additional CSS class for the root element */
	className?: string;
	/** Inline styles for the root element */
	style?: React.CSSProperties;
	/** If true, renders folder icons for parent nodes */
	isDirectory?: boolean;
	/** If true, shows connection lines between nodes */
	showLines?: boolean;
	/** Style of the connection lines */
	styleLines?: TreeViewVariants["styleLines"];
}

export interface TreeViewItemProps {
	/**
	 * The node to render
	 */
	node: TreeNode;
	/**
	 * The level of the node in the tree
	 */
	level?: number;
	/**
	 * Whether the node is the first child of its parent
	 */
	isFirst?: boolean;
	/**
	 * Whether the node is the last child of its parent
	 */
	isLast?: boolean;
}

export interface TreeViewLabelProps {
	/**
	 * The node to render
	 */
	node: TreeNode;
	/**
	 * Whether the node is selected
	 */
	selected?: boolean;
	/**
	 * Callback fired when the node is clicked
	 */
	onClick?: () => void;
}

export interface TreeViewChildrenProps {
	/**
	 * Array of nodes to render
	 */
	nodes: TreeNode[];
	/**
	 * The level of the nodes in the tree
	 */
	level?: number;
}
