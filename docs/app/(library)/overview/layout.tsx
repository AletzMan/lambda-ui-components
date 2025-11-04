import { SideBar } from "@/app/(library)/components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="grid grid-cols-[250px_1fr] text-(--foreground-color) mx-auto w-full ">
			<SideBar />
			{children}
		</main>
	);
}
