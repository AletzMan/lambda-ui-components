"use client";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, NavigationMenuData } from "lambda-ui-components";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
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
                        id: "css-variables",
                        label: "CSS Variables",
                        path: "#css-variables",
                        target: "_top",
                    },
                    {
                        id: "basic-customization",
                        label: "Basic Customization",
                        path: "#basic-customization",
                        target: "_top",
                    },
                    {
                        id: "theme-specific-customization",
                        label: "Theme-Specific Customization",
                        path: "#theme-specific-customization",
                        target: "_top",
                    },
                    {
                        id: "color-customization",
                        label: "Color Customization",
                        path: "#color-customization",
                        target: "_top",
                    },
                    {
                        id: "typography-customization",
                        label: "Typography Customization",
                        path: "#typography-customization",
                        target: "_top",
                    },
                    {
                        id: "spacing-customization",
                        label: "Spacing Customization",
                        path: "#spacing-customization",
                        target: "_top",
                    },
                    {
                        id: "border-customization",
                        label: "Border Customization",
                        path: "#border-customization",
                        target: "_top",
                    },
                    {
                        id: "component-size-customization",
                        label: "Component Size Customization",
                        path: "#component-size-customization",
                        target: "_top",
                    },
                    {
                        id: "creating-custom-themes",
                        label: "Creating Custom Themes",
                        path: "#creating-custom-themes",
                        target: "_top",
                    },
                    {
                        id: "component-specific-customization",
                        label: "Component Specific Customization",
                        path: "#component-specific-customization",
                        target: "_top",
                    },
                    {
                        id: "using-css-in-js",
                        label: "Using CSS-in-JS",
                        path: "#using-css-in-js",
                        target: "_top",
                    },
                    {
                        id: "best-practices",
                        label: "Best Practices",
                        path: "#best-practices",
                        target: "_top",
                    },
                    {
                        id: "complete-example",
                        label: "Complete Example",
                        path: "#complete-example",
                        target: "_top",
                    },
                ],
            },
        ],
    },
];

