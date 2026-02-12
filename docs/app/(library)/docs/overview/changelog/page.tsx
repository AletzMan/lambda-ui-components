
import { SectionLayout } from "@/app/(library)/components/layout/SectionLayout";
import { SubSectionLayout } from "@/app/(library)/components/layout/SubSectionLayout";

const CHANGELOG = [
	{
		version: "1.3.1",
		date: "2026-02-12",
		sections: [
			{
				title: "🎉 Enhancements",
				items: [
					"Radio: Added standard 'value' and 'onChange' props for seamless form integration.",
				],
			},
			{
				title: "🐛 Bug Fixes",
				items: [
					"Radio: Fixed visual state synchronization when controlled externally.",
				],
			},
		],
	},
	{
		version: "1.3.0",
		date: "2026-02-11",
		sections: [
			{
				title: "🎉 Enhancements",
				items: [
					"Form Integration: Full compatibility with react-hook-form for Select, Radio, Checkbox, and Switch.",
					"Controlled/Uncontrolled: Seamless support for both modes across form components.",
					"Ref Handling: Improved robustness and type safety for forwarded refs.",
				],
			},
			{
				title: "🐛 Bug Fixes",
				items: [
					"Select: Fixed hooks rules violation and ensure type safety.",
					"Select: Prevent accidental form submission with type='button'.",
					"General: Replaced deprecated MutableRefObject with modern ref assignment.",
					"Switch: Fixed state synchronization for uncontrolled usage.",
					"Radio: Allowed standard HTML attributes on RadioGroup.",
				],
			},
		],
	},
	{
		version: "1.2.0",
		date: "2026-02-11",
		sections: [
			{
				title: "⚠️ Breaking Changes",
				items: [
					"Stepper: Removed legacy validation props (validate, isValid, errorMessage) from <Stepper.Content>.",
					"Stepper: Migration required - use onStepValidate callback for all validation logic.",
					"Stepper: Removed legacy 'Strategy 2' validation logic for cleaner implementation.",
				],
			},
			{
				title: "🛠️ Updates",
				items: [
					"Stories: Updated TemplateValidation to use modern onStepValidate pattern.",
				],
			},
		],
	},
	{
		version: "1.1.0",
		date: "2026-02-11",
		sections: [
			{
				title: "🎉 New Features",
				items: [
					"Stepper: Added 'onStepValidate' callback for custom step validation before advancing.",
					"Stepper: Support for both synchronous and asynchronous validation.",
					"Stepper: Block step advancement when validation fails with visual feedback (red X icon).",
					"Stepper: Display custom error messages for failed validations.",
					"Stepper: Automatic error clearing when validation succeeds.",
					"Stepper: Comprehensive documentation with usage examples and migration guide.",
				],
			},
			{
				title: "⚠️ Breaking Changes",
				items: [
					"Stepper: Removed 'steps' prop in favor of children composition pattern.",
					"Stepper: Migration required - use <Stepper.Step> and <Stepper.Content> as children instead of passing steps array.",
					"Stepper: See CHANGELOG.md for detailed migration guide.",
				],
			},
			{
				title: "🐛 Bug Fixes & Improvements",
				items: [
					"Stepper: Adjusted step indicator size for better visual consistency.",
					"Stepper: Added margin reset for step titles and descriptions.",
					"Stepper: Improved TypeScript type safety with proper type assertions.",
					"Stepper: Refactored to calculate totalSteps dynamically from children.",
				],
			},
		],
	},
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
