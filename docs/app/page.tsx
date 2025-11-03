import { FeatureSection } from "./home-components/FeatureSection";
import HomeHero from "./home-components/HomeHero";
import { ExamplesSection } from "./home-components/ExamplesSection";
export default function Home() {
	return (
		<div className="flex min-h-screen flex-col text-(--foreground-color) mx-auto w-full">
			<HomeHero />
			<FeatureSection />
			<ExamplesSection />
		</div>
	);
}
