import styles from "./rating.module.css";
import { cva } from "class-variance-authority";
import { VariantProps } from "class-variance-authority";

export const ratingVariants = cva(styles["lambda-rating"], {
	variants: {
		variant: {
			outline: styles["lambda-rating-outline"],
			solid: styles["lambda-rating-solid"],
			bordered: styles["lambda-rating-bordered"],
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
		type: {
			icon: styles["lambda-rating-icon"],
			string: styles["lambda-rating-string"],
			custom: styles["lambda-rating-custom"],
		},
		textPosition: {
			top: styles["lambda-rating-text-top"],
			bottom: styles["lambda-rating-text-bottom"],
			right: styles["lambda-rating-text-right"],
		},
	},
	defaultVariants: {
		size: "medium",
		color: "default",
		variant: "solid",
	},
});

export const ratingItem = cva(styles["lambda-rating-item"], {
	variants: {
		size: {
			tiny: styles["lambda-rating-item-tiny"],
			small: styles["lambda-rating-item-small"],
			medium: styles["lambda-rating-item-medium"],
			large: styles["lambda-rating-item-large"],
		},
		color: {
			default: styles["lambda-rating-item-default"],
			primary: styles["lambda-rating-item-primary"],
			secondary: styles["lambda-rating-item-secondary"],
			danger: styles["lambda-rating-item-danger"],
			success: styles["lambda-rating-item-success"],
			warning: styles["lambda-rating-item-warning"],
			info: styles["lambda-rating-item-info"],
		},
		variant: {
			outline: styles["lambda-rating-item-outline"],
			solid: styles["lambda-rating-item-solid"],
			bordered: styles["lambda-rating-item-bordered"],
		},
		active: {
			true: styles["lambda-rating-item-active"],
			false: styles["lambda-rating-item-inactive"],
		},
		current: {
			true: styles["lambda-rating-item-current"],
			false: styles["lambda-rating-item-inactive"],
		},
		type: {
			icon: styles["lambda-rating-item-icon"],
			string: styles["lambda-rating-item-string"],
			custom: styles["lambda-rating-item-custom"],
		},
	},
	defaultVariants: {
		size: "medium",
		type: "icon",
		variant: "solid", 
		color: "default",
		current: false, 
		active: false, 
	},
});

export type RatingVariants = VariantProps<typeof ratingVariants>;
