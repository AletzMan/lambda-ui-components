import { FeatureSection } from "./home-components/FeatureSection";
import HomeHero from "./home-components/HomeHero";
import { ExamplesSection } from "./home-components/ExamplesSection";
import { CallToActionSection } from "./home-components/CallToActionSection";
export default function Home() {
	return (
		<div className="flex flex-col text-(--foreground-color) mx-auto w-full">
			<HomeHero />
			<FeatureSection />
			<ExamplesSection />
			<CallToActionSection />
		</div>
	);
}
