import { forwardRef } from "react";
import { DividerProps } from "./divider.types";
import { dividerVariants } from "./divider.variants";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
	(
		{ variant, orientation = "horizontal", color, size, children, contentPosition, spacing = 5 },
		ref
	) => {
		return (
			<div
				ref={ref}
				role="separator"
				aria-orientation={orientation || "horizontal"}
				style={{
					margin: spacing
						? orientation === "horizontal"
							? `${spacing}px 0`
							: `0 ${spacing}px`
						: orientation === "horizontal"
						? "5px 0"
						: "0 5px",
				}}
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
