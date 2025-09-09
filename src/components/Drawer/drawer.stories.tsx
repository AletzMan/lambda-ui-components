import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { DrawerProps } from "./drawer.types";
import { Button } from "../Button/Button";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Drawer> = {
	title: "Components/Drawer",
	component: Drawer,
	argTypes: {
		isOpen: {
			control: {
				type: "boolean",
			},
			defaultValue: true,
		},
		title: {
			control: {
				type: "text",
			},
			defaultValue: "Drawer Title",
		},
		footer: {
			control: {
				type: "text",
			},
			defaultValue: "Drawer Footer",
		},
		placement: {
			table: {
				disabled: true,
			},
		},
		onClose: {
			table: {
				disabled: true,
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
								color="secondary"
								onClick={() => {
									setOpenDrawer(false);
								}}
							>
								Accept
							</Button>
							<Button
								color="secondary"
								variant="outline"
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
					<div style={{ display: "flex", flexDirection: "column", gap: "2em", padding: "1em" }}>
						<p>¿Estás seguro de que deseas realizar esta acción?</p>
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
	render: (args) => <DrawerTemplate {...args} />,
	args: {
		isOpen: true,
		children: "This is the dialog content.",
		title: "Drawer Title",
		footer: "Drawer Footer",
		placement: "left",
	},
};

export const Right: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} />,
	args: {
		isOpen: true,
		children: "This is the dialog content.",
		title: "Drawer Title",
		footer: "Drawer Footer",
		placement: "right",
	},
};

export const Top: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} />,
	args: {
		isOpen: true,
		children: "This is the dialog content.",
		title: "Drawer Title",
		footer: "Drawer Footer",
		placement: "top",
	},
};

export const Bottom: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} />,
	args: {
		isOpen: true,
		children: "This is the dialog content.",
		title: "Drawer Title",
		footer: "Drawer Footer",
		placement: "bottom",
	},
};
