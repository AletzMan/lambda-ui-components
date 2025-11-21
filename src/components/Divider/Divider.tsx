import { forwardRef } from "react";
import { DividerProps } from "./divider.types";
import { dividerVariants } from "./divider.variants";
import clsx from "clsx";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
	(
		{
			variant,
			orientation = "horizontal",
			color,
			size,
			children,
			contentPosition,
			spacing = 5,
			className,
		},
		ref
	) => {
		return (
			<div
				ref={ref}
				role="separator"
				tabIndex={-1}
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
				className={clsx(
					dividerVariants({
						variant,
						orientation,
						color,
						size,
						contentPosition,
						hasContent: !!children,
					}),
					className
				)}
			>
				{children}
			</div>
		);
	}
);
