import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Bookmark, CircleEllipsis, CodeXml, RssIcon } from "lucide-react";

const meta: Meta<typeof Card> = {
	title: "Components/Card",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Card,
	argTypes: {
		variant: {
			control: "select",
			options: ["borderless", "outline"],
			description: "Optional variant of the card",
			type: "string",
		},
		size: {
			control: "select",
			options: ["small", "medium", "large"],
			description: "Size of the card",
			type: "string",
		},
		radius: {
			control: "select",
			options: ["none", "small", "medium", "large"],
			description: "Radius of the card",
			type: "string",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Outline: Story = {
	args: {
		variant: "outline",
		size: "small",
		radius: "small",
		image: {
			src: "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=750&h=350&dpr=1",
			alt: "JavaScript",
			heightPorcent: 100,
		},
		header: {
			title: "React Hooks",
			description: "Updated Guide 2024",
			icon: <CodeXml />,
		},
		actions: [
			{
				text: "See more",
				icon: <CircleEllipsis />,
				onClick: () => console.log("See more"),
			},
			{
				text: "Save",
				icon: <Bookmark />,
				onClick: () => console.log("Save"),
			},
			{
				text: "Follow",
				icon: <RssIcon />,
				onClick: () => console.log("Follow"),
			},
		],
		children: (
			<div style={{ padding: "var(--padding-lg)" }}>
				React Hooks revolutionized the way we write components. useState and useEffect are
				fundamental, but there are more hooks like useContext, useReducer, and useCallback that can
				significantly improve your code.
			</div>
		),
	},
};

export const Borderless: Story = {
	args: {
		variant: "borderless",
		size: "small",
		radius: "small",
		image: {
			src: "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=750&h=350&dpr=1",
			alt: "JavaScript",
			heightPorcent: 100,
		},
		header: {
			title: "React Hooks",
			description: "Updated Guide 2024",
			icon: <CodeXml />,
		},
		actions: [
			{
				text: "See more",
				icon: <CircleEllipsis />,
				onClick: () => console.log("See more"),
			},
			{
				text: "Save",
				icon: <Bookmark />,
				onClick: () => console.log("Save"),
			},
			{
				text: "Follow",
				icon: <RssIcon />,
				onClick: () => console.log("Follow"),
			},
		],
		children: (
			<div style={{ padding: "var(--padding-lg)" }}>
				React Hooks revolutionized the way we write components. useState and useEffect are
				fundamental, but there are more hooks like useContext, useReducer, and useCallback that can
				significantly improve your code.
			</div>
		),
	},
};
