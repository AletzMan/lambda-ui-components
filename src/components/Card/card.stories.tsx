import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Bookmark, CircleEllipsis, CodeXml, RssIcon } from "lucide-react";
import { CardProps } from "./card.types";
import { Checkbox } from "../Checkbox/Checkbox";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Card> = {
	title: "Components/Card",
	component: Card,
	argTypes: {
		variant: {
			table: {
				disabled: true,
			},
		},
		size: {
			control: "inline-radio",
			options: ["small", "medium", "large"],
			description: "Size of the card",
			type: "string",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large"],
			description: "Radius of the card",
			type: "string",
		},
		image: {
			table: {
				disabled: true,
			},
		},
		header: {
			table: {
				disabled: true,
			},
		},
		actions: {
			table: {
				disabled: true,
			},
		},
		children: {
			table: {
				disabled: true,
			},
		},
	},
};

export default meta;

const Template = (args: CardProps) => {
	const [image, setImage] = useState(true);
	const [header, setHeader] = useState(true);
	const [actions, setActions] = useState(true);
	const [content, setContent] = useState(true);
	return (
		<ContainerComponent
			title="Card"
			subtitle={args.variant?.toString() || ""}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "flex-start",
					gap: "var(--spacing-lg)",
					height: "100%",
					padding: "var(--spacing-lg)",
				}}
			>
				<div style={{ display: "flex", gap: "var(--spacing-lg)", padding: "var(--spacing-lg)" }}>
					<Checkbox label="Image" checked={image} onChange={(e) => setImage(e.target.checked)} />
					<Checkbox label="Header" checked={header} onChange={(e) => setHeader(e.target.checked)} />
					<Checkbox
						label="Actions"
						checked={actions}
						onChange={(e) => setActions(e.target.checked)}
					/>
					<Checkbox
						label="Content"
						checked={content}
						onChange={(e) => setContent(e.target.checked)}
					/>
				</div>
				<div style={{ width: "350px" }}>
					<Card
						{...args}
						image={image ? args.image : undefined}
						header={header ? args.header : undefined}
						actions={actions ? args.actions : undefined}
						children={content ? args.children : undefined}
					/>
				</div>
			</div>
		</ContainerComponent>
	);
};

type Story = StoryObj<typeof Card>;

export const Outline: Story = {
	render: Template,
	args: {
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
				onClick: () => alert("See more"),
			},
			{
				text: "Save",
				icon: <Bookmark />,
				onClick: () => alert("Save"),
			},
			{
				text: "Follow",
				icon: <RssIcon />,
				onClick: () => alert("Follow"),
			},
		],
		variant: "outline",
		children: (
			<div style={{ padding: "var(--spacing-lg)" }}>
				React Hooks revolutionized the way we write components. useState and useEffect are
				fundamental, but there are more hooks like useContext, useReducer, and useCallback that can
				significantly improve your code.
			</div>
		),
	},
};

export const Borderless: Story = {
	render: Template,
	args: {
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
				onClick: () => alert("See more"),
			},
			{
				text: "Save",
				icon: <Bookmark />,
				onClick: () => alert("Save"),
			},
			{
				text: "Follow",
				icon: <RssIcon />,
				onClick: () => alert("Follow"),
			},
		],
		children: (
			<div style={{ padding: "var(--spacing-lg)" }}>
				React Hooks revolutionized the way we write components. useState and useEffect are
				fundamental, but there are more hooks like useContext, useReducer, and useCallback that can
				significantly improve your code.
			</div>
		),
		variant: "borderless",
	},
};
