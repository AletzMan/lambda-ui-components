import { forwardRef } from "react";
import { BadgeProps } from "./badge.types";
import { badgeStyles, countStyles, closeButtonStyles } from "./badge.variants";
import { X } from "lucide-react";

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, color, size, variant, radius, children, text, count, onClose, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={badgeStyles({
					color,
					size,
					variant,
					radius,
					hasCount: count !== undefined && count >= 0,
				})}
				{...props}
			>
				{children}
				{text}
				{count !== undefined && count >= 0 && (
					<span className={countStyles({ size })}>{count}</span>
				)}
				{onClose && (
					<button className={closeButtonStyles({ size })} onClick={onClose}>
						<X />
					</button>
				)}
			</div>
		);
	}
);
