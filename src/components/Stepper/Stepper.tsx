import React, { createContext, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./stepper.module.css";
import type { StepContentProps, StepperProps, StepProps } from "./stepper.types";
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
	defaultActiveStep = 0,
	orientation = "horizontal",
	onStepCompleted,
	onStepValidate,
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

	const handleNext = async () => {
		// Si hay un callback de validación, ejecutarlo primero
		if (onStepValidate) {
			try {
				const validationResult = await onStepValidate(currentStep);

				if (!validationResult.isValid) {
					// Si la validación falla, mostrar el error y NO avanzar
					setStepError({ [currentStep]: validationResult.errorMessage || t("stepper.validationError") });
					setValidateStep(true);
					setTimeout(() => {
						setValidateStep(false);
					}, 2750);
					// IMPORTANTE: return aquí previene que se ejecute handleStepClick
					return;
				} else {
					// Si la validación es exitosa, limpiar errores de este step
					const newStepError = { ...stepError };
					delete newStepError[currentStep];
					setStepError(newStepError);
				}
			} catch (error) {
				// Si hay un error en la validación, mostrar mensaje de error y NO avanzar
				setStepError({ [currentStep]: t("stepper.validationError") });
				setValidateStep(true);
				setTimeout(() => {
					setValidateStep(false);
				}, 2750);
				// IMPORTANTE: return aquí previene que se ejecute handleStepClick
				return;
			}
		}

		// Verificar si hay errores previos (solo si no hay onStepValidate)
		if (stepError[currentStep]) {
			setValidateStep(true);
			setTimeout(() => {
				setValidateStep(false);
			}, 2750);
			// IMPORTANTE: return aquí previene que se ejecute handleStepClick
			return;
		}

		// Si todo está bien, avanzar al siguiente step
		handleStepClick(currentStep + 1);
		setValidateStep(false);
	};

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

	const totalSteps = itemChildren.length;
	const isLastStep = currentStep === totalSteps - 1;

	return (
		<StepperContext.Provider
			value={{
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
					{orientation === "vertical" && currentStep < totalSteps && (
						<header>
							<h1>{(itemChildren[currentStep]?.props as StepProps)?.title}</h1>
							<p>{(itemChildren[currentStep]?.props as StepProps)?.description}</p>
						</header>
					)}
					{currentStep < totalSteps
						? contentChildren[currentStep]
						: stepCompletedContentChildren[0]}
					<footer className={styles["lambda-stepper-footer"]}>
						{currentStep < totalSteps && (
							<Button
								variant="solid"
								size="small"
								color="neutral"
								icon={<ArrowLeftIcon />}
								onClick={currentStep > 0 ? () => handleStepClick(currentStep - 1) : undefined}
								disabled={currentStep === 0 || validateStep}
								label={t("stepper.previous")}
							/>
						)}
						{currentStep < totalSteps && (
							<Button
								variant="solid"
								size="small"
								color="neutral"
								icon={<ArrowRightIcon />}
								iconPosition="right"
								onClick={currentStep < totalSteps ? handleNext : undefined}
								disabled={currentStep === totalSteps || validateStep}
								label={currentStep === totalSteps - 1 ? t("stepper.finish") : t("stepper.next")}
							/>
						)}
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
		if (stepError![index] && activeStep === index) {
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
				<div className={styles["lambda-step-indicator-content"]}>

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
