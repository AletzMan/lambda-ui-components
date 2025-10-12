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
	activeStep?: number;
	orientation?: StepperVariants["orientation"];
	onStepClick?: (stepIndex: number) => void;
	className?: string;
	style?: CSSProperties;
	variant?: StepperVariants["variant"];
}

export interface StepProps extends StepperStep {
	index: number;
	status: StepperVariants["status"];
	isLast: boolean;
	orientation: StepperVariants["orientation"];
	onClick?: () => void;
	variant: StepperVariants["variant"];
}
