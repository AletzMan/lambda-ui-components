import { forwardRef, useState, Fragment, useEffect } from "react";
import { BreadcrumbProps, BreadcrumbItem as ItemBreadcrumb } from "./breadcrumb.types";
import {
	variantBreadcrumb,
	variantBreadcrumbContainer,
	variantBreadcrumbEllipsis,
	variantBreadcrumbItem,
	variantBreadcrumbSeparator,
	BreadcrumbVariants,
} from "./breadcrumb.variants";
import { ChevronRight, Dot, ArrowRight } from "lucide-react";

const NOTIFICATION_ICONS = {
	chevron: <ChevronRight />,
	slash: "/",
	dot: <Dot />,
	arrow: <ArrowRight />,
};

const BreadcrumbItem = ({
	item,
	size,
	variant,
	radius,
	color,
}: {
	item: ItemBreadcrumb;
	size: BreadcrumbVariants["size"];
	variant: BreadcrumbVariants["variant"];
	color: BreadcrumbVariants["color"];
	radius: BreadcrumbVariants["radius"];
}) => {
	return item.href ? (
		<a href={item.href} className={variantBreadcrumbItem({ size, variant, color, radius })}>
			{item.icon}
			{item.label}
		</a>
	) : (
		<span className={variantBreadcrumbItem({ size, variant, color, radius })}>
			{item.icon}
			{item.label}
		</span>
	);
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
	({ items, size, radius, variant, color, maxItems = 0, ...props }, ref) => {
		const [collapsed, setCollapsed] = useState(maxItems !== 0);
		const IconSeparator = NOTIFICATION_ICONS[variant as keyof typeof NOTIFICATION_ICONS];
		const shouldCollapse = items!.length > maxItems + 1;
		const language = typeof document !== "undefined" ? document.documentElement.lang : "es";
		useEffect(() => {
			if (maxItems === 0) {
				setCollapsed(false);
			} else {
				setCollapsed(true);
			}
		}, [maxItems]);

		const visibleItems =
			shouldCollapse && collapsed ? [...items.slice(0, maxItems), items[items!.length - 1]] : items;

		const handleEllipsisClick = () => {
			setCollapsed(false);
		};

		return (
			<nav ref={ref} {...props} className={variantBreadcrumb({ size, variant, radius })}>
				<ol className={variantBreadcrumbContainer({ size, variant })}>
					{visibleItems.map((item, index, array) => (
						<Fragment key={index}>
							{shouldCollapse && collapsed && index === maxItems && (
								<>
									<ul>
										<button
											className={variantBreadcrumbEllipsis({ size, radius })}
											onClick={handleEllipsisClick}
											title={language === "es" ? "Mostrar más" : "Show more"}
										>
											ˑˑˑ
										</button>
									</ul>
									<ul>
										<span className={variantBreadcrumbSeparator({ size, variant })}>{IconSeparator}</span>
									</ul>
								</>
							)}
							<ul>
								<BreadcrumbItem
									item={item}
									size={size}
									variant={variant}
									color={color}
									radius={radius}
								/>
							</ul>
							{index < array!.length - 1 && (
								<ul>
									<span className={variantBreadcrumbSeparator({ size, variant })}>{IconSeparator}</span>
								</ul>
							)}
						</Fragment>
					))}
				</ol>
			</nav>
		);
	}
);
