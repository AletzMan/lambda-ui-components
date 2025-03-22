import React, { useEffect } from "react";
import { ThemeProvider } from "../src/Theme/Theme";
import '../src/index.css';
import '@fontsource-variable/jost';

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Modo de color",
    defaultValue: "dark",
    toolbar: {
      icon: "mirror",
      items: ["light", "dark"],
      showName: true,
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#141618" : "#F3F3F3";
    const element = document.getElementById("storybook-docs")?.children[0] as HTMLElement;
    if (element) {
      element.style.backgroundColor = "transparent";
    }
  }, [theme]);

  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
