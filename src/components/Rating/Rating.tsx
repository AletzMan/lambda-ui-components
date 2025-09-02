import { StarIcon } from "lucide-react";
import { RatingVariants, ratingVariants } from "./rating.variants";
import clsx from "clsx";
import { forwardRef } from "react";
import { RatingProps } from "./rating.types";

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
	({ className, size, variant, color, value, onChange, ...props }, ref) => {
		function ratingItem({ size }: { size: RatingVariants["size"] }): string | undefined {
			switch (size) {
				case "tiny":
					return "lambda-rating-item-tiny";
				case "small":
					return "lambda-rating-item-small";
				case "medium":
					return "lambda-rating-item-medium";
				case "large":
					return "lambda-rating-item-large";
			}
		}

		return (
			<div
				ref={ref}
				className={clsx(
					ratingVariants({
						size,
						variant,
						color,
					}),
					className
				)}
				{...props}
			>
				{Array.from({ length: value || 0 }, (_, index) => (
					<span key={index} className={ratingItem({ size })}>
						<StarIcon />
					</span>
				))}
			</div>
		);
	}
);
