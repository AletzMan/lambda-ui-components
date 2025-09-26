import type { Meta, StoryObj } from "@storybook/react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Input } from "../Input/Input";
import Join, { JoinProps } from "./Join";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Select } from "../Select/Select";

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
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
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
				<div style={{ display: "flex", flexDirection: "column", gap: "40px", width: "100%" }}>
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
						<Input type="text" placeholder="Text input example" />
						<Button type="button" variant="solid" color="neutral" label="Button" />
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<Input type="text" placeholder="Text input example" />
						<Button type="button" variant="soft" color="neutral" label="Button" />
					</Join>
					<Join {...args} radius={currentStyle === "local" ? args.radius : undefined}>
						<Input type="text" placeholder="Text input example" />
						<Button type="button" variant="subtle" color="neutral" label="Button" />
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
