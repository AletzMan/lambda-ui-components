"use client";
import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, Link } from "lambda-ui-components";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";

export default function DarkModePage() {
	return (
		<SectionLayout
			title="Dark Mode"
			buttonsLeft={{ href: "/docs/theming/customization", text: "Customization" }}
			buttonsRight={{ href: "/docs/components/forms/checkbox", text: "Checkbox" }}
		>
			<article>
				<SubSectionLayout title="Overview">
					<p>
						Lambda UI Components provides built-in dark mode support with two dark themes:{" "}
						<strong>dark</strong> and <strong>slate</strong>. Dark mode can be enabled
						automatically based on system preferences, manually toggled by users, or forced for
						specific pages.
					</p>
					<p className="mt-4">
						The dark mode implementation is powered by the <code>ThemeProvider</code> component
						and uses CSS variables to ensure smooth transitions and consistent styling across all
						components.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Quick Start">
					<p>
						To enable dark mode in your application, wrap your app with the{" "}
						<code>ThemeProvider</code>:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem={true}
      darkTheme="dark"
      lightTheme="light"
    >
      {children}
    </ThemeProvider>
  );
}`}
					/>
					<p className="mt-4">
						With <code>enableSystem</code> set to <code>true</code> and{" "}
						<code>defaultTheme="system"</code>, the theme will automatically match the user's
						system preference.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Available Dark Themes">
					<p>Lambda UI Components includes two dark theme variants:</p>
					<div className="mt-4 space-y-4">
						<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">
								dark (Default)
							</h4>
							<p className="text-(--foreground-secondary-color)">
								A sleek, modern dark theme with teal accents. Features a neutral dark background
								(#2b2b2b) with carefully balanced contrast for optimal readability.
							</p>
						</div>
						<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">slate</h4>
							<p className="text-(--foreground-secondary-color)">
								A cool, sophisticated dark theme with cyan accents. Features a deep slate
								background (#0e1316) with blue-gray tones for a professional appearance.
							</p>
						</div>
					</div>
				</SubSectionLayout>

				<SubSectionLayout title="System Preference Detection">
					<p>
						When <code>enableSystem</code> is enabled, Lambda UI Components automatically
						detects the user's system color scheme preference using the{" "}
						<code>prefers-color-scheme</code> media query:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem={true}
      darkTheme="slate"    // Use slate for dark mode
      lightTheme="light"   // Use light for light mode
    >
      {children}
    </ThemeProvider>
  );
}`}
					/>
					<p className="mt-4">
						The theme will automatically update when the user changes their system preference,
						without requiring a page reload.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Manual Dark Mode Toggle">
					<p>
						Use the <code>ButtonTheme</code> component to provide a manual toggle for users:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ButtonTheme } from "lambda-ui-components";

export default function Header() {
  return (
    <header>
      <nav>
        <h1>My App</h1>
        <ButtonTheme 
          animation="scale"
          color="neutral"
          size="medium"
        />
      </nav>
    </header>
  );
}`}
					/>
					<p className="mt-4">
						The <code>ButtonTheme</code> component automatically toggles between the configured{" "}
						<code>lightTheme</code> and <code>darkTheme</code>.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Dark Mode Specific Styling">
					<p>
						You can apply styles specifically for dark mode using the <code>data-theme</code>{" "}
						attribute:
					</p>
					<CodeBlock
						language="css"
						code={`/* Styles for all dark themes */
[data-theme="dark"] .my-component,
[data-theme="slate"] .my-component {
  background-color: var(--surface-a);
  border-color: var(--border-color);
}

/* Styles only for the dark theme */
[data-theme="dark"] .my-component {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Styles only for the slate theme */
[data-theme="slate"] .my-component {
  box-shadow: 0 4px 6px rgba(14, 19, 22, 0.5);
}`}
					/>
				</SubSectionLayout>

				<SubSectionLayout title="Conditional Rendering">
					<p>
						You can conditionally render content based on the current theme using the{" "}
						<code>useTheme</code> hook:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { useTheme } from "lambda-ui-components";

export default function ThemedImage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === "slate";

  return (
    <img 
      src={isDark ? "/logo-dark.png" : "/logo-light.png"}
      alt="Logo"
    />
  );
}`}
					/>
				</SubSectionLayout>

				<SubSectionLayout title="Preventing Flash of Unstyled Content">
					<p>
						The <code>ThemeProvider</code> automatically includes a script that runs before the
						page renders to prevent the flash of unstyled content (FOUC) when loading a saved
						theme.
					</p>
					<p className="mt-4">For Next.js applications, add the following to your layout:</p>
					<CodeBlock
						language="tsx"
						code={`// app/layout.tsx
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
						The <code>suppressHydrationWarning</code> attribute prevents React hydration warnings
						caused by the theme script modifying the HTML before React hydrates.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Disabling Transitions">
					<p>
						To prevent visual glitches during theme changes, you can disable CSS transitions:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  );
}`}
					/>
					<p className="mt-4">
						This temporarily disables all CSS transitions when the theme changes, preventing
						colors from animating during the switch.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Forcing Dark Mode">
					<p>
						You can force dark mode for specific pages or sections using the{" "}
						<code>forcedTheme</code> prop:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ThemeProvider } from "lambda-ui-components";

