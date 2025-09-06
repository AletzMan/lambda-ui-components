import { forwardRef } from "react";
import { DividerProps } from "./divider.types";
import { dividerVariants } from "./divider.variants";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
	({ variant, orientation, color, size, children, contentPosition }, ref) => {
		return (
			<div
				ref={ref}
				role="separator"
				aria-orientation={orientation || "horizontal"}
				className={dividerVariants({
					variant,
					orientation,
					color,
					size,
					contentPosition,
					hasContent: !!children,
				})}
			>
				{children}
			</div>
		);
	}
);
