import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectProps } from "./select.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { useState } from "react";

const meta: Meta<typeof Select> = {
	title: "Components/Select",
	component: Select,
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["outline", "soft", "underline"],
			description: "Visual style of the select",
			type: "string",
		},
		color: {
			control: "inline-radio",
			options: ["primary", "neutral", "secondary", "info", "warning", "danger", "success"],
			description: "Color theme of the select",
			type: "string",
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Input radius",
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
		helperText: {
			control: "text",
			type: "string",
			description: "Text to display as the helper text for the component",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Select>;

const Template = (args: SelectProps & { type: "Normal" | "Description" | "Icon" }) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Select"
			subtitle={args.type}
			color={args.color?.toString() || ""}
			onChangeStyleSource={(value) => setCurrentStyle(value)}
			styleSource={currentStyle}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "2rem",
					width: "350px",
				}}
			>
				<Select
					{...args}
					variant="outline"
					label="Outline"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
				<Select
					{...args}
					variant="soft"
					label="Soft"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
				<Select
					{...args}
					variant="underline"
					label="Underline"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
			</div>
		</ContainerComponent>
	);
};

export const Normal: Story = {
	render: (args) => <Template {...args} type="Normal" />,
	args: {
		size: "medium",
		radius: "medium",
		color: "primary",
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
		helperText: "This is a sample helper text for demonstration",
	},
};

export const Description: Story = {
	render: (args) => <Template {...args} type="Description" />,
	args: {
		size: "medium",
		radius: "medium",
		color: "primary",
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
		helperText: "This is a sample helper text for demonstration",
	},
};

export const Icon: Story = {
	render: (args) => <Template {...args} type="Icon" />,
	args: {
		size: "medium",
		radius: "medium",
		color: "primary",
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
		helperText: "This is a sample helper text for demonstration",
	},
};

export const IconAndDescrption: Story = {
	render: (args) => <Template {...args} type="Icon" />,
	args: {
		size: "medium",
		radius: "medium",
		color: "primary",
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
		helperText: "This is a sample helper text for demonstration",
	},
};
