import { ReactNode, CSSProperties } from "react";
import { StepperVariants } from "./stepper.variants";

export interface StepperStep {
	id?: string | number;
	title: ReactNode;
	description?: ReactNode;
	icon?: ReactNode;
	status?: StepperVariants["status"];
	content?: ReactNode;
}

export interface StepperProps {
	steps: StepperStep[];
	stepCompletedContent?: ReactNode;
	defaultActiveStep?: number;
	orientation?: StepperVariants["orientation"];
	onStepCompleted?: (stepIndex: number) => void;
	className?: string;
	style?: CSSProperties;
	variant?: StepperVariants["variant"];
	children?: ReactNode;
}

export interface StepProps extends StepperStep {
	index: number;
}

export interface StepContentProps {
	index?: number;
	children: ReactNode;
	validate?: boolean;
	isValid?: boolean;
	errorMessage?: string;
}
