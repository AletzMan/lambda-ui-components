import { SectionLayout } from "@/app/(library)/components/layout/SectionLayout";
import { SubSectionLayout } from "@/app/(library)/components/layout/SubSectionLayout";
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import Link from "next/link";

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
	return (
		<ComponentsLayout
			data={data}
			title="Input"
			description="Input component is a form element that allows users to enter text"
			buttonLeft={{ href: "/docs/components/forms/file-upload", text: "File Upload" }}
			buttonRight={{ href: "/docs/components/forms/input-number", text: "Input Number" }}
		>
			<SubSectionLayout title="Playground" id="playground">
				<p className="my-90">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</SubSectionLayout>
			<SubSectionLayout title="Usage" id="usage">
				<p className="my-90">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</SubSectionLayout>
			<SubSectionLayout title="Variants" id="variants">
				<p className="my-90">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</SubSectionLayout>
			<SubSectionLayout title="Colors" id="colors">
				<p className="my-90">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</SubSectionLayout>
			<SubSectionLayout title="Sizes" id="sizes">
				<p className="my-90">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</SubSectionLayout>
		</ComponentsLayout>
	);
}
