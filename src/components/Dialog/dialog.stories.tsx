import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { DialogProps } from "./dialog.types";
import { Button } from "../Button/Button";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
    title: "Components/Dialog",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
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

export const DialogTemplate = (args: DialogProps & React.RefAttributes<HTMLDivElement>) => {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div>
            <Dialog
                {...args}
                isOpen={openDialog}
                onClose={() => setOpenDialog(false)}
                footer={
                    <>
                        <Button color="secondary" onClick={() => {
                            setOpenDialog(false);
                        }}>Accept</Button>
                        <Button color="secondary" variant="outline" onClick={() => {
                            setOpenDialog(false);
                        }} style={{ marginLeft: '8px' }}>Cancel</Button>
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
        </div>
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
