import { forwardRef } from "react";
import { DividerProps } from "./divider.types";
import { dividerVariants } from "./divider.variants";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
	({ variant, orientation, color, type, size }, ref) => {
		return (
			<div ref={ref} className={dividerVariants({ variant, orientation, color, type, size })} />
		);
	}
);
