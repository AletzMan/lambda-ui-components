import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { DialogProps } from "./dialog.types";
import { Button } from "../Button/Button";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Dialog> = {
	title: "Components/Dialog",
	component: Dialog,
	argTypes: {
		isOpen: {
			control: {
				type: "boolean",
			},
			defaultValue: true,
		},
		onClose: {
			action: "onClose",
		},
		title: {
			control: {
				type: "text",
			},
			defaultValue: "Dialog Title",
		},
		footer: {
			control: {
				type: "text",
			},
			defaultValue: "Dialog Footer",
		},
	},
};

export default meta;

const DialogTemplate = (args: DialogProps & React.RefAttributes<HTMLDivElement>) => {
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<ContainerComponent title="Dialog">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: "2em",
					padding: "1em",
				}}
			>
				<Dialog
					{...args}
					isOpen={openDialog}
					onClose={() => setOpenDialog(false)}
					footer={
						<>
							<Button
								color="secondary"
								onClick={() => {
									setOpenDialog(false);
								}}
							>
								Accept
							</Button>
							<Button
								color="neutral"
								onClick={() => {
									setOpenDialog(false);
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
				</Dialog>
				<Button
					label="Open Dialog"
					onClick={() => {
						setOpenDialog(true);
					}}
				/>
			</div>{" "}
		</ContainerComponent>
	);
};

export const Default: StoryObj<typeof Dialog> = {
	render: (args) => <DialogTemplate {...args} />,
	args: {
		isOpen: true,
		onClose: () => console.log("Dialog closed"),
		children: "This is the dialog content.",
		title: "Dialog Title",
		footer: "Dialog Footer",
	},
};
