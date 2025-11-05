import { useEffect, useState } from "react";

let isPatched = false;
let origPushState: History["pushState"];
let origReplaceState: History["replaceState"];

export function usePathObserver() {
	const getPath = () => (typeof window !== "undefined" ? window.location.pathname : "");

	const [path, setPath] = useState(getPath);

	useEffect(() => {
		if (!isPatched && typeof window !== "undefined") {
			origPushState = window.history.pushState;
			origReplaceState = window.history.replaceState;

			["pushState", "replaceState"].forEach((type) => {
				(window.history as any)[type] = function (...args: any[]) {
					const rv = (type === "pushState" ? origPushState : origReplaceState).apply(
						this,
						args as any
					);
					window.dispatchEvent(new Event("locationchange"));
					return rv;
				};
			});
			isPatched = true;
		}

		const onChange = () => setPath(getPath());
		window.addEventListener("popstate", onChange);
		window.addEventListener("locationchange", onChange);

		return () => {
			window.removeEventListener("popstate", onChange);
			window.removeEventListener("locationchange", onChange);
		};
	}, []);

	return path;
}
