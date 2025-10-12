import { useState } from "react";
import { Stepper } from "./Stepper";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, Contact, MapPin, CreditCard } from "lucide-react";
import { StepperProps } from "./stepper.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const TemplateContent = (title: string, description: string, step: number) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "flex-start",
				padding: "var(--padding-md)",
				height: "100%",
			}}
		>
			<p
				style={{
					color: "var(--foreground-secondary-color)",
					fontSize: "var(--font-size-lg)",
					fontWeight: "var(--font-weight-semibold)",
					marginBottom: "5em",
				}}
			>{`Step ${step}`}</p>
			<h1 style={{ color: "var(--foreground-title-color)" }}>{title}</h1>
			<p style={{ color: "var(--foreground-secondary-color)" }}>{description}</p>
		</div>
	);
};

const steps: StepperProps["steps"] = [
	{
		title: "Datos personales",
		description: "Información básica",
		content: TemplateContent(
			"Datos personales",
			"Completa tu información básica para continuar con el proceso.",
			1
		),
	},
	{
		title: "Dirección",
		description: "Confirma domicilio",
		content: TemplateContent(
			"Dirección",
			"Confirma y verifica tu domicilio para el envío de tus productos.",
			2
		),
	},
	{
		title: "Pago",
		description: "Método de pago",
		content: TemplateContent(
			"Pago",
			"Selecciona tu método de pago preferido y revisa que la información sea correcta.",
			3
		),
	},
	{
		title: "Finaliza",
		description: "Confirmación final",
		content: TemplateContent(
			"Finaliza",
			"Revisa todos los datos y confirma para finalizar el proceso.",
			4
		),
	},
];

const stepsCustomIcons: StepperProps["steps"] = [
	{
		title: "Datos personales",
		description: "Información básica",
		content: TemplateContent(
			"Datos personales",
			"Completa tu información básica para continuar con el proceso.",
			1
		),
		icon: <Contact />,
	},
	{
		title: "Dirección",
		description: "Confirma domicilio",
		content: TemplateContent(
			"Dirección",
			"Confirma y verifica tu domicilio para el envío de tus productos.",
			2
		),
		icon: <MapPin />,
	},
	{
		title: "Pago",
		description: "Método de pago",
		content: TemplateContent(
			"Pago",
			"Selecciona tu método de pago preferido y revisa que la información sea correcta.",
			3
		),
		icon: <CreditCard />,
	},
	{
		title: "Finaliza",
		description: "Confirmación final",
		content: TemplateContent(
			"Finaliza",
			"Revisa todos los datos y confirma para finalizar el proceso.",
			4
		),
		icon: <CheckCircle />,
	},
];

const stepCompletedContent = TemplateContent("¡Gracias!", "Has completado todos los pasos 🎉", 5);

const meta: Meta<typeof Stepper> = {
	title: "Components/Stepper",
	component: Stepper,
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
		variant: { control: "inline-radio", options: ["soft", "bordered"] },
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
		variant: "bordered",
	},
};

export const Vertical: Story = {
	render: (args) => <Template {...args} />,
	args: {
		steps,
		stepCompletedContent,
		activeStep: 2,
		orientation: "vertical",
		variant: "bordered",
	},
};

export const WithCustomIcons: Story = {
	render: (args) => <Template {...args} />,
	args: {
		stepCompletedContent,
		activeStep: 2,
		orientation: "horizontal",
		variant: "bordered",
		steps: stepsCustomIcons,
	},
};
