"use client";
import { SubSectionLayout } from "@/app/(library)/components/layout/SubSectionLayout";
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { ClientOnly, NavigationMenuData, Tabs } from "lambda-ui-components";
import { List } from "lucide-react";
import { useState } from "react";

const data: NavigationMenuData[] = [
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
				id: "colors",
				label: "Colors",
				path: "#colors",
				target: "_top",
			},
			{
				id: "sizes",
				label: "Sizes",
				path: "#sizes",
				target: "_top",
			},
		],
	},
];

export default function InputPage() {
	const [tabActive, setTabActive] = useState(0);
	return (
		<ComponentsLayout
			data={data}
			title="Input"
			description="Input component is a form element that allows users to enter text"
			buttonLeft={{ href: "/docs/components/forms/file-upload", text: "File Upload" }}
			buttonRight={{ href: "/docs/components/forms/input-number", text: "Input Number" }}
		>
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
						<SubSectionLayout title="Playground" id="playground">
							<p className="my-90 px-4">
								The Input component is a form element that allows users to enter text or numbers. It
								is a simple and easy-to-use component that can be used to collect user input in a
								form.
							</p>
						</SubSectionLayout>
						<SubSectionLayout title="Usage" id="usage">
							<p className="my-90">
								The Input component is a form element that allows users to enter text or numbers. It
								is a simple and easy-to-use component that can be used to collect user input in a
								form.
							</p>
						</SubSectionLayout>
						<SubSectionLayout title="Variants" id="variants">
							<p className="my-90">
								The Input component is a form element that allows users to enter text or numbers. It
								is a simple and easy-to-use component that can be used to collect user input in a
								form.
							</p>
						</SubSectionLayout>
						<SubSectionLayout title="Colors" id="colors">
							<p className="my-90">
								The Input component is a form element that allows users to enter text or numbers. It
								is a simple and easy-to-use component that can be used to collect user input in a
								form.
							</p>
						</SubSectionLayout>
						<SubSectionLayout title="Sizes" id="sizes">
							<p className="my-90">
								The Input component is a form element that allows users to enter text or numbers. It
								is a simple and easy-to-use component that can be used to collect user input in a
								form.
							</p>
						</SubSectionLayout>
					</Tabs.Panel>
				</Tabs.Panels>
			</Tabs>
		</ComponentsLayout>
	);
}
