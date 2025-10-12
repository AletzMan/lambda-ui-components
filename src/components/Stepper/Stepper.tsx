import React from "react";
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

export const Stepper: React.FC<StepperProps> = ({
	steps,
	activeStep = 0,
	orientation = "horizontal",
	onStepClick,
	className,
	style,
	variant = "primary",
}) => {
	return (
		<div className={clsx(stepperWrapperVariants({ orientation }))}>
			<header className={clsx(stepperVariants({ orientation, variant }), className)} style={style}>
				{steps.map((step, idx) => {
					let status: StepperVariants["status"] = "pending";
					if (idx < activeStep) status = "completed";
					else if (idx === activeStep) status = "active";
					if (step.status) status = step.status;
					return (
						<Step
							key={step.id || idx}
							{...step}
							index={idx}
							status={status}
							isLast={idx === steps.length - 1}
							orientation={orientation}
							onClick={onStepClick ? () => onStepClick(idx) : undefined}
							variant={variant}
						/>
					);
				})}
			</header>
			<section className={stepContentVariants({ orientation })}>d</section>
			<footer></footer>
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
