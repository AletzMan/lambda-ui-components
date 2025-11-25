"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Checkbox, Input, Stepper } from "lambda-ui-components";
import { User, MapPin, Check } from "lucide-react";
import { ReactNode } from "react";

interface StepperStep {
	id?: string | number;
	title: ReactNode;
	description?: ReactNode;
	icon?: ReactNode;
	status?: "pending" | "active" | "completed" | "error";
	content?: ReactNode;
}

const steps: StepperStep[] = [
	{
		title: "Personal Info",
		description: "Enter your personal details",
		icon: <User />,
	},
	{
		title: "Address",
		description: "Enter your shipping address",
		icon: <MapPin />,
	},
	{
		title: "Confirmation",
		description: "Review your order",
		icon: <Check />,
	},
];

export const StepperFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Stepper"
				description="Experiment with all the properties of the Stepper component in real time."
				propConfigs={[
					{
						name: "orientation",
						type: "radio",
						defaultValue: "horizontal",
						default: "horizontal",
						label: "Orientation",
						description: "Defines the orientation of the stepper.",
						values: ["horizontal", "vertical"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "bordered",
						default: "bordered",
						label: "Variant",
						description: "Defines the visual style of the stepper.",
						values: ["bordered", "soft"],
					},
					{
						name: "defaultActiveStep",
						type: "number",
						defaultValue: 0,
						default: 0,
						label: "Default Active Step",
						description: "The initial active step index.",
					},
				]}
			>
				<Stepper steps={steps}>
					<Stepper.Step index={0} title="Personal Info" description="Enter your personal details" icon={<User />} />
					<Stepper.Step index={1} title="Address" description="Enter your shipping address" icon={<MapPin />} />
					<Stepper.Step index={2} title="Confirmation" description="Review your order" icon={<Check />} />

					<Stepper.Content index={0}>
						<div className="flex flex-col gap-4 px-4 py-6 border-gray-300 rounded-md items-center justify-center w-80 mx-auto ">
							Personal Information Form
							<Input placeholder="Name" label="Name" />
							<Input placeholder="Email" label="Email" />
							<Input placeholder="Phone" label="Phone" />
						</div>
					</Stepper.Content>
					<Stepper.Content index={1}>
						<div className="flex flex-col gap-4 px-4 py-6 border-gray-300 rounded-md not-first-of-type: items-center justify-center">
							Address Form
							<Input placeholder="Address" label="Address" />
							<Input placeholder="City" label="City" />
							<Input placeholder="State" label="State" />
							<Input placeholder="Zip Code" label="Zip Code" />
						</div>
					</Stepper.Content>
					<Stepper.Content index={2}>
						<div className="flex flex-col gap-4 px-4 py-6 border-gray-300 rounded-md   items-center justify-center">
							Order Confirmation
							<Checkbox label="I agree to the terms and conditions" />
						</div>
					</Stepper.Content>

					<Stepper.CompletedContent>
						<div className="flex flex-col gap-4 px-4 py-6 border-gray-300 rounded-md items-center justify-center text-green-700">
							<Check className="mb-2" />
							All steps completed!
						</div>
					</Stepper.CompletedContent>
				</Stepper>
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Stepper } from "lambda-ui-components";
import { User, MapPin, Check } from "lucide-react";

const steps = [
	{ title: "Personal Info", description: "Details", icon: <User /> },
	{ title: "Address", description: "Shipping", icon: <MapPin /> },
	{ title: "Confirmation", description: "Review", icon: <Check /> },
];

export default function App() {
	return (
		<Stepper steps={steps}>
			{steps.map((step, index) => (
				<Stepper.Step key={index} index={index} {...step} />
			))}
			
			<Stepper.Content index={0}>Step 1 Content</Stepper.Content>
			<Stepper.Content index={1}>Step 2 Content</Stepper.Content>
			<Stepper.Content index={2}>Step 3 Content</Stepper.Content>

			<Stepper.CompletedContent>
				Finished!
			</Stepper.CompletedContent>
		</Stepper>
	);
}`}
			/>
		</>
	);
};
