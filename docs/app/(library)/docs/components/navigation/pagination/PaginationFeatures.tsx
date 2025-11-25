"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Pagination } from "lambda-ui-components";
import { useState, useEffect, ComponentProps } from "react";

const InteractivePagination = (props: ComponentProps<typeof Pagination>) => {
	const [page, setPage] = useState(props.currentPage || 1);

	useEffect(() => {
		if (props.currentPage) {
			setPage(props.currentPage);
		}
	}, [props.currentPage]);

	return (
		<Pagination
			{...props}
			currentPage={page}
			onPageChange={(p) => {
				setPage(p);
				// We can't easily update the parent's prop control, but that's okay.
			}}
		/>
	);
};

export const PaginationFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Pagination"
				description="Experiment with all the properties of the Pagination component in real time."
				propConfigs={[
					{
						name: "currentPage",
						type: "number",
						defaultValue: 1,
						default: 1,
						label: "Current Page",
						description: "The current active page.",
					},
					{
						name: "totalPages",
						type: "number",
						defaultValue: 10,
						default: 10,
						label: "Total Pages",
						description: "The total number of pages.",
					},
					{
						name: "maxVisiblePages",
						type: "number",
						defaultValue: 5,
						default: 5,
						label: "Max Visible Pages",
						description: "Number of visible page buttons.",
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "outline",
						default: "outline",
						label: "Variant",
						description: "Defines the visual style of the pagination buttons.",
						values: ["outline", "soft", "solid", "bordered"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the size of the buttons.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Radius",
						description: "Defines the border radius of the buttons.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},
					{
						name: "showFirstLastButtons",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Show First/Last",
						description: "Show buttons to go to the first and last page.",
					},
					{
						name: "showPrevNextButtons",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Show Prev/Next",
						description: "Show buttons to go to the previous and next page.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables all pagination buttons.",
					},
				]}
			>
				<InteractivePagination currentPage={1} totalPages={10} onPageChange={() => { }} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Pagination } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [page, setPage] = useState(1);

	return (
		<Pagination
			currentPage={page}
			totalPages={10}
			onPageChange={setPage}
			variant="outline"
			size="medium"
		/>
	);
}`}
			/>
		</>
	);
};
