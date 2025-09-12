import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { SelectProps } from "./select.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { CheckCheckIcon } from "lucide-react";

const meta: Meta<typeof Select> = {
	title: "Components/Select",
	component: Select,
	argTypes: {
		variant: {
			table: {
				disabled: true,
			},
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "select",
			options: ["none", "small", "medium", "large", "pill"],
			description: "Corner shape",
		},
		label: {
			control: "text",
			type: "string",
			description: "Text to display as the label for the component",
		},
		invalid: {
			control: "boolean",
			type: "boolean",
			description: "Applies error styles when true",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		required: {
			control: "boolean",
			description: "",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Select>;

const Template = (args: SelectProps & { type: "Normal" | "Description" | "Icon" }) => {
	return (
		<ContainerComponent title="Select" subtitle={args.type}>
			<div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "250px" }}>
				<Select {...args} variant="outline" label="Outline" />
				<Select {...args} variant="soft" label="Soft" />
				<Select {...args} variant="underline" label="Underline" />
			</div>
		</ContainerComponent>
	);
};

export const Normal: Story = {
	render: (args) => <Template {...args} type="Normal" />,
	args: {
		radius: "small",
		size: "medium",
		options: [
			{
				label: "JavaScript",
				value: "javascript",
			},
			{
				label: "TypeScript",
				value: "typescript",
			},
			{
				label: "React",
				value: "react",
			},
			{
				label: "Node.js",
				value: "nodejs",
			},
			{
				label: "C#",
				value: "csharp",
			},
		],
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		disabled: false,
	},
};

export const Description: Story = {
	render: (args) => <Template {...args} type="Description" />,
	args: {
		radius: "small",
		size: "medium",
		options: [
			{
				label: "JavaScript",
				value: "javascript",
				description: "A versatile programming language commonly used for web development.",
			},
			{
				label: "TypeScript",
				value: "typescript",
				description:
					"A superset of JavaScript that adds static typing for better security and scalability.",
			},
			{
				label: "React",
				value: "react",
				description: "A JavaScript library for building interactive and dynamic user interfaces.",
			},
			{
				label: "Node.js",
				value: "nodejs",
				description: "A JavaScript runtime environment for building server-side applications.",
			},
			{
				label: "C#",
				value: "csharp",
				description: "A modern, object-oriented programming language developed by Microsoft.",
			},
		],
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		disabled: false,
	},
};

export const Icon: Story = {
	render: (args) => <Template {...args} type="Icon" />,
	args: {
		radius: "small",
		size: "medium",
		options: [
			{
				label: "JavaScript",
				value: "javascript",
				avatar:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png",
			},
			{
				label: "TypeScript",
				value: "typescript",
				avatar:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/250px-Typescript_logo_2020.svg.png",
			},
			{
				label: "React",
				value: "react",
				avatar:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/330px-React-icon.svg.png",
			},
			{
				label: "Node.js",
				value: "nodejs",
				avatar: "https://nodejs.org/static/logos/jsIconGreen.svg",
			},
			{
				label: "C#",
				value: "csharp",
				avatar: "https://cdn.worldvectorlogo.com/logos/c--4.svg",
			},
		],
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		disabled: false,
	},
};

export const IconAndDescrption: Story = {
	render: (args) => <Template {...args} type="Icon" />,
	args: {
		radius: "small",
		size: "medium",
		options: [
			{
				label: "JavaScript",
				value: "javascript",
				description: "A programming language that is essential for web development.",
				avatar:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png",
			},
			{
				label: "TypeScript",
				value: "typescript",
				description:
					"A superset of JavaScript that adds static typing for better security and scalability.",
				avatar:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/250px-Typescript_logo_2020.svg.png",
			},
			{
				label: "React",
				value: "react",
				description: "A JavaScript library for building interactive and dynamic user interfaces.",
				avatar:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/330px-React-icon.svg.png",
			},
			{
				label: "Node.js",
				value: "nodejs",
				description: "A JavaScript runtime environment for building server-side applications.",
				avatar: "https://nodejs.org/static/logos/jsIconGreen.svg",
			},
			{
				label: "C#",
				value: "csharp",
				description: "A modern, object-oriented programming language developed by Microsoft.",
				avatar: "https://cdn.worldvectorlogo.com/logos/c--4.svg",
			},
		],
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		disabled: false,
	},
};
