import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";

export default function ThemePage() {
	return (
		<SectionLayout
			title="Theme"
			buttonsRight={{ href: "/docs/overview/about", text: "About" }}
			buttonsLeft={{ href: "/docs/theming/customization", text: "Customization" }}
		>
			<article>
				<SubSectionLayout title="Theme">
					<p>
						Lambda UI Components uses a theming system based on CSS variables to provide a flexible
						and customizable way to style your components. The theme is defined in the{" "}
						<code>theme.ts</code> file in the <code>src/styles</code> directory.
					</p>
				</SubSectionLayout>
			</article>
		</SectionLayout>
	);
}
