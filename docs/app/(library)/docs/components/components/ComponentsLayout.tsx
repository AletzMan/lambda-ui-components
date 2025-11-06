"use client";
import {
	NavigationMenu,
	NavigationMenuData,
	Tabs,
	useActiveSectionObserver,
} from "lambda-ui-components";
import { BarNavButton } from "@/app/(library)/components/layout/BarNavButton";
import { FooterDocs } from "@/components/layout/FooterDocs";
import { useState } from "react";
import { Features } from "./Features";
import { List } from "lucide-react";

interface ComponentsLayoutProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
	buttonLeft?: {
		href: string;
		text: string;
	};
	buttonRight?: {
		href: string;
		text: string;
	};
}

const dataFeatures: NavigationMenuData[] = [
	{
		id: "on-this-page",
		label: "On this page",
		icon: <List />,
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
				id: "variants",
				label: "Variants",
				path: "#variants",
				target: "_top",
			},
			{
				id: "sizes",
				label: "Sizes",
				path: "#sizes",
				target: "_top",
			},
			{
				id: "radius",
				label: "Radius",
				path: "#radius",
				target: "_top",
			},
			{
				id: "type",
				label: "Type",
				path: "#type",
				target: "_top",
			},
			{
				id: "disabled",
				label: "Disabled",
				path: "#disabled",
				target: "_top",
			},
			{
				id: "whit-label",
				label: "Whit Label",
				path: "#whit-label",
				target: "_top",
			},
			{
				id: "floating-label",
				label: "Floating Label",
				path: "#floating-label",
				target: "_top",
			},
			{
				id: "prefix",
				label: "Prefix",
				path: "#prefix",
				target: "_top",
			},
			{
				id: "suffix",
				label: "Suffix",
				path: "#suffix",
				target: "_top",
			},
			{
				id: "required",
				label: "Required",
				path: "#required",
				target: "_top",
			},
			{
				id: "error-message",
				label: "Error Message",
				path: "#error-message",
				target: "_top",
			},
			{
				id: "helper-text",
				label: "Helper Text",
				path: "#helper-text",
				target: "_top",
			},
		],
	},
];
const dataApiReference: NavigationMenuData[] = [
	{
		id: "api",
		label: "",
	},
];

export const ComponentsLayout = ({
	children,
	title,
	description,
	buttonLeft,
	buttonRight,
}: ComponentsLayoutProps) => {
	const [tabActive, setTabActive] = useState(0);
	const activeId = useActiveSectionObserver({ selectors: "h2", rootMargin: "72px 0px -80% 0px" });
	return (
		<section className="relative flex flex-col gap-10 px-6 py-4">
			<header className="mb-10 text-center ">
				<h1 className="flex items-center gap-2 text-4xl font-bold text-left tracking-tight text-(--primary-base-color) mb-1 w-full ">
					{title}
				</h1>
				{description && (
					<p className="text-md text-(--foreground-secondary-color) text-left mb-2">
						{description}
					</p>
				)}
			</header>
			<div className="flex flex-col gap-10">
				<div className="sticky top-20 bg-(--surface-a)/45 backdrop-blur-[10px] p-1 ">
					{children}
					<Tabs
						variant="underline"
						size="large"
						color="primary"
						radius="small"
						onChange={(index) => setTabActive(index)}
					>
						<Tabs.List>
							<Tabs.Tab title="Features" />
							<Tabs.Tab title="API Reference" />
							<Tabs.Tab title="ChangeLog" />
						</Tabs.List>
						<Tabs.Panels>
							<Tabs.Panel>
								<div className="grid grid-cols-[1fr_250px]">
									<Features />
									<aside className="sticky top-18 h-[calc(100vh-90px)] bg-(--background-color)">
										<NavigationMenu
											data={dataFeatures}
											currentPath={"#" + activeId || ""}
											alwaysOpen
											showLines
											styleLines="dotted"
										/>
									</aside>
								</div>
							</Tabs.Panel>
							<Tabs.Panel></Tabs.Panel>
						</Tabs.Panels>
					</Tabs>
				</div>
			</div>
			<BarNavButton buttonLeft={buttonLeft} buttonRight={buttonRight} />
			<FooterDocs />
		</section>
	);
};
