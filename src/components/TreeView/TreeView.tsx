import React, {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	forwardRef,
} from "react";
import clsx from "clsx";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
	treeViewItemContentVariants,
	treeViewItemVariants,
	treeViewLabelVariants,
	treeViewVariants,
	TreeViewVariants,
} from "./treeview.variants";

interface TreeViewContextValue {
	expanded: Set<string>;
	toggleNode: (id: string) => void;
	selectedId?: string;
	size?: TreeViewVariants["size"];
	selectNode: (id: string) => void;
	renderLabel?: (node: TreeNode) => React.ReactNode;
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
		{ data, defaultExpanded = [], selectedId, onNodeSelect, renderLabel, className, style, size },
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
				size,
			}),
			[expanded, toggleNode, selected, selectNode, renderLabel, size]
		);

		return (
			<TreeViewContext.Provider value={contextValue}>
				<div ref={ref} className={clsx(treeViewVariants({ size }), className)} style={style}>
					{data.map((node) => (
						<TreeViewItem key={node.id} node={node} level={0} />
					))}
				</div>
			</TreeViewContext.Provider>
		);
	}
);

// -------------------- TreeView Item --------------------
const TreeViewItem = forwardRef<HTMLDivElement, TreeViewItemProps>(({ node, level = 0 }, ref) => {
	const { expanded, toggleNode, selectedId, selectNode, size } = useTreeViewContext();
	const isExpanded = !!node.children && expanded.has(node.id);
	const isSelected = selectedId === node.id;
	const isDisabled = !!node.disabled;

	return (
		<div
			ref={ref}
			className={clsx(
				treeViewItemVariants({ selected: isSelected, disabled: isDisabled }),
				styles[`lambda-treeview-item-level${level}`]
			)}
			role="treeitem"
			aria-expanded={!!node.children ? isExpanded : undefined}
			aria-selected={isSelected}
			aria-disabled={isDisabled}
			tabIndex={isDisabled ? -1 : 0}
		>
			<div className={treeViewItemContentVariants({ selected: isSelected, disabled: isDisabled })}>
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
						{isExpanded ? (
							<ChevronDown
								className={treeViewExpandedIconVariants({ size, expanded: isExpanded })}
							/>
						) : (
							<ChevronLeft
								className={treeViewExpandedIconVariants({ size, expanded: isExpanded })}
							/>
						)}
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
							{node.children.map((child) => (
								<TreeViewItem key={child.id} node={child} level={level + 1} />
							))}
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</div>
	);
});

// -------------------- TreeView Label --------------------
const TreeViewLabel = forwardRef<HTMLDivElement, TreeViewLabelProps>(
	({ node, selected, onClick }, ref) => {
		const { renderLabel, size } = useTreeViewContext();
		const hasChildren = !!node.children;
		return (
			<div
				ref={ref}
				className={clsx(treeViewLabelVariants({ selected, size, hasChildren }), {
					[styles["lambda-treeview-label-selected"]]: selected,
				})}
				onClick={onClick}
				role="presentation"
			>
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
