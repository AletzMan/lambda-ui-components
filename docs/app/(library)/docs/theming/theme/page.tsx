"use client";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, Link, NavigationMenuData, } from "lambda-ui-components";
import { TableProps } from "../../components/components/TableProps";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import { ComponentsLayout } from "../../components/components/ComponentsLayout";
import { List } from "lucide-react";

const menuData: NavigationMenuData[] = [
	{
		id: "on-this-page",
		label: "On this page",
		path: "#on-this-page",
		icon: <List />,
		children: [
			{
				id: "content",
				label: "Content",
				path: "#content",
				target: "_top",
				children: [
					{
						id: "overview",
						label: "Overview",
						path: "#overview",
						target: "_top",
					},
					{
						id: "available-themes",
						label: "Available Themes",
						path: "#available-themes",
						target: "_top",
					},
					{
						id: "setup",
						label: "Setup",
						path: "#setup",
						target: "_top",
					},
					{
						id: "button-theme",
						label: "Button Theme",
						path: "#button-theme",
						target: "_top",
					},
					{
						id: "css-variables",
						label: "CSS Variables",
						path: "#css-variables",
						target: "_top",
					},
					{
						id: "theme-persistence",
						label: "Theme Persistence",
						path: "#theme-persistence",
						target: "_top",
					},
					{
						id: "system-theme",
						label: "System Theme",
						path: "#system-theme",
						target: "_top",
					},
					{
						id: "next-integration",
						label: "Next.js Integration",
						path: "#next-integration",
						target: "_top",
					},
					{
						id: "theme-specific-styling",
						label: "Theme Specific Styling",
						path: "#theme-specific-styling",
						target: "_top",
					},
				],
			},
			{
				id: "api-reference",
				label: "Theme Provider API",
				children: [
					{
						id: "theme-provider-props",
						label: "Props",
						path: "#theme-provider-props",
						target: "_top",
					},
				],
			},
			{
				id: "api-reference-button-theme",
				label: "Button Theme API",
				children: [
					{
						id: "button-theme-props",
						label: "Props",
						path: "#button-theme-props",
						target: "_top",
					},
				],
			},
		],
	},
];

export const themeProviderProps: TableProps[] = [
	{
		prop: "defaultTheme",
		type: '"light" | "dark" | "retro" | "slate" | "lavender" | "mint" | "sunset" | "ocean" | "graphite" | "deep-cosmic-night" | "soft-obsidian" | "midnight" | "system"',
		default: '"system" (if enableSystem is true) or "dark"',
		typePrimitive: "string",
		tooltip: "The default theme to use on first load. If set to 'system', it will automatically match the user's system preference.",
	},
	{
		prop: "lightTheme",
		type: '"light" | "retro" | "lavender" | "mint" | "sunset" | "ocean"',
		default: '"light"',
		typePrimitive: "string",
		tooltip: "The light theme to use when toggling between light and dark modes with ButtonTheme.",
	},
	{
		prop: "darkTheme",
		type: '"dark" | "slate" | "graphite" | "deep-cosmic-night" | "soft-obsidian" | "midnight"',
		default: '"dark"',
		typePrimitive: "string",
		tooltip: "The dark theme to use when toggling between light and dark modes with ButtonTheme.",
	},
	{
		prop: "enableSystem",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "Whether to enable automatic theme switching based on the user's system preference (prefers-color-scheme).",
	},
	{
		prop: "disableTransitionOnChange",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Disable CSS transitions when switching themes to prevent visual glitches during theme changes.",
	},
	{
		prop: "enableColorScheme",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Whether to set the color-scheme CSS property on the HTML element, which affects browser UI elements like inputs and scrollbars.",
	},
	{
		prop: "storageKey",
		type: "string",
		default: '"theme"',
		typePrimitive: "string",
		tooltip: "The localStorage key used to persist the user's theme preference.",
	},
	{
		prop: "attribute",
		type: '"class" | "data-*" | string[]',
		default: '"data-theme"',
		typePrimitive: "string",
		tooltip: "The HTML attribute to use for applying the theme. Can be 'class' to add theme as a class, or any data attribute.",
	},
	{
		prop: "themes",
		type: 'AllThemes[]',
		default: '["light", "dark", "retro", "slate"]',
		typePrimitive: "array",
		tooltip: "List of all available theme names.",
	},
	{
		prop: "forcedTheme",
		type: '"light" | "dark" | "retro" | "slate" | "system"',
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Force a specific theme for the current page, overriding user preference.",
	},
	{
		prop: "nonce",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Nonce string to pass to the inline script for CSP headers.",
	},
];

