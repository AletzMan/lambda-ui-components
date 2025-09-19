import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import en from "./en-US.json";
import es from "./es-MX.json";
import fr from "./fr-FR.json";

const translations = { en, es, fr };

type Dictionary = typeof translations;

type LambdaRadiusBox = "tiny" | "small" | "medium" | "large" | "none" | null | undefined;

type LambdaRadiusField = "tiny" | "small" | "medium" | "large" | "full" | "none" | null | undefined;

type LambdaRadiusSelector =
	| "tiny"
	| "small"
	| "medium"
	| "large"
	| "full"
	| "none"
	| null
	| undefined;

//
// Contexto para traducciones
//
interface TranslationContextProps {
	lang: keyof Dictionary;
	t: (key: string, vars?: Record<string, any>) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const useTranslation = () => {
	const ctx = useContext(TranslationContext);
	if (!ctx) throw new Error("useTranslation must be used within TranslationProvider");
	return ctx;
};

//
// Contexto para UI config
//
interface UIConfigContextProps {
	/**
	 * Define the radius(tiny, small, medium, large, none) of components that have a radius.
	 * Apply to components (Card, Modal, Drawer, Alert, Notification,  etc).
	 * @default "small"
	 */
	radiusBox?: LambdaRadiusBox;
	/**
	 * Define the radius(tiny, small, medium, large, full, none) of components that have a radius.
	 * Apply to components (Button, Input, InputNumber, Select, Tab, Pagination, etc).
	 * @default "tiny"
	 */
	radiusField?: LambdaRadiusField;
	/**
	 * Define the radius(tiny, small, medium, large, full, none) of components that have a radius.
	 * Apply to components (  Switch, Checkbox, Range, Tag, Badge, Breadcrumb  etc).
	 * @default "small"
	 */
	radiusSelector?: LambdaRadiusSelector;
}

const UIConfigContext = createContext<UIConfigContextProps | undefined>(undefined);

export const useUIConfig = () => {
	const ctx = useContext(UIConfigContext);
	if (!ctx) throw new Error("useUIConfig must be used within UIConfigProvider");
	return ctx;
};

//
// Providers combinados
//
interface ConfigProviderProps extends UIConfigContextProps {
	lang: keyof Dictionary;
}

export const LambdaConfigProvider: FC<PropsWithChildren<ConfigProviderProps>> = ({
	children,
	lang,
	radiusBox = "small",
	radiusField = "tiny",
	radiusSelector = "small",
}) => {
	const dict = translations[lang];

	// 🔹 t memoizado: se recrea solo cuando cambia lang
	const t = useCallback(
		(key: string, vars: Record<string, any> = {}) => {
			const keys = key.split(".");
			let value: any = dict;
			for (const k of keys) {
				value = value?.[k];
			}
			if (!value) return key;

			return value.replace(/{{(\w+)}}/g, (_: any, v: any) => vars[v] ?? "");
		},
		[dict]
	);

	// Valores memoizados para no re-renderizar innecesariamente
	const translationValue = useMemo(() => ({ lang, t }), [lang, t]);
	const uiConfigValue = useMemo(
		() => ({ radiusField, radiusBox, radiusSelector }),
		[radiusField, radiusBox, radiusSelector]
	);

	return (
		<TranslationContext.Provider value={translationValue}>
			<UIConfigContext.Provider value={uiConfigValue}>{children}</UIConfigContext.Provider>
		</TranslationContext.Provider>
	);
};
