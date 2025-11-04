"use client";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { SectionLayout } from "../../components/layout/Sectionlayout";
import { SubSectionLayout } from "../../components/layout/SubSectionLayout";
import { FooterDocs } from "@/components/layout/FooterDocs";
import { CodeBlock } from "lambda-ui-components";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import { PnpmIcon } from "@/components/icons/PnpmIcon";
import { NpmIcon } from "@/components/icons/NpmIcon";
import { YarnIcon } from "@/components/icons/YarnIcon";

const SECTIONS = {
	install: {
		title: "Installation",
		body: (
			<>
				<p>
					Lambda UI Components is published as an npm package. You can install it using your
					favorite package manager:
				</p>
				<CodeBlock
					buttonCopy
					tabs={[
						{
							label: "pnpm",
							code: "pnpm add lambda-ui-components",
							language: "bash",
							icon: <PnpmIcon />,
						},
						{
							label: "npm",
							code: "npm install lambda-ui-components",
							language: "bash",
							icon: <NpmIcon />,
						},
						{
							label: "yarn",
							code: "yarn add lambda-ui-components",
							language: "bash",
							icon: <YarnIcon />,
						},
					]}
				/>
				<p>
					<b>Tip:</b> For best results, use <code>pnpm</code> or <code>yarn</code> in monorepo
					setups.
				</p>
			</>
		),
	},
	peer: {
		title: "Peer Dependencies",
		body: (
			<>
				<p>
					Lambda UI Components requires <b>React 18+</b> and <b>ReactDOM</b> as peer dependencies.
					Make sure they are installed in your project.
				</p>
				<CodeBlock
					buttonCopy
					tabs={[
						{
							label: "pnpm",
							code: "pnpm add react react-dom",
							language: "bash",
							icon: <PnpmIcon />,
						},
						{
							label: "npm",
							code: "npm install react react-dom",
							language: "bash",
							icon: <NpmIcon />,
						},
						{
							label: "yarn",
							code: "yarn add react react-dom",
							language: "bash",
							icon: <YarnIcon />,
						},
					]}
				/>
				<p>
					For syntax highlighting in <code>CodeBlock</code>, install <code>prismjs</code>:
				</p>
				<CodeBlock
					buttonCopy
					tabs={[
						{ label: "pnpm", code: "pnpm add prismjs", language: "bash", icon: <PnpmIcon /> },
						{ label: "npm", code: "npm install prismjs", language: "bash", icon: <NpmIcon /> },
						{ label: "yarn", code: "yarn add prismjs", language: "bash", icon: <YarnIcon /> },
					]}
				/>
			</>
		),
	},
	usage: {
		title: "Basic Usage",
		body: (
			<>
				<p>Import and use components in your React app:</p>
				<CodeBlock
					buttonCopy
					tabs={[
						{
							code: `import { Button, Card } from "lambda-ui-components";

export default function Example() {
  return (
    <Card>
      <Button color="primary">Hello Lambda UI</Button>
    </Card>
  );
}`,
							language: "tsx",
							label: "tsx",
						},
					]}
				/>
				<p>
					All components are fully typed and support both controlled and uncontrolled usage
					patterns.
				</p>
			</>
		),
	},
	next: {
		title: "Next.js & RSC",
		body: (
			<>
				<p>
					If you use <b>Next.js App Router</b>, add <code>"use client"</code> at the top of your
					page or component file whenever you use interactive components:
				</p>
				<CodeBlock
					buttonCopy
					tabs={[
						{
							code: `"use client";
import { Button } from "lambda-ui-components";
// ...`,
							language: "tsx",
							label: "tsx",
						},
					]}
				/>
				<p>
					This is only necessary in Next.js App Router. In Vite, Astro, Remix, or CRA, you do{" "}
					<b>not</b> need this directive.
				</p>
			</>
		),
	},
};

export default function GettingStarted() {
	const { install, peer, usage, next } = SECTIONS;

	return (
		<SectionLayout title="Getting Started">
			<article className="max-w-none">
				<SubSectionLayout title={peer.title}>{peer.body}</SubSectionLayout>
				<SubSectionLayout title={install.title}>{install.body}</SubSectionLayout>
				<SubSectionLayout title={usage.title}>{usage.body}</SubSectionLayout>
				<SubSectionLayout title={next.title}>{next.body}</SubSectionLayout>
				<SubSectionLayout title="Importing CSS">
					<p>
						Import the Lambda UI CSS in your main entry file (usually <code>src/index.tsx</code> or{" "}
						<code>_app.tsx</code> in Next.js):
					</p>
					<CodeBlock
						tabs={[
							{
								code: `import "lambda-ui-components/dist/main.css";`,
								language: "tsx",
								label: "tsx",
							},
						]}
					/>
					<p>This ensures all components are styled correctly out of the box.</p>
				</SubSectionLayout>
				<SubSectionLayout title="Theme & Configuration Providers">
					<p>
						For advanced theming, localization, and consistent UI configuration, wrap your app with{" "}
						<code>LambdaConfigProvider</code> and <code>ThemeProvider</code> at the root of your
						component tree:
					</p>
					<CodeBlock
						buttonCopy
						tabs={[
							{
								code: `import { LambdaConfigProvider, ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <LambdaConfigProvider lang="en">
      <ThemeProvider defaultTheme="dark">
        {children}
      </ThemeProvider>
    </LambdaConfigProvider>
  );
}`,
								language: "tsx",
								label: "tsx",
							},
						]}
					/>
					<p>
						<b>Learn more:</b>
					</p>
					<ul className="list-disc pl-6">
						<li>
							<Link
								href="/overview/theming"
								className="text-(--primary-base-color) underline hover:opacity-80"
							>
								Theming & Customization
							</Link>
						</li>
						<li>
							<Link
								href="/overview/dark-mode"
								className="text-(--primary-base-color) underline hover:opacity-80"
							>
								Dark Mode
							</Link>
						</li>
						<li>
							<Link
								href="/overview/i18n"
								className="text-(--primary-base-color) underline hover:opacity-80"
							>
								Localization & Language
							</Link>
						</li>
					</ul>
				</SubSectionLayout>
				<div className="my-10 flex justify-center">
					<Link
						href="/overview/introduction"
						className="flex items-center gap-3 px-6 py-3 rounded bg-(--primary-base-color) text-white font-semibold shadow hover:bg-cyan-400 transition"
					>
						← Back to Introduction <Rocket className="w-5 h-5" />
					</Link>
				</div>
			</article>
			<FooterDocs />
		</SectionLayout>
	);
}
