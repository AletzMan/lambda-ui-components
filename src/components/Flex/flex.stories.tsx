import { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "./Flex";
import { AlignItems, Direction, JustifyContent, Wrap } from "./flex.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const flexDirectionOptions: Direction[] = [
	"row",
	"row-reverse",
	"column",
	"column-reverse",
	"initial",
	"inherit",
	"unset",
	"revert",
	"revert-layer",
	"-moz-initial",
];

const flexAlignOptions: AlignItems[] = [
	"flex-start",
	"flex-end",
	"center",
	"end",
	"start",
	"self-end",
	"self-start",
	"baseline",
	"stretch",
	"normal",
	"inherit",
	"initial",
	"revert",
	"revert-layer",
	"unset",
	"-moz-initial",
];

const flexWrapOptions: Wrap[] = [
	"nowrap",
	"wrap",
	"wrap-reverse",
	"inherit",
	"initial",
	"revert",
	"revert-layer",
	"unset",
	"-moz-initial",
];

const flexJustifyOptions: JustifyContent[] = [
	"-moz-initial",
	"center",
	"end",
	"flex-end",
	"flex-start",
	"inherit",
	"initial",
	"left",
	"right",
	"normal",
	"revert",
	"revert-layer",
	"space-around",
	"space-between",
	"space-evenly",
	"start",
	"stretch",
	"unset",
];

const meta: Meta<typeof Flex> = {
	title: "Components/Flex",
	component: Flex,
	argTypes: {
		direction: {
			control: "inline-radio",
			options: flexDirectionOptions,
			description: "Direction of the flex container",
			type: "string",
		},
		align: {
			control: "inline-radio",
			options: flexAlignOptions,
			description: "Alignment of the flex container",
			type: "string",
		},
		justify: {
			control: "inline-radio",
			options: flexJustifyOptions,
			description: "Justify of the flex container",
			type: "string",
		},
		gap: {
			control: "number",
			description: "Gap between flex items",
			type: "number",
		},
		wrap: {
			control: "inline-radio",
			options: flexWrapOptions,
			description: "Wrap of the flex container",
			type: "string",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Row: Story = {
	render: (args) => (
		<ContainerComponent title="Flex" subtitle={args.direction}>
			<div style={{ width: "100%", height: "100%" }}>
				<Flex {...args} style={{ width: "100%", height: "100%" }}>
					{Array.from({ length: 7 }, (_, index) => (
						<div
							style={{
								padding: "1rem",
								backgroundColor: "var(--surface-b)",
								borderRadius: "var(--radius-xs)",
								border: "1px solid var(--border-color)",
								opacity: 0.8,
								backgroundSize: "10px 10px",
								backgroundImage:
									"repeating-linear-gradient(45deg, var(--border-color) 0, var(--border-color) 1px, var(--surface-b) 0, var(--surface-b) 50%)",
							}}
							key={index}
						>
							Item {index + 1}
						</div>
					))}
				</Flex>
			</div>
		</ContainerComponent>
	),
	args: {
		direction: "row",
		align: "center",
		gap: 0,
		wrap: "nowrap",
		justify: "start",
	},
};
