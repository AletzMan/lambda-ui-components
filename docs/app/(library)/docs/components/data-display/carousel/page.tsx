import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { CarouselFeatures } from "./CarouselFeatures";
import { TableProps } from "../../components/TableProps";

const dataFeatures: NavigationMenuData[] = [
	{
		id: "on-this-page",
		label: "On this page",
		path: "#on-this-page",
		icon: <List />,
		children: [
			{
				id: "features",
				label: "Features",
				path: "#features",
				target: "_top",
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
						id: "autoplay-loop",
						label: "With Auto Play and Loop",
						path: "#autoplay-loop",
						target: "_top",
					},
					{
						id: "breakpoints",
						label: "With Responsive Breakpoints",
						path: "#breakpoints",
						target: "_top",
					},
					{
						id: "thumbnails",
						label: "With Thumbnail Pagination",
						path: "#thumbnails",
						target: "_top",
					},
				],
			},
			{
				id: "api-reference",
				label: "API Reference",
				children: [
					{
						id: "props",
						label: "Props",
						path: "#props",
						target: "_top",
					},
					{
						id: "breakpoint-props",
						label: "Breakpoint Type",
						path: "#breakpoint-props",
						target: "_top",
					},
				],
			},
		],
	},
];

export const baseCarouselProps: TableProps[] = [
	{
		prop: "children",
		type: "React.ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Carousel slides. Each child becomes a slide.",
	},
	{
		prop: "breakpoints",
		type: "Breakpoint[]",
		default: "[{ breakpoint: 0, items: 1 }, { breakpoint: 768, items: 2 }, { breakpoint: 1200, items: 3 }]",
		typePrimitive: "array",
		tooltip: "Responsive breakpoint configuration.",
	},
	{
		prop: "autoPlay",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Enable automatic slide transitions.",
	},
	{
		prop: "loop",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Enable infinite looping.",
	},
	{
		prop: "showNavigationButtons",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "Show previous/next navigation buttons.",
	},
	{
		prop: "showPagination",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "Show pagination indicators.",
	},
	{
		prop: "orientation",
		type: `"horizontal" | "vertical"`,
		default: `"horizontal"`,
		typePrimitive: "string",
		tooltip: "Carousel orientation.",
	},
	{
		prop: "slideMode",
		type: `"auto" | "single"`,
		default: `"auto"`,
		typePrimitive: "string",
		tooltip: "How slides advance. 'auto' advances by visible items, 'single' advances one at a time.",
	},
	{
		prop: "paginationType",
		type: `"dots" | "thumbnail"`,
		default: `"dots"`,
		typePrimitive: "string",
		tooltip: "Type of pagination indicators.",
	},
	{
		prop: "dotType",
		type: `"circle" | "line" | "square" | "number"`,
		default: `"circle"`,
		typePrimitive: "string",
		tooltip: "Visual style of dot pagination. Only applies when paginationType is 'dots'.",
	},
	{
		prop: "transitionDuration",
		type: "number",
		default: "5000",
		typePrimitive: "number",
		tooltip: "Duration in milliseconds for autoplay transitions.",
	},
];

export const breakpointTypeProps: TableProps[] = [
	{
		prop: "breakpoint",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Minimum window width in pixels for this configuration.",
	},
	{
		prop: "items",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Number of visible items at this breakpoint.",
	},
];

export default async function CarouselPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {

	return (
		<ComponentsLayout
			title="Carousel"
			description="Carousel component for displaying multiple items with navigation, pagination, and responsive breakpoints."
			buttonLeft={{ href: "/docs/components/data-display/calendar", text: "Calendar" }}
			buttonRight={{ href: "/docs/components/data-display/code-block", text: "Code Block" }}
			menuData={dataFeatures}
		>
			<CarouselFeatures />
			<TableProps props={baseCarouselProps} title="Carousel Props" subtitle="Props" id="props" />
			<TableProps props={breakpointTypeProps} title="Breakpoint Type" subtitle="Props" id="breakpoint-props" />
		</ComponentsLayout>
	);
}
