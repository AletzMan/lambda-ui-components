import React, { useState } from "react";
import clsx from "clsx";
import styles from "./stepper.module.css";
import type { StepperProps, StepProps } from "./stepper.types";
import {
	stepConnectorVariants,
	stepContentVariants,
	stepperVariants,
	StepperVariants,
	stepperWrapperVariants,
	stepSummaryVariants,
	stepVariants,
} from "./stepper.variants";
import { CheckIcon } from "../../_assets/icons";
import { Button } from "../Button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const Stepper: React.FC<StepperProps> = ({
	steps,
	activeStep = 0,
	orientation = "horizontal",
	onStepClick,
	className,
	style,
	variant = "primary",
}) => {
	const [currentStep, setCurrentStep] = useState(activeStep);

	const handleStepClick = (stepIndex: number) => {
		setCurrentStep(stepIndex);
		onStepClick?.(stepIndex);
	};
	return (
		<div className={clsx(stepperWrapperVariants({ orientation }))}>
			<header className={clsx(stepperVariants({ orientation, variant }), className)} style={style}>
				{steps.map((step, idx) => {
					let status: StepperVariants["status"] = "pending";
					if (idx < currentStep) status = "completed";
					else if (idx === currentStep) status = "active";
					if (step.status) status = step.status;
					return (
						<Step
							key={step.id || idx}
							{...step}
							index={idx}
							status={status}
							isLast={idx === steps.length - 1}
							orientation={orientation}
							onClick={() => handleStepClick(idx)}
							variant={variant}
						/>
					);
				})}
			</header>
			<section className={stepContentVariants({ orientation })}>
				{steps[currentStep].content}
				<footer className={styles["lambda-stepper-footer"]}>
					<div>
						<Button
							variant="solid"
							size="small"
							color="neutral"
							icon={<ArrowLeftIcon />}
							onClick={currentStep > 0 ? () => handleStepClick(currentStep - 1) : undefined}
							disabled={currentStep === 0}
						>
							Anterior
						</Button>
						<Button
							variant="solid"
							size="small"
							color="neutral"
							icon={<ArrowRightIcon />}
							iconPosition="right"
							onClick={
								currentStep < steps.length - 1 ? () => handleStepClick(currentStep + 1) : undefined
							}
							disabled={currentStep === steps.length - 1}
						>
							Siguiente
						</Button>
					</div>
				</footer>
			</section>
		</div>
	);
};

export const Step: React.FC<StepProps> = ({
	index,
	title,
	description,
	icon,
	status = "pending",
	isLast,
	orientation = "horizontal",
	onClick,
	variant = "primary",
}) => {
	return (
		<div
			className={clsx(stepVariants({ status, orientation, variant }))}
			onClick={onClick}
			role={onClick ? "button" : undefined}
			tabIndex={onClick ? 0 : undefined}
			aria-current={status === "active" ? "step" : undefined}
		>
			<div className={styles["lambda-step-indicator"]}>
				{icon ? (
					<span className={styles["lambda-step-icon"]}>{icon}</span>
				) : (
					<span className={styles["lambda-step-index"]}>
						{status === "completed" ? (
							<CheckIcon className={styles["lambda-step-icon-check"]} />
						) : (
							index + 1
						)}
					</span>
				)}
			</div>
			<div className={stepSummaryVariants({ orientation })}>
				<h1>{title}</h1>
				{description && <p>{description}</p>}
			</div>
			{!isLast && <div className={stepConnectorVariants({ orientation, active: status })} />}
		</div>
	);
};

Stepper.displayName = "Stepper";
