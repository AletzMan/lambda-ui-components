import { cva, VariantProps } from "class-variance-authority";
import styles from "./range.module.css";

export const rangeContainer = cva(styles["lambda-range-container"], {
	variants: {
		disabled: {
			true: styles["lambda-range-container-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		disabled: false,
	},
});

export const rangeTrack = cva(styles["lambda-range-track"], {
	variants: {
		size: {
			small: styles["lambda-range-track-small"],
			medium: styles["lambda-range-track-medium"],
			large: styles["lambda-range-track-large"],
		},
		viewBar: { true: styles["lambda-range-track-view-bar"], false: "" },
		disabled: { true: styles["lambda-range-track-disabled"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		viewBar: true,
		disabled: false,
	},
});

export const rangeFill = cva(styles["lambda-range-fill"], {
	variants: {
		size: {
			small: styles["lambda-range-fill-small"],
			medium: styles["lambda-range-fill-medium"],
			large: styles["lambda-range-fill-large"],
		},
		disabled: { true: styles["lambda-range-fill-disabled"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
	},
});

export const rangeHandle = cva(styles["lambda-range-handle"], {
	variants: {
		size: {
			small: styles["lambda-range-handle-small"],
			medium: styles["lambda-range-handle-medium"],
			large: styles["lambda-range-handle-large"],
		},
		disabled: { true: styles["lambda-range-handle-disabled"], false: "" },
		isDragging: { true: styles["lambda-range-handle-dragging"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		isDragging: false,
	},
});

export const rangeValue = cva(styles["lambda-range-handle-value"], {
	variants: {
		size: {
			small: styles["lambda-range-handle-value-small"],
			medium: styles["lambda-range-handle-value-medium"],
			large: styles["lambda-range-handle-value-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type RangeContainerVariants = VariantProps<typeof rangeContainer>;
export type RangeTrackVariants = VariantProps<typeof rangeTrack>;
export type RangeFillVariants = VariantProps<typeof rangeFill>;
export type RangeHandleVariants = VariantProps<typeof rangeHandle>;
