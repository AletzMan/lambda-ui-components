import { forwardRef, useState, Fragment, useEffect } from "react";
import { BreadcrumbProps, BreadcrumbItem as ItemBreadcrumb } from "./breadcrumb.types";
import {
	breadcrumb,
	breadcrumbContainer,
	breadcrumbEllipsis,
	breadcrumbItem,
	breadcrumbSeparator,
	BreadcrumbVariants,
} from "./breadcrumb.variants";
import { ChevronRight, Dot, ArrowRight } from "lucide-react";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

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
		<a href={item.href} className={breadcrumbItem({ size, variant, color, radius })}>
			{item.icon}
			{item.label}
		</a>
	) : (
		<span className={breadcrumbItem({ size, variant, color, radius })}>
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
		const language = document.documentElement.lang;
		const { radiusSelector } = useUIConfig();
		const radiusValue = radius || radiusSelector;
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
			<nav ref={ref} {...props} className={breadcrumb({ size, variant, radius: radiusValue })}>
				<ol className={breadcrumbContainer({ size, variant })}>
					{visibleItems.map((item, index, array) => (
						<Fragment key={index}>
							{shouldCollapse && collapsed && index === maxItems && (
								<>
									<ul>
										<button
											className={breadcrumbEllipsis({ size, radius: radiusValue })}
											onClick={handleEllipsisClick}
											title={language === "es" ? "Mostrar más" : "Show more"}
										>
											ˑˑˑ
										</button>
									</ul>
									<ul>
										<span className={breadcrumbSeparator({ size, variant })}>{IconSeparator}</span>
									</ul>
								</>
							)}
							<ul>
								<BreadcrumbItem
									item={item}
									size={size}
									variant={variant}
									color={color}
									radius={radiusSelector}
								/>
							</ul>
							{index < array!.length - 1 && (
								<ul>
									<span className={breadcrumbSeparator({ size, variant })}>{IconSeparator}</span>
								</ul>
							)}
						</Fragment>
					))}
				</ol>
			</nav>
		);
	}
);