export const buttonThemeProps: TableProps[] = [
	{
		prop: "animation",
		type: '"fade" | "rotate" | "scale" | "flip" | "slide" | "none"',
		default: '"scale"',
		typePrimitive: "string",
		tooltip: "Animation style for the icon transition when toggling themes.",
	},
	{
		prop: "color",
		type: "LambdaColor",
		default: '"neutral"',
		typePrimitive: "string",
		tooltip: "Button color variant (inherits from Button component).",
	},
	{
		prop: "{...ButtonProps}",
		type: 'ButtonProps',
		default: 'undefined',
		typePrimitive: "object",
		tooltip: "Button props (inherits from Button component).",
	},
];


export default function ThemePage() {
	return (
		<ComponentsLayout
			title="Theme"
			description=""
			buttonRight={{ href: "/docs/theming/customization", text: "Customization" }}
			buttonLeft={{ href: "/docs/overview/about", text: "About" }}
			menuData={menuData}
		>
			<article>
				<SubSectionLayout title="Overview" id="overview">
					<p>
						Lambda UI Components features a powerful theming system built on CSS variables,
						providing flexible and customizable styling for all components. The library includes
						eight built-in themes (six light themes and two dark themes) with automatic dark/light mode support.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Available Themes" id="available-themes">
					<p>The library includes eight pre-configured themes:</p>
					<div className="mt-4 space-y-4">
						<div>
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">Light Themes</h4>
							<ul className="list-disc list-inside space-y-2">
								<li><strong>light</strong> - Clean, modern light theme with cyan accents</li>
								<li><strong>retro</strong> - Warm, vintage-inspired theme with orange accents</li>
								<li><strong>lavender</strong> - Soft & elegant theme with violet and pink accents</li>
								<li><strong>mint</strong> - Fresh & natural theme with emerald and blue accents</li>
								<li><strong>sunset</strong> - Energetic & vibrant theme with rose and yellow accents</li>
								<li><strong>ocean</strong> - Corporate & trustworthy theme with blue and emerald accents</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">Dark Themes</h4>
							<ul className="list-disc list-inside space-y-2">
								<li><strong>dark</strong> - Sleek dark theme with teal accents</li>
								<li><strong>slate</strong> - Cool, sophisticated dark theme with cyan accents</li>
								<li><strong>graphite</strong> - Neutral charcoal dark theme with minimal color saturation</li>
								<li><strong>deep-cosmic-night</strong> - Deep purple-tinted dark theme with cosmic violet accents</li>
								<li><strong>soft-obsidian</strong> - Soft blue-black dark theme with muted blue undertones</li>
								<li><strong>midnight</strong> - Ultra-dark purple theme with deep violet accents</li>
							</ul>
						</div>
					</div>
				</SubSectionLayout>

				<SubSectionLayout title="Setup" id="setup">
					<p >
						To enable theming in your application, wrap your app with the{" "}
						<code>ThemeProvider</code> component at the root level:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <ThemeProvider
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
	  lightTheme="light"
	  darkTheme="dark"
    >
      {children}
    </ThemeProvider>
  );
}`}
					/>
					<p className="flex gap-2 mt-4 ">View all properties of the <code className="code-tag">ThemeProvider</code> component in the table below: <Link size="small" href="#theme-provider-api">Props</Link></p>
				</SubSectionLayout>


				<SubSectionLayout title="ButtonTheme Component" id="button-theme">
					<p>
						The <code>ButtonTheme</code> component provides a pre-built toggle button for
						switching between light and dark themes:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ButtonTheme } from "lambda-ui-components";

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ButtonTheme 
        animation="scale"
        color="neutral"
        size="medium"
      />
    </header>
  );
}`}
					/>
				</SubSectionLayout>

				<SubSectionLayout title="CSS Variables" id="css-variables">
					<p>
						All themes are built using CSS variables, making them highly customizable. Each
						theme defines variables for:
					</p>
					<ul className="list-disc list-inside space-y-2 mt-4">
						<li>
							<strong>Colors</strong> - Background, foreground, surfaces, borders, shadows
						</li>
						<li>
							<strong>Accent Colors</strong> - Primary, secondary, neutral, success, danger,
							warning, info
						</li>
						<li>
							<strong>Typography</strong> - Font sizes, weights, families
						</li>
						<li>
							<strong>Spacing</strong> - Padding, gaps, margins
						</li>
						<li>
							<strong>Borders</strong> - Radius, widths
						</li>
						<li>
							<strong>Component Sizes</strong> - Buttons, inputs, icons, badges, etc.
						</li>
					</ul>

					<p className="mt-4">
						Example of accessing theme variables in your custom CSS:
					</p>
					<CodeBlock
						language="css"
						code={`.my-custom-component {
  background-color: var(--background-color);
  color: var(--foreground-color);
  border: 1px solid var(--border-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}

.my-accent-button {
  background-color: var(--primary-base-color);
  color: var(--foreground-invert-color);
}

.my-accent-button:hover {
  background-color: var(--primary-hover-color);
}`}
					/>
				</SubSectionLayout>

				<SubSectionLayout title="Theme Persistence" id="theme-persistence">
					<p>
						The theme preference is automatically saved to <code>localStorage</code> and
						persists across sessions. The theme is also synchronized across browser tabs.
					</p>
					<p className="mt-4">
						The <code>ThemeProvider</code> includes a script that runs before the page renders
						to prevent flash of unstyled content (FOUC) when loading the saved theme.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="System Theme Detection" id="system-theme">
					<p>
						When <code>enableSystem</code> is true and the theme is set to{" "}
						<code>"system"</code>, the library automatically detects and applies the user's
						system color scheme preference using the <code>prefers-color-scheme</code> media
						query.
					</p>
					<p className="mt-4">
						The theme automatically updates when the user changes their system preference,
						without requiring a page reload.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Next.js Integration" id="next-integration">
					<p>
						For Next.js applications, wrap your app with <code>ThemeProvider</code> in a
						client component:
					</p>
					<CodeBlock
						language="tsx"
						code={`// app/providers.tsx
"use client";

import { ThemeProvider } from "lambda-ui-components";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}
					/>
					<p className="mt-4">
						<strong>Note:</strong> Add <code>suppressHydrationWarning</code> to the{" "}
						<code>&lt;html&gt;</code> tag to prevent hydration warnings caused by the theme
						script.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Theme-Specific Styling" id="theme-specific-styling">
					<p>
						You can apply styles conditionally based on the active theme using the{" "}
						<code>data-theme</code> attribute selector:
					</p>
					<CodeBlock
						language="css"
						code={`/* Styles for all themes */
.my-component {
  padding: 1rem;
}

/* Styles only for light theme */
[data-theme="light"] .my-component {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styles only for dark themes */
[data-theme="dark"] .my-component,
[data-theme="slate"] .my-component {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Styles only for retro theme */
[data-theme="retro"] .my-component {
  border: 2px solid var(--border-color);
}`}
					/>
				</SubSectionLayout>

				<Divider spacing={50} variant="dashed" />
				<TableProps
					props={themeProviderProps}
					title="ThemeProvider API"
					subtitle="Props"
					id="theme-provider-props"
				/>
				<Divider spacing={50} variant="dashed" />
				<TableProps
					props={buttonThemeProps}
					title="ButtonTheme API"
					subtitle="Props"
					id="button-theme-props"
				/>

				<Divider spacing={50} variant="dashed" />
			</article>
		</ComponentsLayout>
	);
}
