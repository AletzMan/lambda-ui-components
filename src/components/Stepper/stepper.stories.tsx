import { useState } from "react";
import { Stepper } from "./Stepper";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { StepperProps } from "./stepper.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const steps = [
	{ title: "Datos personales", description: "Ingresa tu información básica" },
	{ title: "Dirección", description: "Confirma tu domicilio" },
	{ title: "Pago", description: "Método de pago" },
	{ title: "Finaliza", description: "¡Listo para enviar!" },
];

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
		activeStep: 1,
		orientation: "horizontal",
		variant: "primary",
	},
};

export const Vertical: Story = {
	render: (args) => <Template {...args} />,
	args: {
		steps,
		activeStep: 2,
		orientation: "vertical",
		variant: "primary",
	},
};

export const WithCustomIcons: Story = {
	render: (args) => <Template {...args} />,
	args: {
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