export default function CustomizationPage() {
    return (
        <ComponentsLayout
            title="Customization"
            buttonLeft={{ href: "/docs/theming/theme", text: "Theme" }}
            buttonRight={{ href: "/docs/theming/dark-mode", text: "Dark Mode" }}
            menuData={menuData}
        >
            <article>
                <SubSectionLayout title="Overview" id="overview">
                    <p>
                        Lambda UI Components is built on a comprehensive CSS variable system that allows you
                        to customize every aspect of your application's appearance. You can override default
                        values, create custom themes, or fine-tune individual components to match your brand.
                    </p>
                </SubSectionLayout>

                <SubSectionLayout title="CSS Variables Structure" id="css-variables">
                    <p>
                        All styling in Lambda UI Components is controlled through CSS variables defined in
                        the <code>:root</code> selector and theme-specific selectors like{" "}
                        <code>[data-theme="light"]</code>. This makes customization straightforward and
                        predictable.
                    </p>
                    <p className="mt-4">The CSS variables are organized into several categories:</p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li>
                            <strong>Base Colors</strong> - Lambda color palette with shades from 050 to 950
                        </li>
                        <li>
                            <strong>Theme Colors</strong> - Background, foreground, surfaces, borders, shadows
                        </li>
                        <li>
                            <strong>Accent Colors</strong> - Primary, secondary, neutral, success, danger,
                            warning, info
                        </li>
                        <li>
                            <strong>Typography</strong> - Font families, sizes, weights
                        </li>
                        <li>
                            <strong>Spacing</strong> - Padding, gaps, margins
                        </li>
                        <li>
                            <strong>Borders</strong> - Radius, widths
                        </li>
                        <li>
                            <strong>Component Sizes</strong> - Buttons, inputs, icons, badges, cards, etc.
                        </li>
                    </ul>
                </SubSectionLayout>

                <SubSectionLayout title="Basic Customization" id="basic-customization">
                    <p>
                        The simplest way to customize Lambda UI Components is to override CSS variables in
                        your global stylesheet:
                    </p>
                    <CodeBlock
                        language="css"
                        code={`/* Override global variables */
:root {
  /* Change the primary color */
  --primary-base-color: #3b82f6;
  --primary-hover-color: #2563eb;
  
  /* Customize spacing */
  --spacing-md: 12px;
  --spacing-md: 12px;
  
  /* Adjust border radius */
  --radius-md: 12px;
  --radius-lg: 16px;
  
  /* Customize typography */
  --font-family: "Inter", sans-serif;
  --font-size-md: 1.125rem;
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Theme-Specific Customization" id="theme-specific-customization">
                    <p>
                        You can customize variables for specific themes by targeting the theme attribute
                        selector:
                    </p>
                    <CodeBlock
                        language="css"
                        code={`/* Customize only the light theme */
[data-theme="light"] {
  --background-color: #f8f9fa;
  --foreground-color: #212529;
  --primary-base-color: #0d6efd;
}

/* Customize only the dark theme */
[data-theme="dark"] {
  --background-color: #1a1a1a;
  --foreground-color: #e9ecef;
  --primary-base-color: #0dcaf0;
}

/* Customize the retro theme */
[data-theme="retro"] {
  --primary-base-color: #d97706;
  --background-color: #fef3c7;
}

/* Customize the slate theme */
[data-theme="slate"] {
  --primary-base-color: #06b6d4;
  --background-color: #0f172a;
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Color Customization" id="color-customization">
                    <p>
                        Each color in Lambda UI Components has multiple variants for different use cases:
                    </p>
                    <CodeBlock
                        language="css"
                        code={`/* Primary color variants */
:root {
  --primary-text-color: /* Text color for primary elements */
  --primary-content-color: /* Content/icon color */
  --primary-soft-color: /* Soft background */
  --primary-subtle-color: /* Subtle background */
  --primary-outline-color: /* Outline/border color */
  --primary-base-color: /* Base/default color */
  --primary-hover-color: /* Hover state color */
  --primary-disabled-color: /* Disabled state color */
  --primary-border-color: /* Border color */
  --primary-light-color: /* Light variant */
  --primary-dark-color: /* Dark variant */
  --primary-background-color: /* Background color */
  --primary-opacity-color: /* Semi-transparent color */
  --primary-shadow-color: /* Shadow color */
}

/* The same structure applies to: */
/* --secondary-*, --neutral-*, --success-*, --danger-*, --warning-*, --info-* */`}
                    />
                    <p className="mt-4">Example of customizing the success color:</p>
                    <CodeBlock
                        language="css"
                        code={`[data-theme="light"] {
  --success-base-color: #10b981;
  --success-hover-color: #059669;
  --success-text-color: #065f46;
  --success-background-color: #d1fae5;
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Typography Customization" id="typography-customization">
                    <p>Customize fonts, sizes, and weights across your application:</p>
                    <CodeBlock
                        language="css"
                        code={`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  /* Font family */
  --font-family: "Inter", sans-serif;
  
  /* Font sizes */
  --font-size-2xs: 0.625rem; /* 10px */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-md: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  
  /* Font weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  /* Title sizes */
  --font-size-xs: 16px;
  --font-size-sm: 20px;
  --font-size-md: 24px;
  --font-size-lg: 28px;
  --font-size-xl: 32px;
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Spacing Customization" id="spacing-customization">
                    <p>Adjust padding and gap values to control spacing throughout your UI:</p>
                    <CodeBlock
                        language="css"
                        code={`:root {
  /* Padding scale */
  --spacing-none: 0px;
  --spacing-3xs: 1px;
  --spacing-2xs: 2px;
  --spacing-xs: 4px;
  --spacing-sm: 6px;
  --spacing-md: 8px;
  --spacing-lg: 16px;
  --spacing-xl: 32px;
  --spacing-2xl: 64px;
  
  /* Gap scale */
  --spacing-none: 0px;
  --spacing-2xs: 1px;
  --spacing-xs: 2px;
  --spacing-sm: 4px;
  --spacing-md: 8px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Border Customization" id="border-customization">
                    <p>Control border radius and width across all components:</p>
                    <CodeBlock
                        language="css"
                        code={`:root {
  /* Border radius */
  --radius-none: 0px;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 20rem;
  --radius-full: 9999px;
  
  /* Border width */
  --border-width-none: 0px;
  --border-width-xs: 1px;
  --border-width-sm: 2px;
  --border-width-md: 3px;
  --border-width-lg: 4px;
  : 5px;
  : 6px;
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Component Size Customization" id="component-size-customization">
                    <p>
                        Lambda UI Components provides size variables for consistent component dimensions:
                    </p>
                    <CodeBlock
                        language="css"
                        code={`:root {
  /* Button heights */
  --size-2xs: 1.125rem; /* 18px */
  --size-xs: 1.5rem;    /* 24px */
  --size-sm: 1.875rem;  /* 30px */
  --size-md: 2.25rem;   /* 36px */
  --size-lg: 2.75rem;   /* 44px */
  
  /* Input heights */
  --size-xs: 1.5rem;     /* 24px */
  --size-sm: 1.875rem;   /* 30px */
  --size-md: 2.25rem;    /* 36px */
  --size-lg: 2.75rem;    /* 44px */
  
  /* Icon sizes */
  --size-xs: 0.875rem;  /* 14px */
  --size-sm: 1rem;      /* 16px */
  --size-md: 1.125rem;  /* 18px */
  --size-lg: 1.25rem;   /* 20px */
  --size-xl: 1.375rem;  /* 22px */
  
  /* Badge sizes */
  --size-sm: 0.75rem;  /* 12px */
  --size-md: 1rem;     /* 16px */
  --size-lg: 1.25rem;  /* 20px */
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Creating a Custom Theme" id="creating-custom-themes">
                    <p>
                        You can create entirely custom themes by defining a new data-theme attribute with
                        all necessary variables:
                    </p>
                    <CodeBlock
                        language="css"
                        code={`/* Custom "ocean" theme */
[data-theme="ocean"] {
  /* Base colors */
  --background-color: #0a192f;
  --foreground-color: #ccd6f6;
  --foreground-title-color: #e6f1ff;
  --foreground-secondary-color: #8892b0;
  
  /* Surfaces */
  --surface-a: #112240;
  --surface-b: #1d3557;
  --surface-c: #233554;
  
  /* Borders and shadows */
  --border-color: #1d3557;
  --shadow-color: #00000060;
  
  /* Primary accent (ocean blue) */
  --primary-base-color: #0ea5e9;
  --primary-hover-color: #0284c7;
  --primary-text-color: #7dd3fc;
  --primary-background-color: #082f49;
  
  /* Success (teal) */
  --success-base-color: #14b8a6;
  --success-hover-color: #0d9488;
  
  /* Danger (coral) */
  --danger-base-color: #f43f5e;
  --danger-hover-color: #e11d48;
  
  /* ... add all other required variables */
}`}
                    />
                    <p className="mt-4">Then register your custom theme in the ThemeProvider:</p>
                    <CodeBlock
                        language="tsx"
                        code={`import { ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <ThemeProvider
      themes={["light", "dark", "retro", "slate", "ocean"]}
      defaultTheme="ocean"
    >
      {children}
    </ThemeProvider>
  );
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Component-Specific Customization" id="component-specific-customization">
                    <p>
                        You can target specific components by using their class names or creating custom
                        variants:
                    </p>
                    <CodeBlock
                        language="css"
                        code={`/* Customize all buttons */
.button {
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Customize primary buttons specifically */
.button-primary {
  background: linear-gradient(135deg, var(--primary-base-color), var(--primary-hover-color));
}

/* Customize inputs */
.input {
  border-width: 2px;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: var(--primary-base-color);
  box-shadow: 0 0 0 3px var(--primary-opacity-color);
}`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Using CSS-in-JS" id="using-css-in-js">
                    <p>
                        If you prefer CSS-in-JS, you can access CSS variables in your styled components:
                    </p>
                    <CodeBlock
                        language="tsx"
                        code={`import styled from 'styled-components';

const CustomButton = styled.button\`
  background-color: var(--primary-base-color);
  color: var(--foreground-invert-color);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-hover-color);
    transform: translateY(-1px);
    box-shadow: var(--box-shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
\`;`}
                    />
                </SubSectionLayout>

                <SubSectionLayout title="Best Practices" id="best-practices">
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <strong>Use semantic variables</strong> - Prefer theme-aware variables like{" "}
                            <code>--background-color</code> over hardcoded colors
                        </li>
                        <li>
                            <strong>Maintain consistency</strong> - Use the spacing and sizing scales
                            consistently across your custom components
                        </li>
                        <li>
                            <strong>Test all themes</strong> - Ensure your customizations work well with all
                            available themes
                        </li>
                        <li>
                            <strong>Respect accessibility</strong> - Maintain sufficient color contrast ratios
                            when customizing colors
                        </li>
                        <li>
                            <strong>Document your changes</strong> - Keep track of which variables you've
                            overridden for easier maintenance
                        </li>
                        <li>
                            <strong>Use fallbacks</strong> - Provide fallback values for critical variables in
                            case they're not defined
                        </li>
                    </ul>
                </SubSectionLayout>

                <SubSectionLayout title="Complete Example" id="complete-example">
                    <p>Here's a complete example of a custom theme with brand colors:</p>
                    <CodeBlock
                        language="css"
                        code={`/* styles/custom-theme.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

:root {
  /* Brand font */
  --font-family: "Poppins", sans-serif;
  
  /* Increased spacing */
  --spacing-md: 10px;
  --spacing-lg: 20px;
  --spacing-md: 10px;
  
  /* Rounder corners */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
}

[data-theme="light"] {
  /* Brand primary color (purple) */
  --primary-base-color: #8b5cf6;
  --primary-hover-color: #7c3aed;
  --primary-text-color: #6d28d9;
  --primary-background-color: #f5f3ff;
  --primary-border-color: #a78bfa;
  
  /* Warm background */
  --background-color: #fafaf9;
  --surface-a: #f5f5f4;
  --surface-b: #e7e5e4;
}

[data-theme="dark"] {
  /* Brand primary color (purple) - adjusted for dark mode */
  --primary-base-color: #a78bfa;
  --primary-hover-color: #8b5cf6;
  --primary-text-color: #c4b5fd;
  --primary-background-color: #2e1065;
  --primary-border-color: #7c3aed;
  
  /* Deep background */
  --background-color: #18181b;
  --surface-a: #27272a;
  --surface-b: #3f3f46;
}`}
                    />
                </SubSectionLayout>

                <Divider spacing={50} variant="dashed" />
            </article>
        </ComponentsLayout>
    );
}
