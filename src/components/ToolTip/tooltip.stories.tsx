import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./ToolTip";
import { TooltipProps } from "./tooltip.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Tooltip> = {
	title: "Components/Tooltip",
	component: Tooltip,
	argTypes: {
		content: {
			control: "text",
			description: "Content of the tooltip",
		},
		radius: {
			control: "inline-radio",
			options: ["default", "none", "tiny", "small", "medium", "large", "full"],
			description: "Radius of the tooltip",
		},
		position: {
			control: "inline-radio",
			options: [
				"top-left",
				"top-center",
				"top-right",
				"bottom-left",
				"bottom-center",
				"bottom-right",
				"left-center",
				"right-center",
			],
			description: "Position of the tooltip",
		},
		delayShow: {
			control: "number",
			type: "number",
			description: "Delay before showing the tooltip in milliseconds",
		},
		delayHide: {
			control: "number",
			type: "number",
			description: "Delay before hiding the tooltip in milliseconds",
		},
	},
};

export default meta;
const colors = ["neutral", "primary", "secondary", "success", "danger", "warning", "info"];

const Template = (args: TooltipProps & React.RefAttributes<HTMLDivElement>) => {
	return (
		<ContainerComponent
			title="Tooltip"
			color={args.position?.toString() || ""}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					gap: "2rem",
					rowGap: "4rem",
					justifyContent: "center",
				}}
			>
				{colors.map((color) => (
					<Tooltip
						{...args}
						color={color as TooltipProps["color"]}
					>
						<div
							key={color}
							style={{
								width: "100px",
								height: "50px",
								backgroundColor: `var(--${color}-soft-color)`,
								color: `var(--${color}-text-color)`,
								fontFamily: "var(--font-family)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
								fontSize: "0.8em",
								fontWeight: "bold",
								borderRadius: "var(--radius-sm)",
							}}
						>
							Hover over me
						</div>
					</Tooltip>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Default: StoryObj<TooltipProps> = {
	render: (args) => <Template {...args} />,
	args: {
		delayShow: 100,
		delayHide: 100,
		radius: "tiny",
		position: "top-center",
		content: "This is a tooltip",
	},
};
