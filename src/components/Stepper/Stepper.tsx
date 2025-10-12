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
import { useTranslation } from "../../_internal/hooks/translation/LambdaConfigProvider";

export const Stepper: React.FC<StepperProps> = ({
	steps,
	stepCompletedContent,
	activeStep = 0,
	orientation = "horizontal",
	onStepCompleted,
	className,
	style,
	variant = "bordered",
}) => {
	const [currentStep, setCurrentStep] = useState(activeStep);
	const { t } = useTranslation();

	const handleStepClick = (stepIndex: number) => {
		setCurrentStep(stepIndex);
		onStepCompleted?.(stepIndex);
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
			<section className={stepContentVariants({ orientation, variant })}>
				{orientation === "vertical" && (
					<header>
						<h1>{currentStep <= steps.length - 1 ? steps[currentStep].title : ""}</h1>
						<p>{currentStep <= steps.length - 1 ? steps[currentStep].description : ""}</p>
					</header>
				)}
				{currentStep <= steps.length - 1 ? steps[currentStep].content : stepCompletedContent}
				<footer className={styles["lambda-stepper-footer"]}>
					<Button
						variant="solid"
						size="small"
						color="neutral"
						icon={<ArrowLeftIcon />}
						onClick={currentStep > 0 ? () => handleStepClick(currentStep - 1) : undefined}
						disabled={currentStep === 0}
						label={t("stepper.previous")}
					/>
					<Button
						variant="solid"
						size="small"
						color="neutral"
						icon={<ArrowRightIcon />}
						iconPosition="right"
						onClick={
							currentStep < steps.length ? () => handleStepClick(currentStep + 1) : undefined
						}
						disabled={currentStep === steps.length}
						label={currentStep === steps.length - 1 ? t("stepper.finish") : t("stepper.next")}
					/>
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
	variant = "bordered",
}) => {
	return (
		<div
			className={clsx(stepVariants({ status, orientation, variant }))}
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
