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
	CaseLower,
	Ruler,
	BetweenHorizontalStart,
	PencilRuler,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const navigationMenuData = [
	// ──────────────── INTRODUCTION ────────────────
	{
		id: "docs",
		label: "Docs",
		icon: <BookOpen />,
		children: [
			// ──────────────── OVERVIEW ────────────────
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

			// ──────────────── DESIGN TOKENS ────────────────
			{
				id: "design-tokens",
				label: "Design Tokens",
				icon: <PencilRuler />,
				children: [
					{
						id: "colors",
						label: "Colors",
						path: "/docs/design-tokens/colors",
					},
					{
						id: "sizes",
						label: "Sizes",
						path: "/docs/design-tokens/sizes",
					},
					{
						id: "spacing",
						label: "Spacing",
						path: "/docs/design-tokens/spacing",
					},
					{
						id: "typography",
						label: "Typography",
						path: "/docs/design-tokens/typography",
					},
				],
			},

			// ──────────────── CUSTOMIZATION ────────────────
			{
				id: "theming",
				label: "Theming",
				icon: <Palette />,
				children: [
					{ id: "theme", label: "Theme", path: "/docs/theming/theme" },
					{
						id: "dark-mode",
						label: "Dark Mode",
						path: "/docs/theming/dark-mode",
					},
					{
						id: "create-theme",
						label: "Create Theme",
						path: "/docs/theming/create-theme",
					},
				],
			},
		],


	},
	{
		id: "components",
		label: "Components",
		icon: <PackageOpen />,
		children: [


			// ──────────────── FORMS ────────────────
			{
				id: "forms",
				label: "Forms",
				icon: <Type />,
				children: [
					{
						id: "checkbox",
						label: "Checkbox",
						path: "/docs/components/forms/checkbox",
					},
					{
						id: "color-picker",
						label: "Color Picker",
						path: "/docs/components/forms/color-picker",
					},
					{
						id: "date-picker",
						label: "Date Picker",
						path: "/docs/components/forms/date-picker",
					},
					{
						id: "file-upload",
						label: "File Upload",
						path: "/docs/components/forms/file-upload",
					},
					{ id: "input", label: "Input", path: "/docs/components/forms/input" },
					{
						id: "input-number",
						label: "Input Number",
						path: "/docs/components/forms/input-number",
					},
					{
						id: "join",
						label: "Join",
						path: "/docs/components/forms/join",
					},
					{ id: "radio", label: "Radio", path: "/docs/components/forms/radio" },
					{
						id: "select",
						label: "Select",
						path: "/docs/components/forms/select",
					},
					{
						id: "slider",
						label: "Slider",
						path: "/docs/components/forms/slider",
					},
					{
						id: "switch",
						label: "Switch",
						path: "/docs/components/forms/switch",
					},
					{
						id: "text-area",
						label: "Text Area",
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
					{ id: "card", label: "Card", path: "/docs/components/layout/card" },
					{ id: "divider", label: "Divider", path: "/docs/components/layout/divider" },
					{ id: "flex", label: "Flex", path: "/docs/components/layout/flex" },
					{
						id: "splitter",
						label: "Splitter",
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
						path: "/docs/components/navigation/breadcrumb",
					},
					{
						id: "button",
						label: "Button",
						path: "/docs/components/navigation/button",
					},
					{ id: "link", label: "Link", path: "/docs/components/navigation/link" },
					{
						id: "navigation-menu",
						label: "Navigation Menu",
						path: "/docs/components/navigation/navigation-menu",
					},
					{
						id: "pagination",
						label: "Pagination",
						path: "/docs/components/navigation/pagination",
					},
					{
						id: "stepper",
						label: "Stepper",
						path: "/docs/components/navigation/stepper",
					},
					{ id: "tabs", label: "Tabs", path: "/docs/components/navigation/tabs" },
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
						path: "/docs/components/feedback/alert",
					},
					{
						id: "dialog",
						label: "Dialog",
						path: "/docs/components/feedback/dialog",
					},
					{ id: "drawer", label: "Drawer", path: "/docs/components/feedback/drawer" },
					{
						id: "dropdown",
						label: "Dropdown",
						icon: <List />,
						path: "/docs/components/feedback/dropdown",
					},
					{
						id: "notification",
						label: "Notification",
						path: "/docs/components/feedback/notification",
					},
					{
						id: "progress",
						label: "Progress",
						path: "/docs/components/feedback/progress",
					},
					{
						id: "skeleton",
						label: "Skeleton",
						path: "/docs/components/feedback/skeleton",
					},
					{
						id: "tooltip",
						label: "Tooltip",
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
						path: "/docs/components/data-display/accordion",
					},
					{
						id: "avatar",
						label: "Avatar",
						path: "/docs/components/data-display/avatar",
					},
					{ id: "badge", label: "Badge", path: "/docs/components/data-display/badge" },
					{
						id: "calendar",
						label: "Calendar",
						path: "/docs/components/data-display/calendar",
					},
					{
						id: "carousel",
						label: "Carousel",
						path: "/docs/components/data-display/carousel",
					},
					{
						id: "code-block",
						label: "Code Block",
						path: "/docs/components/data-display/code-block",
					},
					{
						id: "rating",
						label: "Rating",
						path: "/docs/components/data-display/rating",
					},
					{
						id: "table",
						label: "Table",
						path: "/docs/components/data-display/table",
					},
					{ id: "tag", label: "Tag", path: "/docs/components/data-display/tag" },
					{
						id: "tree-view",
						label: "Tree View",
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
						path: "/docs/components/utilities/button-theme",
					},
					{
						id: "switch-theme",
						label: "Switch Theme",
						path: "/docs/components/utilities/switch-theme",
					},
					{
						id: "client-only",
						label: "Client Only",
						path: "/docs/components/utilities/client-only",
					},
					{
						id: "helpers",
						label: "Utility Hooks",
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

		],
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
				size="small"
				showLines
				scrollBehavior="center"
				defaultExpanded={[
					"components",
					"docs",
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
