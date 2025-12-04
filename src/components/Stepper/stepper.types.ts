import { ReactNode, CSSProperties } from "react";
import { StepperVariants } from "./stepper.variants";

export interface StepperStep {
	/** Unique identifier for the step */
	id?: string | number;
	/** The title of the step */
	title: ReactNode;
	/** Optional description or subtitle for the step */
	description?: ReactNode;
	/** Optional icon to display in the step indicator */
	icon?: ReactNode;
	/** The current status of the step */
	status?: StepperVariants["status"];
	/** The content to be rendered when this step is active */
	content?: ReactNode;
}

export interface StepperProps {
	/** Array of step objects defining the stepper structure */
	steps: StepperStep[];
	/** The index of the step that is active by default (0-indexed) */
	defaultActiveStep?: number;
	/** The orientation of the stepper */
	orientation?: StepperVariants["orientation"];
	/** Callback function triggered when a step is completed */
	onStepCompleted?: (stepIndex: number) => void;
	/** Additional CSS class names for the container */
	className?: string;
	/** Inline CSS styles for the container */
	style?: CSSProperties;
	/** Visual variant of the stepper */
	variant?: StepperVariants["variant"];
	/** Optional children elements */
	children?: ReactNode;
}

export interface StepProps extends StepperStep {
	/** The index of the step within the stepper */
	index: number;
}

export interface StepContentProps {
	/** The index of the step this content belongs to */
	index?: number;
	/** The content to be rendered */
	children: ReactNode;
	/** Whether validation should be performed for this step */
	validate?: boolean;
	/** Whether the step content is currently valid */
	isValid?: boolean;
	/** Error message to display if validation fails */
	errorMessage?: string;
}
