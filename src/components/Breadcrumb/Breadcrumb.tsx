import { forwardRef, useState, Fragment, useEffect } from "react";
import { BreadcrumbProps, BreadcrumbItem as ItemBreadcrumb } from "./breadcrumb.types";
import {
	breadcrumb,
	breadcrumbContainer,
	breadcrumbEllipsis,
	breadcrumbItem,
	breadcrumbSeparator,
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
	color,
}: {
	item: ItemBreadcrumb;
	size: "tiny" | "small" | "medium" | "large" | undefined;
	variant: "none" | "flat" | "outline" | undefined;
	color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | undefined;
}) => {
	const Component = item.href ? "a" : "span";
	return (
		<Component href={item.href} className={breadcrumbItem({ size, variant, color })}>
			{item.icon}
			{item.label}
		</Component>
	);
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
	({ items, size, variant, separator, color, maxItems = 0, ...props }, ref) => {
		const [collapsed, setCollapsed] = useState(maxItems !== 0);
		const IconSeparator = NOTIFICATION_ICONS[separator as keyof typeof NOTIFICATION_ICONS];
		const shouldCollapse = items.length > maxItems + 1;
		const language = document.documentElement.lang;

		useEffect(() => {
			if (maxItems === 0) {
				setCollapsed(false);
			} else {
				setCollapsed(true);
			}
		}, [maxItems]);

		const visibleItems =
			shouldCollapse && collapsed ? [...items.slice(0, maxItems), items[items.length - 1]] : items;

		const handleEllipsisClick = () => {
			setCollapsed(false);
		};

		return (
			<nav ref={ref} {...props} className={breadcrumb({ size, variant })}>
				<ol className={breadcrumbContainer({ size, variant })}>
					{visibleItems.map((item, index, array) => (
						<Fragment key={index}>
							{shouldCollapse && collapsed && index === maxItems && (
								<>
									<ul>
										<button
											className={breadcrumbEllipsis({ size })}
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
								<BreadcrumbItem item={item} size={size} variant={variant} color={color} />
							</ul>
							{index < array.length - 1 && (
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
