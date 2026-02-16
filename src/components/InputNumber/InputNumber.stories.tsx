import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { InputNumber } from "./InputNumber";
import { InputNumberProps } from "./inputnumber.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { useForm, Controller } from "react-hook-form";

const meta: Meta<typeof InputNumber> = {
	title: "Components/InputNumber",
	component: InputNumber,
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["outline", "flat"],
			description: "Visual style of the input",
			type: "string",
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		color: {
			control: "inline-radio",
			options: ["primary", "neutral", "secondary", "info", "warning", "danger", "success"],
			description: "Input color",
		},
		radius: {
			control: "inline-radio",
			options: ["default", "none", "tiny", "small", "medium", "large", "full"],
			description: "Input radius",
		},
		label: {
			control: "text",
			type: "string",
			description: "Text to display as the label for the component",
		},
		helperText: {
			control: "text",
			type: "string",
			description: "Displays helper text beneath the input.",
		},
		typeNumber: {
			control: "inline-radio",
			type: "string",
			options: ["default", "currency-USD", "currency-EUR", "currency-GBP", "percentage", "decimal"],
		},
		invalid: {
			control: "boolean",
			type: "boolean",
			description: "Applies error styles when true",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		onChangeValue: { action: "onChangeValue" },
	},
};

export default meta;

type Story = StoryObj<typeof InputNumber>;

const Template = (args: InputNumberProps) => {
	return (
		<ContainerComponent
			title="InputNumber"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: "350px",
					gap: "1rem",
				}}
			>
				<InputNumber
					{...args}
					typeNumber="default"
					label="Default"
				/>
				<InputNumber
					{...args}
					typeNumber="currency-USD"
					label="Currency USD"
				/>
				<InputNumber
					{...args}
					typeNumber="currency-EUR"
					label="Currency EUR"
				/>
				<InputNumber
					{...args}
					typeNumber="currency-GBP"
					label="Currency GBP"
				/>
				<InputNumber
					{...args}
					typeNumber="percentage"
					label="Percentage"
				/>
				<InputNumber
					{...args}
					typeNumber="decimal"
					label="Decimal"
				/>
			</div>
		</ContainerComponent>
	);
};

const ReactHookFormTemplate = () => {
	const { control, watch } = useForm({
		defaultValues: {
			quantity: 10,
			price: 99.99,
			discount: 15,
		},
	});

	const formValues = watch();

	return (
		<ContainerComponent
			title="InputNumber with React Hook Form"
			subtitle="Testing Controller integration"
			color="primary"
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: "350px",
					gap: "1rem",
				}}
			>
				<Controller
					name="quantity"
					control={control}
					render={({ field }) => (
						<InputNumber
							{...field}
							value={field.value}
							onChangeValue={field.onChange}
							label="Quantity"
							typeNumber="default"
							min={0}
							max={100}
							step={1}
							variant="outline"
							size="medium"
							radius="tiny"
							color="primary"
						/>
					)}
				/>

				<Controller
					name="price"
					control={control}
					render={({ field }) => (
						<InputNumber
							{...field}
							value={field.value}
							onChangeValue={field.onChange}
							label="Price (USD)"
							typeNumber="currency-USD"
							min={0}
							max={1000}
							step={0.01}
							variant="outline"
							size="medium"
							radius="tiny"
							color="primary"
						/>
					)}
				/>

				<Controller
					name="discount"
					control={control}
					render={({ field }) => (
						<InputNumber
							{...field}
							value={field.value}
							onChangeValue={field.onChange}
							label="Discount"
							typeNumber="percentage"
							min={0}
							max={100}
							step={5}
							variant="outline"
							size="medium"
							radius="tiny"
							color="primary"
						/>
					)}
				/>

				<div style={{ marginTop: "2rem", padding: "1rem", background: "#f5f5f5", borderRadius: "8px", width: "100%" }}>
					<h4 style={{ margin: "0 0 0.5rem 0" }}>Form Values:</h4>
					<pre style={{ margin: 0, fontSize: "12px" }}>
						{JSON.stringify(formValues, null, 2)}
					</pre>
				</div>
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		size: "medium",
		radius: "tiny",
		step: 1,
		min: 0,
		max: 100,
		typeNumber: "default",
		label: "Label",
		helperText: "Must be between 8 and 10 characters long.",
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		placeholder: "0",
		disabled: false,
		color: "primary",
		onChangeValue: action("onChangeValue"),
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		size: "medium",
		radius: "tiny",
		step: 1,
		min: 0,
		max: 100,
		typeNumber: "default",
		label: "Label",
		helperText: "Must be between 8 and 10 characters long.",
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		placeholder: "0",
		disabled: false,
		color: "primary",
		onChangeValue: action("onChangeValue"),
	},
};

export const WithReactHookForm: Story = {
	render: ReactHookFormTemplate,
};
