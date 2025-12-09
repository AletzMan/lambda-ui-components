import { SideBar } from "@/app/(library)/components/layout/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="grid grid-cols-[290px_1fr] max-[780px]:grid-cols-1 text-(--foreground-color) w-full h-full">
			<div className="max-[780px]:hidden">
				<SideBar />
			</div>
			{children}
		</main>
	);
}
