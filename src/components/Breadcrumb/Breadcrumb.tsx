import { forwardRef } from "react";
import { BreadcrumbProps } from "./breadcrumb.types";
import {
	breadcrumb,
	breadcrumbContainer,
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

export const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
	({ items, size, variant, separator, color, ...props }, ref) => {
		const IconSeparator = NOTIFICATION_ICONS[separator as keyof typeof NOTIFICATION_ICONS];
		return (
			<div ref={ref} {...props} className={breadcrumb({ size, variant })}>
				{items.map((item, index) => (
					<div key={index} className={breadcrumbContainer({ size, variant })}>
						<a href={item.href} className={breadcrumbItem({ size, variant, color })}>
							{item.icon}
							{item.label}
						</a>
						{index < items.length - 1 && (
							<span className={breadcrumbSeparator({ size, variant })}>{IconSeparator}</span>
						)}
					</div>
				))}
			</div>
		);
	}
);
