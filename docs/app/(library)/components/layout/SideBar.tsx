"use client";
import { Divider, NavigationMenu } from "lambda-ui-components";
import {
	AlertTriangle,
	BarChart3,
	Bell,
	Tag,
	BookOpen,
	Link,
	CalendarDays,
	CheckSquare,
	ChevronRight,
	CircleDashed,
	Code,
	Columns,
	CornerDownRight,
	Database,
	DollarSign,
	FileText,
	GitBranch,
	Grip,
	Home,
	Layers,
	LayoutDashboard,
	LayoutGrid,
	Lightbulb,
	List,
	ListTree,
	Menu,
	MessageCircle,
	Minus,
	PackageOpen,
	Palette,
	Puzzle,
	Rows,
	Settings,
	Shield,
	SlidersHorizontal,
	Split,
	Star,
	StepForward,
	ToggleRight,
	TrendingUp,
	Type,
	Upload,
	UploadCloud,
	Users,
	Zap,
	PictureInPicture,
	SunMoon,
} from "lucide-react";

export const overviewNavData = [
	{
		id: "overview",
		label: "Fundamentals",
		icon: <BookOpen />,
		children: [
			{
				id: "intro",
				label: "Introduction",
				icon: <Home />,
				path: "/overview/introduction",
			},
			{
				id: "getting-started",
				label: "Getting Started",
				icon: <Zap />,
				path: "/overview/getting-started",
			},
			{
				id: "changelog",
				label: "Changelog",
				icon: <FileText />,
				path: "/overview/changelog",
			},
			{
				id: "about",
				label: "About the Library",
				icon: <Settings />,
				path: "/overview/about",
			},
		],
	},
];

const customizationNavData = [
	{
		id: "theming",
		label: "Theming",
		icon: <Palette />,
		children: [
			{
				id: "theme",
				label: "Theme",
				icon: <Palette />,
				path: "/overview/theming/theme",
			},
			{
				id: "customization",
				label: "Customization",
				icon: <PackageOpen />,
				path: "/overview/customization",
			},
			{
				id: "dark-mode",
				label: "Dark Mode",
				icon: <SunMoon />,
				path: "/overview/dark-mode",
			},
		],
	},
];

/**
 * 2. Forms and Inputs Section
 */
export const formsInputsNavData = [
	{
		id: "forms-inputs",
		label: "Forms & Inputs",
		icon: <Type />,
		children: [
			{ id: "input", label: "Input", icon: <Type />, path: "/forms-inputs/input" },
			{
				id: "inputNumber",
				label: "Input Number",
				icon: <Minus />,
				path: "/forms-inputs/input-number",
			},
			{ id: "select", label: "Select", icon: <SlidersHorizontal />, path: "/forms-inputs/select" },
			{ id: "textArea", label: "Text Area", icon: <Rows />, path: "/forms-inputs/text-area" },
			{ id: "checkbox", label: "Checkbox", icon: <CheckSquare />, path: "/forms-inputs/checkbox" },
			{ id: "radio", label: "Radio", icon: <CircleDashed />, path: "/forms-inputs/radio" },
			{ id: "switch", label: "Switch", icon: <ToggleRight />, path: "/forms-inputs/switch" },
			{
				id: "colorPicker",
				label: "Color Picker",
				icon: <Palette />,
				path: "/forms-inputs/color-picker",
			},
			{
				id: "datePicker",
				label: "Date Picker",
				icon: <CalendarDays />,
				path: "/forms-inputs/date-picker",
			},
			{
				id: "fileUpload",
				label: "File Upload",
				icon: <UploadCloud />,
				path: "/forms-inputs/file-upload",
			},
		],
	},
];
/**
 * 3. Layout and Structure Section
 */
export const layoutDisplayNavData = [
	{
		id: "layout-display",
		label: "Layout & Structure",
		icon: <LayoutGrid />,
		children: [
			{ id: "accordion", label: "Accordion", icon: <Rows />, path: "/layout-display/accordion" },
			{ id: "card", label: "Card", icon: <LayoutGrid />, path: "/layout-display/card" },
			{ id: "carousel", label: "Carousel", icon: <Layers />, path: "/layout-display/carousel" },
			{ id: "divider", label: "Divider", icon: <Minus />, path: "/layout-display/divider" },
			{ id: "flex", label: "Flex", icon: <Grip />, path: "/layout-display/flex" },
			{ id: "join", label: "Join", icon: <CornerDownRight />, path: "/layout-display/join" },
			{ id: "splitter", label: "Splitter", icon: <Split />, path: "/layout-display/splitter" },
			{ id: "table", label: "Table", icon: <Columns />, path: "/layout-display/table" },
			{ id: "treeView", label: "Tree View", icon: <ListTree />, path: "/layout-display/tree-view" },
		],
	},
];
/**
 * 4. Navigation and Feedback Section
 */
