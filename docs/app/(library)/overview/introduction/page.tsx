"use client";
import { Rocket } from "lucide-react";
import Link from "next/link";
import CodeHighlighter from "../../components/ui/CodeHighlighter";
import { SubSectionLayout } from "../../components/layout/SubSectionLayout";
import { SectionLayout } from "../../components/layout/SectionLayout";
import { CodeBlock } from "../../../../../dist/main";

const SECTIONS = {
	intro: {
		title: "Welcome to Lambda UI Components",
		body: (
			<>
				<b>Lambda UI Components</b> is a modern, accessible, and flexible React component library
				designed to help you build beautiful, consistent, and scalable user interfaces with ease.
				Every component is crafted with precision and attention to detail—because at Lambda UI, we
				believe in precision in{" "}
				<span className="font-semibold text-(--primary-disabled-color)">
					every piece and harmony in the whole
				</span>
				.
			</>
		),
	},
	whyLambda: {
		title: "Why Lambda UI?",
		items: [
			{
				strong: "Accessible by default:",
				text: "Components follow WAI-ARIA guidelines and are keyboard-friendly.",
			},
			{
				strong: "Modern design:",
				text: "Built-in dark mode, theming, and responsive layouts.",
			},
			{
				strong: "Developer experience:",
				text: "TypeScript-first, clear props, and Storybook demos.",
			},
			{
				strong: "Flexible & composable:",
				text: "Extend, override, or compose components as you need.",
			},
		],
	},
	whatsIncluded: {
		title: "What’s Included?",
		description:
			"Lambda UI offers a comprehensive set of UI primitives and advanced components, including:",
		components: [
			"Button",
			"Input & TextArea",
			"Select & Dropdown",
			"Checkbox & Radio",
			"Switch",
			"Dialog & Drawer",
			"Notification",
			"Table & Pagination",
			"Card",
			"Tabs",
			"Slider",
			"Avatar",
			"Progress",
			"Skeleton",
			"And many more…",
		],
	},
	theming: {
		title: "Theming & Customization",
		paragraphs: [
			<>
				Lambda UI Components uses <b>CSS variables</b> for theming. You can globally override the
				theme by changing variables in your CSS or using <code>data-theme</code> for dark mode and
				custom themes.
			</>,
			<>
				To customize the style of specific components, many support the <code>unstyled</code> prop,
				which removes default styles so you can apply your own. <b>Tip:</b> For the best experience,
				only override colors and minor visuals—keep sizing and spacing tokens for consistency.
			</>,
		],
	},
	libraries: {
		title: "Core Libraries & Dependencies",
		dependencies: [
			{
				strong: "React & TypeScript:",
				text: "Core development and type safety.",
			},
			{
				strong: "framer-motion:",
				text: "Smooth animations and transitions for modals, tooltips, drawers, etc.",
			},
			{
				strong: "prismjs:",
				text: "Syntax highlighting for CodeBlock and code display.",
			},
		],
		note: "These dependencies were chosen for their robustness, React ecosystem compatibility, and their contribution to developer experience, animation, accessibility, and customization.",
	},
	faq: {
		title: "Frequently Asked Questions (FAQ)",
		questions: [
			{
				q: "Can I use Lambda UI with Next.js, Vite, Astro, or other React frameworks?",
				a: "Yes! Lambda UI Components works in any modern React project, including Next.js (app router and pages), Vite, Astro, Remix, and more.",
			},
			{
				q: "Are the components compatible with React Server Components (RSC)?",
				a: `Most interactive components require the "use client" directive and work as Client Components. Pure presentational components can be used as Server Components.`,
				code: `"use client";
import { Button } from "lambda-ui-components";
// ...`,
				colors: [
					"text-green-500",
					"text-indigo-500",
					"text-pink-500",
					"text-blue-500",
					"text-yellow-500",
					"text-orange-500",
					"text-red-500",
				],
			},
			{
				q: "How do I customize the global theme?",
				a: "Override the CSS variables in your global stylesheet.",
			},
			{
				q: "How do I change the style of a specific component?",
				a: "Use the `unstyled` prop to remove base styles and add your own classes. For best results, only modify colors and minor visuals to keep spacing and proportions consistent.",
			},
			{
				q: "What is each dependency used for?",
				a: "See the Core Libraries & Dependencies section above for a breakdown of each library and its purpose.",
			},
			{
				q: "How do I report a bug or request a feature?",
				a: `Open an issue or pull request on <a href="https://github.com/aletzman/lambda-ui-components" target="_blank" rel="noopener noreferrer">GitHub</a>.`,
			},
		],
	},
};

