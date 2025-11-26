"use client";
import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, Link, } from "lambda-ui-components";
import { TableProps } from "../../components/components/TableProps";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";

export const themeProviderProps: TableProps[] = [
	{
		prop: "defaultTheme",
		type: '"light" | "dark" | "retro" | "slate" | "system"',
		default: '"system" (if enableSystem is true) or "dark"',
		typePrimitive: "string",
		tooltip: "The default theme to use on first load. If set to 'system', it will automatically match the user's system preference.",
	},
	{
		prop: "lightTheme",
		type: '"light" | "retro"',
		default: '"light"',
		typePrimitive: "string",
		tooltip: "The light theme to use when toggling between light and dark modes with ButtonTheme.",
	},
	{
		prop: "darkTheme",
		type: '"dark" | "slate"',
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
		<SectionLayout
			title="Theme"
			buttonsRight={{ href: "/docs/theming/customization", text: "Customization" }}
			buttonsLeft={{ href: "/docs/overview/about", text: "About" }}
		>
			<article>
				<SubSectionLayout title="Overview">
					<p>
						Lambda UI Components features a powerful theming system built on CSS variables,
						providing flexible and customizable styling for all components. The library includes
						four built-in themes with automatic dark/light mode support.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Available Themes">
					<p>The library includes four pre-configured themes:</p>
					<ul className="list-disc list-inside space-y-2 mt-4">
						<li>
							<strong>light</strong> - Clean, modern light theme with cyan accents
						</li>
						<li>
							<strong>dark</strong> - Sleek dark theme with teal accents
						</li>
						<li>
							<strong>retro</strong> - Warm, vintage-inspired light theme with orange accents
						</li>
						<li>
							<strong>slate</strong> - Cool, sophisticated dark theme with cyan accents
						</li>
					</ul>
				</SubSectionLayout>

				<SubSectionLayout title="Setup">
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


				<SubSectionLayout title="ButtonTheme Component">
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

				<SubSectionLayout title="CSS Variables">
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
  padding: var(--padding-md);
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

				<SubSectionLayout title="Theme Persistence">
					<p>
						The theme preference is automatically saved to <code>localStorage</code> and
						persists across sessions. The theme is also synchronized across browser tabs.
					</p>
					<p className="mt-4">
						The <code>ThemeProvider</code> includes a script that runs before the page renders
						to prevent flash of unstyled content (FOUC) when loading the saved theme.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="System Theme Detection">
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

				<SubSectionLayout title="Next.js Integration">
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

				<SubSectionLayout title="Theme-Specific Styling">
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
					id="theme-provider-api"
				/>
				<Divider spacing={50} variant="dashed" />
				<TableProps
					props={buttonThemeProps}
					title="ButtonTheme API"
					subtitle="Props"
					id="button-theme-api"
				/>

				<Divider spacing={50} variant="dashed" />
			</article>
		</SectionLayout>
	);
}
