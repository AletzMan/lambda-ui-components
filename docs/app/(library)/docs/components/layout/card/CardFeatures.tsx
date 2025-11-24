"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Card } from "lambda-ui-components";
import { useRef } from "react";
import { Bookmark, CircleEllipsis, RssIcon } from "lucide-react";

export const CardFeatures = () => {
	const refCard = useRef<HTMLDivElement>(null);

	return (
		<>
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Card"
				description="Experiment with all the properties of the Card component in real time."
				propConfigs={[
					{
						name: "header",
						type: "select",
						values: ["Only Title", "Title and Description", "Title, Description and Icon"],
						defaultValue: undefined,
						default: "Empty",
						label: "Header",
						description: "Configuration for the card header.",
						schema: { title: "string", description: "string" },
						transform: (value) => {
							if (value === "Only Title") {
								return { title: "Card Title" };
							}
							if (value === "Title and Description") {
								return { title: "Card Title", description: "Card Description" };
							}
							if (value === "Title, Description and Icon") {
								return { title: "Card Title", description: "Card Description", icon: <CircleEllipsis /> };
							}
							return undefined;
						},
						transformCode: (value) => {
							if (value === "Only Title") {
								return ` title: "Card Title" `;
							}
							if (value === "Title and Description") {
								return ` 
		title: "Card Title",  
		description: "Card Description" 
	`;
							}
							if (value === "Title, Description and Icon") {
								return ` 
	    title: "Card Title", 
	    description: "Card Description", 
	    icon: <CircleEllipsis /> 
	`;
							}
							return "undefined";
						},
					},
					{
						name: "actions",
						type: "select",
						default: undefined,
						values: ["One action", "Two actions", "Three actions"],
						defaultValue: undefined,
						label: "Actions",
						description: "Configuration for the card actions.",
						transform: (value) => {
							if (value === "One action") {
								return [{
									text: "See more",
									icon: <CircleEllipsis />,
									onClick: () => alert("See more"),
								}];
							}
							if (value === "Two actions") {
								return [{
									text: "See more",
									icon: <CircleEllipsis />,
									onClick: () => alert("See more"),
								}, {
									text: "Save",
									icon: <Bookmark />,
									onClick: () => alert("Save"),
								}];
							}
							if (value === "Three actions") {
								return [{
									text: "See more",
									icon: <CircleEllipsis />,
									onClick: () => alert("See more"),
								}, {
									text: "Save",
									icon: <Bookmark />,
									onClick: () => alert("Save"),
								}, {
									text: "Follow",
									icon: <RssIcon />,
									onClick: () => alert("Follow"),
								}];
							}
							return undefined;
						},
						transformCode: (value) => {
							if (value === "Empty") {
								return "undefined";
							}
							if (value === "One action") {
								return `[
		{
			text: "See more",
			icon: <CircleEllipsis />,
			onClick: () => alert("See more"),
		}
	]`
							}
							if (value === "Two actions") {
								return `[
		{
			text: "See more",
			icon: <CircleEllipsis />,
			onClick: () => alert("See more"),
		},
		{
			text: "Save",
			icon: <Bookmark />,
			onClick: () => alert("Save"),
		}
	]`;
							}
							if (value === "Three actions") {
								return `[
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
		}
	]`;
							}
							return "undefined";
						},
					},
					{
						name: "image",
						type: "object",
						defaultValue: {
							src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
							alt: "Green Living Room",
							heightPorcent: 100
						},
						default: undefined,
						label: "Image",
						description: "Configuration for the card image.",
						schema: { src: "string", alt: "string", heightPorcent: "number" },
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the overall card size.",
						values: ["small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Radius",
						description: "Controls the roundness of the corners.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "outline",
						default: "outline",
						label: "Variant",
						description: "Defines the visual style of the card.",
						values: ["outline", "borderless"],
					},
					{
						name: "children",
						type: "select",
						defaultValue: "Empty",
						default: "Empty",
						label: "Content",
						description: "Main content of the card.",
						values: ["Empty", "Simple Text", "Rich Content"],
						transform: (value) => {
							if (value === "Rich Content") {
								return (
									<div style={{ padding: "var(--padding-lg)" }}>
										React Hooks revolutionized the way we write components. useState and useEffect are
										fundamental, but there are more hooks like useContext, useReducer, and useCallback that can
										significantly improve your code.
									</div>
								);
							}
							if (value === "Simple Text") {
								return "This is the main content of the card.";
							}
							return undefined;
						},
						transformCode: (value) => {
							if (value === "Empty") {
								return "";
							}
							if (value === "Simple Text") {
								return `"This is the main content of the card."`;
							}
							if (value === "Rich Content") {
								return `(
		<div style={{ padding: "var(--padding-lg)" }}>
			React Hooks revolutionized the way we write components. useState and useEffect are
			fundamental, but there are more hooks like useContext, useReducer, and useCallback that can
			significantly improve your code.
		</div>
	)`;
							}
							return "";
						},
					},
				]}
				componentRef={refCard}
			>
				<Card style={{ width: "350px" }} ref={refCard} header={{ title: "Card Title", description: "Card Description" }}>
					{""}
				</Card>
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Card } from "lambda-ui-components";

export default function App() {
	return (
		<Card 
			header={{ title: "Card Title", description: "Card Description" }}
			image={{ src: "image-url.jpg", alt: "Image Alt" }}
		>
			<p>This is the main content of the card.</p>
		</Card>
	);
}`}
			/>
		</>
	);
};
