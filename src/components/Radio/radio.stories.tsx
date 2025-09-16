import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio } from "./Radio";
import { RadioGroupProps } from "./radio.types";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof RadioGroup> = {
	title: "Components/Radio",
	component: RadioGroup,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "soft", "outline"],
			description: "Visual style of the input",
			type: "string",
		},
		color: {
			control: "select",
			options: ["neutral", "primary", "secondary", "danger", "success", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		orientation: {
			control: "radio",
			options: ["horizontal", "vertical"],
		},
		radius: {
			control: "select",
			options: ["none", "tiny", "small", "medium", "pill"],
			description: "Input radius",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		gap: {
			control: "select",
			options: ["0.5rem", "1rem", "1.5rem", "2rem"],
			if: {
				global: "orientation",
				exists: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const colors = ["neutral", "primary", "secondary", "danger", "success", "warning", "info"];

const RadioTemplate = (args: RadioGroupProps) => {
	return (
		<ContainerComponent title="Radio" subtitle={"Default"} color={args.variant || "solid"}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					flexWrap: "wrap",
					gap: "0.5rem",
					padding: "1rem",
				}}
			>
				{colors.map((color) => (
					<div key={color}>
						<label
							style={{
								textTransform: "capitalize",
								color: `var(--${color}-base-color)`,
								fontSize: "0.8rem",
								fontWeight: "var(--font-weight-semibold)",
							}}
						>
							{color}
						</label>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "1rem",
								padding: "1rem",
								borderRadius: "var(--border-radius-sm)",
								border: "1px solid var(--border-color)",
							}}
						>
							<RadioGroup
								key={color}
								name="example"
								defaultValue="option1"
								{...args}
								color={color as RadioGroupProps["color"]}
							>
								<Radio value="option1" label="Option 1" />
								<Radio value="option2" label="Option 2" />
								<Radio value="option3" label="Option 3" />
							</RadioGroup>
						</div>
					</div>
				))}
			</div>
		</ContainerComponent>
	);
};

const RadioButtonTemplate = (args: RadioGroupProps) => {
	return (
		<ContainerComponent title="Radio" subtitle={"Button"} color={args.variant || "solid"}>
			<label
				style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground-color)" }}
			>
				Whit icon
			</label>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
					width: "100%",
					gap: "0.5rem",
					borderRadius: "var(--border-radius-sm)",
					border: "1px solid var(--border-color)",
					padding: "0.25rem",
				}}
			>
				{colors.map((color) => (
					<div key={color} style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
						<label
							style={{
								textTransform: "capitalize",
								color: `var(--${color}-base-color)`,
								fontSize: "0.8rem",
								fontWeight: "var(--font-weight-semibold)",
							}}
						>
							{color}
						</label>
						<RadioGroup
							name="example"
							defaultValue="option1"
							{...args}
							color={color as RadioGroupProps["color"]}
						>
							<Radio.Button value="option1" icon={<AlignLeft />} />
							<Radio.Button value="option2" icon={<AlignCenter />} />
							<Radio.Button value="option3" icon={<AlignRight />} />
						</RadioGroup>
					</div>
				))}
			</div>
			<label
				style={{
					marginTop: "1rem",
					fontWeight: "var(--font-weight-semibold)",
					color: "var(--foreground-color)",
				}}
			>
				Whit label
			</label>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
					width: "100%",
					borderRadius: "var(--border-radius-sm)",
					border: "1px solid var(--border-color)",
					padding: "0.25rem",
					gap: "0.5rem",
				}}
			>
				{colors.map((color) => (
					<div key={color} style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
						<label
							style={{
								textTransform: "capitalize",
								color: `var(--${color}-base-color)`,
								fontSize: "0.8rem",
								fontWeight: "var(--font-weight-semibold)",
							}}
						>
							{color}
						</label>
						<RadioGroup
							name="example"
							defaultValue="option1"
							{...args}
							color={color as RadioGroupProps["color"]}
						>
							<Radio.Button value="option1" label="Left" />
							<Radio.Button value="option2" label="Center" />
							<Radio.Button value="option3" label="Right" />
						</RadioGroup>
					</div>
				))}
			</div>
			<label
				style={{
					marginTop: "1rem",
					fontWeight: "var(--font-weight-semibold)",
					color: "var(--foreground-color)",
				}}
			>
				Whit icon and label
			</label>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(355px, 1fr))",
					width: "100%",
					borderRadius: "var(--border-radius-sm)",
					border: "1px solid var(--border-color)",
					padding: "0.25rem",
					gap: "0.5rem",
				}}
			>
				{colors.map((color) => (
					<div key={color} style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
						<label
							style={{
								textTransform: "capitalize",
								color: `var(--${color}-base-color)`,
								fontSize: "0.8rem",
								fontWeight: "var(--font-weight-semibold)",
							}}
						>
							{color}
						</label>
						<RadioGroup
							name="example"
							defaultValue="option1"
							{...args}
							color={color as RadioGroupProps["color"]}
						>
							<Radio.Button value="option1" label="Left" icon={<AlignLeft />} />
							<Radio.Button value="option2" label="Center" icon={<AlignCenter />} />
							<Radio.Button value="option3" label="Right" icon={<AlignRight />} />
						</RadioGroup>
					</div>
				))}
			</div>
		</ContainerComponent>
	);
};

const RadioCardTemplate = (args: RadioGroupProps) => {
	return (
		<ContainerComponent
			title="Radio"
			subtitle={"Card"}
			color={`${args.variant || "solid"} `}
			optional={args.color || ""}
		>
			<RadioGroup name="example" defaultValue="option1" {...args}>
				<Radio.Card
					value="option1"
					label="Option 1"
					title="Option 1"
					subtitle="Subtitle"
					body={<div>Body</div>}
				/>
				<Radio.Card
					value="option2"
					label="Option 2"
					title="Option 2"
					subtitle="Subtitle"
					body={<div>Body</div>}
				/>
				<Radio.Card
					value="option3"
					label="Option 3"
					title="Option 3"
					subtitle="Subtitle"
					body={<div>Body</div>}
				/>
			</RadioGroup>
		</ContainerComponent>
	);
};

export const DefaultSolid: Story = {
	render: (args) => <RadioTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "solid",
		disabled: false,
		radius: "small",
	},
};

export const DefaultSoft: Story = {
	render: (args) => <RadioTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "soft",
		disabled: false,
		radius: "small",
	},
};

export const DefaultOutline: Story = {
	render: (args) => <RadioTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "outline",
		disabled: false,
		radius: "small",
	},
};

export const ButtonSolid: Story = {
	render: (args) => <RadioButtonTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "solid",
		disabled: false,
		radius: "small",
	},
};

export const ButtonSoft: Story = {
	render: (args) => <RadioButtonTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "soft",
		radius: "small",
		disabled: false,
	},
};

export const ButtonOutline: Story = {
	render: (args) => <RadioButtonTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "outline",
		disabled: false,
		radius: "small",
	},
};

export const CardSolid: Story = {
	render: (args) => <RadioCardTemplate {...args} />,
	args: {
		size: "small",
		color: "primary",
		variant: "solid",
		disabled: false,
		radius: "small",
	},
};

export const CardSoft: Story = {
	render: (args) => <RadioCardTemplate {...args} />,
	args: {
		size: "small",
		color: "primary",
		variant: "soft",
		disabled: false,
		radius: "small",
	},
};

export const CardOutline: Story = {
	render: (args) => <RadioCardTemplate {...args} />,
	args: {
		size: "small",
		color: "primary",
		variant: "outline",
		disabled: false,
		radius: "small",
	},
};
