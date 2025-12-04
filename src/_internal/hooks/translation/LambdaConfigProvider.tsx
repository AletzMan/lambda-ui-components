import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import en from "./en-US.json";
import es from "./es-MX.json";
import fr from "./fr-FR.json";

const translations = { en, es, fr };

type Dictionary = typeof translations;
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
// Providers combinados
//
interface ConfigProviderProps {
	lang: keyof Dictionary;
}

export const LambdaConfigProvider: FC<PropsWithChildren<ConfigProviderProps>> = ({
	children,
	lang,
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

	return (
		<TranslationContext.Provider value={translationValue}>{children}</TranslationContext.Provider>
	);
};
