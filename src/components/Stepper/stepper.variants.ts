import { cva, VariantProps } from "class-variance-authority";
import styles from "./stepper.module.css";

export const stepperWrapperVariants = cva(styles["lambda-stepper-wrapper"], {
	variants: {
		orientation: {
			horizontal: styles["lambda-stepper-wrapper-horizontal"],
			vertical: styles["lambda-stepper-wrapper-vertical"],
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

export const stepperVariants = cva(styles["lambda-stepper"], {
	variants: {
		status: {
			pending: styles["lambda-stepper-pending"],
			active: styles["lambda-stepper-active"],
			completed: styles["lambda-stepper-completed"],
			error: styles["lambda-stepper-error"],
		},
		orientation: {
			horizontal: styles["lambda-stepper-horizontal"],
			vertical: styles["lambda-stepper-vertical"],
		},
		variant: {
			soft: styles["lambda-stepper-soft"],
			bordered: styles["lambda-stepper-bordered"],
		},
	},
	defaultVariants: {
		status: "pending",
		orientation: "horizontal",
		variant: "bordered",
	},
});

export const stepVariants = cva(styles["lambda-step"], {
	variants: {
		status: {
			pending: styles["lambda-step-pending"],
			active: styles["lambda-step-active"],
			completed: styles["lambda-step-completed"],
			error: styles["lambda-step-error"],
		},
		orientation: {
			horizontal: styles["lambda-step-horizontal"],
			vertical: styles["lambda-step-vertical"],
		},
		variant: {
			soft: styles["lambda-step-soft"],
			bordered: styles["lambda-step-bordered"],
		},
	},
	defaultVariants: {
		status: "pending",
		orientation: "horizontal",
		variant: "bordered",
	},
});

export const stepConnectorVariants = cva(styles["lambda-step-connector"], {
	variants: {
		orientation: {
			horizontal: styles["lambda-step-connector-horizontal"],
			vertical: styles["lambda-step-connector-vertical"],
		},
		active: {
			active: styles["lambda-step-connector-active"],
			pending: styles["lambda-step-connector-pending"],
			completed: styles["lambda-step-connector-completed"],
			error: styles["lambda-step-connector-error"],
		},
	},
	defaultVariants: {
		orientation: "horizontal",
		active: "pending",
	},
});

export const stepSummaryVariants = cva(styles["lambda-step-summary"], {
	variants: {
		orientation: {
			horizontal: styles["lambda-step-summary-horizontal"],
			vertical: styles["lambda-step-summary-vertical"],
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

export const stepContentVariants = cva(styles["lambda-stepper-content"], {
	variants: {
		orientation: {
			horizontal: styles["lambda-stepper-content-horizontal"],
			vertical: styles["lambda-stepper-content-vertical"],
		},
		variant: {
			soft: styles["lambda-stepper-content-soft"],
			bordered: styles["lambda-stepper-content-bordered"],
		},
	},
	defaultVariants: {
		orientation: "horizontal",
		variant: "bordered",
	},
});

export type StepperVariants = VariantProps<typeof stepperVariants>;
