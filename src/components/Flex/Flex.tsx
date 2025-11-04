import { FlexProps } from "./flex.types";
import { flexVariants } from "./flex.variants";
import { forwardRef } from "react";
import clsx from "clsx";

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
	(
		{
			children,
			direction = "row",
			justify = "flex-start",
			align = "flex-start",
			gap = "0",
			wrap = "nowrap",
			style,
			className,
			...props
		},
		ref
	) => {
		const gapValue = typeof gap === "number" ? `${gap}px` : gap;

		// Si el usuario no pasa un gap en style, usamos el nuestro.
		const mergedStyle = {
			...style,
			...(style?.gap ? {} : { gap: gapValue }),
		};
		return (
			<div
				ref={ref}
				style={mergedStyle}
				className={clsx(
					flexVariants({
						direction,
						justify,
						align,
						wrap,
					}),
					className
				)}
				{...props}
			>
				{children}
			</div>
		);
	}
);

Flex.displayName = "Flex";
