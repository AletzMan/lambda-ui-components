import { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPicker } from "./ColorPicker";
import { ColorPickerProps } from "./colorpicker.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof ColorPicker> = {
	title: "Components/ColorPicker",
	component: ColorPicker,
	argTypes: {
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},

		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		showText: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
	},
};

export default meta;

export type Story = StoryObj<typeof ColorPicker>;

const Template = (args: ColorPickerProps) => {
	return (
		<ContainerComponent title="ColorPicker">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					height: "100%",
					gap: "1rem",
				}}
			>
				<ColorPicker {...args} />
			</div>
		</ContainerComponent>
	);
};

export const Default: Story = {
	render: Template,
	args: {
		size: "medium",
		disabled: false,
		showText: false,
	},
};
