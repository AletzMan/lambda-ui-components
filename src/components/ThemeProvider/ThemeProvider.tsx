"use client";

import * as React from "react";
import { script as themeScript } from "./themeScript.ts";
import type {
	AllThemes,
	Attribute,
	DarkTheme,
	LightTheme,
	ThemeProviderProps,
	UseThemeProps,
} from "./types.ts";

const systemToTheme = {
	dark: "dark",
	light: "light",
};

const MEDIA = "(prefers-color-scheme: dark)";
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = {
	setTheme: () => { },
	themes: [],
	lightTheme: "light",
	darkTheme: "dark",
};

const lightThemes: LightTheme[] = ["light", "retro", "lavender", "mint", "sunset", "ocean", "sandstone", "pop-art"];
const darkThemes: DarkTheme[] = [
	"dark",
	"slate",
	"deep-cosmic-night",
	"soft-obsidian",
	"graphite",
	"midnight",
	"aurora-night",
	"electro-violet",
];

const defaultThemes: AllThemes[] = [...lightThemes, ...darkThemes];

// --- Utils ---
const saveToLS = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch { }
};

const getTheme = (key: string, fallback: AllThemes): AllThemes => {
	if (typeof window === "undefined") return fallback;
	try {
		return (localStorage.getItem(key) as AllThemes) || fallback;
	} catch {
		return fallback;
	}
};

const getSystemTheme = (
	e?: MediaQueryList | MediaQueryListEvent,
	darkTheme?: DarkTheme,
	lightTheme?: LightTheme
): "dark" | "light" => {
	if (typeof window === "undefined") return "light"; // <-- FIX

	const m = e ?? window.matchMedia(MEDIA);
	let theme: "dark" | "light" = "light";
	if (m.matches) {
		if (darkTheme) theme = "dark";
	} else {
		if (lightTheme) theme = "light";
	}
	return theme;
};

const disableAnimation = (nonce?: string) => {
	if (typeof document === "undefined") return () => { }; // <-- FIX

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
	enableColorScheme = false,
	storageKey = "theme",
	themes = defaultThemes,
	defaultTheme = enableSystem ? "system" : "dark",
	attribute = "data-theme",
	value,
	children,
	nonce,
	scriptProps,
	lightTheme,
	darkTheme,
}: ThemeProviderProps) => {
	const [theme, setThemeState] = React.useState<AllThemes>(() =>
		getTheme(storageKey, defaultTheme)
	);

	const [resolvedTheme, setResolvedTheme] = React.useState(() =>
		theme === "system" ? systemToTheme[getSystemTheme()] : theme
	);

	const attrs = value ? Object.values(value) : themes;

	// --- Apply Theme ---
	const applyTheme = React.useCallback(
		(next: AllThemes) => {
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
				if (darkThemes.includes(resolved as DarkTheme)) html.style.colorScheme = "dark";
				else if (lightThemes.includes(resolved as LightTheme)) html.style.colorScheme = "light";
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
					const next: AllThemes = v(prev ?? defaultTheme) as AllThemes;
					saveToLS(storageKey, next);
					return next;
				});
			} else {
				setThemeState(v as AllThemes);
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
				setThemeState(e.newValue as AllThemes);
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
			lightTheme,
			darkTheme,
			themes: enableSystem ? [...themes, "system"] : themes,
			resolvedTheme:
				theme === "system"
					? systemToTheme[getSystemTheme(undefined, darkTheme, lightTheme)]
					: theme,
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
					lightThemes,
					darkThemes,
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
		lightThemes,
		darkThemes,
	}: Omit<ThemeProviderProps, "children"> & {
		defaultTheme: string;
		lightThemes?: string[];
		darkThemes?: string[];
	}) => {
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
						lightThemes,
						darkThemes,
					}),
				}}
			/>
		);
	}
);
