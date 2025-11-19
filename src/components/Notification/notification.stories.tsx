import type { Meta, StoryObj } from "@storybook/react-vite";
import { Notification } from "./Notification";
import { NotificationProvider, useNotification } from "./NotificationProvider";
import { Button, Switch } from "../../main";
import { NotificationProps } from "./notifications.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { useState } from "react";

const meta: Meta<typeof Notification> = {
	title: "Components/Notification",
	component: Notification,
	argTypes: {
		notificationType: {
			table: {
				disable: true,
			},
		},
		message: {
			control: "text",
			description: "Message to display",
			type: "string",
		},
		variant: {
			control: "select",
			options: ["themed", "soft", "solid", "darkened", "lightened"],
			description: "Style of the notification",
			type: "string",
			table: {
				disable: true,
			},
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large"],
			description: "Radius of the notification",
			type: "string",
		},
		placement: {
			control: "inline-radio",
			options: [
				"top-left",
				"top-center",
				"top-right",
				"bottom-left",
				"bottom-center",
				"bottom-right",
			],
			description: "Position of the notification",
		},
		closable: {
			control: "boolean",
			description: "If true, the notification will have a close button",
			type: "boolean",
		},
		duration: {
			description: "Duration in milliseconds before the notification closes",
			type: "number",
		},
		onClose: {
			table: {
				disable: true,
			},
		},
		onCancel: {
			table: {
				disable: true,
			},
		},
		onConfirm: {
			table: {
				disable: true,
			},
		},
		cancelText: {
			table: {
				disable: true,
			},
		},
		confirmText: {
			table: {
				disable: true,
			},
		},
		icon: {
			table: {
				disable: true,
			},
		},
		"aria-label": {
			table: {
				disable: true,
			},
		},
	},
	decorators: [
		(Story) => (
			<NotificationProvider maxNotifications={5}>
				<Story />
			</NotificationProvider>
		),
	],
};

export default meta;

const NotificationWithButton = (
	args: Partial<NotificationProps & React.RefAttributes<HTMLDivElement>> | undefined
) => {
	const { showNotification } = useNotification();
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	const [viewButtons, setViewButtons] = useState(false);

	const handleClick = () => {
		showNotification({
			...args,
			radius: currentStyle === "local" ? args?.radius : undefined,
			notificationType: "neutral",
			onCancel: viewButtons ? () => alert("Cancel") : undefined,
			onConfirm: viewButtons ? () => alert("Confirm") : undefined,
			cancelText: viewButtons ? "Cancel" : undefined,
			confirmText: viewButtons ? "Confirm" : undefined,
		});
	};

	const handleClickSuccess = () => {
		showNotification({
			...args,
			radius: currentStyle === "local" ? args?.radius : undefined,
			notificationType: "success",
			onCancel: viewButtons ? () => alert("Cancel") : undefined,
			onConfirm: viewButtons ? () => alert("Confirm") : undefined,
			cancelText: viewButtons ? "Cancel" : undefined,
			confirmText: viewButtons ? "Confirm" : undefined,
		});
	};

	const handleClickError = () => {
		showNotification({
			...args,
			radius: currentStyle === "local" ? args?.radius : undefined,
			notificationType: "danger",
			onCancel: viewButtons ? () => alert("Cancel") : undefined,
			onConfirm: viewButtons ? () => alert("Confirm") : undefined,
			cancelText: viewButtons ? "Cancel" : undefined,
			confirmText: viewButtons ? "Confirm" : undefined,
		});
	};

	const handleClickInfo = () => {
		showNotification({
			...args,
			radius: currentStyle === "local" ? args?.radius : undefined,
			notificationType: "info",
			onCancel: viewButtons ? () => alert("Cancel") : undefined,
			onConfirm: viewButtons ? () => alert("Confirm") : undefined,
			cancelText: viewButtons ? "Cancel" : undefined,
			confirmText: viewButtons ? "Confirm" : undefined,
		});
	};

	const handleClickWarning = () => {
		showNotification({
			...args,
			radius: currentStyle === "local" ? args?.radius : undefined,
			notificationType: "warning",
			onCancel: viewButtons ? () => alert("Cancel") : undefined,
			onConfirm: viewButtons ? () => alert("Confirm") : undefined,
			cancelText: viewButtons ? "Cancel" : undefined,
			confirmText: viewButtons ? "Confirm" : undefined,
		});
	};

	return (
		<ContainerComponent
			title="Notification"
			subtitle={args?.variant?.toString() || ""}
			color={args?.placement?.toString() || ""}
			onChangeStyleSource={(style) => setCurrentStyle(style)}
			styleSource={currentStyle}
		>
			<div style={{ height: "100%" }}>
				<Switch
					checked={viewButtons}
					onChange={(checked) => setViewButtons(checked.target.checked)}
					label="View buttons"
					positionLabel="top"
					color="info"
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						gap: "0.25em",
					}}
				>
					<Button onClick={handleClick} color="neutral">
						Default
					</Button>
					<Button onClick={handleClickSuccess} color="success">
						Success
					</Button>
					<Button onClick={handleClickError} color="danger">
						Error
					</Button>
					<Button onClick={handleClickInfo} color="info">
						Info
					</Button>
					<Button onClick={handleClickWarning} color="warning">
						Warning
					</Button>
				</div>
			</div>
		</ContainerComponent>
	);
};

export const Solid: StoryObj<typeof Notification> = {
	render: (args) => <NotificationWithButton {...args} />,
	args: {
		title: "Notification Title",
		message: "You have a new notification.",
		radius: "small",
		placement: "top-center",
		variant: "solid",
		duration: 7000,
		closable: false,
	},
};

export const Soft: StoryObj<typeof Notification> = {
	render: (args) => <NotificationWithButton {...args} />,
	args: {
		title: "Notification Title",
		message: "You have a new notification.",
		radius: "small",
		placement: "top-center",
		variant: "soft",
		duration: 7000,
		closable: false,
	},
};

export const Themed: StoryObj<typeof Notification> = {
	render: (args) => <NotificationWithButton {...args} />,
	args: {
		title: "Notification Title",
		message: "You have a new notification.",
		radius: "small",
		placement: "top-center",
		variant: "themed",
		duration: 7000,
		closable: false,
	},
};

export const Darkened: StoryObj<typeof Notification> = {
	render: (args) => <NotificationWithButton {...args} />,
	args: {
		title: "Notification Title",
		message: "You have a new notification.",
		radius: "small",
		placement: "top-center",
		variant: "darkened",
		duration: 7000,
		closable: false,
	},
};

export const Lightened: StoryObj<typeof Notification> = {
	render: (args) => <NotificationWithButton {...args} />,
	args: {
		title: "Notification Title",
		message: "You have a new notification.",
		radius: "small",
		placement: "top-center",
		variant: "lightened",
		duration: 7000,
		closable: false,
	},
};