export default function DarkOnlyPage({ children }) {
  return (
    <ThemeProvider forcedTheme="dark">
      {children}
    </ThemeProvider>
  );
}`}
					/>
					<p className="mt-4">
						This is useful for pages that should always be dark (like a photo gallery) or always
						light (like a print preview).
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Color Scheme Meta Tag">
					<p>
						Enable the <code>color-scheme</code> CSS property to style browser UI elements:
					</p>
					<CodeBlock
						language="tsx"
						code={`import { ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem={true}
      enableColorScheme={true}
    >
      {children}
    </ThemeProvider>
  );
}`}
					/>
					<p className="mt-4">
						This sets the <code>color-scheme</code> CSS property on the HTML element, which
						affects browser UI elements like scrollbars, form controls, and the default
						background color.
					</p>
				</SubSectionLayout>

				<SubSectionLayout title="Customizing Dark Mode Colors">
					<p>You can customize the colors used in dark mode by overriding CSS variables:</p>
					<CodeBlock
						language="css"
						code={`/* Customize the dark theme */
[data-theme="dark"] {
  /* Background colors */
  --background-color: #1a1a1a;
  --surface-a: #242424;
  --surface-b: #2e2e2e;
  
  /* Text colors */
  --foreground-color: #e5e5e5;
  --foreground-title-color: #ffffff;
  --foreground-secondary-color: #a0a0a0;
  
  /* Primary accent */
  --primary-base-color: #60a5fa;
  --primary-hover-color: #3b82f6;
  
  /* Borders and shadows */
  --border-color: #3a3a3a;
  --shadow-color: #00000080;
}

/* Customize the slate theme */
[data-theme="slate"] {
  --background-color: #0f172a;
  --surface-a: #1e293b;
  --primary-base-color: #06b6d4;
  --primary-hover-color: #0891b2;
}`}
					/>
				</SubSectionLayout>

				<SubSectionLayout title="Best Practices">
					<ul className="list-disc list-inside space-y-2">
						<li>
							<strong>Respect user preferences</strong> - Enable system preference detection by
							default
						</li>
						<li>
							<strong>Provide manual control</strong> - Include a theme toggle button for users
							who want to override system preferences
						</li>
						<li>
							<strong>Test thoroughly</strong> - Ensure all components look good in both light
							and dark modes
						</li>
						<li>
							<strong>Maintain contrast</strong> - Ensure sufficient color contrast in dark mode
							for accessibility (WCAG AA: 4.5:1 for normal text)
						</li>
						<li>
							<strong>Use semantic colors</strong> - Use CSS variables instead of hardcoded
							colors to ensure proper theming
						</li>
						<li>
							<strong>Avoid pure black</strong> - Use dark grays instead of pure black (#000000)
							for better readability
						</li>
						<li>
							<strong>Disable transitions</strong> - Set{" "}
							<code>disableTransitionOnChange</code> to prevent visual glitches
						</li>
					</ul>
				</SubSectionLayout>

				<SubSectionLayout title="Troubleshooting">
					<div className="space-y-4">
						<div>
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">
								Flash of unstyled content (FOUC)
							</h4>
							<p className="text-(--foreground-secondary-color)">
								Make sure you're using the <code>ThemeProvider</code> at the root of your app
								and add <code>suppressHydrationWarning</code> to your HTML element in Next.js.
							</p>
						</div>
						<div>
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">
								Theme not persisting
							</h4>
							<p className="text-(--foreground-secondary-color)">
								Check that localStorage is available and not blocked. The theme is saved under
								the key specified in <code>storageKey</code> (default: "theme").
							</p>
						</div>
						<div>
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">
								System preference not detected
							</h4>
							<p className="text-(--foreground-secondary-color)">
								Ensure <code>enableSystem</code> is set to <code>true</code> and the user's
								browser supports the <code>prefers-color-scheme</code> media query.
							</p>
						</div>
						<div>
							<h4 className="font-semibold text-(--foreground-title-color) mb-2">
								Colors animating during theme change
							</h4>
							<p className="text-(--foreground-secondary-color)">
								Set <code>disableTransitionOnChange={"{true}"}</code> in the ThemeProvider to
								temporarily disable CSS transitions during theme changes.
							</p>
						</div>
					</div>
				</SubSectionLayout>

				<SubSectionLayout title="Related Documentation">
					<p className="flex gap-2 flex-wrap">
						<Link href="/docs/theming/theme" size="small">
							Theme Configuration
						</Link>
						<Link href="/docs/theming/customization" size="small">
							Customization Guide
						</Link>
						<Link href="/docs/components/utilities/button-theme" size="small">
							ButtonTheme Component
						</Link>
					</p>
				</SubSectionLayout>

				<Divider spacing={50} variant="dashed" />
			</article>
		</SectionLayout>
	);
}
