"use client";
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
import styles from "./navigationMenu.module.css";
import type {
	NavigationMenuProps,
	NavigationMenuItemProps,
	NavigationMenuData,
	NavigationMenuLabelProps,
} from "./navigationMenu.types";
import {
	navigationMenuItemExpandedIconVariants,
	navigationMenuItemContentVariants,
	navigationMenuItemVariants,
	navigationMenuItemLabelIconVariants,
	navigationMenuItemLabelVariants,
	navigationMenuVariants,
	NavigationMenuVariants,
} from "./navigationMenu.variants";
import { getIconFileTreeItem } from "../../_util/helpers";

interface NavigationMenuContextValue {
	expanded: Set<string>;
	toggleNode: (id: string) => void;
	size?: NavigationMenuVariants["size"];
	renderLabel?: (node: NavigationMenuData) => React.ReactNode;
	scrollBehavior?: ScrollLogicalPosition;
	isDirectory?: boolean;
	showLines?: NavigationMenuVariants["showLines"];
	styleLines?: NavigationMenuVariants["styleLines"];
	alwaysOpen?: boolean;
	selectedStyle?: NavigationMenuVariants["selectedStyle"];
	currentPath: string;
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | undefined>(undefined);
const useNavigationMenuContext = () => {
	const ctx = useContext(NavigationMenuContext);
	if (!ctx) throw new Error("useNavigationMenuContext must be used within a NavigationMenu");
	return ctx;
};

// -------------------- NavigationMenu Root --------------------
const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuProps>(
	(
		{
			data,
			defaultExpanded = [],
			renderLabel,
			className,
			style,
			scrollBehavior,
			size,
			showLines,
			styleLines,
			alwaysOpen,
			selectedStyle,
			currentPath,
		},
		ref
	) => {
		const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));

		const toggleNode = useCallback((id: string) => {
			setExpanded((prev) => {
				const newSet = new Set(prev);
				if (newSet.has(id)) newSet.delete(id);
				else newSet.add(id);
				return newSet;
			});
		}, []);

		const handleNavigate = useCallback((path: string) => {
			if (window.location.pathname !== path) {
				window.history.pushState({}, "", path);
				window.dispatchEvent(new PopStateEvent("popstate"));
			}
		}, []);

		const collectAllIds = (nodes: NavigationMenuData[], idSet = new Set<string>()) => {
			nodes.forEach((node) => {
				idSet.add(node.id);
				if (node.children && node.children.length > 0) {
					collectAllIds(node.children, idSet);
				}
			});
			return idSet;
		};

		const contextValue = useMemo(
			() => ({
				expanded: alwaysOpen ? collectAllIds(data) : expanded,
				toggleNode,
				renderLabel,
				showLines,
				styleLines,
				size,
				alwaysOpen,
				selectedStyle,
				scrollBehavior,
				currentPath,
			}),
			[
				expanded,
				toggleNode,
				renderLabel,
				size,
				showLines,
				styleLines,
				alwaysOpen,
				selectedStyle,
				scrollBehavior,
				currentPath,
			]
		);

		return (
			<NavigationMenuContext.Provider value={contextValue}>
				<nav
					ref={ref}
					role="menubar"
					className={clsx(navigationMenuVariants({ size, showLines, styleLines }), className)}
					style={style}
				>
					{data.map((node, index) => (
						<NavigationMenuItem
							key={node.id}
							node={node}
							level={0}
							isFirst={index === 0}
							isLast={index === data.length - 1}
							currentPath={currentPath}
							onNavigate={handleNavigate}
						/>
					))}
				</nav>
			</NavigationMenuContext.Provider>
		);
	}
);

