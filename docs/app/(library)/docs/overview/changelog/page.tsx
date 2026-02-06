
import { SectionLayout } from "@/app/(library)/components/layout/SectionLayout";
import { SubSectionLayout } from "@/app/(library)/components/layout/SubSectionLayout";

const CHANGELOG = [
	{
		version: "1.0.2",
		date: "2026-02-06",
		sections: [
			{
				title: "🚀 Features & Polish",
				items: [
					"Button: Added 'darkened' variant and refactored internal styles.",
					"Avatar: Implemented dynamic border colors based on name hash.",
					"Theme: Updated 'dark' color variables to use 950 shade for better contrast.",
					"Table: Refined component structure and styling.",
				],
			},
			{
				title: "🐛 Bug Fixes",
				items: [
					"DatePicker: Fixed premature closing issues in 'modal' mode.",
					"General: Minor style fixes for Alert and Dropdown interactions.",
				],
			},
		],
	},
	{
		version: "1.0.1",
		date: "2025-11-05",
		sections: [
			{
				title: "📚 Documentation",
				items: [
					"Updated README with detailed usage instructions and implementation guidelines.",
				],
			},
		],
	},
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
