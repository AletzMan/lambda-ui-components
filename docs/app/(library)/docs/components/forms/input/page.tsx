"use client";
import { ComponentsLayout } from "../../components/ComponentsLayout";

export default function InputPage() {
	return (
		<ComponentsLayout
			title="Input"
			description="Input component is a form element that allows users to enter text"
			buttonLeft={{ href: "/docs/components/forms/file-upload", text: "File Upload" }}
			buttonRight={{ href: "/docs/components/forms/input-number", text: "Input Number" }}
		>
			d
		</ComponentsLayout>
	);
}
