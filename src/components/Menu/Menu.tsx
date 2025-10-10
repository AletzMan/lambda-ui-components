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
import styles from "./menu.module.css";
import type { MenuProps, MenuItemProps, MenuLabelProps, MenuNode } from "./menu.types.";
import {
	menuItemExpandedIconVariants,
	menuItemBranchVariants,
	menuItemContentVariants,
	menuItemVariants,
	menuItemLabelIconVariants,
	menuItemLabelVariants,
	menuVariants,
	MenuVariants,
} from "./Menu.variants";
import { getIconFileTreeItem } from "../../_util/helpers";

interface MenuContextValue {
	expanded: Set<string>;
	toggleNode: (id: string) => void;
	selectedId?: string;
	size?: MenuVariants["size"];
	selectNode: (id: string) => void;
	renderLabel?: (node: MenuNode) => React.ReactNode;
	isDirectory?: boolean;
	showLines?: MenuVariants["showLines"];
	styleLines?: MenuVariants["styleLines"];
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);
const useMenuContext = () => {
	const ctx = useContext(MenuContext);
	if (!ctx) throw new Error("useMenuContext must be used within a Menu");
	return ctx;
};

// -------------------- Menu Root --------------------
const MenuRoot = forwardRef<HTMLDivElement, MenuProps>(
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
			<MenuContext.Provider value={contextValue}>
				<div
					ref={ref}
					className={clsx(menuVariants({ size, showLines, styleLines }), className)}
					style={style}
				>
					{data.map((node, index) => (
						<MenuItem
							key={node.id}
							node={node}
							level={0}
							isFirst={index === 0}
							isLast={index === data.length - 1}
						/>
					))}
				</div>
			</MenuContext.Provider>
		);
	}
);

// -------------------- Menu Item --------------------
const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
	({ node, level = 0, isFirst = false, isLast = false }, ref) => {
		const { expanded, toggleNode, selectedId, selectNode, size } = useMenuContext();
		const isExpanded = !!node.children && expanded.has(node.id);
		const isSelected = selectedId === node.id;
		const isDisabled = !!node.disabled;
		const hasChildren = !!node.children;

		return (
			<div
				ref={ref}
				className={clsx(
					menuItemVariants({ selected: isSelected, disabled: isDisabled, isLast }),
					styles[`lambda-menu-item-level${level}`]
				)}
				role="menuitem"
				aria-expanded={!!node.children ? isExpanded : undefined}
				aria-selected={isSelected}
				aria-disabled={isDisabled}
				tabIndex={isDisabled ? -1 : 0}
			>
				<div
					className={menuItemBranchVariants({
						hasChildren,
						expanded: isExpanded,
						isFirst,
						isLast,
					})}
				></div>
				<div
					className={menuItemContentVariants({
						selected: isSelected,
						disabled: isDisabled,
						hasChildren,
					})}
				>
					{node.children && (
						<button
							type="button"
							className={clsx(styles["lambda-menu-toggle"], {
								[styles["lambda-menu-toggle-expanded"]]: isExpanded,
							})}
							onClick={() => toggleNode(node.id)}
							aria-label={isExpanded ? "Collapse" : "Expand"}
							disabled={isDisabled}
							tabIndex={-1}
						>
							<ChevronRight
								className={menuItemExpandedIconVariants({ size, expanded: isExpanded })}
							/>
						</button>
					)}
					<MenuLabel
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
								className={styles["lambda-menu-group"]}
							>
								{node.children.map((child, index) => (
									<MenuItem
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

// -------------------- Menu Label --------------------
const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(({ node, selected, onClick }, ref) => {
	const { renderLabel, size, isDirectory, expanded } = useMenuContext();
	const isExpanded = expanded.has(node.id);
	const hasChildren = !!node.children;

	const Icon = isValidElement(getIconFileTreeItem(node))
		? React.cloneElement(getIconFileTreeItem(node), {
				className: clsx(menuItemLabelIconVariants({ size }), {}),
		  })
		: null;
	const customIcon = isValidElement<SVGAElement>(node.icon)
		? React.cloneElement(node.icon, {
				className: clsx(menuItemLabelIconVariants({ size }), {}),
		  })
		: null;
	return (
		<div
			ref={ref}
			className={clsx(menuItemLabelVariants({ selected, size, hasChildren }), {
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
						<FolderOpen className={menuItemExpandedIconVariants({ size })} />
					) : (
						<Folder className={menuItemExpandedIconVariants({ size })} />
					)}
				</>
			)}

			{renderLabel ? renderLabel(node) : node.label}
		</div>
	);
});

// -------------------- Export --------------------
export const Menu = Object.assign(MenuRoot, {
	Item: MenuItem,
	Label: MenuLabel,
});
export { MenuContext, useMenuContext };
