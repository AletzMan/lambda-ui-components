import { SubSectionLayout } from "@/app/(library)/components/layout/SubSectionLayout";
import PropertyLayout from "./PropertyLayout";
import PlaygroundLayout from "./PlaygroundLayout";

export const Features = () => {
	return (
		<div className="flex flex-col gap-10">
			<PlaygroundLayout title="Playground" id="playground">
				<p className="my-90 px-4">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</PlaygroundLayout>
			<PropertyLayout title="Usage" id="usage" code={`<Input />`}>
				<p className="my-90">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</PropertyLayout>
			<PropertyLayout title="Variants" id="variants">
				<p className="my-90">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</PropertyLayout>
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
		</div>
	);
};
