import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./Dialog";
import { DialogProps } from "./dialog.types";
import { Button } from "../Button/Button";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { UserRoundX } from "lucide-react";

const meta: Meta<typeof Dialog> = {
	title: "Components/Dialog",
	component: Dialog,
	argTypes: {
		onClose: {
			table: {
				disabled: true,
			},
		},
		title: {
			control: {
				type: "text",
			},
			defaultValue: "Dialog Title",
		},
		showCloseButton: {
			control: {
				type: "boolean",
			},
			defaultValue: true,
		},
		transitionMode: {
			control: {
				type: "inline-radio",
			},
			options: [
				"fade",
				"scaleUp",
				"unfold",
				"fadeFromTop",
				"fadeFromBottom",
				"fadeFromLeft",
				"fadeFromRight",
			],
			defaultValue: "fade",
		},
		backdropType: {
			control: {
				type: "inline-radio",
			},
			options: ["dark", "blur", "transparent"],
			defaultValue: "dark",
		},
		closeOnEscape: {
			control: {
				type: "boolean",
			},
			defaultValue: true,
		},
		isModal: {
			control: {
				type: "boolean",
			},
			defaultValue: false,
		},
		isDraggable: {
			control: {
				type: "boolean",
			},
			defaultValue: false,
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
					title={
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<UserRoundX color="var(--danger-base-color)" />
							<span>Eliminar usuario</span>
						</div>
					}
					footer={
						<>
							<Button
								color="primary"
								size="small"
								onClick={() => {
									setOpenDialog(false);
								}}
							>
								Accept
							</Button>
							<Button
								color="neutral"
								size="small"
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
					<div style={{ display: "flex", flexDirection: "column", gap: "2em", padding: "3em 1em" }}>
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
		showCloseButton: true,
		isModal: false,
		isDraggable: false,
		backdropType: "dark",
		closeOnEscape: true,
		transitionMode: "scaleUp",
	},
};
