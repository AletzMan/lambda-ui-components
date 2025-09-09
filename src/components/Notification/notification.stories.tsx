import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from "./Notification";
import { NotificationProvider, useNotification } from "./NotificationProvider";
import { Button } from "../../main";
import { NotificationProps } from "./notifications.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

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
		placement: {
			control: "select",
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

	const handleClick = () => {
		showNotification({
			...args,
			notificationType: "secondary",
		});
	};

	const handleClickSuccess = () => {
		showNotification({
			...args,
			notificationType: "success",
		});
	};

	const handleClickError = () => {
		showNotification({
			...args,
			notificationType: "danger",
		});
	};

	const handleClickInfo = () => {
		showNotification({
			...args,
			notificationType: "info",
		});
	};

	const handleClickWarning = () => {
		showNotification({
			...args,
			notificationType: "warning",
		});
	};

	return (
		<ContainerComponent
			title="Notification"
			subtitle={args?.variant?.toString() || ""}
			color={args?.placement?.toString() || ""}
		>
			<div style={{ height: "100%" }}>
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
					<Button onClick={handleClick} color="secondary">
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
		placement: "top-center",
		variant: "lightened",
		duration: 7000,
		closable: false,
	},
};
