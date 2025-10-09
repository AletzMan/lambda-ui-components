import React, {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	forwardRef,
	isValidElement,
} from "react";
import clsx from "clsx";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./treeview.module.css";
import type {
	TreeViewProps,
	TreeViewItemProps,
	TreeViewLabelProps,
	TreeNode,
} from "./treeview.types";
import {
	treeViewExpandedIconVariants,
	treeViewItemBranchVariants,
	treeViewItemContentVariants,
	treeViewItemVariants,
	treeViewLabelIconVariants,
	treeViewLabelVariants,
	treeViewVariants,
	TreeViewVariants,
} from "./treeview.variants";
import { getIconFileTreeItem } from "../../_util/helpers";

interface TreeViewContextValue {
	expanded: Set<string>;
	toggleNode: (id: string) => void;
	selectedId?: string;
	size?: TreeViewVariants["size"];
	selectNode: (id: string) => void;
	renderLabel?: (node: TreeNode) => React.ReactNode;
	isDirectory?: boolean;
	showLines?: TreeViewVariants["showLines"];
	styleLines?: TreeViewVariants["styleLines"];
}

const TreeViewContext = createContext<TreeViewContextValue | undefined>(undefined);
const useTreeViewContext = () => {
	const ctx = useContext(TreeViewContext);
	if (!ctx) throw new Error("useTreeViewContext must be used within a TreeView");
	return ctx;
};

// -------------------- TreeView Root --------------------
const TreeViewRoot = forwardRef<HTMLDivElement, TreeViewProps>(
	(
		{
			data,
			defaultExpanded = [],
			selectedId,
			onNodeSelect,
			renderLabel,
			className,
			style,
			size,
			isDirectory,
			showLines,
			styleLines,
		},
		ref
	) => {
		const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));
		const [selected, setSelected] = useState<string | undefined>(selectedId);

		const toggleNode = useCallback((id: string) => {
			setExpanded((prev) => {
				const newSet = new Set(prev);
				if (newSet.has(id)) newSet.delete(id);
				else newSet.add(id);
				return newSet;
			});
		}, []);

		const selectNode = useCallback(
			(id: string) => {
				setSelected(id);
				onNodeSelect?.(id);
			},
			[onNodeSelect]
		);

		const contextValue = useMemo(
			() => ({
				expanded,
				toggleNode,
				selectedId: selected,
				selectNode,
				renderLabel,
				isDirectory,
				showLines,
				styleLines,
				size,
			}),
			[
				expanded,
				toggleNode,
				selected,
				selectNode,
				renderLabel,
				size,
				isDirectory,
				showLines,
				styleLines,
			]
		);

		return (
			<TreeViewContext.Provider value={contextValue}>
				<div
					ref={ref}
					className={clsx(treeViewVariants({ size, showLines, styleLines }), className)}
					style={style}
				>
					{data.map((node, index) => (
						<TreeViewItem
							key={node.id}
							node={node}
							level={0}
							isFirst={index === 0}
							isLast={index === data.length - 1}
						/>
					))}
				</div>
			</TreeViewContext.Provider>
		);
	}
);

// -------------------- TreeView Item --------------------
const TreeViewItem = forwardRef<HTMLDivElement, TreeViewItemProps>(
	({ node, level = 0, isFirst = false, isLast = false }, ref) => {
		const { expanded, toggleNode, selectedId, selectNode, size } = useTreeViewContext();
		const isExpanded = !!node.children && expanded.has(node.id);
		const isSelected = selectedId === node.id;
		const isDisabled = !!node.disabled;
		const hasChildren = !!node.children;

		return (
			<div
				ref={ref}
				className={clsx(
					treeViewItemVariants({ selected: isSelected, disabled: isDisabled, isLast }),
					styles[`lambda-treeview-item-level${level}`]
				)}
				role="treeitem"
				aria-expanded={!!node.children ? isExpanded : undefined}
				aria-selected={isSelected}
				aria-disabled={isDisabled}
				tabIndex={isDisabled ? -1 : 0}
			>
				<div
					className={treeViewItemBranchVariants({
						hasChildren,
						expanded: isExpanded,
						isFirst,
						isLast,
					})}
				></div>
				<div
					className={treeViewItemContentVariants({
						selected: isSelected,
						disabled: isDisabled,
						hasChildren,
					})}
				>
					{node.children && (
						<button
							type="button"
							className={clsx(styles["lambda-treeview-toggle"], {
								[styles["lambda-treeview-toggle-expanded"]]: isExpanded,
							})}
							onClick={() => toggleNode(node.id)}
							aria-label={isExpanded ? "Collapse" : "Expand"}
							disabled={isDisabled}
							tabIndex={-1}
						>
							<ChevronRight
								className={treeViewExpandedIconVariants({ size, expanded: isExpanded })}
							/>
						</button>
					)}
					<TreeViewLabel
						node={node}
						selected={isSelected}
						onClick={() => !isDisabled && selectNode(node.id)}
					/>
				</div>

				{node.children && (
					<AnimatePresence initial={false}>
						{isExpanded && (
							<motion.div
								role="group"
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								className={styles["lambda-treeview-group"]}
							>
								{node.children.map((child, index) => (
									<TreeViewItem
										key={child.id}
										node={child}
										level={level + 1}
										isFirst={index === 0}
										isLast={index === node.children!.length - 1}
									/>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				)}
			</div>
		);
	}
);

// -------------------- TreeView Label --------------------
const TreeViewLabel = forwardRef<HTMLDivElement, TreeViewLabelProps>(
	({ node, selected, onClick }, ref) => {
		const { renderLabel, size, isDirectory, expanded } = useTreeViewContext();
		const isExpanded = expanded.has(node.id);
		const hasChildren = !!node.children;

		const Icon = isValidElement(getIconFileTreeItem(node))
			? React.cloneElement(getIconFileTreeItem(node), {
					className: clsx(treeViewLabelIconVariants({ size }), {}),
			  })
			: null;
		const customIcon = isValidElement<SVGAElement>(node.icon)
			? React.cloneElement(node.icon, {
					className: clsx(treeViewLabelIconVariants({ size }), {}),
			  })
			: null;
		return (
			<div
				ref={ref}
				className={clsx(treeViewLabelVariants({ selected, size, hasChildren }), {
					[styles["lambda-treeview-label-selected"]]: selected,
				})}
				onClick={onClick}
				role="presentation"
			>
				{customIcon}
				{isDirectory && !hasChildren && !node.icon && Icon}
				{isDirectory && hasChildren && !node.icon && (
					<>
						{isExpanded ? (
							<FolderOpen className={treeViewExpandedIconVariants({ size })} />
						) : (
							<Folder className={treeViewExpandedIconVariants({ size })} />
						)}
					</>
				)}

				{renderLabel ? renderLabel(node) : node.label}
			</div>
		);
	}
);

// -------------------- Export --------------------
export const TreeView = Object.assign(TreeViewRoot, {
	Item: TreeViewItem,
	Label: TreeViewLabel,
});
export { TreeViewContext, useTreeViewContext };
