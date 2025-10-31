import { FlexProps } from "./flex.types";
import { flexVariants } from "./flex.variants";
import { forwardRef } from "react";

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
	(
		{
			children,
			direction = "row",
			justify = "flex-start",
			align = "flex-start",
			gap = "0",
			wrap = "nowrap",
			...props
		},
		ref
	) => {
		return (
			<div
				ref={ref}
				style={{ gap }}
				className={flexVariants({
					direction,
					justify,
					align,
					wrap,
				})}
				{...props}
			>
				{children}
			</div>
		);
	}
);

Flex.displayName = "Flex";
