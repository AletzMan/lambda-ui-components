"use client";
import { useEffect, useState } from "react";

export interface ClientOnlyProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return <>{isClient ? children : fallback}</>;
};

ClientOnly.displayName = "ClientOnly";
