"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Input } from "lambda-ui-components";
import { Mail, User } from "lucide-react";

export const InputFeatures = () => {
	return (
		<div className="flex flex-col gap-3 pl-2.5">
			<PlaygroundLayout title="Playground" id="playground">
				<p className="my-90 px-4">
					The Input component is a form element that allows users to enter text or numbers. It is a
					simple and easy-to-use component that can be used to collect user input in a form.
				</p>
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Input } from "lambda-ui-components";\n\n<Input />`}
			/>
			<PropertyLayout
				title="Variants"
				description="Controls the visual style of the input, such as the border color or background color."
				propertyName="variant"
				id="variants"
				code={`import { Input } from "lambda-ui-components";\n\n<Input variant="outline" placeholder="Outline" />\n<Input variant="soft" placeholder="Soft" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Input variant="outline" placeholder="Outline" />
					<Input variant="soft" placeholder="Soft" />
				</div>
			</PropertyLayout>
			<PropertyLayout
				title="Sizes"
				description="Adjusts the visual size of the input by modifying its height, padding, and text size."
				id="sizes"
				propertyName="size"
				code={`import { Input } from "lambda-ui-components";\n\n<Input size="tiny" placeholder="Tiny" />\n<Input size="small" placeholder="Small" />\n<Input size="medium" placeholder="Medium" />\n<Input size="large" placeholder="Large" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Input size="tiny" placeholder="Tiny" />
					<Input size="small" placeholder="Small" />
					<Input size="medium" placeholder="Medium" />
					<Input size="large" placeholder="Large" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Radius"
				id="radius"
				propertyName="radius"
				description="Controls the border curvature of the input, defining how rounded the corners appear."
				code={`import { Input } from "lambda-ui-components";\n\n<Input radius="none" placeholder="None" />\n<Input radius="tiny" placeholder="Tiny" />\n<Input radius="small" placeholder="Small" />\n<Input radius="medium" placeholder="Medium" />\n<Input radius="large" placeholder="Large" />\n<Input radius="full" placeholder="Full" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input radius="none" placeholder="None" />
					<Input radius="tiny" placeholder="Tiny" />
					<Input radius="small" placeholder="Small" />
					<Input radius="medium" placeholder="Medium" />
					<Input radius="large" placeholder="Large" />
					<Input radius="full" placeholder="Full" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Type"
				id="type"
				description="Specifies the native HTML input type (e.g., 'text', 'password', 'email')."
				propertyName="type"
				code={`import { Input } from "lambda-ui-components";\n\n<Input type="text" placeholder="Text" />\n<Input type="email" placeholder="Email" />\n<Input type="password" placeholder="Password" />\n<Input type="search" placeholder="Search" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input type="text" placeholder="Text" />
					<Input type="email" placeholder="Email" />
					<Input type="password" placeholder="Password" autoComplete="current-password" />
					<Input type="search" placeholder="Search" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Makes the input non-interactive and visually indicates a disabled state.."
				propertyName="disabled"
				code={`import { Input } from "lambda-ui-components";\n\n<Input placeholder="Disabled" disabled />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input placeholder="Disabled" disabled />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Whit Label"
				id="whit-label"
				description="Adds a descriptive text label associated with the input field."
				propertyName="label"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Label" placeholder="Label" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Label" placeholder="Label" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Floating Label"
				id="floating-label"
				description="Enables a floating label animation that moves and shrinks when focused or filled."
				propertyName="floatingLabel"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Label" floatingLabel />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Label" floatingLabel />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Prefix"
				id="prefix"
				description="Displays an element before the input value, such as an icon or text."
				propertyName="prefix"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="With Text" prefix="https://" placeholder="www.example.com" />\n<Input label="With Icon" prefix={<Mail />} placeholder="example@gmail.com" type="email" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="With Text" prefix="https://" placeholder="www.example.com" />
					<Input label="With Icon" prefix={<Mail />} placeholder="example@gmail.com" type="email" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Suffix"
				id="suffix"
				description="Displays an element after the input value, such as an icon or text."
				propertyName="suffix"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="With Text" suffix=".com" placeholder="www.example.com" />\n<Input label="With Icon" suffix={<Settings />} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="With Text" suffix=".com" placeholder="www.example.com" />
					<Input label="With Icon" suffix={<User />} placeholder="John Doe" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Required"
				id="required"
				description="Marks the field as required for form validation."
				propertyName="required"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Text" required />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Text" required />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Error Message"
				id="error-message"
				description="Displays an error message below the input when it's marked as invalid."
				propertyName="errorMessage"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Text" required errorMessage="Error message" invalid={true} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Text" required errorMessage="Error message" invalid={true} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Helper Text"
				id="helper-text"
				description="Displays additional information below the input."
				propertyName="helperText"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Text" helperText="Helper text" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Text" helperText="Helper text" />
				</form>
			</PropertyLayout>
		</div>
	);
};
