import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { DrawerProps } from "./drawer.types";
import { Button } from "../Button/Button";
import { useState } from "react";

const meta: Meta<typeof Drawer> = {
    title: "Components/Drawer",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Drawer,
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
            defaultValue: "Drawer Title",
        },
        footer: {
            control: {
                type: "text",
            },
            defaultValue: "Drawer Footer",
        },
    },
};

export default meta;

const DrawerTemplate = (args: DrawerProps & React.RefAttributes<HTMLDivElement>) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div>
            <Drawer
                {...args}
                isOpen={openDrawer}
                onClose={() => setOpenDrawer(false)}
                footer={
                    <>
                        <Button color="secondary" onClick={() => {
                            setOpenDrawer(false);
                        }}>Accept</Button>
                        <Button color="secondary" variant="outline" onClick={() => {
                            setOpenDrawer(false);
                        }} style={{ marginLeft: '8px' }}>Cancel</Button>
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
    );
};

export const Default: StoryObj<typeof Drawer> = {
    render: (args) => <DrawerTemplate {...args} />,
    args: {
        isOpen: true,
        onClose: () => console.log("Drawer closed"),
        children: "This is the dialog content.",
        title: "Drawer Title",
        footer: "Drawer Footer",
    },
};
