import {
	Children,
	cloneElement,
	createContext,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	ReactNode,
	useContext,
	useRef,
} from "react";
import styles from "./dropdown.module.css";
import clsx from "clsx";
import { useJoin } from "../Join/Join";
import { dropdownItemVariants, dropdownMenuVariants, dropdownVariants } from "./dropdown.variants";
import { DropdownProps } from "./dropdown.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { usePopover } from "../../_internal/hooks/usePopover";
import { AnimatePresence, motion } from "framer-motion";
import { Divider } from "../Divider/Divider";

const DropdownContext = createContext<
	| (DropdownProps & {
			setIsOpen?: (value: boolean) => void;
			highlightedIndex?: number;
	  })
	| undefined
>(undefined);

const useDropdownContext = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error("useDropdownContext debe ser usado dentro de un DropdownProvider");
	}
	return context;
};
const isClient = typeof window !== "undefined";

const DropdownRoot = forwardRef<HTMLButtonElement, DropdownProps>(
	({ className, variant, size, radius, icon, text, joinposition, children, ...props }, ref) => {
		const itemCallbacks = useRef<Array<(() => void) | undefined>>([]);
		const { radiusField } = useUIConfig();
		const {
			isOpen,
			setIsOpen,
			menuPosition,
			triggerRef,
			contentRef,
			handleKeyDown,
			highlightedIndex,
		} = usePopover<HTMLDivElement, HTMLDivElement>({ x: 0, y: 3 }, itemCallbacks.current);
		const radiusValue = radius || radiusField;
		let contextSize, contextRadius, contextDisabled;

		try {
			const context = useJoin();
			contextSize = context.size;
			contextRadius = context.radius;
			contextDisabled = context.disabled;
		} catch (_e) {
			contextSize = size;
			contextRadius = radiusValue;
			contextDisabled = props.disabled;
		}
		const renderChildren: React.ReactNode[] = [];
		const navigableIndexes: number[] = []; // para saber cuáles se pueden navegar

		Children.forEach(children, (child, i) => {
			if (!isValidElement(child)) return;

			if (child.type === Divider) {
				renderChildren.push(child);
				return;
			}

			// Item navegable
			if (child.type === Dropdown.Item || child.type === Dropdown.ItemCustom) {
				const idx = navigableIndexes.length;
				const cloned = cloneElement(child as React.ReactElement<DropdownItemCustomProps>, {
					index: idx,
					"data-navigable": true,
					key: i,
				});
				itemCallbacks.current[idx] = (
					child as React.ReactElement<DropdownItemCustomProps>
				).props.onSelectOption;
				renderChildren.push(cloned);
				navigableIndexes.push(i);
				return;
			}

			// Otros elementos
			renderChildren.push(child);
		});

		return (
			<DropdownContext.Provider
				value={{ variant, size, radius, icon, text, joinposition, setIsOpen, highlightedIndex }}
			>
				<div className={clsx(styles[`lambda-dropdown-wrapper`])} ref={triggerRef}>
					<button
						ref={ref}
						aria-label={props["aria-label"]}
						className={clsx(
							dropdownVariants({
								variant,
								size: contextSize,
								disabled: contextDisabled,
								radius: contextRadius,
								joinposition,
								iconOnly: text ? false : true,
								active: isOpen,
							})
						)}
						disabled={contextDisabled || undefined}
						onClick={() => setIsOpen(!isOpen)}
						{...props}
					>
						<div className={clsx(styles["lambda-dropdown-content"])}>
							{icon && <span className={clsx(styles["lambda-dropdown-icon"])}>{icon}</span>}
							{text && <span className={clsx(styles["lambda-dropdown-label"])}>{text}</span>}
						</div>
						{text ? (
							<ChevronDown className={clsx(styles["lambda-dropdown-icon-arrow"])} />
						) : undefined}
					</button>
					{isClient &&
						createPortal(
							<AnimatePresence mode="wait">
								{isOpen && (
									<motion.div
										initial={{ opacity: 0, y: -16 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -16 }}
										transition={{ type: "spring", stiffness: 300, damping: 24 }}
										className={clsx(dropdownMenuVariants())}
										style={{ top: menuPosition.top, left: menuPosition.left }}
										ref={contentRef}
										onKeyDown={(e) => {
											handleKeyDown(e);
										}}
										tabIndex={0}
									>
										{renderChildren}
									</motion.div>
								)}
							</AnimatePresence>,
							document.body
						)}
				</div>
			</DropdownContext.Provider>
		);
	}
);

interface DropdownItemProps {
	index?: number;
	icon?: ReactNode;
	text?: string;
	shortcutKeys?: string[];
	url?: string;
	onSelectOption?: () => void | undefined;
}

const DropdownItem = ({
	index,
	icon,
	text,
	shortcutKeys,
	url,
	onSelectOption,
	...props
}: DropdownItemProps &
	Omit<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, "children"> & {
		index?: number;
		icon?: ReactNode;
		text?: string;
		shortcutKeys?: string[];
		url?: string;
		onSelectOption?: () => void;
	}) => {
	const { size, setIsOpen, highlightedIndex } = useDropdownContext();

	const onClick = () => {
		setIsOpen?.(false);
		onSelectOption?.();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>) => {
		if (e.key === "Enter") {
			onSelectOption?.();
			setIsOpen?.(false);
		}
	};

	const RenderItem = ({ children }: { children: ReactNode }) => {
		if (url) {
			return (
				<a
					href={url}
					tabIndex={highlightedIndex}
					data-navigable="true"
					className={clsx(dropdownItemVariants({ size, active: highlightedIndex === index }))}
					onClick={onClick}
					onKeyDown={handleKeyDown}
				>
					{children}
				</a>
			);
		} else {
			return (
				<button
					tabIndex={highlightedIndex}
					data-navigable="true"
					className={clsx(dropdownItemVariants({ size, active: highlightedIndex === index }))}
					onClick={onClick}
					onKeyDown={handleKeyDown}
				>
					{children}
				</button>
			);
		}
	};
	return (
		<RenderItem {...props}>
			{isValidElement<SVGAElement>(icon)
				? cloneElement(icon, {
						className: clsx(styles["lambda-dropdown-item-icon"]),
				  })
				: undefined}
			{text && <span className={clsx(styles["lambda-dropdown-item-label"])}>{text}</span>}
			{shortcutKeys && (
				<div className={clsx(styles["lambda-dropdown-item-shortcut-container"])}>
					{shortcutKeys.map((key, index) => (
						<span key={index} className={clsx(styles["lambda-dropdown-item-shortcut"])}>
							{key}
						</span>
					))}
				</div>
			)}
		</RenderItem>
	);
};

interface DropdownItemCustomProps {
	children: ReactNode;
	"data-navigable"?: boolean;
	index?: number;
	onSelectOption?: () => void;
}

const DropdownItemCustom = ({ children, index, onSelectOption }: DropdownItemCustomProps) => {
	const { setIsOpen, highlightedIndex } = useDropdownContext();
	const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsOpen?.(false);
		e.stopPropagation();
		onSelectOption?.();
	};
	return (
		<div
			tabIndex={highlightedIndex}
			data-navigable={true}
			className={clsx(styles["lambda-dropdown-item-custom"], {
				[styles["lambda-dropdown-item-custom-active"]]: highlightedIndex === index,
			})}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export const Dropdown = Object.assign(DropdownRoot, {
	Item: DropdownItem,
	ItemCustom: DropdownItemCustom,
});
