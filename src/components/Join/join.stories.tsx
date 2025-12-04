import type { Meta, StoryObj } from "@storybook/react-vite";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Input } from "../Input/Input";
import Join, { JoinProps } from "./Join";
import { Button } from "../Button/Button";
import { Select } from "../Select/Select";
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	BellIcon,
	SearchIcon,
	SettingsIcon,
	UserIcon,
} from "lucide-react";
import { InputNumber } from "../InputNumber/InputNumber";
import { Checkbox } from "../Checkbox/Checkbox";
import { Dropdown } from "../Dropdown/Dropdown";

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
			options: ["default", "none", "small", "medium", "large", "full"],
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
	return (
		<ContainerComponent
			title="Join"
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "var(--spacing-lg)",
					padding: "var(--spacing-lg)",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
					<Join {...args}>
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
					<Join {...args}>
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
					<Join {...args}>
						<Checkbox label="Is Required" color="danger" variant="solid" />
						<InputNumber label="InputNumber" />
						<Input
							type="text"
							placeholder="Text input example"
							floatingLabel
							label="Name"
							prefix={<SearchIcon />}
						/>
						<Button type="button" variant="subtle" color="warning" label="Search" />
					</Join>
					<Join {...args}>
						<InputNumber typeNumber="currency-USD" label="Currency-USD" />
						<Input
							type="text"
							placeholder="Text input example"
							floatingLabel
							label="Name"
							prefix={<SearchIcon />}
						/>
						<Button type="button" variant="subtle" color="success" label="Search" />
					</Join>
					<Join {...args}>
						<Dropdown icon={<SettingsIcon />}>
							<Dropdown.Item text="Settings" icon={<SettingsIcon />} />
							<Dropdown.Item text="Notifications" icon={<BellIcon />} />
							<Dropdown.Item text="Profile" icon={<UserIcon />} />
						</Dropdown>
						<Input type="text" placeholder="Text input example" prefix={<SearchIcon />} />
						<Button type="button" variant="solid" color="info" label="Search" />
					</Join>
					<Join {...args}>
						<Checkbox label="Checkbox 1" color="info" variant="solid" />
						<Checkbox label="Checkbox 2" color="info" variant="solid" />
						<Checkbox label="Checkbox 3" color="info" variant="solid" />
						<Checkbox label="Checkbox 4" color="info" variant="solid" />
					</Join>
					<Join {...args}>
						<Checkbox color="info" variant="solid" icon={<AlignLeft />} />
						<Checkbox color="info" variant="solid" icon={<AlignCenter />} />
						<Checkbox color="info" variant="solid" icon={<AlignRight />} />
						<Checkbox color="info" variant="solid" icon={<AlignJustify />} />
					</Join>
					<Join {...args}>
						<Button type="button" variant="classic" color="danger" label="Button 1" />
						<Button type="button" variant="classic" color="danger" label="Button 2" />
						<Button type="button" variant="classic" color="danger" label="Button 3" />
						<Button type="button" variant="classic" color="danger" label="Button 4" />
						<Button type="button" variant="classic" color="danger" label="Button 5" />
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
