import { SectionLayout } from "@/app/(library)/components/layout/SectionLayout";
import { SubSectionLayout } from "@/app/(library)/components/layout/SubSectionLayout";
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";

const data: NavigationMenuData[] = [
	{
		id: "playground",
		label: "Playground",
		path: "/docs/components/forms/input#playground",
		target: "_self",
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
			<SubSectionLayout title="Playground">
				<p>
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</SubSectionLayout>
		</ComponentsLayout>
	);
}
