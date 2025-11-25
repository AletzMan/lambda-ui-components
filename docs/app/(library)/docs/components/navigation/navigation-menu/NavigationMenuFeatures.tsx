"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { NavigationMenu, NavigationMenuData } from "lambda-ui-components";
import { useRef } from "react";
import { Home, User, Settings, Lock, FileText, Bell } from "lucide-react";

export const NavigationMenuFeatures = () => {
	const refNav = useRef<HTMLDivElement>(null);

	const menuData: NavigationMenuData[] = [
		{
			id: "home",
			label: "Home",
			path: "/home",
			icon: <Home size={16} />,
		},
		{
			id: "account",
			label: "Account",
			icon: <User size={16} />,
			children: [
				{
					id: "profile",
					label: "Profile",
					path: "/account/profile",
					icon: <FileText size={16} />,
				},
				{
					id: "security",
					label: "Security",
					path: "/account/security",
					icon: <Lock size={16} />,
				},
			],
		},
		{
			id: "settings",
			label: "Settings",
			icon: <Settings size={16} />,
			children: [
				{
					id: "notifications",
					label: "Notifications",
					path: "/settings/notifications",
					icon: <Bell size={16} />,
				},
			],
		},
	];

	return (
		<>
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="NavigationMenu"
				description="Experiment with all the properties of the NavigationMenu component in real time."
				propConfigs={[
					{
						name: "size",
						type: "radio",
						defaultValue: "small",
						default: "small",
						label: "Size",
						description: "Controls the size of the menu items.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "showLines",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show Lines",
						description: "Displays connecting lines between parent and child items.",
					},
					{
						name: "styleLines",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Style Lines",
						description: "Style of the connecting lines (if shown).",
						values: ["solid", "dashed", "dotted"],
					},
					{
						name: "alwaysOpen",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Always Open",
						description: "Keeps all menu items expanded by default.",
					},
					{
						name: "selectedStyle",
						type: "radio",
						defaultValue: "highlight",
						default: "highlight",
						label: "Selected Style",
						description: "Visual style for the selected item.",
						values: ["highlight", "border"],
					},
					{
						name: "data",
						type: "array-object",
						defaultValue: menuData,
						default: "undefined",
						label: "Data",
						description: "Data for the menu items.",
						schema: {
							label: "string",
							path: "string",
							icon: "string",
						},
						transformCode: (code) => `[
		{
			id: "home",
			label: "Home",
			path: "/home",
			icon: <Home />,
		},
		{
			id: "account",
			label: "Account",
			icon: <User />,
			children: [
				{
					id: "profile",
					label: "Profile",
					path: "/account/profile",
					icon: <FileText />,
				},
				{
					id: "security",
					label: "Security",
					path: "/account/security",
					icon: <Lock />,
				},
			],
		},
		{
			id: "settings",
			label: "Settings",
			icon: <Settings />,
			children: [
				{
					id: "notifications",
					label: "Notifications",
					path: "/settings/notifications",
					icon: <Bell />,
				},
			],
		},
	]`,
						disabled: true,
					},
				]}
				componentRef={refNav}
			>
				<NavigationMenu data={menuData} currentPath="/home" />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { NavigationMenu, NavigationMenuData } from "lambda-ui-components";
import { Home, User, Settings } from "lucide-react";

const menuData: NavigationMenuData[] = [
	{
		id: "home",
		label: "Home",
		path: "/home",
		icon: <Home size={16} />,
	},
	{
		id: "account",
		label: "Account",
		icon: <User size={16} />,
		children: [
			{
				id: "profile",
				label: "Profile",
				path: "/account/profile",
			},
		],
	},
];

export default function App() {
	return (
		<NavigationMenu 
			data={menuData} 
			currentPath="/home" 
			size="medium" 
		/>
	);
}`}
			/>
			<PropertyLayout
				title="Custom Label Rendering"
				id="render-label"
				description="You can customize how menu labels are rendered using the renderLabel prop."
				code={`import { NavigationMenu, NavigationMenuData } from "lambda-ui-components";
import { Home, User } from "lucide-react";

const menuData: NavigationMenuData[] = [
	{ id: "home", label: "Home", icon: <Home size={16} /> },
	{ id: "account", label: "Account", icon: <User size={16} /> },
];

export default function App() {
	return (
		<NavigationMenu
			data={menuData}
			currentPath="/home"
			renderLabel={(node) => (
				<div className="flex items-center justify-between w-full">
					<span>{node.label}</span>
					{node.id === "account" && (
						<span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
							New
						</span>
					)}
				</div>
			)}
		/>
	);
}`}
			>
				<div className="w-full max-w-sm rounded-lg p-4 ">
					<NavigationMenu
						data={[
							{ id: "home", label: "Home", icon: <Home size={16} /> },
							{ id: "account", label: "Account", icon: <User size={16} /> },
						]}
						currentPath="/home"
						renderLabel={(node) => (
							<div className="flex items-center justify-between w-full">
								<span className="text-sm text-blue-600">{node.label}</span>
								{node.id === "account" && (
									<span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
										New
									</span>
								)}
							</div>
						)}
					/>
				</div>
			</PropertyLayout>
		</>
	);
};