export default function Introduction() {
	const paragraph = "text-base leading-relaxed text-(--foreground-secondary-color)";

	const { intro, whyLambda, whatsIncluded, theming, libraries, faq } = SECTIONS;

	return (
		<SectionLayout
			title="Introduction"
			buttonsRight={{ href: "/overview/getting-started", text: "Getting Started" }}
		>
			<article className="max-w-none">
				{/* Sección: Intro */}
				<SubSectionLayout title={intro.title}>{intro.body}</SubSectionLayout>

				{/* Sección: Why Lambda */}
				<SubSectionLayout title={whyLambda.title}>
					<ul className="grid sm:grid-cols-2 gap-4 list-none py-4 mb-12">
						{whyLambda.items.map((item, i) => (
							<li
								key={i}
								className="p-4 rounded-sm bg-(--surface-a) border border-(--border-color)"
							>
								<strong className="text-(--foreground-title-color)">{item.strong}</strong>{" "}
								{item.text}
							</li>
						))}
					</ul>
				</SubSectionLayout>

				{/* Sección: Included */}
				<SubSectionLayout title={whatsIncluded.title}>
					<p className={`${paragraph} mb-4`}>{whatsIncluded.description}</p>
					<ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 list-disc pl-6">
						{whatsIncluded.components.map((component, i) => (
							<li key={i}>{component}</li>
						))}
					</ul>
					{/* CTA */}
					<div className="my-12 flex justify-center">
						<Link
							href="/overview/getting-started"
							className="flex items-center gap-4 px-6 py-3 rounded-sm bg-(--primary-base-color) text-white font-semibold outline-2 outline-offset-2 outline-transparent hover:outline-cyan-500/50 hover:bg-cyan-400 transition-all duration-200"
						>
							Get Started <Rocket className="w-5 h-5" />
						</Link>
					</div>
				</SubSectionLayout>

				{/* Sección: Theming */}
				<SubSectionLayout title={theming.title}>
					{theming.paragraphs.map((p, i) => (
						<p key={i} className={`${paragraph} mb-4`}>
							{p}
						</p>
					))}
				</SubSectionLayout>

				{/* Sección: Core Libraries */}
				<SubSectionLayout title={libraries.title}>
					<ul className="list-disc pl-6 space-y-1">
						{libraries.dependencies.map((dep, i) => (
							<li key={i}>
								<b className="text-(--foreground-title-color)">{dep.strong}</b> {dep.text}
							</li>
						))}
					</ul>
					<p className={`${paragraph} mt-6`}>{libraries.note}</p>
				</SubSectionLayout>

				{/* Sección: FAQ */}
				<SubSectionLayout title={faq.title}>
					<div className="flex flex-col space-y-6">
						{faq.questions.map(({ q, a, code, colors }, i) => (
							<div key={i} className="py-2 ">
								{/* Pregunta (destacada) */}
								<h3 className="text-lg font-semibold text-(--foreground-title-color) mb-1">{q}</h3>

								{/* Respuesta */}
								<div className="text-base leading-relaxed text-(--foreground-secondary-color) pl-2">
									{/* Usamos dangerouslySetInnerHTML para el link de GitHub, si existe */}
									<p dangerouslySetInnerHTML={{ __html: a }} />

									{/* Bloque de Código (si existe) */}
									{code && <CodeBlock code={code} />}
								</div>
							</div>
						))}
					</div>
				</SubSectionLayout>
			</article>
		</SectionLayout>
	);
}
