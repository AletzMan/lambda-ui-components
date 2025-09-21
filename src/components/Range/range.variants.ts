import { cva, VariantProps } from "class-variance-authority";
import styles from "./range.module.css";

export const rangeContainer = cva(styles["lambda-range-container"], {
	variants: {
		disabled: {
			true: styles["lambda-range-container-disabled"],
			false: "",
		},
		orientation: {
			vertical: styles["lambda-range-container-vertical"],
			horizontal: styles["lambda-range-container-horizontal"],
		},
	},
	defaultVariants: {
		disabled: false,
		orientation: "horizontal",
	},
});

export const rangeTrack = cva(styles["lambda-range-track"], {
	variants: {
		size: {
			tiny: styles["lambda-range-track-tiny"],
			small: styles["lambda-range-track-small"],
			medium: styles["lambda-range-track-medium"],
			large: styles["lambda-range-track-large"],
		},
		radius: {
			none: styles["lambda-range-track-radius-none"],
			tiny: styles["lambda-range-track-radius-tiny"],
			small: styles["lambda-range-track-radius-small"],
			medium: styles["lambda-range-track-radius-medium"],
			large: styles["lambda-range-track-radius-large"],
			full: styles["lambda-range-track-radius-full"],
		},
		viewBar: { true: styles["lambda-range-track-view-bar"], false: "" },
		disabled: { true: styles["lambda-range-track-disabled"], false: "" },
		orientation: {
			vertical: styles["lambda-range-track-vertical"],
			horizontal: styles["lambda-range-track-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		viewBar: true,
		disabled: false,
		orientation: "horizontal",
	},
});

export const rangeFill = cva(styles["lambda-range-fill"], {
	variants: {
		size: {
			tiny: styles["lambda-range-fill-tiny"],
			small: styles["lambda-range-fill-small"],
			medium: styles["lambda-range-fill-medium"],
			large: styles["lambda-range-fill-large"],
		},
		radius: {
			none: styles["lambda-range-fill-radius-none"],
			tiny: styles["lambda-range-fill-radius-tiny"],
			small: styles["lambda-range-fill-radius-small"],
			medium: styles["lambda-range-fill-radius-medium"],
			large: styles["lambda-range-fill-radius-large"],
			full: styles["lambda-range-fill-radius-full"],
		},
		disabled: { true: styles["lambda-range-fill-disabled"], false: "" },
		orientation: {
			vertical: styles["lambda-range-fill-vertical"],
			horizontal: styles["lambda-range-fill-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		orientation: "horizontal",
	},
});

export const rangeHandle = cva(styles["lambda-range-handle"], {
	variants: {
		size: {
			tiny: styles["lambda-range-handle-tiny"],
			small: styles["lambda-range-handle-small"],
			medium: styles["lambda-range-handle-medium"],
			large: styles["lambda-range-handle-large"],
		},
		radius: {
			none: styles["lambda-range-handle-radius-none"],
			tiny: styles["lambda-range-handle-radius-tiny"],
			small: styles["lambda-range-handle-radius-small"],
			medium: styles["lambda-range-handle-radius-medium"],
			large: styles["lambda-range-handle-radius-large"],
			full: styles["lambda-range-handle-radius-full"],
		},
		disabled: { true: styles["lambda-range-handle-disabled"], false: "" },
		isDragging: { true: styles["lambda-range-handle-dragging"], false: "" },
		orientation: {
			vertical: styles["lambda-range-handle-vertical"],
			horizontal: styles["lambda-range-handle-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		isDragging: false,
		orientation: "horizontal",
	},
});

export const rangeValue = cva(styles["lambda-range-handle-value"], {
	variants: {
		size: {
			tiny: styles["lambda-range-handle-value-tiny"],
			small: styles["lambda-range-handle-value-small"],
			medium: styles["lambda-range-handle-value-medium"],
			large: styles["lambda-range-handle-value-large"],
		},
		orientation: {
			vertical: styles["lambda-range-handle-value-vertical"],
			horizontal: styles["lambda-range-handle-value-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		orientation: "horizontal",
	},
});

export const rangeMarkContainer = cva(styles["lambda-range-mark-container"], {
	variants: {
		size: {
			tiny: styles["lambda-range-mark-container-tiny"],
			small: styles["lambda-range-mark-small"],
			medium: styles["lambda-range-mark-medium"],
			large: styles["lambda-range-mark-large"],
		},
		orientation: {
			vertical: styles["lambda-range-mark-container-vertical"],
			horizontal: styles["lambda-range-mark-container-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		orientation: "horizontal",
	},
});

export const rangeMark = cva(styles["lambda-range-mark"], {
	variants: {
		hasLabel: { true: styles["lambda-range-mark-has-label"], false: "" },
		inRange: { true: styles["lambda-range-mark-inrange"], false: "" },
		size: {
			tiny: styles["lambda-range-mark-tiny"],
			small: styles["lambda-range-mark-small"],
			medium: styles["lambda-range-mark-medium"],
			large: styles["lambda-range-mark-large"],
		},
		orientation: {
			vertical: styles["lambda-range-mark-vertical"],
			horizontal: styles["lambda-range-mark-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		orientation: "horizontal",
	},
});

export type RangeContainerVariants = VariantProps<typeof rangeContainer>;
export type RangeTrackVariants = VariantProps<typeof rangeTrack>;
export type RangeFillVariants = VariantProps<typeof rangeFill>;
export type RangeHandleVariants = VariantProps<typeof rangeHandle>;
