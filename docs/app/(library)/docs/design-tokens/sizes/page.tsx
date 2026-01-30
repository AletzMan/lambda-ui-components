"use client";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, NavigationMenuData } from "lambda-ui-components";
import { ComponentsLayout } from "../../components/components/ComponentsLayout";
import { Ruler, Maximize, Square, Circle } from "lucide-react";

const baseSizes = [
    { name: "--size-4xs", value: "0.125rem", px: "2px" },
    { name: "--size-3xs", value: "0.25rem", px: "4px" },
    { name: "--size-2xs", value: "0.5rem", px: "8px" },
    { name: "--size-xs", value: "0.75rem", px: "12px" },
    { name: "--size-sm", value: "1rem", px: "16px" },
    { name: "--size-md", value: "1.25rem", px: "20px" },
    { name: "--size-lg", value: "1.5rem", px: "24px" },
    { name: "--size-xl", value: "1.75rem", px: "28px" },
    { name: "--size-2xl", value: "2rem", px: "32px" },
    { name: "--size-3xl", value: "2.25rem", px: "36px" },
    { name: "--size-4xl", value: "2.5rem", px: "40px" },
    { name: "--size-5xl", value: "2.75rem", px: "44px" },
    { name: "--size-6xl", value: "3rem", px: "48px" },
    { name: "--size-7xl", value: "4rem", px: "64px" },
    { name: "--size-8xl", value: "5rem", px: "80px" },
    { name: "--size-9xl", value: "6rem", px: "96px" },
];

const radiuses = [
    { name: "--radius-none", value: "0px" },
    { name: "--radius-xs", value: "0.125rem" },
    { name: "--radius-sm", value: "0.25rem" },
    { name: "--radius-md", value: "0.375rem" },
    { name: "--radius-lg", value: "0.5rem" },
    { name: "--radius-xl", value: "0.75rem" },
    { name: "--radius-2xl", value: "1rem" },
    { name: "--radius-3xl", value: "1.5rem" },
    { name: "--radius-4xl", value: "2rem" },
    { name: "--radius-full", value: "9999px" },
];

const borderWidths = [
    { name: "--border-width-none", value: "0px" },
    { name: "--border-width-xs", value: "1px" },
    { name: "--border-width-sm", value: "2px" },
    { name: "--border-width-md", value: "3px" },
    { name: "--border-width-lg", value: "4px" },
];

const outlineWidths = [
    { name: "--outline-width-none", value: "0px" },
    { name: "--outline-width-default", value: "2px" },
    { name: "--outline-width-strong", value: "3px" },
];

const menuData: NavigationMenuData[] = [
    {
        id: "on-this-page",
        label: "On this page",
        path: "#on-this-page",
        icon: <Ruler />,
        children: [
            {
                id: "content",
                label: "Content",
                path: "#content",
                target: "_top",
                children: [
                    { id: "base-sizes", label: "Base Sizes", path: "#base-sizes", target: "_top" },
                    { id: "border-radius", label: "Border Radius", path: "#border-radius", target: "_top" },
                    { id: "borders", label: "Borders & Outlines", path: "#borders", target: "_top" },
                ],
            },
        ],
    },
];

export default function SizesPage() {
    return (
        <ComponentsLayout
            title="Sizes"
            description="A comprehensive system for sizing, spacing, and shaping dimensions across the application."
            buttonRight={{ href: "/docs/design-tokens/spacing", text: "Spacing" }}
            buttonLeft={{ href: "/docs/design-tokens/colors", text: "Colors" }}
            menuData={menuData}
        >
            <article>
                <SubSectionLayout title="Base Sizes" id="base-sizes">
                    <p className="mb-6">
                        The core sizing scale is used for widths, heights, and general layout dimensions.
                        It follows a consistent scale to ensure UI elements relate to each other harmoniously.
                    </p>
                    <div className="overflow-hidden rounded-lg border border-(--border-color)">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-(--surface-b) border-b border-(--border-color)">
                                <tr>
                                    <th className="p-4 font-medium w-1/3">Variable</th>
                                    <th className="p-4 font-medium w-1/4">Value</th>
                                    <th className="p-4 font-medium">Visual</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border-color)">
                                {baseSizes.map((size) => (
                                    <tr key={size.name}>
                                        <td className="p-4 font-mono text-(--primary-base-color)">{size.name}</td>
                                        <td className="p-4 text-(--foreground-secondary-color)">
                                            {size.value} <span className="opacity-50">({size.px})</span>
                                        </td>
                                        <td className="p-4">
                                            <div
                                                className="bg-(--primary-base-color) rounded-sm"
                                                style={{ width: `var(${size.name})`, height: "1.5rem" }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Border Radius" id="border-radius">
                    <p className="mb-6">
                        Radius tokens define the roundness of element corners.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {radiuses.map((radius) => (
                            <div key={radius.name} className="flex flex-col items-center gap-2 p-4 border border-(--border-color) rounded-lg">
                                <div
                                    className="w-16 h-16 border-2 border-(--primary-base-color) bg-(--surface-b)"
                                    style={{ borderRadius: `var(${radius.name})` }}
                                />
                                <code className="text-xs font-bold text-(--foreground-title-color)">{radius.name}</code>
                                <span className="text-xs text-(--foreground-helper-color)">{radius.value}</span>
                            </div>
                        ))}
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Borders & Outlines" id="borders">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                                <Square className="w-4 h-4" /> Border Widths
                            </h4>
                            <div className="space-y-4">
                                {borderWidths.map((width) => (
                                    <div key={width.name} className="flex items-center gap-4">
                                        <div
                                            className="w-12 h-12 bg-(--surface-b) border-(--primary-base-color)"
                                            style={{ borderWidth: `var(${width.name})` }}
                                        />
                                        <div>
                                            <div className="font-mono text-sm text-(--primary-base-color)">{width.name}</div>
                                            <div className="text-xs text-(--foreground-secondary-color)">{width.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                                <Maximize className="w-4 h-4" /> Outline Widths
                            </h4>
                            <div className="space-y-4">
                                {outlineWidths.map((width) => (
                                    <div key={width.name} className="flex items-center gap-4">
                                        <div
                                            className="w-12 h-12 bg-(--surface-b) outline outline-(--primary-base-color) outline-offset-2"
                                            style={{ outlineWidth: `var(${width.name})` }}
                                        />
                                        <div>
                                            <div className="font-mono text-sm text-(--primary-base-color)">{width.name}</div>
                                            <div className="text-xs text-(--foreground-secondary-color)">{width.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </SubSectionLayout>

                <Divider spacing={50} variant="dashed" />
            </article>
        </ComponentsLayout>
    );
}
