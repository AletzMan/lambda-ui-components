import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";

export default function CustomizationPage() {
	return (
		<SectionLayout
			title="Customization"
			buttonsLeft={{ href: "/docs/theming/theme", text: "Theme" }}
			buttonsRight={{ href: "/docs/theming/dark-mode", text: "Dark Mode" }}
		>
			<article>
				<SubSectionLayout title="Customization">
					<p>Customize your components with ease.</p>
					Lambda UI Components uses a theming system based on CSS variables to provide a flexible
					and customizable way to style your components. The theme is defined in the{" "}
					<code>theme.ts</code> file in the <code>src/styles</code> directory.
				</SubSectionLayout>
			</article>
		</SectionLayout>
	);
}
