"use client";

import * as React from "react";
import { script as themeScript } from "./themeScript.ts";
import type { Attribute, ThemeProviderProps, UseThemeProps } from "./types.ts";

const systemToTheme = {
	dark: "dark",
	light: "light",
};

const MEDIA = "(prefers-color-scheme: dark)";
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = { setTheme: () => {}, themes: [] };

const lightThemes = ["light", "retro"];
const darkThemes = ["dark", "slate"];

const defaultThemes = ["light", "dark", "retro", "slate"];

// --- Utils ---
const saveToLS = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch {}
};

const getTheme = (key: string, fallback?: string) => {
	if (typeof window === "undefined") return fallback;
	try {
		return localStorage.getItem(key) || fallback;
	} catch {
		return fallback;
	}
};

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
	if (typeof window === "undefined") return "light"; // <-- FIX

	const m = e ?? window.matchMedia(MEDIA);
	return m.matches ? "dark" : "light";
};

const disableAnimation = (nonce?: string) => {
	if (typeof document === "undefined") return () => {}; // <-- FIX

	const css = document.createElement("style");
	if (nonce) css.setAttribute("nonce", nonce);
	css.appendChild(
		document.createTextNode(
			`*,*::before,*::after{
        transition:none!important;
        -webkit-transition:none!important;
      }`
		)
	);
	document.head.appendChild(css);

	return () => {
		void window.getComputedStyle(document.body);
		setTimeout(() => document.head.removeChild(css), 1);
	};
};

// --- Hook ---
export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext;

// --- Provider (NO nested providers) ---
export const ThemeProvider = (props: ThemeProviderProps) => {
	const ctx = React.useContext(ThemeContext);
	if (ctx) return <>{props.children}</>;
	return <Theme {...props} />;
};

// --- Main Theme Component ---
const Theme = ({
	forcedTheme,
	disableTransitionOnChange = false,
	enableSystem = true,
	enableColorScheme = true,
	storageKey = "theme",
	themes = defaultThemes,
	defaultTheme = enableSystem ? "system" : "dark",
	attribute = "data-theme",
	value,
	children,
	nonce,
	scriptProps,
}: ThemeProviderProps) => {
	const [theme, setThemeState] = React.useState(() => getTheme(storageKey, defaultTheme));

	const [resolvedTheme, setResolvedTheme] = React.useState(() =>
		theme === "system" ? systemToTheme[getSystemTheme()] : theme
	);

	const attrs = value ? Object.values(value) : themes;

	// --- Apply Theme ---
	const applyTheme = React.useCallback(
		(next: string) => {
			if (typeof document === "undefined") return; // <-- FIX

			if (!next) return;

			let resolved = next;

			if (next === "system" && enableSystem) {
				resolved = getSystemTheme();
			}

			const name = value ? value[resolved] : resolved;

			const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
			const html = document.documentElement; // seguro ahora

			const setAttr = (attr: Attribute) => {
				if (attr === "class") {
					html.classList.remove(...attrs);
					if (name) html.classList.add(name);
				} else if (attr.startsWith("data-")) {
					if (name) html.setAttribute(attr, name);
					else html.removeAttribute(attr);
				}
			};

			if (Array.isArray(attribute)) attribute.forEach(setAttr);
			else setAttr(attribute);

			if (enableColorScheme) {
				if (darkThemes.includes(resolved)) html.style.colorScheme = "dark";
				else if (lightThemes.includes(resolved)) html.style.colorScheme = "light";
			}

			enable?.();
		},
		[nonce, attribute, attrs, value, enableColorScheme]
	);

	// --- setTheme wrapper ---
	const setTheme = React.useCallback(
		(v: string | ((prev: string) => string)) => {
			if (typeof v === "function") {
				setThemeState((prev) => {
					const next = v(prev ?? defaultTheme);
					saveToLS(storageKey, next);
					return next;
				});
			} else {
				setThemeState(v);
				saveToLS(storageKey, v);
			}
		},
		[storageKey]
	);

	// --- System theme listener ---
	const handleMediaQuery = React.useCallback(
		(e: MediaQueryListEvent | MediaQueryList) => {
			const sys = systemToTheme[getSystemTheme(e)];
			setResolvedTheme(sys);

			if (theme === "system" && enableSystem && !forcedTheme) {
				applyTheme("system");
			}
		},
		[theme, forcedTheme, applyTheme, enableSystem]
	);

	React.useEffect(() => {
		if (typeof window === "undefined") return; // <-- FIX

		const media = window.matchMedia(MEDIA);
		media.addListener(handleMediaQuery);
		handleMediaQuery(media);

		return () => media.removeListener(handleMediaQuery);
	}, [handleMediaQuery]);

	// --- Sync localStorage changes across tabs ---
	React.useEffect(() => {
		if (typeof window === "undefined") return; // <-- FIX
		const handler = (e: StorageEvent) => {
			if (e.key !== storageKey) return;

			if (!e.newValue) {
				setTheme(defaultTheme);
			} else {
				setThemeState(e.newValue);
			}
		};

		window.addEventListener("storage", handler);
		return () => window.removeEventListener("storage", handler);
	}, [setTheme, defaultTheme, storageKey]);

	// --- Apply theme when theme changes ---
	React.useEffect(() => {
		applyTheme(forcedTheme ?? theme ?? defaultTheme);
	}, [forcedTheme, theme, applyTheme]);

	const ctxValue = React.useMemo(
		() => ({
			theme,
			setTheme,
			forcedTheme,
			themes: enableSystem ? [...themes, "system"] : themes,
			resolvedTheme: theme === "system" ? systemToTheme[getSystemTheme()] : theme,
			systemTheme: enableSystem ? resolvedTheme : undefined,
		}),
		[theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes]
	);

	return (
		<ThemeContext.Provider value={ctxValue as UseThemeProps}>
			<ThemeScript
				{...{
					forcedTheme,
					storageKey,
					attribute,
					enableSystem,
					enableColorScheme,
					defaultTheme,
					value,
					themes,
					nonce,
					scriptProps,
				}}
			/>
			{children}
		</ThemeContext.Provider>
	);
};

// --- Script to avoid flash (SSR safe) ---
export const ThemeScript = React.memo(
	({
		forcedTheme,
		storageKey,
		attribute,
		enableSystem,
		enableColorScheme,
		defaultTheme,
		value,
		themes,
		nonce,
		scriptProps,
	}: Omit<ThemeProviderProps, "children"> & { defaultTheme: string }) => {
		return (
			<script
				{...scriptProps}
				suppressHydrationWarning
				nonce={typeof window === "undefined" ? nonce : ""}
				dangerouslySetInnerHTML={{
					__html: themeScript({
						attribute,
						storageKey,
						defaultTheme,
						forcedTheme,
						themes,
						value,
						enableSystem,
						enableColorScheme,
					}),
				}}
			/>
		);
	}
);
