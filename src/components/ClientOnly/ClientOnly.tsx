import { useSyncExternalStore } from "react";

export interface ClientOnlyProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
	const isClient = useSyncExternalStore(
		// No hay suscripción real: el valor nunca cambia tras montarse
		() => () => {},
		// En cliente retorna true
		() => typeof window !== "undefined",
		// En servidor siempre false
		() => false
	);

	return <>{isClient ? children : fallback}</>;
};

ClientOnly.displayName = "ClientOnly";
