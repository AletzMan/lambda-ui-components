import type { ThemeProviderProps } from "./types";

export const script = ({
	attribute,
	storageKey,
	defaultTheme,
	forcedTheme,
	themes = [],
	value = {},
	enableSystem,
	enableColorScheme,
	lightThemes = [],
	darkThemes = [],
}: ThemeProviderProps & { lightThemes?: string[]; darkThemes?: string[] }) => {
	const attributes = Array.isArray(attribute) ? attribute : [attribute];

	return `
(function() {
  var el = document.documentElement;

  function updateDOM(theme) {
    var attributes = ${JSON.stringify(attributes)};
    var themes = ${JSON.stringify(themes)};
    var value = ${JSON.stringify(value)};
    var enableColorScheme = ${enableColorScheme ? "true" : "false"};
    var lightThemes = ${JSON.stringify(lightThemes)};
    var darkThemes = ${JSON.stringify(darkThemes)};

    attributes.forEach(function(attr) {
      var isClass = attr === "class";
      if (isClass) {
        var classes = themes.map(function(t) { return value[t] || t; });
        el.classList.remove.apply(el.classList, classes);
        el.classList.add(value[theme] || theme);
      } else {
        el.setAttribute(attr, theme);
      }
    });

    if (enableColorScheme) {
      if (lightThemes.includes(theme)) {
        el.style.colorScheme = "light";
      } else if (darkThemes.includes(theme)) {
        el.style.colorScheme = "dark";
      }
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var forced = ${forcedTheme ? `"${forcedTheme}"` : "null"};

  if (forced) {
    updateDOM(forced);
    return;
  }

  try {
    var storageKey = "${storageKey}";
    var enableSystem = ${enableSystem ? "true" : "false"};
    var defaultTheme = "${defaultTheme}";
    var themeName = localStorage.getItem(storageKey) || defaultTheme;
    var theme = (enableSystem && themeName === "system") ? getSystemTheme() : themeName;
    updateDOM(theme);
  } catch (e) {}
})();
`;
};
