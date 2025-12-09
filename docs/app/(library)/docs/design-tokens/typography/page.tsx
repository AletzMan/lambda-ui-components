"use client";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { CodeBlock, Divider, Link, NavigationMenuData } from "lambda-ui-components";
import { ComponentsLayout } from "../../components/components/ComponentsLayout";
import { List, Type, Scale, Weight } from "lucide-react";

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
                        id: "font-family",
                        label: "Font Family",
                        path: "#font-family",
                        target: "_top",
                    },
                    {
                        id: "font-weights",
                        label: "Font Weights",
                        path: "#font-weights",
                        target: "_top",
                    },
                    {
                        id: "font-sizes",
                        label: "Font Sizes",
                        path: "#font-sizes",
                        target: "_top",
                    },
                    {
                        id: "usage",
                        label: "Usage",
                        path: "#usage",
                        target: "_top",
                    },
                ],
            },
        ],
    },
];

export default function TypographyPage() {
    return (
        <ComponentsLayout
            title="Typography"
            description="Manage typography settings using CSS variables for consistent font families, sizes, and weights across your application."
            buttonRight={{ href: "/docs/theming/theme", text: "Theme" }}
            buttonLeft={{ href: "/docs/design-tokens/spacing", text: "Spacing" }}
            menuData={menuData}
        >
            <article>
                <SubSectionLayout title="Overview" id="overview">
                    <p>
                        Lambda UI Components uses a robust typography system driven by CSS variables.
                        This approach ensures consistency and allows for easy customization of fonts,
                        weights, and sizes to match your brand identity.
                    </p>
                    <div className="mt-6 p-4 rounded-lg bg-(--surface-b) border border-(--border-color)">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Type className="w-4 h-4" />
                            Base Settings
                        </h4>
                        <p className="text-sm text-(--foreground-secondary-color)">
                            The library uses <strong>Manrope Variable</strong> as the default font family,
                            providing a wide range of weights and excellent readability for UI interfaces.
                        </p>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Font Family" id="font-family">
                    <p>
                        The primary font family is defined by the <code>--font-family</code> variable.
                    </p>
                    <div className="mt-4 grid gap-4">
                        <div className="p-4 rounded-lg border border-(--border-color) flex flex-col gap-2">
                            <code className="text-sm font-bold text-(--primary-base-color)">--font-family</code>
                            <div className="font-(--font-family) text-2xl">
                                The quick brown fox jumps over the lazy dog
                            </div>
                            <div className="text-sm text-(--foreground-secondary-color) mt-2">
                                Value: <code>"Manrope Variable", sans-serif</code>
                            </div>
                        </div>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Font Weights" id="font-weights">
                    <p>
                        A comprehensive set of font weights is available via CSS variables, ranging from
                        Extra Light (200) to Extra Bold (800).
                    </p>
                    <div className="mt-6 overflow-hidden rounded-lg border border-(--border-color)">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-(--surface-b) border-b border-(--border-color)">
                                <tr>
                                    <th className="p-4 font-medium">Variable</th>
                                    <th className="p-4 font-medium">Value</th>
                                    <th className="p-4 font-medium">Preview</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border-color)">
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-weight-extralight</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">200</td>
                                    <td className="p-4" style={{ fontWeight: "var(--font-weight-extralight)" }}>Extra Light</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-weight-light</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">300</td>
                                    <td className="p-4" style={{ fontWeight: "var(--font-weight-light)" }}>Light</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-weight-regular</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">400</td>
                                    <td className="p-4" style={{ fontWeight: "var(--font-weight-regular)" }}>Regular</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-weight-medium</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">500</td>
                                    <td className="p-4" style={{ fontWeight: "var(--font-weight-medium)" }}>Medium</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-weight-semibold</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">600</td>
                                    <td className="p-4" style={{ fontWeight: "var(--font-weight-semibold)" }}>Semibold</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-weight-bold</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">700</td>
                                    <td className="p-4" style={{ fontWeight: "var(--font-weight-bold)" }}>Bold</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-weight-extrabold</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">800</td>
                                    <td className="p-4" style={{ fontWeight: "var(--font-weight-extrabold)" }}>Extra Bold</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Font Sizes" id="font-sizes">
                    <p>
                        The type scale provides a wide range of sizes for any context, from tiny captions to massive display headings.
                    </p>
                    <div className="mt-6 overflow-hidden rounded-lg border border-(--border-color)">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-(--surface-b) border-b border-(--border-color)">
                                <tr>
                                    <th className="p-4 font-medium">Variable</th>
                                    <th className="p-4 font-medium">Value</th>
                                    <th className="p-4 font-medium">Preview</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border-color)">
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-2xs</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">0.625rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-2xs)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-xs</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">0.75rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-xs)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-sm</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">0.875rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-sm)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-md</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">1rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-md)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-lg</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">1.125rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-lg)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">1.25rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-2xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">1.5rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-2xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-3xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">1.875rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-3xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-4xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">2.25rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-4xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-5xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">2.5rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-5xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-6xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">3rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-6xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-7xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">3.5rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-7xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-8xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">4rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-8xl)" }}>The quick brown fox</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-mono text-(--primary-base-color)">--font-size-9xl</td>
                                    <td className="p-4 text-(--foreground-secondary-color)">4.5rem</td>
                                    <td className="p-4" style={{ fontSize: "var(--font-size-9xl)" }}>The quick brown fox</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </SubSectionLayout>

                <SubSectionLayout title="Usage" id="usage">
                    <p>
                        You can easily use these typographic variables in your own CSS or CSS-in-JS solutions.
                    </p>
                    <div className="mt-4">
                        <CodeBlock
                            language="css"
                            code={`.my-heading {
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-4xl);
  color: var(--foreground-title-color);
}

.my-text {
  font-family: var(--font-family);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-md);
  color: var(--foreground-color);
}`}
                        />
                    </div>
                </SubSectionLayout>

                <Divider spacing={50} variant="dashed" />
            </article>
        </ComponentsLayout>
    );
}
