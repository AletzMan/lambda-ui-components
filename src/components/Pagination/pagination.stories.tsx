import type { Meta } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
    title: "Components/Pagination",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Pagination,
    argTypes: {
        totalPages: {
            control: 'number',
            description: "Total number of pages",
            type: "number"
        },
        currentPage: {
            control: 'number',
            description: "Current active page",
            type: "number"
        },
        maxVisiblePages: {
            control: 'number',
            description: "Maximum number of visible pages",
            type: "number"
        },
        variant: {
            control: 'select',
            options: ['solid', 'outline', 'flat'],
            description: "Pagination variant",
            type: "string"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'circle'],
            description: "Corner shape",
            type: "string"
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Input size"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        },
    }

};

export default meta;

export const Solid = () => {
    const [activePage, setActivePage] = useState(1);
    return (
        <Pagination
            variant="solid"
            size='small'
            radius="small"
            disabled={false}
            totalPages={10}
            currentPage={activePage}
            maxVisiblePages={3}
            onPageChange={(page) => setActivePage(page)}
        />
    );
};

export const Ouline = () => {
    const [activePage, setActivePage] = useState(1);
    return (
        <Pagination
            variant="outline"
            size='small'
            radius="small"
            disabled={false}
            totalPages={10}
            currentPage={activePage}
            maxVisiblePages={3}
            onPageChange={(page) => setActivePage(page)}
        />
    );
};

export const Flat = () => {
    const [activePage, setActivePage] = useState(1);
    return (
        <Pagination
            variant="flat"
            size='small'
            radius="small"
            disabled={false}
            totalPages={10}
            currentPage={activePage}
            maxVisiblePages={3}
            onPageChange={(page) => setActivePage(page)}
        />
    );
};
