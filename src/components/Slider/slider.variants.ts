import { cva, VariantProps } from "class-variance-authority";
import styles from "./slider.module.css";

export const sliderWrapper = cva(styles["lambda-slider-wrapper"], {
	variants: {
		orientation: {
			vertical: styles["lambda-slider-wrapper-vertical"],
			horizontal: styles["lambda-slider-wrapper-horizontal"],
		},
		size: {
			tiny: styles["lambda-slider-wrapper-tiny"],
			small: styles["lambda-slider-wrapper-small"],
			medium: styles["lambda-slider-wrapper-medium"],
			large: styles["lambda-slider-wrapper-large"],
		},
	},
	defaultVariants: {
		orientation: "horizontal",
		size: "medium",
	},
});

export const sliderContainer = cva(styles["lambda-slider-container"], {
	variants: {
		disabled: {
			true: styles["lambda-slider-container-disabled"],
			false: "",
		},
		orientation: {
			vertical: styles["lambda-slider-container-vertical"],
			horizontal: styles["lambda-slider-container-horizontal"],
		},
	},
	defaultVariants: {
		disabled: false,
		orientation: "horizontal",
	},
});

export const sliderTrack = cva(styles["lambda-slider-track"], {
	variants: {
		color: {
			primary: styles["lambda-slider-track-primary"],
			neutral: styles["lambda-slider-track-neutral"],
			secondary: styles["lambda-slider-track-secondary"],
			info: styles["lambda-slider-track-info"],
			warning: styles["lambda-slider-track-warning"],
			danger: styles["lambda-slider-track-danger"],
			success: styles["lambda-slider-track-success"],
		},
		size: {
			tiny: styles["lambda-slider-track-tiny"],
			small: styles["lambda-slider-track-small"],
			medium: styles["lambda-slider-track-medium"],
			large: styles["lambda-slider-track-large"],
		},
		radius: {
			none: styles["lambda-slider-track-radius-none"],
			tiny: styles["lambda-slider-track-radius-tiny"],
			small: styles["lambda-slider-track-radius-small"],
			medium: styles["lambda-slider-track-radius-medium"],
			large: styles["lambda-slider-track-radius-large"],
			full: styles["lambda-slider-track-radius-full"],
		},
		viewBar: { true: styles["lambda-slider-track-view-bar"], false: "" },
		disabled: { true: styles["lambda-slider-track-disabled"], false: "" },
		orientation: {
			vertical: styles["lambda-slider-track-vertical"],
			horizontal: styles["lambda-slider-track-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		viewBar: true,
		disabled: false,
		orientation: "horizontal",
		radius: "full",
		color: "primary",
	},
});

export const sliderFill = cva(styles["lambda-slider-fill"], {
	variants: {
		color: {
			primary: styles["lambda-slider-fill-primary"],
			neutral: styles["lambda-slider-fill-neutral"],
			secondary: styles["lambda-slider-fill-secondary"],
			info: styles["lambda-slider-fill-info"],
			warning: styles["lambda-slider-fill-warning"],
			danger: styles["lambda-slider-fill-danger"],
			success: styles["lambda-slider-fill-success"],
		},
		size: {
			tiny: styles["lambda-slider-fill-tiny"],
			small: styles["lambda-slider-fill-small"],
			medium: styles["lambda-slider-fill-medium"],
			large: styles["lambda-slider-fill-large"],
		},
		radius: {
			none: styles["lambda-slider-fill-radius-none"],
			tiny: styles["lambda-slider-fill-radius-tiny"],
			small: styles["lambda-slider-fill-radius-small"],
			medium: styles["lambda-slider-fill-radius-medium"],
			large: styles["lambda-slider-fill-radius-large"],
			full: styles["lambda-slider-fill-radius-full"],
		},
		disabled: { true: styles["lambda-slider-fill-disabled"], false: "" },
		orientation: {
			vertical: styles["lambda-slider-fill-vertical"],
			horizontal: styles["lambda-slider-fill-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		orientation: "horizontal",
		radius: "full",
		color: "primary",
	},
});

export const sliderHandle = cva(styles["lambda-slider-handle"], {
	variants: {
		color: {
			primary: styles["lambda-slider-handle-primary"],
			neutral: styles["lambda-slider-handle-neutral"],
			secondary: styles["lambda-slider-handle-secondary"],
			info: styles["lambda-slider-handle-info"],
			warning: styles["lambda-slider-handle-warning"],
			danger: styles["lambda-slider-handle-danger"],
			success: styles["lambda-slider-handle-success"],
		},
		size: {
			tiny: styles["lambda-slider-handle-tiny"],
			small: styles["lambda-slider-handle-small"],
			medium: styles["lambda-slider-handle-medium"],
			large: styles["lambda-slider-handle-large"],
		},
		radius: {
			none: styles["lambda-slider-handle-radius-none"],
			tiny: styles["lambda-slider-handle-radius-tiny"],
			small: styles["lambda-slider-handle-radius-small"],
			medium: styles["lambda-slider-handle-radius-medium"],
			large: styles["lambda-slider-handle-radius-large"],
			full: styles["lambda-slider-handle-radius-full"],
		},
		disabled: { true: styles["lambda-slider-handle-disabled"], false: "" },
		isDragging: { true: styles["lambda-slider-handle-dragging"], false: "" },
		orientation: {
			vertical: styles["lambda-slider-handle-vertical"],
			horizontal: styles["lambda-slider-handle-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		isDragging: false,
		orientation: "horizontal",
		radius: "full",
		color: "primary",
	},
});

export const sliderValue = cva(styles["lambda-slider-handle-value"], {
	variants: {
		size: {
			tiny: styles["lambda-slider-handle-value-tiny"],
			small: styles["lambda-slider-handle-value-small"],
			medium: styles["lambda-slider-handle-value-medium"],
			large: styles["lambda-slider-handle-value-large"],
		},
		orientation: {
			vertical: styles["lambda-slider-handle-value-vertical"],
			horizontal: styles["lambda-slider-handle-value-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		orientation: "horizontal",
	},
});

export const sliderMarkContainer = cva(styles["lambda-slider-mark-container"], {
	variants: {
		size: {
			tiny: styles["lambda-slider-mark-container-tiny"],
			small: styles["lambda-slider-mark-small"],
			medium: styles["lambda-slider-mark-medium"],
			large: styles["lambda-slider-mark-large"],
		},
		orientation: {
			vertical: styles["lambda-slider-mark-container-vertical"],
			horizontal: styles["lambda-slider-mark-container-horizontal"],
		},
	},
	defaultVariants: {
		size: "medium",
		orientation: "horizontal",
	},
});

export const sliderMark = cva(styles["lambda-slider-mark"], {
	variants: {
		hasLabel: { true: styles["lambda-slider-mark-has-label"], false: "" },
		inSlider: { true: styles["lambda-slider-mark-inslider"], false: "" },
		size: {
			tiny: styles["lambda-slider-mark-tiny"],
			small: styles["lambda-slider-mark-small"],
			medium: styles["lambda-slider-mark-medium"],
			large: styles["lambda-slider-mark-large"],
		},
		orientation: {
			vertical: styles["lambda-slider-mark-vertical"],
			horizontal: styles["lambda-slider-mark-horizontal"],
		},
	},
	defaultVariants: {
		hasLabel: false,
		inSlider: false,
		size: "medium",
		orientation: "horizontal",
	},
});

export type SliderContainerVariants = VariantProps<typeof sliderContainer>;
export type SliderTrackVariants = VariantProps<typeof sliderTrack>;
export type SliderFillVariants = VariantProps<typeof sliderFill>;
export type SliderHandleVariants = VariantProps<typeof sliderHandle>;
