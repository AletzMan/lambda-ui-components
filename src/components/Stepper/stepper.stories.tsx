import { useState } from "react";
import { Stepper } from "./Stepper";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { StepperProps } from "./stepper.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const TemplateContent = (title: string, description: string, step: number) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "var(--padding-md)",
				height: "100%",
			}}
		>
			<p
				style={{
					color: "var(--foreground-secondary-color)",
					fontSize: "var(--font-size-lg)",
					fontWeight: "var(--font-weight-semibold)",
				}}
			>{`Step ${step}`}</p>
			<h1 style={{ color: "var(--foreground-title-color)" }}>{title}</h1>
			<p style={{ color: "var(--foreground-secondary-color)" }}>{description}</p>
		</div>
	);
};

const steps = [
	{
		title: "Datos personales",
		description: "Ingresa tu información básica",
		content: TemplateContent("Datos personales", "Ingresa tu información básica", 1),
	},
	{
		title: "Dirección",
		description: "Confirma tu domicilio",
		content: TemplateContent("Dirección", "Confirma tu domicilio", 2),
	},
	{
		title: "Pago",
		description: "Método de pago",
		content: TemplateContent("Pago", "Método de pago", 3),
	},
	{
		title: "Finaliza",
		description: "¡Listo para enviar!",
		content: TemplateContent("Finaliza", "¡Listo para enviar!", 4),
	},
];

const stepCompletedContent = TemplateContent("Gracias", "Steps Completed", 5);

const meta: Meta<typeof Stepper> = {
	title: "Components/Stepper",
	component: Stepper,
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
		variant: { control: "inline-radio", options: ["primary", "secondary"] },
		activeStep: { control: { type: "number", min: 0, max: steps.length - 1 } },
	},
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const Template = (args: StepperProps) => {
	const [activeStep, setActiveStep] = useState(1);
	return (
		<ContainerComponent title="Stepper">
			<Stepper {...args} activeStep={activeStep} onStepClick={setActiveStep} />
		</ContainerComponent>
	);
};

export const Horizontal: Story = {
	render: (args) => <Template {...args} />,
	args: {
		steps,
		stepCompletedContent,
		activeStep: 1,
		orientation: "horizontal",
		variant: "primary",
	},
};

export const Vertical: Story = {
	render: (args) => <Template {...args} />,
	args: {
		steps,
		stepCompletedContent,
		activeStep: 2,
		orientation: "vertical",
		variant: "primary",
	},
};

export const WithCustomIcons: Story = {
	render: (args) => <Template {...args} />,
	args: {
		stepCompletedContent,
		activeStep: 2,
		orientation: "horizontal",
		variant: "primary",
		steps: [
			{ title: "Inicio", icon: <CheckCircle color="#16a34a" /> },
			{ title: "Verifica", icon: <AlertCircle color="#f59e42" /> },
			{ title: "Final", icon: <CheckCircle color="#16a34a" /> },
		],
	},
};
