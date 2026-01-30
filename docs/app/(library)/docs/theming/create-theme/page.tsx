"use client";
import { useState } from "react";
import { ComponentsLayout } from "../../components/components/ComponentsLayout";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import {
    Button,
    Input,
    Card,
    Alert,
    Badge,
    Checkbox,
    Switch,
    Select,
    Progress,
    Skeleton,
    TextArea,
    NavigationMenuData,
    Divider,
    CodeBlock,
    Slider
} from "lambda-ui-components";
import { List, Copy, Check } from "lucide-react";

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
                        id: "theme-controls",
                        label: "Theme Controls",
                        path: "#theme-controls",
                        target: "_top",
                    },
                    {
                        id: "playground",
                        label: "Playground",
                        path: "#playground",
                        target: "_top",
                    },
                    {
                        id: "generated-css",
                        label: "Generated CSS",
                        path: "#generated-css",
                        target: "_top",
                    },
                ],
            },
        ],
    },
];

const borderWidthOptions = [
    { value: "var(--border-width-none)", label: "None" },
    { value: "var(--border-width-xs)", label: "XS" },
    { value: "var(--border-width-sm)", label: "SM" },
    { value: "var(--border-width-md)", label: "MD" },
    { value: "var(--border-width-lg)", label: "LG" },
];

const radiusOptions = [
    { value: "var(--radius-none)", label: "None" },
    { value: "var(--radius-xs)", label: "XS" },
    { value: "var(--radius-sm)", label: "SM" },
    { value: "var(--radius-md)", label: "MD" },
    { value: "var(--radius-lg)", label: "LG" },
    { value: "var(--radius-xl)", label: "XL" },
    { value: "var(--radius-2xl)", label: "2XL" },
    { value: "var(--radius-full)", label: "Full" },
];

interface ThemeConfig {
    borderWidth: string;
    radiusBox: string;
    radiusField: string;
    radiusSelector: string;
    primaryColor: string;
    secondaryColor: string;
    successColor: string;
    dangerColor: string;
    warningColor: string;
    infoColor: string;
    neutralColor: string;
}

