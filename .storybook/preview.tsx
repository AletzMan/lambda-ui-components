/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { ThemeProvider } from "../src/Theme/Theme";
import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"
import '../src/index.css';
import '@fontsource-variable/jost';
/*
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

*/




const ThemeDecorator = (Story, context) => {
  const theme = context.globals.theme;


  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#141618" : "#F3F3F3";
    const element = document.getElementById("storybook-docs")?.children[0] as HTMLElement;
    const container = document.querySelector(".docs-story") as HTMLElement;
    if (element) {
      element.style.backgroundColor = "transparent"
    }
    if (container) {
      container.style.backgroundColor = theme === "dark" ? "#141618" : "#F3F3F3";
    }
  }, [theme]);

  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: "light",
      themes: {
        light: "light",
        dark: "dark",
      },
    }),
    ThemeDecorator, // Aquí pasas el componente directamente
  ],
};

export default preview;