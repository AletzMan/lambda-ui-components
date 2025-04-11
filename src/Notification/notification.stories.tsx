import type { Meta, StoryObj } from "@storybook/react"
import { Notification } from "./Notification"
import { NotificationProvider, useNotification } from "./NotificationProvider"
import { Button } from "../main";

const meta: Meta<typeof Notification> = {
    title: "Components/Notification",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Notification,
    argTypes: {
        notificationType: {
            control: "select",
            options: ['default', 'success', 'info', 'warning', 'error'],
            description: "Visual style of the input",
            type: 'string',
        },
        message: {
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
            control: {
                type: 'inline-radio',
                options: ['top left', 'top center', 'top right', 'center left', 'center right', 'bottom left', 'bottom center', 'bottom right'],
            },
            description: "Position of the notification",
        },
        duration: {
            description: "Duration in milliseconds before the notification closes",
            type: 'number',
        },
        onClose: {
            description: "Function to call when the notification is closed",
            type: 'function',
        },
    },
    decorators: [
        (Story) => (
            <NotificationProvider maxNotifications={5} >
                <Story />
            </NotificationProvider>
        ),
    ]

}

export default meta;

const NotificationWithButton = () => {
    const { showNotification } = useNotification()

    const handleClick = () => {
        showNotification({
            message: "You have a new notification. Check it out for more details",
            notificationType: "secondary",
            placement: "top-right",
            variant: "flat",
            duration: 7000,
            onClose: () => {
                console.log("Notification closed!")
            },
        })
    }

    const handleClickSuccess = () => {
        showNotification({
            message: "Success! Everything completed smoothly",
            notificationType: "success",
            placement: "top-right",
            variant: "flat",
            duration: 7000,
            onClose: () => {
                console.log("Notification closed!")
            },
        })
    }

    const handleClickError = () => {
        showNotification({
            message: "Oops! Something went wrong. Please try again",
            notificationType: "danger",
            placement: "top-right",
            variant: "flat",
            duration: 7000,
            onClose: () => {
                console.log("Notification closed!")
            },
        })
    }

    const handleClickInfo = () => {
        showNotification({
            message: "Here's some additional context about this action.",
            notificationType: "info",
            placement: "top-right",
            variant: "flat",
            duration: 7000,
            onClose: () => {
                console.log("Notification closed!")
            },
        })
    }

    const handleClickWarning = () => {
        showNotification({
            message: "Something didn't go as expected. Check the details.",
            notificationType: "warning",
            placement: "top-right",
            variant: "flat",
            duration: 7000,
            onClose: () => {
                console.log("Notification closed!")
            },
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "0.25em" }}>
            <Button onClick={handleClick} color="secondary">Default</Button>
            <Button onClick={handleClickSuccess} color="success">Success</Button>
            <Button onClick={handleClickError} color="danger">Error</Button>
            <Button onClick={handleClickInfo} color="primary">Info</Button>
            <Button onClick={handleClickWarning} color="warning">Warning</Button>
        </div>
    )
}

export const Default: StoryObj<typeof Notification> = {
    args: {
        notificationType: "secondary",
        message: "You have a new notification.",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
}

export const Success: StoryObj<typeof Notification> = {
    args: {
        notificationType: "success",
        message: "Success! Everything completed smoothly",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
}

export const Error: StoryObj<typeof Notification> = {
    args: {
        notificationType: "danger",
        message: "Oops! Something went wrong. Please try again",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
}

export const Info: StoryObj<typeof Notification> = {
    args: {
        notificationType: "info",
        message: "Here's some additional context about this action.",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
}

export const Warning: StoryObj<typeof Notification> = {
    args: {
        notificationType: "warning",
        message: "Something didn't go as expected. Check the details.",
        placement: "top-center",
        variant: "flat",
        duration: 7000,
    },
}

export const WithButton: StoryObj<typeof Notification> = {
    render: () => <NotificationWithButton />,
    args: {
        notificationType: "danger",
    }
}