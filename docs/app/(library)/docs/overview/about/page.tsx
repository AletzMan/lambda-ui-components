import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";
import { Avatar, ClientOnly } from "lambda-ui-components";
import Link from "next/link";

export default function AboutPage() {
	return (
		<SectionLayout
			title="About Lambda UI Components"
			buttonsLeft={{ href: "/docs/overview/changelog", text: "Changelog" }}
			buttonsRight={{ href: "/docs/theming/theme", text: "Theme" }}
		>
			<article>
				<SubSectionLayout title="What is Lambda UI Components?">
					<p>
						Lambda UI Components is a modern, accessible, and developer-friendly React component
						library designed to help you build beautiful apps faster. It focuses on flexibility,
						theming, and best practices for both documentation and real-world usage.
					</p>
				</SubSectionLayout>
				<SubSectionLayout title="About the Creator">
					<div className="flex items-center gap-6 mb-4">
						<ClientOnly fallback={<div />}>
							<Avatar name="AletzMan" size="large" />
						</ClientOnly>
						<div>
							<div className="font-semibold text-lg">AletzMan</div>
							<div className="text-sm text-(--foreground-secondary-color)">
								Creator & Maintainer
							</div>
							<div className="flex gap-3 mt-1">
								<Link
									href="https://github.com/AletzMan"
									target="_blank"
									className="underline text-(--primary-base-color)"
								>
									GitHub
								</Link>
								<Link
									href="https://twitter.com/AletzMan"
									target="_blank"
									className="underline text-(--primary-base-color)"
								>
									X / Twitter
								</Link>
							</div>
						</div>
					</div>
					<p>
						Hi! I'm AletzMan, a passionate developer from Mexico. I created Lambda UI Components to
						empower developers with a flexible, accessible, and modern UI toolkit for React. My goal
						is to make building beautiful apps enjoyable and efficient for everyone.
					</p>
				</SubSectionLayout>
				<SubSectionLayout title="Vision & Motivation">
					<p>
						Lambda UI Components was born out of the need for a component library that balances
						developer experience, accessibility, and visual appeal. Whether you're building a
						startup MVP, a design system, or learning React, Lambda UI aims to be your go-to
						toolkit.
					</p>
					<ul className="list-disc pl-6 mt-3">
						<li>Accessible by default</li>
						<li>Modern, customizable design</li>
						<li>Clear documentation and examples</li>
						<li>Open to community feedback and contributions</li>
					</ul>
				</SubSectionLayout>
			</article>
		</SectionLayout>
	);
}
