import { forwardRef } from "react";
import { BadgeProps } from "./badge.types";
import { badgeStyles } from "./badge.variants";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, color, size, children, text, count, maxCount, ...props }, ref) => {
		const { radiusSelector } = useUIConfig();
		return (
			<div
				className={clsx(
					badgeStyles({
						size,
						radius: radiusSelector,
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
