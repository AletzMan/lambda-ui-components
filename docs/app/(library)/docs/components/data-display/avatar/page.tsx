import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { AvatarFeatures } from "./AvatarFeatures";
import { TableProps } from "../../components/TableProps";

const dataFeatures: NavigationMenuData[] = [
	{
		id: "on-this-page",
		label: "On this page",
		path: "#on-this-page",
		icon: <List />,
		children: [
			{
				id: "features",
				label: "Features",
				path: "#features",
				target: "_top",
				children: [
					{
						id: "playground",
						label: "Playground",
						path: "#playground",
						target: "_top",
					},
					{
						id: "usage",
						label: "Usage",
						path: "#usage",
						target: "_top",
					},
					{
						id: "with-image",
						label: "With Image",
						path: "#with-image",
						target: "_top",
					},
					{
						id: "sizes",
						label: "Sizes",
						path: "#sizes",
						target: "_top",
					},
					{
						id: "animated",
						label: "With Animation",
						path: "#animated",
						target: "_top",
					},
					{
						id: "group",
						label: "Avatar Group",
						path: "#group",
						target: "_top",
					},
					{
						id: "group-max",
						label: "Group with Max",
						path: "#group-max",
						target: "_top",
					},
					{
						id: "group-sizes",
						label: "Group Sizes",
						path: "#group-sizes",
						target: "_top",
					},
				],
			},
			{
				id: "api-reference",
				label: "API Reference",
				children: [
					{
						id: "props",
						label: "Props",
						path: "#props",
						target: "_top",
					},
				],
			},
		],
	},
];

export const baseAvatarProps: TableProps[] = [
	{
		prop: "name",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Name of the user. Used to generate initials. Required.",
	},
	{
		prop: "src",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Image URL for the avatar.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large" | "xlarge"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the avatar.",
	},
	{
		prop: "animate",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Enable hover animation.",
	},
];

export const avatarGroupProps: TableProps[] = [
	{
		prop: "users",
		type: "{ name: string; src?: string }[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Array of user objects with name and optional image. Required.",
	},
	{
		prop: "max",
		type: "number",
		default: "5",
		typePrimitive: "number",
		tooltip: "Maximum number of avatars to display. Remaining will show as +N.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large" | "xlarge"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the avatars in the group.",
	},
];

export default async function AvatarPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {

	return (
		<ComponentsLayout
			title="Avatar"
			description="Avatar component displays user profile pictures or initials in a circular format."
			buttonLeft={{ href: "/docs/components/data-display/accordion", text: "Accordion" }}
			buttonRight={{ href: "/docs/components/data-display/badge", text: "Badge" }}
			menuData={dataFeatures}
		>
			<AvatarFeatures />
			<TableProps props={baseAvatarProps} title="Avatar Props" subtitle="Props" id="props" />
			<TableProps props={avatarGroupProps} title="Avatar.Group Props" subtitle="Props" id="group-props" />
		</ComponentsLayout>
	);
}
