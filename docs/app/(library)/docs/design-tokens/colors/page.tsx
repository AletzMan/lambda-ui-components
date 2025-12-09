"use client";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, Link, NavigationMenuData } from "lambda-ui-components";
import { ComponentsLayout } from "../../components/components/ComponentsLayout";
import { Palette, Layers, Code, Info } from "lucide-react";

// Helper to generate the color primitives list
const primitives = [
    { name: "Neutral", key: "neutral", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Warm", key: "warm", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Red", key: "red", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Brown", key: "brown", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Orange", key: "orange", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Yellow", key: "yellow", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Amber", key: "amber", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Lime", key: "lime", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Green", key: "green", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Emerald", key: "emerald", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Teal", key: "teal", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Cyan", key: "cyan", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Sky", key: "sky", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Blue", key: "blue", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Indigo", key: "indigo", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Violet", key: "violet", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Purple", key: "purple", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Fuchsia", key: "fuchsia", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Pink", key: "pink", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Rose", key: "rose", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Slate", key: "slate", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Gray", key: "gray", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
    { name: "Zinc", key: "zinc", colors: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
];

const semmantics = [
    { name: "Primary", key: "primary" },
    { name: "Secondary", key: "secondary" },
    { name: "Neutral", key: "neutral" },
    { name: "Success", key: "success" },
    { name: "Danger", key: "danger" },
    { name: "Warning", key: "warning" },
    { name: "Info", key: "info" },
];

const menuData: NavigationMenuData[] = [
    {
        id: "on-this-page",
        label: "On this page",
        path: "#on-this-page",
        icon: <Palette />,
        children: [
            {
                id: "content",
                label: "Content",
                path: "#content",
                target: "_top",
                children: [
                    { id: "overview", label: "Overview", path: "#overview", target: "_top" },
                    { id: "primitives", label: "Primitive Colors", path: "#primitives", target: "_top" },
                    { id: "semantics", label: "Semantic Colors", path: "#semantics", target: "_top" },
                    { id: "usage", label: "Usage", path: "#usage", target: "_top" },
                ],
            },
        ],
    },
];

export default function ColorsPage() {
    return (
        <ComponentsLayout
            title="Colors"
            description="Our comprehensive color system designed for flexibility and accessibility, powered by modern CSS color spaces."
            buttonRight={{ href: "/docs/design-tokens/sizes", text: "Sizes" }}
            buttonLeft={{ href: "/docs/overview/about", text: "About" }}
            menuData={menuData}
        >
            <article>
                <SubSectionLayout title="Overview" id="overview">
                    <p>
                        Lambda UI uses the <strong>OKLCH</strong> color space for defining its color system.
                        This ensures perceptually uniform colors and consistent contrast ratios across different palettes.
                        The system is divided into two layers: <strong>Primitive Colors</strong> (the raw palette) and
                        <strong>Semantic Colors</strong> (roles for UI elements).
                    </p>
                    <div className="mt-4 p-4 rounded-lg bg-(--surface-b) border border-(--border-color) flex gap-3 text-sm text-(--foreground-secondary-color)">
                        <Info className="w-5 h-5 text-(--info-base-color) shrink-0" />
                        <p>
                            All colors are accessible as CSS variables. The raw values are available, but we recommend using
                            Semantic Colors for building UI components to ensure theming support.
                        </p>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Primitive Colors" id="primitives">
                    <p className="mb-6">
                        The foundation of our color system. Each family consists of 11 steps ranging from 050 (lightest) to 950 (darkest).
                    </p>
                    <div className="grid gap-8">
                        {primitives.map((family) => (
                            <div key={family.key}>
                                <h4 className="font-semibold capitalize mb-3 text-(--foreground-title-color)">{family.name}</h4>
                                <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 gap-2">
                                    {family.colors.map((step) => {
                                        const varName = `--lambda-color-${family.key}-${step.toString().padStart(3, "0")}`;
                                        return (
                                            <div key={step} className="flex flex-col gap-1">
                                                <div
                                                    className="w-full aspect-square rounded-md border border-(--border-color) shadow-sm"
                                                    style={{ backgroundColor: `var(${varName})` }}
                                                    title={varName}
                                                />
                                                <span className="text-xs text-center text-(--foreground-helper-color) font-mono">
                                                    {step}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Semantic Colors" id="semantics">
                    <p className="mb-6">
                        Semantic colors map primitive colors to specific UI contexts (e.g., "primary action", "error message").
                        These automatically adapt when switching themes (Light/Dark/Retro).
                    </p>
                    <div className="grid gap-8">
                        {semmantics.map((sem) => (
                            <div key={sem.key} className="border border-(--border-color) rounded-lg overflow-hidden">
                                <div className="bg-(--surface-b) px-4 py-3 border-b border-(--border-color)">
                                    <h4 className="font-semibold">{sem.name}</h4>
                                </div>
                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        "base", "hover", "disabled", // Interaction
                                        "text", "content", // Text
                                        "soft", "subtle", // Backgrounds
                                        "border", "outline", // Borders
                                    ].map((suffix) => {
                                        const varName = `--${sem.key}-${suffix}-color`;
                                        return (
                                            <div key={suffix} className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-md border border-(--border-color) shadow-sm"
                                                    style={{ backgroundColor: `var(${varName})` }}
                                                />
                                                <div className="flex flex-col">
                                                    <code className="text-xs font-bold text-(--primary-base-color)">{suffix}</code>
                                                    <code className="text-[10px] text-(--foreground-helper-color)">{varName}</code>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Usage" id="usage">
                    <p>
                        Use semantic variables in your CSS to inherit theme changes.
                    </p>
                    <div className="mt-4">
                        <CodeBlock
                            language="css"
                            code={`.my-button {
  background-color: var(--primary-base-color);
  color: var(--primary-content-color);
  border: 1px solid var(--primary-border-color);
}

.my-button:hover {
  background-color: var(--primary-hover-color);
}

.my-alert {
    background-color: var(--danger-soft-color);
    color: var(--danger-text-color);
}`}
                        />
                    </div>
                </SubSectionLayout>

                <Divider spacing={50} variant="dashed" />
            </article>
        </ComponentsLayout>
    );
}
