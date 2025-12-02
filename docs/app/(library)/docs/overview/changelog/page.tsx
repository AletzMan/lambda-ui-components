
import { SectionLayout } from "@/app/(library)/components/layout/SectionLayout";
import { SubSectionLayout } from "@/app/(library)/components/layout/SubSectionLayout";

const CHANGELOG = [
	{
		version: "1.0.0",
		date: "2025-11-05",
		sections: [
			{
				title: "✨ Features",
				items: [
					"Initial public release of Lambda UI Components.",
					"Includes NavigationMenu, CodeBlock, Sidebar, and core documentation.",
					"Supports Next.js, React Router, and vanilla React integration.",
				],
			},
		],
	},
];

export default function ChangelogPage() {
	return (
		<SectionLayout
			title="Changelog"
			buttonsLeft={{ href: "/docs/overview/getting-started", text: "Getting Started" }}
			buttonsRight={{ href: "/docs/overview/about", text: "About" }}
		>
			<article>
				{CHANGELOG.map((release) => (
					<SubSectionLayout key={release.version} title={`${release.version} – ${release.date}`}>
						{release.sections.map((section) => (
							<div key={section.title}>
								<h3 className="font-semibold text-lg mb-2">{section.title}</h3>
								<ul className="list-disc pl-6 mb-4">
									{section.items.map((item, idx) => (
										<li key={idx}>{item}</li>
									))}
								</ul>
							</div>
						))}
					</SubSectionLayout>
				))}
			</article>
		</SectionLayout>
	);
}
