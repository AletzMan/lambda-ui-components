import { cva } from "class-variance-authority";
import styles from "./skeleton.module.css";

export const skeletonVariants = cva(styles["lambda-skeleton"], {
	variants: {
		animation: {
			fade: styles["lambda-skeleton-fade"],
			wave: styles["lambda-skeleton-wave"],
		},
		shape: {
			rect: styles["lambda-skeleton-rect"],
			circle: styles["lambda-skeleton-circle"],
		},
		rounded: {
			true: styles["lambda-skeleton-rounded"],
			false: styles["lambda-skeleton-not-rounded"],
		},
	},
	defaultVariants: {
		animation: "wave",
		shape: "rect",
		rounded: false,
	},
});
