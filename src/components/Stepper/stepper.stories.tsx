import { useState } from "react";
import { Stepper } from "./Stepper";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle, Contact, MapPin, CreditCard } from "lucide-react";
import { StepperProps } from "./stepper.types";
import { Input } from "../Input/Input";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const TemplateContent = (title: string, description: string, step: number) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "flex-start",
				padding: "var(--spacing-md)",
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

const TemplateContentWithFields = (title: string, description: string, step: number) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "flex-start",
				padding: "var(--spacing-md)",
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
			<div style={{ marginBottom: 16 }}>
				<label htmlFor="nombre">Nombre requerido para avanzar: </label>
				<Input id="nombre" type="text" />
			</div>
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

const stepsValidation: StepperProps["steps"] = [
	{
		title: "Datos personales",
		description: "Información básica",
		content: TemplateContentWithFields(
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

const stepCompletedContent = TemplateContent("¡Gracias!", "Has completado todos los pasos 🎉", 5);

const meta: Meta<typeof Stepper> = {
	title: "Components/Stepper",
	component: Stepper,
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
		variant: { control: "inline-radio", options: ["soft", "bordered"] },
		defaultActiveStep: { control: { type: "number", min: 0, max: steps.length - 1 } },
	},
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const Template = (args: StepperProps) => {
	return (
		<ContainerComponent title="Stepper">
			<Stepper {...args}>
				{steps.map((step, idx) => (
					<Stepper.Step
						key={idx}
						title={step.title}
						description={step.description}
						content={step.content}
						index={idx}
					/>
				))}
				{steps.map((step, idx) => (
					<Stepper.Content key={idx}>{step.content} </Stepper.Content>
				))}
				<Stepper.CompletedContent>{stepCompletedContent}</Stepper.CompletedContent>
			</Stepper>
		</ContainerComponent>
	);
};

const TemplateValidation = (args: StepperProps) => {
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [errorName, setErrorName] = useState(false);
	const [direction, setDirection] = useState("");
	const [errorDirection, setErrorDirection] = useState(false);
	const [payment, setPayment] = useState("");
	const [errorPayment, setErrorPayment] = useState(false);

	const handleStepClick = (name: string, type: "name" | "direction" | "payment") => {
		if (type === "name") {
			setNombreUsuario(name);
			const isValid = name !== "";
			setErrorName(!isValid);
		}
		if (type === "direction") {
			setDirection(name);
			const isValid = name !== "";
			setErrorDirection(!isValid);
		}
		if (type === "payment") {
			setPayment(name);
			const isValid = name !== "";
			setErrorPayment(!isValid);
		}
	};

	return (
		<ContainerComponent title="Stepper">
			<Stepper {...args} defaultActiveStep={0}>
				{stepsValidation.map((step, idx) => (
					<Stepper.Step
						key={idx}
						title={step.title}
						description={step.description}
						content={step.content}
						index={idx}
					/>
				))}
				<Stepper.Content
					validate
					isValid={nombreUsuario !== ""}
					errorMessage="Favor de ingresar un nombre"
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "flex-start",
							padding: "var(--spacing-md)",
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
						>{`Step ${stepsValidation[0].id}`}</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>{stepsValidation[0].title}</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							{stepsValidation[0].description}
						</p>
						<div style={{ width: "100%", maxWidth: "25em", marginBottom: 16 }}>
							<Input
								id="nombre"
								type="text"
								label="Nombre"
								placeholder="Nombre requerido para avanzar:"
								onChangeValue={(value) => handleStepClick(value, "name")}
								value={nombreUsuario}
								invalid={errorName}
							/>
						</div>
					</div>
				</Stepper.Content>
				<Stepper.Content
					validate
					isValid={direction !== ""}
					errorMessage="Favor de ingresar una dirección"
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "flex-start",
							padding: "var(--spacing-md)",
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
						>{`Step ${stepsValidation[1].id}`}</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>{stepsValidation[1].title}</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							{stepsValidation[1].description}
						</p>
						<div style={{ width: "100%", maxWidth: "25em", marginBottom: 16 }}>
							<Input
								id="direccion"
								type="text"
								label="Dirección"
								placeholder="Dirección requerida para avanzar:"
								onChangeValue={(value) => handleStepClick(value, "direction")}
								value={direction}
								invalid={errorDirection}
							/>
						</div>
					</div>
				</Stepper.Content>
				<Stepper.Content
					validate
					isValid={payment !== ""}
					errorMessage="Favor de ingresar un método de pago"
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "flex-start",
							padding: "var(--spacing-md)",
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
						>{`Step ${stepsValidation[2].id}`}</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>{stepsValidation[2].title}</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							{stepsValidation[2].description}
						</p>
						<div style={{ width: "100%", maxWidth: "25em", marginBottom: 16 }}>
							<Input
								id="direccion"
								type="text"
								label="Pago"
								placeholder="Pago requerido para avanzar:"
								onChangeValue={(value) => handleStepClick(value, "payment")}
								value={payment}
								invalid={errorPayment}
							/>
						</div>
					</div>
				</Stepper.Content>
				<Stepper.Content>{stepsValidation[3].content}</Stepper.Content>

				<Stepper.CompletedContent>{stepCompletedContent}</Stepper.CompletedContent>
			</Stepper>
		</ContainerComponent>
	);
};

const TemplateCustomIcons = (args: StepperProps) => {
	return (
		<ContainerComponent title="Stepper">
			<Stepper {...args}>
				{stepsCustomIcons.map((step, idx) => (
					<Stepper.Step
						key={idx}
						title={step.title}
						description={step.description}
						content={step.content}
						icon={step.icon}
						index={idx}
					/>
				))}
				{stepsCustomIcons.map((step, idx) => (
					<Stepper.Content key={idx}>{step.content} </Stepper.Content>
				))}
				<Stepper.CompletedContent>{stepCompletedContent}</Stepper.CompletedContent>
			</Stepper>
		</ContainerComponent>
	);
};

export const Horizontal: Story = {
	render: (args) => <Template {...args} />,
	args: {
		steps,
		defaultActiveStep: 0,
		orientation: "horizontal",
		variant: "bordered",
	},
};

export const Vertical: Story = {
	render: (args) => <Template {...args} />,
	args: {
		steps,
		defaultActiveStep: 0,
		orientation: "vertical",
		variant: "bordered",
	},
};

export const Validation: Story = {
	render: (args) => <TemplateValidation {...args} />,
	args: {
		defaultActiveStep: 0,
		orientation: "horizontal",
		variant: "bordered",
		steps: stepsValidation,
	},
};

export const WithCustomIcons: Story = {
	render: (args) => <TemplateCustomIcons {...args} />,
	args: {
		defaultActiveStep: 0,
		orientation: "horizontal",
		variant: "bordered",
		steps: stepsCustomIcons,
	},
};
