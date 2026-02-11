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

const stepCompletedContent = TemplateContent("¡Gracias!", "Has completado todos los pasos 🎉", 5);

const meta: Meta<typeof Stepper> = {
	title: "Components/Stepper",
	component: Stepper,
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
		variant: { control: "inline-radio", options: ["soft", "bordered"] },
		defaultActiveStep: { control: { type: "number", min: 0, max: 3 } },
	},
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const Template = (args: StepperProps) => {
	return (
		<ContainerComponent title="Stepper">
			<Stepper {...args}>
				<Stepper.Step title="Datos personales" description="Información básica" index={0} />
				<Stepper.Step title="Dirección" description="Confirma domicilio" index={1} />
				<Stepper.Step title="Pago" description="Método de pago" index={2} />
				<Stepper.Step title="Finaliza" description="Confirmación final" index={3} />

				<Stepper.Content>
					{TemplateContent(
						"Datos personales",
						"Completa tu información básica para continuar con el proceso.",
						1
					)}
				</Stepper.Content>
				<Stepper.Content>
					{TemplateContent(
						"Dirección",
						"Confirma y verifica tu domicilio para el envío de tus productos.",
						2
					)}
				</Stepper.Content>
				<Stepper.Content>
					{TemplateContent(
						"Pago",
						"Selecciona tu método de pago preferido y revisa que la información sea correcta.",
						3
					)}
				</Stepper.Content>
				<Stepper.Content>
					{TemplateContent(
						"Finaliza",
						"Revisa todos los datos y confirma para finalizar el proceso.",
						4
					)}
				</Stepper.Content>

				<Stepper.CompletedContent>{stepCompletedContent}</Stepper.CompletedContent>
			</Stepper>
		</ContainerComponent>
	);
};

const TemplateCustomIcons = (args: StepperProps) => {
	return (
		<ContainerComponent title="Stepper">
			<Stepper {...args}>
				<Stepper.Step title="Datos personales" description="Información básica" icon={<Contact />} index={0} />
				<Stepper.Step title="Dirección" description="Confirma domicilio" icon={<MapPin />} index={1} />
				<Stepper.Step title="Pago" description="Método de pago" icon={<CreditCard />} index={2} />
				<Stepper.Step title="Finaliza" description="Confirmación final" icon={<CheckCircle />} index={3} />

				<Stepper.Content>
					{TemplateContent(
						"Datos personales",
						"Completa tu información básica para continuar con el proceso.",
						1
					)}
				</Stepper.Content>
				<Stepper.Content>
					{TemplateContent(
						"Dirección",
						"Confirma y verifica tu domicilio para el envío de tus productos.",
						2
					)}
				</Stepper.Content>
				<Stepper.Content>
					{TemplateContent(
						"Pago",
						"Selecciona tu método de pago preferido y revisa que la información sea correcta.",
						3
					)}
				</Stepper.Content>
				<Stepper.Content>
					{TemplateContent(
						"Finaliza",
						"Revisa todos los datos y confirma para finalizar el proceso.",
						4
					)}
				</Stepper.Content>

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
				<Stepper.Step title="Datos personales" description="Información básica" index={0} />
				<Stepper.Step title="Dirección" description="Confirma domicilio" index={1} />
				<Stepper.Step title="Pago" description="Método de pago" index={2} />
				<Stepper.Step title="Finaliza" description="Confirmación final" index={3} />

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
						>
							Step 1
						</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>Datos personales</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							Completa tu información básica para continuar con el proceso.
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
						>
							Step 2
						</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>Dirección</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							Confirma y verifica tu domicilio para el envío de tus productos.
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
						>
							Step 3
						</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>Pago</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							Selecciona tu método de pago preferido y revisa que la información sea correcta.
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
				<Stepper.Content>
					{TemplateContent(
						"Finaliza",
						"Revisa todos los datos y confirma para finalizar el proceso.",
						4
					)}
				</Stepper.Content>

				<Stepper.CompletedContent>{stepCompletedContent}</Stepper.CompletedContent>
			</Stepper>
		</ContainerComponent>
	);
};

