import { SideBar } from "@/components/layout/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="grid grid-cols-[250px_1fr] text-(--foreground-color) mx-auto w-full h-screen">
			<SideBar />
			{children}
		</main>
	);
}
