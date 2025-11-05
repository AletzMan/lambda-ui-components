import { useEffect, useState } from "react";

export function usePathObserver() {
	const getPath = () => (typeof window !== "undefined" ? window.location.pathname : "");

	const [path, setPath] = useState(getPath);

	useEffect(() => {
		// Patch pushState and replaceState to dispatch a custom event
		const events = ["pushState", "replaceState"];
		events.forEach((type) => {
			const orig = window.history[type as keyof History];
			(window.history as any)[type] = function (...args: any[]) {
				const rv = orig.apply(this, args);
				window.dispatchEvent(new Event("locationchange"));
				return rv;
			};
		});

		// Listen to popstate and locationchange
		const onChange = () => setPath(getPath());
		window.addEventListener("popstate", onChange);
		window.addEventListener("locationchange", onChange);

		return () => {
			window.removeEventListener("popstate", onChange);
			window.removeEventListener("locationchange", onChange);
			// Restore original methods (optional)
		};
	}, []);

	return path;
}
