import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { DrawerProps } from "./drawer.types";
import { Button } from "../Button/Button";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Input } from "../Input/Input";

const meta: Meta<typeof Drawer> = {
	title: "Components/Drawer",
	component: Drawer,
	argTypes: {
		width: {
			control: "inline-radio",
			options: ["xsmall", "small", "medium", "half", "full"],
		},
		showCloseButton: {
			control: "boolean",
		},
		isOpen: {
			if: {
				arg: "isOpen",
			},
		},
		title: {
			if: {
				arg: "title",
			},
		},
		footer: {
			if: {
				arg: "footer",
			},
		},
		children: {
			if: {
				arg: "children",
			},
		},
		placement: {
			if: {
				arg: "placement",
			},
		},
		onClose: {
			if: {
				arg: "onClose",
			},
		},
		size: {
			if: {
				arg: "size",
			},
		},
	},
};

export default meta;

const DrawerTemplate = (args: DrawerProps & React.RefAttributes<HTMLDivElement>) => {
	const [openDrawer, setOpenDrawer] = useState(false);
	return (
		<ContainerComponent title="Drawer" subtitle={args.placement?.toString() || ""}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: "2em",
					padding: "1em",
				}}
			>
				<Drawer
					{...args}
					isOpen={openDrawer}
					onClose={() => setOpenDrawer(false)}
					footer={
						<>
							<Button
								color="neutral"
								size="small"
								onClick={() => {
									setOpenDrawer(false);
								}}
							>
								Accept
							</Button>
							<Button
								color="neutral"
								variant="outline"
								size="small"
								onClick={() => {
									setOpenDrawer(false);
								}}
								style={{ marginLeft: "8px" }}
							>
								Cancel
							</Button>
						</>
					}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "2em",
							padding: "1em 1em 1em 1em",
						}}
					>
						<h2 style={{ textAlign: "left", fontSize: "1em" }}>Form</h2>
						<Input label="Name" placeholder="John Doe" />
						<Input label="Email" placeholder="john.doe@example.com" />
					</div>
				</Drawer>
				<Button
					label="Open Drawer"
					onClick={() => {
						setOpenDrawer(true);
					}}
				/>
			</div>
		</ContainerComponent>
	);
};

export const Left: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="left" />,
	args: {
		width: "small",
		showCloseButton: true,
	},
};

export const Right: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="right" />,
	args: {
		width: "small",
		showCloseButton: true,
	},
};

export const Top: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="top" />,
	args: {
		width: "small",
		showCloseButton: true,
	},
};

export const Bottom: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="bottom" />,
	args: {
		width: "small",
		showCloseButton: true,
	},
};
