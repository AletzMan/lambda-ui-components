import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from "./Notification";
import { NotificationProvider, useNotification } from "./NotificationProvider";
import { Button } from "../../main";
import { NotificationProps } from "./notifications.types";

const meta: Meta<typeof Notification> = {
    title: "Components/Notification",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
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
            type: 'string',
        },
        variant: {
            control: "select",
            options: ['themed', 'flat', 'solid', 'darkened', "lightened"],
            description: "Style of the notification",
            type: 'string',
        },
        placement: {
            control: "select",
            options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
            description: "Position of the notification",
        },
        closable: {
            control: "boolean",
            description: "If true, the notification will have a close button",
            type: 'boolean',
        },
        duration: {
            description: "Duration in milliseconds before the notification closes",
            type: 'number',
        },
        onClose: {
            table: {
                disable: true,
            }
        },
        onCancel: {
            table: {
                disable: true,
            }
        },
        onConfirm: {
            table: {
                disable: true,
            }
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
    },
    decorators: [
        (Story) => (
            <NotificationProvider maxNotifications={5} >
                <Story />
            </NotificationProvider>
        ),
    ]

};

export default meta;

const NotificationWithButton = (args: Partial<NotificationProps & React.RefAttributes<HTMLInputElement>> | undefined) => {
    const { showNotification } = useNotification();

    const handleClick = () => {
        showNotification({
            ...args,
            notificationType: "secondary"
        });
    };

    const handleClickSuccess = () => {
        showNotification({
            ...args,
            notificationType: "success"
        });
    };

    const handleClickError = () => {
        showNotification({
            ...args,
            notificationType: "danger"
        });
    };

    const handleClickInfo = () => {
        showNotification({
            ...args,
            notificationType: "info"
        });
    };

    const handleClickWarning = () => {
        showNotification({
            ...args,
            notificationType: "warning"
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "0.25em" }}>
            <Button onClick={handleClick} color="secondary">Default</Button>
            <Button onClick={handleClickSuccess} color="success">Success</Button>
            <Button onClick={handleClickError} color="danger">Error</Button>
            <Button onClick={handleClickInfo} color="primary">Info</Button>
            <Button onClick={handleClickWarning} color="warning">Warning</Button>
        </div>
    );
};

export const Default: StoryObj<typeof Notification> = {
    args: {
        notificationType: "secondary",
        message: "You have a new notification.",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
};

export const Success: StoryObj<typeof Notification> = {
    args: {
        notificationType: "success",
        message: "Success! Everything completed smoothly",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
};

export const Error: StoryObj<typeof Notification> = {
    args: {
        notificationType: "danger",
        message: "Oops! Something went wrong. Please try again",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
};

export const Info: StoryObj<typeof Notification> = {
    args: {
        notificationType: "info",
        message: "Here's some additional context about this action.",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
};

export const Warning: StoryObj<typeof Notification> = {
    args: {
        notificationType: "warning",
        message: "Something didn't go as expected. Check the details.",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
};

export const WithButton: StoryObj<typeof Notification> = {
    render: (args) => <NotificationWithButton {...args} />,
    args: {
        title: "Notification Title",
        message: "You have a new notification.",
        placement: "top-center",
        variant: "darkened",
        duration: 7000,
        closable: false
    }
};