export const navigationFeedbackNavData = [
	{
		id: "navigation-feedback",
		label: "Navigation & Feedback",
		icon: <MessageCircle />,
		children: [
			{ id: "alert", label: "Alert", icon: <AlertTriangle />, path: "/navigation-feedback/alert" },
			{
				id: "breadcrumb",
				label: "Breadcrumb",
				icon: <ChevronRight />,
				path: "/navigation-feedback/breadcrumb",
			},
			{ id: "button", label: "Button", icon: <Puzzle />, path: "/navigation-feedback/button" },
			{
				id: "dialog",
				label: "Dialog",
				icon: <PictureInPicture />,
				path: "/navigation-feedback/dialog",
			},
			{ id: "drawer", label: "Drawer", icon: <Bell />, path: "/navigation-feedback/drawer" },
			{ id: "dropdown", label: "Dropdown", icon: <List />, path: "/navigation-feedback/dropdown" },
			{ id: "link", label: "Link", icon: <Link />, path: "/navigation-feedback/link" },
			{
				id: "navigationMenu",
				label: "Navigation Menu",
				icon: <Menu size={16} />,
				path: "/navigation-feedback/navigation-menu",
			},
			{
				id: "notification",
				label: "Notification",
				icon: <Bell />,
				path: "/navigation-feedback/notification",
			},
			{
				id: "pagination",
				label: "Pagination",
				icon: <List />,
				path: "/navigation-feedback/pagination",
			},
			{
				id: "tooltip",
				label: "ToolTip",
				icon: <Lightbulb />,
				path: "/navigation-feedback/tool-tip",
			},
		],
	},
];
/**
 * 5. Data Visualization and Utilities Section
 */
export const dataUtilNavData = [
	{
		id: "data-util",
		label: "Data Viz & Utilities",
		icon: <BarChart3 />,
		children: [
			{ id: "avatar", label: "Avatar", icon: <Users />, path: "/data-util/avatar" },
			{ id: "badge", label: "Badge", icon: <Tag />, path: "/data-util/badge" },
			{
				id: "buttonTheme",
				label: "Button Theme",
				icon: <Palette />,
				path: "/data-util/button-theme",
			},
			{ id: "calendar", label: "Calendar", icon: <CalendarDays />, path: "/data-util/calendar" },
			{ id: "codeBlock", label: "Code Block", icon: <Code />, path: "/data-util/code-block" },
			{ id: "progress", label: "Progress", icon: <TrendingUp />, path: "/data-util/progress" },
			{ id: "rating", label: "Rating", icon: <Star />, path: "/data-util/rating" },
			{ id: "stepper", label: "Stepper", icon: <StepForward />, path: "/data-util/stepper" },
			{ id: "tag", label: "Tag", icon: <Tag />, path: "/data-util/tag" },
		],
	},
];
/**
 * 6. Real-world Examples Section (as a separate page)
 */
export const examplesNavData = [
	{
		id: "examples",
		label: "Real-world Examples",
		icon: <PackageOpen />,
		path: "/examples",
	},
];
export function SideBar() {
	return (
		<aside
			className="flex flex-col items-center sticky top-18 h-[calc(100svh-72px)] 
			max-[780px]:hidden
		bg-[linear-gradient(to_right,var(--surface-a),var(--background-color),var(--background-color),transparent)] 
		border-r border-gray-200/3 scrollBar overflow-x-auto"
		>
			<NavigationMenu data={overviewNavData} showLines defaultExpanded={["overview"]} />
			<NavigationMenu data={customizationNavData} showLines defaultExpanded={["theming"]} />
			<NavigationMenu data={formsInputsNavData} showLines defaultExpanded={["forms-inputs"]} />
			<NavigationMenu data={layoutDisplayNavData} showLines defaultExpanded={["layout-display"]} />
			<NavigationMenu
				data={navigationFeedbackNavData}
				showLines
				defaultExpanded={["navigation-feedback"]}
			/>
			<NavigationMenu data={dataUtilNavData} showLines defaultExpanded={["data-util"]} />
			<NavigationMenu data={examplesNavData} showLines defaultExpanded={["examples"]} />
		</aside>
	);
}
