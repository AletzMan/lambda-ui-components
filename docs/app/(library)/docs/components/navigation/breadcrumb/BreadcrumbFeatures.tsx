"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Breadcrumb } from "lambda-ui-components";
import { useRef } from "react";
import { Home, User, Settings, LockIcon, RectangleEllipsis } from "lucide-react";

export const BreadcrumbFeatures = () => {
	const refBreadcrumb = useRef<HTMLElement>(null);

	const itemsString = [
		{
			label: "Home",
			href: "#",
			icon: "Home",
		},
		{
			label: "Profile",
			href: "#",
			icon: "User",
		},
		{
			label: "Settings",
			href: "#",
			icon: "Settings",
		},
		{
			label: "Security",
			href: "#",
			icon: "Lock",
		},
		{
			label: "Password",
			href: "#",
			icon: "RectangleEllipsis",
		},
	]

	const items = [
		{ label: "Home", href: "#", icon: <Home /> },
		{ label: "Profile", href: "#", icon: <User /> },
		{ label: "Settings", href: "#", icon: <Settings /> },
		{ label: "Security", href: "#", icon: <LockIcon /> },
		{ label: "Password", href: "#", icon: < RectangleEllipsis /> },
	];

	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Breadcrumb"
				description="Experiment with all the properties of the Breadcrumb component in real time."
				propConfigs={[
					{
						name: "variant",
						type: "radio",
						defaultValue: "chevron",
						default: "chevron",
						label: "Variant",
						description: "Defines the visual style of the separator.",
						values: ["chevron", "slash", "dot", "arrow", "stepped"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Controls the color scheme of the breadcrumb items.",
					},
					{
						name: "size",
						type: "radio",
						defaultValue: "small",
						default: "small",
						label: "Size",
						description: "Controls the size of the breadcrumb.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "radio",
						defaultValue: "small",
						default: "small",
						label: "Radius",
						description: "Defines the border radius of the breadcrumb items.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},
					{
						name: "maxItems",
						type: "number",
						defaultValue: 0,
						default: 0,
						label: "Max Items",
						description: "Maximum number of items to show before collapsing (0 to show all).",
					},
					{
						name: "items",
						type: "number",
						defaultValue: 4,
						default: 4,
						label: "Items",
						description: "Array of breadcrumb items.",
						transform: (value: any) => {
							if (value === 0) {
								return [];
							}
							let itemsArray = [];
							for (let i = 0; i < value; i++) {
								itemsArray.push({
									label: itemsString[i].label,
									href: itemsString[i].href,
									icon: items[i].icon,
								});
							}
							return itemsArray;
						},
						transformCode: (value: any) => {
							if (value === 0) {
								return "[]";
							}
							let items = [];
							for (let i = 0; i < value; i++) {
								items.push(`
		{ 
			label: "${itemsString[i].label}", 
			href: "${itemsString[i].href}", 
			icon: <${itemsString[i].icon}/> 
		}`);
							}
							return "[" + items.join(",").concat("\n\t]");
						},
					},
				]}
				componentRef={refBreadcrumb}
			>
				<Breadcrumb ref={refBreadcrumb} items={items} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Breadcrumb } from "lambda-ui-components";
import { Home, User, Settings } from "lucide-react";

const items = [
	{ label: "Home", href: "#", icon: <Home size={14} /> },
	{ label: "Profile", href: "#", icon: <User size={14} /> },
	{ label: "Settings", href: "#", icon: <Settings size={14} /> },
	{ label: "Security", href: "#", icon: <LockIcon size={14} /> },
	{ label: "Password", href: "#", icon: <RectangleEllipsis size={14} /> },
];

export default function App() {
	return (
		<Breadcrumb items={items} variant="chevron" color="primary" />
	);
}`}
			/>
		</>
	);
};
