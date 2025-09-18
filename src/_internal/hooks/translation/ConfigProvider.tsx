import { createContext, ReactNode, useContext } from "react";
import en from "./en-US.json";
import es from "./es-MX.json";
import fr from "./fr-FR.json";

const translations = { en, es, fr };

type LambdaRadiusField = "tiny" | "small" | "medium" | "large" | "full" | "none" | null | undefined;

type LambdaRadiusBox = "tiny" | "small" | "medium" | "large" | "none" | null | undefined;

const ConfigContext = createContext({
	lang: "en",
	radiusField: "tiny" as LambdaRadiusField,
	radiusBox: "tiny" as LambdaRadiusBox,
	t: (key: string, vars?: Record<string, any>) => key,
});

export const ConfigProvider = ({
	lang,
	radiusField,
	radiusBox,
	children,
}: {
	lang: string;
	radiusField?: LambdaRadiusField;
	radiusBox?: LambdaRadiusBox;
	children: ReactNode;
}) => {
	const dict = translations[lang as keyof typeof translations] || translations.en;

	const t = (key: string, vars: Record<string, any> = {}) => {
		const keys = key.split(".");
		let value: any = dict;
		for (const k of keys) {
			value = value?.[k];
		}
		if (!value) return key;

		// reemplazar variables {{variable}}
		return value.replace(/{{(\w+)}}/g, (_: any, v: any) => vars[v] ?? "");
	};

	return (
		<ConfigContext.Provider
			value={{ lang, t, radiusField: radiusField || "tiny", radiusBox: radiusBox || "tiny" }}
		>
			{children}
		</ConfigContext.Provider>
	);
};

export const useConfig = () => useContext(ConfigContext);
