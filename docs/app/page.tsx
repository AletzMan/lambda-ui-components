import { FeatureSection } from "./components/FeatureSection";
import HomeHero from "./components/HomeHero";
import { ExamplesSection } from "./components/ExamplesSection";
import { CallToActionSection } from "./components/CallToActionSection";
import { HomeFooter } from "./components/HomeFooter";
export default function Home() {
	return (
		<div className="flex flex-col text-(--foreground-color) mx-auto w-full">
			<HomeHero />
			<FeatureSection />
			<ExamplesSection />
			<CallToActionSection />
			<HomeFooter />
		</div>
	);
}
