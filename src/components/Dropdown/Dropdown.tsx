import {
	cloneElement,
	createContext,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	ReactNode,
	useContext,
} from "react";
import styles from "./dropdown.module.css";
import clsx from "clsx";
import { useJoin } from "../Join/Join";
import { dropdownItemVariants, dropdownMenuVariants, dropdownVariants } from "./dropdown.variants";
import { DropdownProps } from "./dropdown.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { usePopover } from "../../_internal/hooks/translation/usePopover/usePopover";

const DropdownContext = createContext<
	(DropdownProps & { setIsOpen?: (value: boolean) => void }) | undefined
>(undefined);

const useDropdownContext = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error("useDropdownContext debe ser usado dentro de un DropdownProvider");
	}
	return context;
};

const DropdownRoot = forwardRef<HTMLButtonElement, DropdownProps>(
	({ className, variant, size, radius, icon, text, joinposition, children, ...props }, ref) => {
		const { radiusField } = useUIConfig();
		const { isOpen, setIsOpen, menuPosition, triggerRef, contentRef, handleKeyDown } = usePopover<
			HTMLDivElement,
			HTMLDivElement
		>({ x: 0, y: 5 });
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

		return (
			<DropdownContext.Provider
				value={{ variant, size, radius, icon, text, joinposition, setIsOpen }}
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
					{isOpen &&
						createPortal(
							<div
								className={clsx(dropdownMenuVariants({ menuPosition: menuPosition.position }))}
								style={{ top: menuPosition.top, left: menuPosition.left }}
								ref={contentRef}
								onKeyDown={(e) => {
									handleKeyDown(e);
								}}
								tabIndex={0}
							>
								{children}
							</div>,
							document.body
						)}
				</div>
			</DropdownContext.Provider>
		);
	}
);

const DropdownItem = ({
	icon,
	text,
	shortcutKeys,
	url,
	...props
}: Omit<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, "children"> & {
	icon?: ReactNode;
	text?: string;
	shortcutKeys?: string[];
	url?: string;
}) => {
	const { size, setIsOpen } = useDropdownContext();

	const onClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
		setIsOpen?.(false);
		props.onClick?.(e);
	};

	const RenderItem = ({ children }: { children: ReactNode }) => {
		if (url) {
			return (
				<a href={url} className={clsx(dropdownItemVariants({ size }))} onClick={onClick}>
					{children}
				</a>
			);
		} else {
			return (
				<button className={clsx(dropdownItemVariants({ size }))} onClick={onClick}>
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

const DropdownItemCustom = ({ children }: { children: ReactNode }) => {
	const { setIsOpen } = useDropdownContext();
	const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsOpen?.(false);
		e.stopPropagation();
	};
	return (
		<div className={clsx(styles["lambda-dropdown-item-custom"])} onClick={onClick} tabIndex={0}>
			{children}
		</div>
	);
};

export const Dropdown = Object.assign(DropdownRoot, {
	Item: DropdownItem,
	ItemCustom: DropdownItemCustom,
});
