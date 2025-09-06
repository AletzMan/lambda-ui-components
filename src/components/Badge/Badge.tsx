import { forwardRef } from "react";
import { BadgeProps } from "./badge.types";
import { badgeStyles } from "./badge.variants";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, color, size, radius, children, text, count, maxCount, ...props }, ref) => {
		return (
			<div
				className={clsx(
					badgeStyles({
						size,
						radius,
						color,
						hasCount: count !== undefined && count >= 0,
						hasText: text !== undefined,
					}),
					className
				)}
				{...props}
				ref={ref}
			>
				<span>
					{count !== undefined && count >= 0 ? (
						maxCount !== undefined && count > maxCount && maxCount > 0 ? (
							<span>
								{maxCount}
								<PlusIcon />
							</span>
						) : (
							count
						)
					) : (
						text
					)}
				</span>
			</div>
		);
	}
);