const NavigationMenuItem = forwardRef<HTMLDivElement, NavigationMenuItemProps>(
	({ node, level = 0, isLast = false, onNavigate }, ref) => {
		const { expanded, toggleNode, size, alwaysOpen, selectedStyle, currentPath, scrollBehavior } =
			useNavigationMenuContext();
		const isExpanded = !!node.children && expanded.has(node.id);
		let isSelected = node.path && currentPath === node.path;
		const isDisabled = !!node.disabled;
		const hasChildren = !!node.children;
		const isChildrenSelected = node.children?.some((child) => child.path === currentPath);

		// Ref para el elemento del menú
		const itemRef = React.useRef<HTMLDivElement>(null);

		// Auto-scroll al elemento cuando se selecciona
		React.useEffect(() => {
			if (isSelected && itemRef.current) {
				// Pequeño delay para asegurar que el DOM esté listo
				setTimeout(() => {
					itemRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: scrollBehavior,
						inline: 'nearest'
					});
				}, 100);
			}
		}, [isSelected]);

		return (
			<div
				ref={ref || itemRef}
				className={clsx(
					navigationMenuItemVariants({
						selected: isSelected || false,
						disabled: isDisabled,
						isLast,
						hasChildren,
						isChildrenSelected,
						alwaysOpen,
						selectedStyle,
					}),
					styles[`lambda-navigation-menu-item-level${level}`]
				)}
				role="menuitem"
				aria-expanded={!!node.children ? isExpanded : undefined}
				aria-disabled={isDisabled}
				tabIndex={isDisabled ? -1 : 0}
			>
				{!hasChildren ? (
					<a
						className={navigationMenuItemContentVariants({
							selected: isSelected || false,
							disabled: isDisabled,
							hasChildren,
						})}
						href={level === 0 ? undefined : node.path}
						target={node.target}
					>
						<NavigationMenuLabel node={node} selected={isSelected || false} />
						{node.children && (
							<ChevronRight
								className={navigationMenuItemExpandedIconVariants({
									size,
									expanded: isExpanded,
									alwaysOpen,
								})}
							/>
						)}
					</a>
				) : (
					<button
						className={navigationMenuItemContentVariants({
							selected: isSelected || false,
							disabled: isDisabled,
							hasChildren,
						})}
						onClick={() => toggleNode(node.id)}
					>
						<NavigationMenuLabel node={node} selected={isSelected || false} />
						{node.children && (
							<ChevronRight
								className={navigationMenuItemExpandedIconVariants({
									size,
									expanded: isExpanded,
									alwaysOpen,
								})}
							/>
						)}
					</button>
				)}

				{node.children && (
					<AnimatePresence initial={false}>
						{isExpanded && (
							<motion.div
								role="menu" // <--- CAMBIO CLAVE AQUÍ: Usamos role="menu"
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								className={styles["lambda-navigation-menu-group"]}
							>
								{node.children.map((child, index) => (
									<NavigationMenuItem
										key={child.id}
										node={child}
										level={level + 1}
										isFirst={index === 0}
										isLast={index === node.children!.length - 1}
										onNavigate={onNavigate}
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

// -------------------- NavigationMenu Label --------------------
const NavigationMenuLabel = forwardRef<HTMLDivElement, NavigationMenuLabelProps>(
	({ node, selected, onClick }, ref) => {
		const { renderLabel, size, isDirectory, expanded } = useNavigationMenuContext();
		const isExpanded = expanded.has(node.id);
		const hasChildren = !!node.children;

		const Icon = isValidElement(getIconFileTreeItem(node))
			? React.cloneElement(getIconFileTreeItem(node), {
				className: clsx(navigationMenuItemLabelIconVariants({ size }), {}),
			})
			: null;
		const customIcon = isValidElement<SVGAElement>(node.icon)
			? React.cloneElement(node.icon, {
				className: clsx(navigationMenuItemLabelIconVariants({ size }), {}),
			})
			: null;
		return (
			<div
				ref={ref}
				className={clsx(navigationMenuItemLabelVariants({ selected, size, hasChildren }), {
					[styles["lambda-navigation-menu-label-selected"]]: selected,
				})}
				onClick={onClick}
				role="presentation"
			>
				{customIcon}
				{isDirectory && !hasChildren && !node.icon && Icon}
				{isDirectory && hasChildren && !node.icon && (
					<>
						{isExpanded ? (
							<FolderOpen className={navigationMenuItemExpandedIconVariants({ size })} />
						) : (
							<Folder className={navigationMenuItemExpandedIconVariants({ size })} />
						)}
					</>
				)}

				{renderLabel ? renderLabel(node) : node.label}
			</div>
		);
	}
);

// -------------------- Export --------------------
export const NavigationMenu = Object.assign(NavigationMenuRoot, {
	Item: NavigationMenuItem,
	Label: NavigationMenuLabel,
});
export { NavigationMenuContext, useNavigationMenuContext };