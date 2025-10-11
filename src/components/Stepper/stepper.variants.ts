import { cva, VariantProps } from "class-variance-authority";
import styles from "./stepper.module.css";

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
			primary: styles["lambda-stepper-primary"],
			secondary: styles["lambda-stepper-secondary"],
		},
	},
	defaultVariants: {
		status: "pending",
		orientation: "horizontal",
		variant: "primary",
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
			primary: styles["lambda-step-primary"],
			secondary: styles["lambda-step-secondary"],
		},
	},
	defaultVariants: {
		status: "pending",
		orientation: "horizontal",
		variant: "primary",
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

export type StepperVariants = VariantProps<typeof stepperVariants>;
