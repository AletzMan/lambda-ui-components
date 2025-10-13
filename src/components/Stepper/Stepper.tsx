import React, { createContext, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./stepper.module.css";
import type { StepContentProps, StepperProps, StepperStep, StepProps } from "./stepper.types";
import {
	stepConnectorVariants,
	stepContentVariants,
	StepperVariants,
	stepperVariants,
	stepperWrapperVariants,
	stepSummaryVariants,
	stepVariants,
} from "./stepper.variants";
import { CheckIcon } from "../../_assets/icons";
import { Button } from "../Button/Button";
import { ArrowLeftIcon, ArrowRightIcon, X } from "lucide-react";
import { useTranslation } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { AnimatePresence, motion } from "framer-motion";

interface StepperContextType extends StepperProps {
	isLast: boolean | undefined;
	index: number;
	activeStep: number;
	stepError?: { [key: number]: string };
	setStepError?: (error: { [key: number]: string }) => void;
	validateStep?: boolean;
	setValidateStep: (validateStep: boolean) => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

const useStepperContext = () => {
	const context = useContext(StepperContext);
	if (!context) {
		throw new Error("useStepperContext debe ser usado dentro de un StepperProvider");
	}
	return context;
};

const StepperRoot: React.FC<StepperProps> = ({
	steps,
	defaultActiveStep = 0,
	orientation = "horizontal",
	onStepCompleted,
	className,
	style,
	variant = "bordered",
	children,
}) => {
	const [currentStep, setCurrentStep] = useState(defaultActiveStep);
	const [stepError, setStepError] = useState<{ [key: number]: string }>({});
	const [validateStep, setValidateStep] = useState(false);
	const { t } = useTranslation();

	const handleStepClick = (stepIndex: number) => {
		setCurrentStep(stepIndex);
		onStepCompleted?.(stepIndex);
	};

	const handleNext = () => {
		if (stepError[currentStep]) {
			setValidateStep(true);
			setTimeout(() => {
				setValidateStep(false);
			}, 4000);
			return;
		}
		handleStepClick(currentStep + 1);
		setValidateStep(false);
		setStepError({});
	};

	const isLastStep = (children as StepperStep[] | StepContentProps[]).length - 1 === currentStep;
	const index = currentStep;

	let itemChildren: React.ReactElement[] = [];
	let contentChildren: React.ReactElement[] = [];
	let stepCompletedContentChildren: React.ReactElement[] = [];

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) return;

		// Comparar directamente con la función del componente
		if (child.type === Stepper.Step) {
			itemChildren.push(child);
		} else if (child.type === Stepper.Content) {
			const cloned = React.cloneElement(child as React.ReactElement<StepContentProps>, {
				index: contentChildren.length,
			});
			contentChildren.push(cloned);
		} else if (child.type === Stepper.CompletedContent) {
			stepCompletedContentChildren.push(child);
		}
	});

	return (
		<StepperContext.Provider
			value={{
				steps,
				activeStep: currentStep,
				orientation,
				onStepCompleted,
				variant,
				isLast: isLastStep,
				index,
				stepError,
				setStepError,
				validateStep,
				setValidateStep,
			}}
		>
			<div className={clsx(stepperWrapperVariants({ orientation }))}>
				<header
					className={clsx(stepperVariants({ orientation, variant }), className)}
					style={style}
				>
					{itemChildren}
				</header>

				<section className={stepContentVariants({ orientation, variant })}>
					{orientation === "vertical" && (
						<header>
							<h1>{currentStep <= steps.length - 1 ? steps[currentStep].title : ""}</h1>
							<p>{currentStep <= steps.length - 1 ? steps[currentStep].description : ""}</p>
						</header>
					)}
					{currentStep <= steps.length - 1
						? contentChildren[currentStep]
						: stepCompletedContentChildren[0]}
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
							onClick={currentStep < steps.length ? handleNext : undefined}
							disabled={currentStep === steps.length}
							label={currentStep === steps.length - 1 ? t("stepper.finish") : t("stepper.next")}
						/>
					</footer>
					<AnimatePresence initial={false}>
						{stepError[currentStep] && validateStep && (
							<motion.div
								initial={{ opacity: 0, scale: 1, left: "50%", x: "-50%", y: "-3em" }}
								animate={{ opacity: 1, scale: 1, left: "50%", x: "-50%", y: "0" }}
								exit={{ opacity: 0, scale: 1, left: "50%", x: "-50%", y: "-3em" }}
								transition={{ type: "spring" }}
								className={styles["lambda-stepper-error"]}
							>
								{stepError[currentStep] || "Favor de ingresar un nombre"}
							</motion.div>
						)}
					</AnimatePresence>
				</section>
			</div>
		</StepperContext.Provider>
	);
};

const Step: React.FC<StepProps> = ({ title, description, icon, index }) => {
	const { activeStep, orientation, variant, stepError, validateStep } = useStepperContext();
	const [status, setStatus] = useState<StepperVariants["status"]>("pending");

	useEffect(() => {
		if (stepError![index]) {
			setStatus("error");
		} else if (index < activeStep!) {
			setStatus("completed");
		} else if (index === activeStep) {
			setStatus("active");
		} else {
			setStatus("pending");
		}
	}, [validateStep, stepError, activeStep]);

	return (
		<div
			className={clsx(stepVariants({ status, orientation, variant }))}
			aria-current={status === "active" ? "step" : undefined}
		>
			<div className={styles["lambda-step-indicator"]}>
				{icon ? (
					<span className={styles["lambda-step-icon"]}>{icon}</span>
				) : (
					<span className={styles["lambda-step-index"]}>
						{status === "completed" ? (
							<CheckIcon className={styles["lambda-step-icon-check"]} />
						) : status === "error" ? (
							<X className={styles["lambda-step-icon-check"]} />
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
			{<div className={stepConnectorVariants({ orientation, active: status })} />}
		</div>
	);
};

const StepContent: React.FC<StepContentProps> = ({
	children,
	validate,
	errorMessage,
	isValid,
	index,
}) => {
	const { stepError, validateStep } = useStepperContext();

	useEffect(() => {
		if (validate !== undefined && !isValid) {
			stepError![index!] = errorMessage!;
		} else {
			stepError![index!] = "";
		}
	}, [validate, isValid, validateStep]);
	return <>{children}</>;
};

const StepCompletedContent: React.FC<StepContentProps> = ({ children }) => {
	return <>{children}</>;
};

export const Stepper = Object.assign(StepperRoot, {
	Step,
	Content: StepContent,
	CompletedContent: StepCompletedContent,
});
