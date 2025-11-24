import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, Radio } from "./Radio";
import { RadioGroupProps } from "./radio.types";
import {
	ArrowDownFromLine,
	ArrowLeftFromLine,
	ArrowRightFromLine,
	ArrowUpFromLine,
} from "lucide-react";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof RadioGroup> = {
	title: "Components/Radio",
	component: RadioGroup,
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["solid", "soft", "outline"],
			description: "Visual style of the input",
			type: "string",
		},
		color: {
			control: "inline-radio",
			options: ["neutral", "primary", "secondary", "danger", "success", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large", "full", "none"],
			description: "Input radius",
		},
		hideRadio: {
			control: "boolean",
			description: "Hide radio",
		},
		orientation: {
			control: "radio",
			options: ["horizontal", "vertical"],
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
					<div key={color} style={{ display: "flex", flexDirection: "column" }}>
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
								height: "200px",
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
								<Radio value="option4" label="Option 4" />
								<Radio value="option5" label="Option 5" />
								<Radio value="option6" label="Option 6" />
								<Radio value="option7" label="Option 7" />
								<Radio value="option8" label="Option 8" />
								<Radio value="option9" label="Option 9" />
								<Radio value="option10" label="Option 10" />
							</RadioGroup>
						</div>
					</div>
				))}
			</div>
		</ContainerComponent>
	);
};

const RadioButtonTemplate = (args: RadioGroupProps) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Radio"
			subtitle={"Button"}
			color={args.variant || "solid"}
			onChangeStyleSource={(style) => setCurrentStyle(style)}
			styleSource={currentStyle}
		>
			<label
				style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground-color)" }}
			>
				Whit icon
			</label>
			<div
				style={{
					display: "grid",
					gridTemplateColumns:
						args.orientation === "horizontal"
							? "repeat(auto-fit, minmax(180px, 1fr))"
							: "repeat(auto-fit, minmax(30px, 35px))",
					width: "100%",
					gap: args.orientation === "horizontal" ? "0.5rem" : "2rem",
					borderRadius: "var(--border-radius-sm)",
					border: "1px solid var(--border-color)",
					padding: "0.25rem",
					backgroundColor: "var(--surface-a)",
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
							radius={currentStyle === "local" ? args.radius : undefined}
						>
							<Radio.Button value="option1" icon={<ArrowLeftFromLine />} />
							<Radio.Button value="option2" icon={<ArrowUpFromLine />} />
							<Radio.Button value="option3" icon={<ArrowRightFromLine />} />
							<Radio.Button value="option4" icon={<ArrowDownFromLine />} />
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
					gridTemplateColumns:
						args.orientation === "horizontal"
							? "repeat(auto-fit, minmax(250px, 1fr))"
							: "repeat(auto-fit, minmax(100px, 1fr))",
					width: "100%",
					borderRadius: "var(--border-radius-sm)",
					border: "1px solid var(--border-color)",
					padding: "0.25rem",
					gap: "0.5rem",
					backgroundColor: "var(--surface-a)",
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
							radius={currentStyle === "local" ? args.radius : undefined}
							color={color as RadioGroupProps["color"]}
						>
							<Radio.Button value="option1" label="Left" />
							<Radio.Button value="option2" label="Up" />
							<Radio.Button value="option3" label="Right" />
							<Radio.Button value="option4" label="Down" />
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
					gridTemplateColumns:
						args.orientation === "horizontal"
							? "repeat(auto-fit, minmax(355px, 1fr))"
							: "repeat(auto-fit, minmax(100px, 1fr))",
					width: "100%",
					borderRadius: "var(--border-radius-sm)",
					border: "1px solid var(--border-color)",
					padding: "0.25rem",
					gap: "0.5rem",
					backgroundColor: "var(--surface-a)",
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
							radius={currentStyle === "local" ? args.radius : undefined}
							color={color as RadioGroupProps["color"]}
						>
							<Radio.Button value="option1" label="Left" icon={<ArrowLeftFromLine />} />
							<Radio.Button value="option2" label="Up" icon={<ArrowUpFromLine />} />
							<Radio.Button value="option3" label="Right" icon={<ArrowRightFromLine />} />
							<Radio.Button value="option4" label="Down" icon={<ArrowDownFromLine />} />
						</RadioGroup>
					</div>
				))}
			</div>
		</ContainerComponent>
	);
};

const RadioCardTemplate = (args: RadioGroupProps) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Radio"
			subtitle={"Card"}
			color={`${args.variant || "solid"} `}
			optional={args.color || ""}
			onChangeStyleSource={(style) => setCurrentStyle(style)}
		>
			<RadioGroup
				name="example"
				defaultValue="option1"
				{...args}
				radius={currentStyle === "local" ? args.radius : undefined}
			>
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
		size: "small",
		radius: "small",
		color: "primary",
		variant: "solid",
		disabled: false,
		orientation: "horizontal",
		hideRadio: false,
	},
};

export const DefaultSoft: Story = {
	render: (args) => <RadioTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "soft",
		disabled: false,
		orientation: "horizontal",
		hideRadio: false,
	},
};

export const DefaultOutline: Story = {
	render: (args) => <RadioTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "outline",
		disabled: false,
		orientation: "horizontal",
		hideRadio: false,
	},
};

export const ButtonSolid: Story = {
	render: (args) => <RadioButtonTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "solid",
		disabled: false,
		orientation: "horizontal",
		hideRadio: false,
	},
};

export const ButtonSoft: Story = {
	render: (args) => <RadioButtonTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "soft",
		disabled: false,
		orientation: "horizontal",
		hideRadio: false,
	},
};

export const ButtonOutline: Story = {
	render: (args) => <RadioButtonTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "outline",
		disabled: false,
		orientation: "vertical",
		hideRadio: false,
	},
};

export const CardSolid: Story = {
	render: (args) => <RadioCardTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "solid",
		disabled: false,
		orientation: "vertical",
		hideRadio: false,
	},
};

export const CardSoft: Story = {
	render: (args) => <RadioCardTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "soft",
		disabled: false,
		orientation: "vertical",
		hideRadio: false,
	},
};

export const CardOutline: Story = {
	render: (args) => <RadioCardTemplate {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "primary",
		variant: "outline",
		disabled: false,
		orientation: "vertical",
		hideRadio: false,
	},
};
