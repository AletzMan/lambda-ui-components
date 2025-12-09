"use client";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, NavigationMenuData } from "lambda-ui-components";
import { ComponentsLayout } from "../../components/components/ComponentsLayout";
import { MoveHorizontal, LayoutTemplate } from "lucide-react";

const spacingScale = [
    { name: "--spacing-none", value: "0px", px: "0px" },
    { name: "--spacing-3xs", value: "1px", px: "1px" },
    { name: "--spacing-2xs", value: "0.125rem", px: "2px" },
    { name: "--spacing-xs", value: "0.25rem", px: "4px" },
    { name: "--spacing-sm", value: "0.5rem", px: "8px" },
    { name: "--spacing-md", value: "0.75rem", px: "12px" },
    { name: "--spacing-lg", value: "1rem", px: "16px" },
    { name: "--spacing-xl", value: "1.5rem", px: "24px" },
    { name: "--spacing-2xl", value: "2rem", px: "32px" },
    { name: "--spacing-3xl", value: "3rem", px: "48px" },
    { name: "--spacing-4xl", value: "4rem", px: "64px" },
    { name: "--spacing-5xl", value: "5rem", px: "80px" },
    { name: "--spacing-6xl", value: "6rem", px: "96px" },
];

const menuData: NavigationMenuData[] = [
    {
        id: "on-this-page",
        label: "On this page",
        path: "#on-this-page",
        icon: <LayoutTemplate />,
        children: [
            {
                id: "content",
                label: "Content",
                path: "#content",
                target: "_top",
                children: [
                    { id: "overview", label: "Overview", path: "#overview", target: "_top" },
                    { id: "scale", label: "Spacing Scale", path: "#scale", target: "_top" },
                    { id: "usage", label: "Usage", path: "#usage", target: "_top" },
                ],
            },
        ],
    },
];

export default function SpacingPage() {
    return (
        <ComponentsLayout
            title="Spacing"
            description="A consistent spacing scale for margins, paddings, and layout gaps."
            buttonRight={{ href: "/docs/design-tokens/typography", text: "Typography" }}
            buttonLeft={{ href: "/docs/design-tokens/sizes", text: "Sizes" }}
            menuData={menuData}
        >
            <article>
                <SubSectionLayout title="Overview" id="overview">
                    <p>
                        Our spacing scale is built on a 4px baseline. Using consistent spacing values creates a balanced and rhythmic UI layout.
                    </p>
                </SubSectionLayout>

                <SubSectionLayout title="Spacing Scale" id="scale">
                    <p className="mb-6">
                        The scale ranges from minute adjustments (1px) to large layout gaps (96px).
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
                                {spacingScale.map((space) => (
                                    <tr key={space.name}>
                                        <td className="p-4 font-mono text-(--primary-base-color)">{space.name}</td>
                                        <td className="p-4 text-(--foreground-secondary-color)">
                                            {space.value} <span className="opacity-50">({space.px})</span>
                                        </td>
                                        <td className="p-4">
                                            <div
                                                className="bg-(--primary-base-color) opacity-20 rounded-sm"
                                                style={{ width: `var(${space.name})`, height: "1.5rem" }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Usage" id="usage">
                    <p>
                        Apply spacing using CSS variables in padding, margin, gap, and grid layout properties.
                    </p>
                    <div className="mt-4">
                        <CodeBlock
                            language="css"
                            code={`.my-card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  gap: var(--spacing-md);
}`}
                        />
                    </div>
                </SubSectionLayout>

                <Divider spacing={50} variant="dashed" />
            </article>
        </ComponentsLayout>
    );
}
