"use client";
import { FooterDocs } from "@/components/layout/FooterDocs";
import { NavigationMenu } from "lambda-ui-components";
import {
	BookOpen,
	Home,
	Zap,
	FileText,
	Settings,
	Palette,
	PackageOpen,
	SunMoon,
	Type,
	Minus,
	SlidersHorizontal,
	Rows,
	CheckSquare,
	CircleDashed,
	ToggleRight,
	CalendarDays,
	UploadCloud,
	LayoutGrid,
	Layers,
	Grip,
	CornerDownRight,
	Split,
	Columns,
	ListTree,
	MessageCircle,
	AlertTriangle,
	ChevronRight,
	Puzzle,
	PictureInPicture,
	Bell,
	List,
	Link as LinkIcon,
	Menu,
	Lightbulb,
	BarChart3,
	Users,
	Tag,
	Code,
	TrendingUp,
	StepForward,
	MonitorPlay,
	Star,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const navigationMenuData = [
	// ──────────────── OVERVIEW ────────────────
	{
		id: "overview",
		label: "Overview",
		icon: <BookOpen />,
		children: [
			{
				id: "introduction",
				label: "Introduction",
				icon: <Home />,
				path: "/docs/overview/introduction",
			},
			{
				id: "getting-started",
				label: "Getting Started",
				icon: <Zap />,
				path: "/docs/overview/getting-started",
			},
			{ id: "changelog", label: "Changelog", icon: <FileText />, path: "/docs/overview/changelog" },
			{ id: "about", label: "About Lambda UI", icon: <Settings />, path: "/docs/overview/about" },
		],
	},

	// ──────────────── CUSTOMIZATION ────────────────
	{
		id: "theming",
		label: "Theming",
		icon: <Palette />,
		children: [
			{ id: "theme", label: "Theme", icon: <Palette />, path: "/docs/theming/theme" },
			{
				id: "customization",
				label: "Customization",
				icon: <PackageOpen />,
				path: "/docs/theming/customization",
			},
			{
				id: "dark-mode",
				label: "Dark Mode",
				icon: <SunMoon />,
				path: "/docs/theming/dark-mode",
			},
		],
	},

	// ──────────────── FORMS ────────────────
	{
		id: "forms",
		label: "Forms",
		icon: <Type />,
		children: [
			{
				id: "checkbox",
				label: "Checkbox",
				icon: <CheckSquare />,
				path: "/docs/components/forms/checkbox",
			},
			{
				id: "color-picker",
				label: "Color Picker",
				icon: <Palette />,
				path: "/docs/components/forms/color-picker",
			},
			{
				id: "date-picker",
				label: "Date Picker",
				icon: <CalendarDays />,
				path: "/docs/components/forms/date-picker",
			},
			{
				id: "file-upload",
				label: "File Upload",
				icon: <UploadCloud />,
				path: "/docs/components/forms/file-upload",
			},
			{ id: "input", label: "Input", icon: <Type />, path: "/docs/components/forms/input" },
			{
				id: "input-number",
				label: "Input Number",
				icon: <Minus />,
				path: "/docs/components/forms/input-number",
			},
			{
				id: "join",
				label: "Join",
				icon: <CornerDownRight />,
				path: "/docs/components/forms/join",
			},
			{ id: "radio", label: "Radio", icon: <CircleDashed />, path: "/docs/components/forms/radio" },
			{
				id: "select",
				label: "Select",
				icon: <SlidersHorizontal />,
				path: "/docs/components/forms/select",
			},
			{
				id: "slider",
				label: "Slider",
				icon: <SlidersHorizontal />,
				path: "/docs/components/forms/slider",
			},
			{
				id: "switch",
				label: "Switch",
				icon: <ToggleRight />,
				path: "/docs/components/forms/switch",
			},
			{
				id: "text-area",
				label: "Text Area",
				icon: <Rows />,
				path: "/docs/components/forms/text-area",
			},
		],
	},

	// ──────────────── LAYOUT ────────────────
	{
		id: "layout",
		label: "Layout",
		icon: <LayoutGrid />,
		children: [
			{ id: "card", label: "Card", icon: <LayoutGrid />, path: "/docs/components/layout/card" },
			{ id: "divider", label: "Divider", icon: <Minus />, path: "/docs/components/layout/divider" },
			{ id: "flex", label: "Flex", icon: <Grip />, path: "/docs/components/layout/flex" },
			{
				id: "splitter",
				label: "Splitter",
				icon: <Split />,
				path: "/docs/components/layout/splitter",
			},
		],
	},

	// ──────────────── NAVIGATION ────────────────
	{
		id: "navigation",
		label: "Navigation",
		icon: <List />,
		children: [
			{
				id: "breadcrumb",
				label: "Breadcrumb",
				icon: <ChevronRight />,
				path: "/docs/components/navigation/breadcrumb",
			},
			{
				id: "button",
				label: "Button",
				icon: <Puzzle />,
				path: "/docs/components/navigation/button",
			},
			{ id: "link", label: "Link", icon: <LinkIcon />, path: "/docs/components/navigation/link" },
			{
				id: "navigation-menu",
				label: "Navigation Menu",
				icon: <Menu />,
				path: "/docs/components/navigation/navigation-menu",
			},
			{
				id: "pagination",
				label: "Pagination",
				icon: <List />,
				path: "/docs/components/navigation/pagination",
			},
			{
				id: "stepper",
				label: "Stepper",
				icon: <StepForward />,
				path: "/docs/components/navigation/stepper",
			},
			{ id: "tabs", label: "Tabs", icon: <Rows />, path: "/docs/components/navigation/tabs" },
		],
	},

	// ──────────────── FEEDBACK ────────────────
	{
		id: "feedback",
		label: "Feedback",
		icon: <MessageCircle />,
		children: [
			{
				id: "alert",
				label: "Alert",
				icon: <AlertTriangle />,
				path: "/docs/components/feedback/alert",
			},
			{
				id: "dialog",
				label: "Dialog",
				icon: <PictureInPicture />,
				path: "/docs/components/feedback/dialog",
			},
			{ id: "drawer", label: "Drawer", icon: <Bell />, path: "/docs/components/feedback/drawer" },
			{
				id: "dropdown",
				label: "Dropdown",
				icon: <List />,
				path: "/docs/components/feedback/dropdown",
			},
			{
				id: "notification",
				label: "Notification",
				icon: <Bell />,
				path: "/docs/components/feedback/notification",
			},
			{
				id: "progress",
				label: "Progress",
				icon: <TrendingUp />,
				path: "/docs/components/feedback/progress",
			},
			{
				id: "skeleton",
				label: "Skeleton",
				icon: <Rows />,
				path: "/docs/components/feedback/skeleton",
			},
			{
				id: "tooltip",
				label: "Tooltip",
				icon: <Lightbulb />,
				path: "/docs/components/feedback/tooltip",
			},
		],
	},

	// ──────────────── DATA DISPLAY ────────────────
	{
		id: "data-display",
		label: "Data Display",
		icon: <BarChart3 />,
		children: [
			{
				id: "accordion",
				label: "Accordion",
				icon: <Rows />,
				path: "/docs/components/data-display/accordion",
			},
			{
				id: "avatar",
				label: "Avatar",
				icon: <Users />,
				path: "/docs/components/data-display/avatar",
			},
			{ id: "badge", label: "Badge", icon: <Tag />, path: "/docs/components/data-display/badge" },
			{
				id: "calendar",
				label: "Calendar",
				icon: <CalendarDays />,
				path: "/docs/components/data-display/calendar",
			},
			{
				id: "carousel",
				label: "Carousel",
				icon: <Layers />,
				path: "/docs/components/data-display/carousel",
			},
			{
				id: "code-block",
				label: "Code Block",
				icon: <Code />,
				path: "/docs/components/data-display/code-block",
			},
			{
				id: "rating",
				label: "Rating",
				icon: <Star />,
				path: "/docs/components/data-display/rating",
			},
			{
				id: "table",
				label: "Table",
				icon: <Columns />,
				path: "/docs/components/data-display/table",
			},
			{ id: "tag", label: "Tag", icon: <Tag />, path: "/docs/components/data-display/tag" },
			{
				id: "tree-view",
				label: "Tree View",
				icon: <ListTree />,
				path: "/docs/components/data-display/tree-view",
			},
		],
	},

	// ──────────────── UTILITIES ────────────────
	{
		id: "utilities",
		label: "Utilities",
		icon: <Code />,
		children: [
			{
				id: "button-theme",
				label: "Button Theme",
				icon: <Palette />,
				path: "/docs/components/theming/button-theme",
			},
			{
				id: "client-only",
				label: "Client Only",
				icon: <MonitorPlay />,
				path: "/docs/components/utilities/client-only",
			},
			{
				id: "helpers",
				label: "Utility Hooks",
				icon: <Zap />,
				path: "/docs/components/utilities/hooks",
			},
		],
	},

	// ──────────────── EXAMPLES ────────────────
	{
		id: "examples",
		label: "Examples",
		icon: <PackageOpen />,
		path: "/docs/components/examples",
	},
];

export function SideBar() {
	const pathname = usePathname();
	return (
		<aside
			className="flex flex-col items-center sticky top-18 h-[calc(100svh-72px)] 
		bg-[linear-gradient(to_right,transparent,var(--surface-a)10%,var(--background-color),var(--background-color)90%,transparent)] 
		border-r border-gray-200/3 scrollBar overflow-x-auto"
		>
			<NavigationMenu
				data={navigationMenuData}
				showLines
				defaultExpanded={[
					"overview",
					"theming",
					"forms",
					"layout",
					"navigation",
					"feedback",
					"data-display",
					"utilities",
					"examples",
				]}
				currentPath={pathname}
			/>

			<FooterDocs />
		</aside>
	);
}
