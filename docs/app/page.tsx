import HomeHero from "./home-components/HomeHero";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col text-(--foreground-color) mx-auto w-full">
			<HomeHero />
		</div>
	);
}
