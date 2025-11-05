import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SubSectionLayout } from "../../../components/layout/SubSectionLayout";

export default function DarkModePage() {
	return (
		<SectionLayout
			title="Dark Mode"
			buttonsLeft={{ href: "/docs/theming/customization", text: "Customization" }}
			buttonsRight={{ href: "/docs/components/forms/input", text: "Input" }}
		>
			<article>
				<SubSectionLayout title="Dark Mode">
					<p>Customize your components with ease.</p>
					<p>
						Dark mode is a feature that allows you to use your components in a dark environment.
					</p>
					<p>
						To enable dark mode, you can use the <code>dark</code> prop on any component.
					</p>
				</SubSectionLayout>
			</article>
		</SectionLayout>
	);
}
