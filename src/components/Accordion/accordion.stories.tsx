import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { AccordionProps, AccordionSize, AccordionValue, AccordionVariant } from "./accordion.types";
import { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { AccordionContent } from "./AccordionContent";
import { AccordionHeader } from "./AccordionHeader";

const sizeAccordion: AccordionSize[] = ['tiny', 'small', 'medium', 'large'];
const variantAccordion: AccordionVariant[] = ['default', 'flush', 'split'];

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Accordion,
    argTypes: {
        variant: {
            control: "select",
            options: ['default ', 'flush', 'split'],
            table: {
                type: {
                    summary: variantAccordion.map(variant => `'${variant}'`).join('|')
                }
            },
        },
        size: {
            control: {
                type: "select",
                options: ['tiny', 'small', 'medium', 'large'],
            },
            table: {
                type: {
                    summary: sizeAccordion.map(size => `'${size}'`).join('|')
                },
                defaultValue: { summary: `'medium'` }
            },
        },
    }

};

export default meta;

const PreviewAccordion = (args: Partial<AccordionProps & React.RefAttributes<HTMLDivElement>> | undefined) => {
    const [openItem, setOpenItem] = useState<AccordionValue>('');

    return (
        <Accordion
            value={openItem}
            onValueChange={(value) => setOpenItem(value)}
            {...args}
            style={{ marginBottom: '30px' }}
        >
            <AccordionItem value="item-1">
                <AccordionHeader>Section 1: Introduction</AccordionHeader>
                <AccordionContent>
                    <p>Here goes the content of section 1.</p>
                    <p>It can be text, images, other components.</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionHeader>Section 2: Components</AccordionHeader>
                <AccordionContent>
                    <ul>
                        <li>Alert Component</li>
                        <li>Button Component</li>
                        <li>Link Component</li>
                        <li>Accordion Component</li>
                    </ul>
                    <div style={{ height: '50px' }}>Extra content to test transition</div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" > {/* Disabled Item */}
                <AccordionHeader>Section 3: Disabled</AccordionHeader>
                <AccordionContent>
                    This content cannot be expanded because the item is disabled.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionHeader>Section 4: With Long Content</AccordionHeader>
                <AccordionContent>
                    <p>This is the beginning of content that is a bit longer to test scrolling if the Accordion's main container allows it.</p>
                    <div style={{ height: '400px', background: '#e9e9e9' }}></div>
                    <p>End of long content.</p>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
};

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
    render: (args) => <PreviewAccordion {...args} />,
    args: {
        variant: "default",
        size: "medium",
    },
};

export const Flush: Story = {
    render: (args) => <PreviewAccordion {...args} />,
    args: {
        variant: "flush",
        size: "medium",
    },
};

export const Split: Story = {
    render: (args) => <PreviewAccordion {...args} />,
    args: {
        variant: "split",
        size: "medium",
    },
};


