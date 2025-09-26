import type { Meta, StoryObj } from "@storybook/react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Input } from "../Input/Input";
import Join, { JoinProps } from "./Join";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Select } from "../Select/Select";
import { SearchIcon } from "lucide-react";
import { InputNumber } from "../InputNumber/InputNumber";

const meta: Meta<typeof Join> = {
	title: "Components/Join",
	component: Join,
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "small", "medium", "large", "full"],
			description: "Corner shape",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Join>;

const Template = (args: JoinProps) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("local");
	return (
		<ContainerComponent
			title="Input Group"
			onChangeStyleSource={(value) => setCurrentStyle(value)}
			styleSource={currentStyle}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "var(--gap-lg)",
					padding: "var(--padding-lg)",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: "35px", width: "100%" }}>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<Input
							type="text"
							placeholder="Text input example"
							label="Input"
							helperText="Helper text"
						/>
						<Select
							placeholder="Select"
							label="Select"
							options={[
								{ value: "Option 1", label: "Option 1" },
								{ value: "Option 2", label: "Option 2" },
								{ value: "Option 3", label: "Option 3" },
							]}
						/>
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<Select
							placeholder="Select example"
							label="Select"
							options={[
								{ value: "Option 1", label: "Option 1" },
								{ value: "Option 2", label: "Option 2" },
								{ value: "Option 3", label: "Option 3" },
							]}
						/>
						<Input
							type="text"
							placeholder="Text input example"
							label="Input"
							helperText="Helper text"
						/>
						<Button type="button" variant="solid" color="neutral" label="Button" />
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<InputNumber />
						<Input
							type="text"
							placeholder="Text input example"
							floatingLabel
							label="Name"
							prefix={<SearchIcon />}
						/>
						<Button type="button" variant="subtle" color="warning" label="Search" />
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<InputNumber typeNumber="currency-USD" />
						<Input
							type="text"
							placeholder="Text input example"
							floatingLabel
							label="Name"
							prefix={<SearchIcon />}
						/>
						<Button type="button" variant="subtle" color="success" label="Search" />
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<Input type="text" placeholder="Text input example" prefix={<SearchIcon />} />
						<Button type="button" variant="solid" color="info" label="Search" />
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<Button type="button" variant="subtle" color="info" label="Clear" />
						<Button type="button" variant="subtle" color="info" label="Cancel" />
						<Button type="button" variant="subtle" color="info" label="Confirm" />
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<Button type="button" variant="solid" color="danger" label="Button 1" />
						<Button type="button" variant="solid" color="danger" label="Button 2" />
						<Button type="button" variant="solid" color="danger" label="Button 3" />
						<Button type="button" variant="solid" color="danger" label="Button 4" />
						<Button type="button" variant="solid" color="danger" label="Button 5" />
					</Join>
				</div>
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		radius: "small",
		size: "medium",
		disabled: false,
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		radius: "small",
		size: "medium",
	},
};
