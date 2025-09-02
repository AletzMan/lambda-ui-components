import styles from "./rating.module.css";
import { cva } from "class-variance-authority";
import { VariantProps } from "class-variance-authority";

export const ratingVariants = cva(styles["lambda-rating"], {
	variants: {
		variant: {
			outline: styles["lambda-rating-outline"],
			flat: styles["lambda-rating-flat"],
			solid: styles["lambda-rating-solid"],
		},
		color: {
			default: styles["lambda-rating-default"],
			primary: styles["lambda-rating-primary"],
			danger: styles["lambda-rating-danger"],
			success: styles["lambda-rating-success"],
			warning: styles["lambda-rating-warning"],
			info: styles["lambda-rating-info"],
		},
		size: {
			tiny: styles["lambda-rating-tiny"],
			small: styles["lambda-rating-small"],
			medium: styles["lambda-rating-medium"],
			large: styles["lambda-rating-large"],
		},
	},
	defaultVariants: {
		size: "medium",
		color: "default",
		variant: "flat",
	},
});

export type RatingVariants = VariantProps<typeof ratingVariants>;