export default function CreateThemePage() {
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
        borderWidth: "var(--border-width-xs)",
        radiusBox: "var(--radius-sm)",
        radiusField: "var(--radius-sm)",
        radiusSelector: "var(--radius-full)",
        primaryColor: "#06b6d4",
        secondaryColor: "#14b8a6",
        successColor: "#22c55e",
        dangerColor: "#ef4444",
        warningColor: "#f59e0b",
        infoColor: "#3b82f6",
        neutralColor: "#71717a",
    });

    const updateThemeConfig = (key: keyof ThemeConfig, value: string) => {
        setThemeConfig((prev) => ({ ...prev, [key]: value }));
    };

    const generateCSS = () => {
        return `[data-theme="custom"] {
  /* Border & Radius */
  --border-width: ${themeConfig.borderWidth};
  --radius-box: ${themeConfig.radiusBox};
  --radius-field: ${themeConfig.radiusField};
  --radius-selector: ${themeConfig.radiusSelector};

  /* Colors */
  --primary-base-color: ${themeConfig.primaryColor};
  --secondary-base-color: ${themeConfig.secondaryColor};
  --success-base-color: ${themeConfig.successColor};
  --danger-base-color: ${themeConfig.dangerColor};
  --warning-base-color: ${themeConfig.warningColor};
  --info-base-color: ${themeConfig.infoColor};
  --neutral-base-color: ${themeConfig.neutralColor};
}`;
    };


    // Apply custom theme variables directly to override component styles
    const customThemeStyle = {
        // Border and radius overrides
        "--border-width": themeConfig.borderWidth,
        "--radius-box": themeConfig.radiusBox,
        "--radius-field": themeConfig.radiusField,
        "--radius-selector": themeConfig.radiusSelector,

        // Color overrides - primary
        "--primary-base-color": themeConfig.primaryColor,
        "--primary-hover-color": themeConfig.primaryColor,
        "--primary-text-color": themeConfig.primaryColor,

        // Color overrides - secondary
        "--secondary-base-color": themeConfig.secondaryColor,
        "--secondary-hover-color": themeConfig.secondaryColor,

        // Color overrides - neutral
        "--neutral-base-color": themeConfig.neutralColor,
        "--neutral-hover-color": themeConfig.neutralColor,

        // Color overrides - success
        "--success-base-color": themeConfig.successColor,
        "--success-border-color": themeConfig.successColor,

        // Color overrides - danger
        "--danger-base-color": themeConfig.dangerColor,
        "--danger-border-color": themeConfig.dangerColor,

        // Color overrides - warning
        "--warning-base-color": themeConfig.warningColor,
        "--warning-border-color": themeConfig.warningColor,

        // Color overrides - info
        "--info-base-color": themeConfig.infoColor,
        "--info-border-color": themeConfig.infoColor,
    } as React.CSSProperties;

    return (
        <ComponentsLayout
            title="Create Theme"
            description=""
            buttonLeft={{ href: "/docs/theming/dark-mode", text: "Dark Mode" }}
            buttonRight={{ href: "/docs/components/forms/input", text: "Input" }}
            menuData={menuData}
        >
            <article>
                <SubSectionLayout title="Overview" id="overview">
                    <p>
                        Create and customize your own theme with this interactive theme builder.
                        Adjust border widths, radius values, and colors to match your brand, then
                        copy the generated CSS to use in your project. Changes are reflected in
                        real-time in the playground below.
                    </p>
                </SubSectionLayout>

                <SubSectionLayout title="Theme Controls" id="theme-controls">
                    <div className="flex flex-col gap-4 mt-4 max-w-[400px]">
                        {/* Border Width */}
                        <div>
                            <label className="block text-sm font-medium text-(--foreground-label-color) mb-2">
                                Border Width
                            </label>
                            <Slider
                                value={borderWidthOptions.findIndex((opt) => opt.value === themeConfig.borderWidth)}
                                onChangeValue={(value) => updateThemeConfig("borderWidth", borderWidthOptions[value].value)}
                                size="small"
                                min={0}
                                max={borderWidthOptions.length - 1}
                                marks={borderWidthOptions.map((opt, index) => ({ value: index, label: opt.label }))}
                            />
                        </div>

                        {/* Radius Box */}
                        <div>
                            <label className="block text-sm font-medium text-(--foreground-label-color) mb-2">
                                Radius Box
                            </label>
                            <Slider
                                value={radiusOptions.findIndex((opt) => opt.value === themeConfig.radiusBox)}
                                onChangeValue={(value) => updateThemeConfig("radiusBox", radiusOptions[value].value)}
                                size="small"
                                min={0}
                                max={radiusOptions.length - 2}
                                marks={radiusOptions.map((opt, index) => ({ value: index, label: opt.label }))}
                            />
                        </div>

                        {/* Radius Field */}
                        <div>
                            <label className="block text-sm font-medium text-(--foreground-label-color) mb-2">
                                Radius Field
                            </label>
                            <Slider
                                value={radiusOptions.findIndex((opt) => opt.value === themeConfig.radiusField)}
                                onChangeValue={(value) => updateThemeConfig("radiusField", radiusOptions[value].value)}
                                size="small"
                                min={0}
                                max={radiusOptions.length - 1}
                                marks={radiusOptions.map((opt, index) => ({ value: index, label: opt.label }))}
                            />
                        </div>


                        {/* Radius Selector */}
                        <div>
                            <label className="block text-sm font-medium text-(--foreground-label-color) mb-2">
                                Radius Selector
                            </label>
                            <Slider
                                value={radiusOptions.findIndex((opt) => opt.value === themeConfig.radiusSelector)}
                                onChangeValue={(value) => updateThemeConfig("radiusSelector", radiusOptions[value].value)}
                                size="small"
                                min={0}
                                max={radiusOptions.length - 1}
                                marks={radiusOptions.map((opt, index) => ({ value: index, label: opt.label }))}
                            />
                        </div>
                    </div>

                    {/* Color Pickers */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {[
                            { key: "primaryColor" as keyof ThemeConfig, label: "Primary" },
                            { key: "secondaryColor" as keyof ThemeConfig, label: "Secondary" },
                            { key: "successColor" as keyof ThemeConfig, label: "Success" },
                            { key: "dangerColor" as keyof ThemeConfig, label: "Danger" },
                            { key: "warningColor" as keyof ThemeConfig, label: "Warning" },
                            { key: "infoColor" as keyof ThemeConfig, label: "Info" },
                            { key: "neutralColor" as keyof ThemeConfig, label: "Neutral" },
                        ].map(({ key, label }) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-(--foreground-label-color) mb-2">
                                    {label}
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={themeConfig[key]}
                                        onChange={(e) => updateThemeConfig(key, e.target.value)}
                                        className="w-12 h-10 rounded cursor-pointer border border-(--border-color)"
                                    />
                                    <Input
                                        type="text"
                                        value={themeConfig[key]}
                                        onChange={(e) => updateThemeConfig(key, e.target.value)}
                                        size="small"
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Playground" id="playground">
                    <p className="mb-4">
                        Preview your theme configuration with live component examples below. Changes
                        update in real-time as you adjust the controls above.
                    </p>

                    <div
                        className="playground-container"
                        style={customThemeStyle}
                        data-playground-theme="custom"
                    >
                        <style jsx>{`
              .playground-container {
                padding: var(--spacing-xl);
                background: var(--surface-a);
                border: var(--border-width) solid var(--border-color);
                border-radius: var(--radius-box);
                transition: all 0.2s ease;
              }
            `}</style>

                        <div className="space-y-8">
                            {/* Buttons Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-(--foreground-title-color) mb-4">
                                    Buttons
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button color="primary" size="medium">
                                        Primary
                                    </Button>
                                    <Button color="secondary" size="medium">
                                        Secondary
                                    </Button>
                                    <Button color="neutral" size="medium">
                                        Neutral
                                    </Button>
                                    <Button color="primary" variant="outline" size="medium">
                                        Outline
                                    </Button>
                                </div>
                            </div>

                            {/* Form Fields Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-(--foreground-title-color) mb-4">
                                    Form Fields
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                                    <Input placeholder="Input field" size="medium" />
                                    <Select size="medium" options={[{ label: "Select option", value: "select" }, { label: "Option 1", value: "option1" }, { label: "Option 2", value: "option2" }]} />
                                    <div className="md:col-span-2">
                                        <TextArea placeholder="Textarea field" rows={3} />
                                    </div>
                                </div>
                            </div>

                            {/* Form Controls Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-(--foreground-title-color) mb-4">
                                    Form Controls
                                </h3>
                                <div className="flex flex-wrap gap-6">
                                    <Checkbox label="Checkbox option" />
                                    <Switch label="Switch option" />
                                </div>
                            </div>

                            {/* Cards Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-(--foreground-title-color) mb-4">
                                    Cards
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                                    <Card title="Card Title" >
                                        <p className="text-(--foreground-secondary-color)">
                                            This is a card with custom border radius and width.
                                        </p>
                                    </Card>
                                    <Card title="Another Card"  >
                                        <div className="flex gap-2 mt-2">
                                            <Badge>Badge</Badge>
                                            <Badge>Tag</Badge>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Alerts Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-(--foreground-title-color) mb-4">
                                    Alerts
                                </h3>
                                <div className="space-y-3 max-w-3xl">
                                    <Alert color="success" title="Success" message="Operation completed successfully." />
                                    <Alert color="danger" title="Error" message="An error occurred during the operation." />
                                    <Alert color="warning" title="Warning" message="Please review before proceeding." />
                                    <Alert color="info" title="Info" message="Additional information about this feature." />
                                </div>
                            </div>

                            {/* Progress & Skeleton Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-(--foreground-title-color) mb-4">
                                    Progress & Loading
                                </h3>
                                <div className="space-y-4 max-w-xl">
                                    <Progress value={65} color="primary" />
                                    <div className="flex gap-3">
                                        <Skeleton width="100px" height="40px" animationType="wave" />
                                        <Skeleton width="150px" height="40px" animationType="wave" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Generated CSS" id="generated-css">
                    <p className="mb-4">
                        Copy the generated CSS below and add it to your stylesheet. Apply the theme by
                        setting <code>data-theme="custom"</code> on your HTML element.
                    </p>

                    <div className="relative">
                        <CodeBlock language="css" code={generateCSS()} buttonCopy />

                    </div>

                    <div className="mt-6 p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
                        <h4 className="font-semibold text-(--foreground-title-color) mb-2">
                            How to use
                        </h4>
                        <ol className="list-decimal list-inside space-y-2 text-(--foreground-secondary-color)">
                            <li>Copy the generated CSS above</li>
                            <li>Add it to your global CSS file</li>
                            <li>Set <code className="code-tag">data-theme="custom"</code> on your HTML element</li>
                            <li>Customize the colors and values to match your brand</li>
                        </ol>
                    </div>
                </SubSectionLayout>

                <Divider spacing={50} variant="dashed" />
            </article>
        </ComponentsLayout>
    );
}