const TemplateWithValidation = (args: StepperProps) => {
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		payment: "",
	});

	const handleValidation = async (stepIndex: number) => {
		// Simular validación asíncrona (por ejemplo, llamada a API)
		await new Promise((resolve) => setTimeout(resolve, 500));

		switch (stepIndex) {
			case 0:
				if (formData.name.trim() === "") {
					return {
						isValid: false,
						errorMessage: "El nombre es requerido para continuar",
					};
				}
				if (formData.name.length < 3) {
					return {
						isValid: false,
						errorMessage: "El nombre debe tener al menos 3 caracteres",
					};
				}
				return { isValid: true };

			case 1:
				if (formData.address.trim() === "") {
					return {
						isValid: false,
						errorMessage: "La dirección es requerida para continuar",
					};
				}
				return { isValid: true };

			case 2:
				if (formData.payment.trim() === "") {
					return {
						isValid: false,
						errorMessage: "El método de pago es requerido",
					};
				}
				return { isValid: true };

			default:
				return { isValid: true };
		}
	};

	return (
		<ContainerComponent title="Stepper con Validación Personalizada">
			<Stepper {...args} onStepValidate={handleValidation}>
				<Stepper.Step title="Datos personales" description="Información básica" index={0} />
				<Stepper.Step title="Dirección" description="Confirma domicilio" index={1} />
				<Stepper.Step title="Pago" description="Método de pago" index={2} />
				<Stepper.Step title="Finaliza" description="Confirmación final" index={3} />

				<Stepper.Content>
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
						>
							Step 1
						</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>Datos personales</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							Completa tu información básica para continuar con el proceso.
						</p>
						<div style={{ width: "100%", maxWidth: "25em", marginBottom: 16 }}>
							<Input
								id="nombre"
								type="text"
								label="Nombre"
								placeholder="Ingresa tu nombre completo"
								onChangeValue={(value) => setFormData({ ...formData, name: value })}
								value={formData.name}
							/>
						</div>
					</div>
				</Stepper.Content>
				<Stepper.Content>
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
						>
							Step 2
						</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>Dirección</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							Confirma y verifica tu domicilio para el envío de tus productos.
						</p>
						<div style={{ width: "100%", maxWidth: "25em", marginBottom: 16 }}>
							<Input
								id="direccion"
								type="text"
								label="Dirección"
								placeholder="Ingresa tu dirección completa"
								onChangeValue={(value) => setFormData({ ...formData, address: value })}
								value={formData.address}
							/>
						</div>
					</div>
				</Stepper.Content>
				<Stepper.Content>
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
						>
							Step 3
						</p>
						<h1 style={{ color: "var(--foreground-title-color)" }}>Pago</h1>
						<p style={{ color: "var(--foreground-secondary-color)" }}>
							Selecciona tu método de pago preferido y revisa que la información sea correcta.
						</p>
						<div style={{ width: "100%", maxWidth: "25em", marginBottom: 16 }}>
							<Input
								id="pago"
								type="text"
								label="Método de pago"
								placeholder="Ingresa tu método de pago"
								onChangeValue={(value) => setFormData({ ...formData, payment: value })}
								value={formData.payment}
							/>
						</div>
					</div>
				</Stepper.Content>
				<Stepper.Content>
					{TemplateContent(
						"Finaliza",
						"Revisa todos los datos y confirma para finalizar el proceso.",
						4
					)}
				</Stepper.Content>

				<Stepper.CompletedContent>{stepCompletedContent}</Stepper.CompletedContent>
			</Stepper>
		</ContainerComponent>
	);
};

export const Horizontal: Story = {
	render: (args) => <Template {...args} />,
	args: {
		defaultActiveStep: 0,
		orientation: "horizontal",
		variant: "bordered",
	},
};

export const Vertical: Story = {
	render: (args) => <Template {...args} />,
	args: {
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
	},
};

export const WithCustomIcons: Story = {
	render: (args) => <TemplateCustomIcons {...args} />,
	args: {
		defaultActiveStep: 0,
		orientation: "horizontal",
		variant: "bordered",
	},
};

export const WithCustomValidation: Story = {
	render: (args) => <TemplateWithValidation {...args} />,
	args: {
		defaultActiveStep: 0,
		orientation: "horizontal",
		variant: "bordered",
	},
};
