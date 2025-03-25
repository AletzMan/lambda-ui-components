/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { ThemeProvider } from "../src/ThemeProvider/ThemeProvider";
import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"
import '../src/index.css';
import '@fontsource/metropolis';


const ThemeDecorator = (Story, context) => {
  const theme = context.globals.theme || "dark";


  useEffect(() => {
    document.body.setAttribute("data-theme", theme || "dark");
    console.log("THEME: ", theme)
    console.log("CONTEXT: ", context)
    document.body.style.backgroundColor = "var(--surface-a)";
    const element = document.getElementById("storybook-docs")?.children[0] as HTMLElement;
    const container = document.querySelector(".docs-story") as HTMLElement;
    if (element) {
      element.style.backgroundColor = "transparent"
    }
    if (container) {
      container.style.backgroundColor = "var(--surface-b)";
    }


  }, [theme, Story, context]);

  return (
    <ThemeProvider defaultTheme={theme}>
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
      defaultTheme: "dark",
      themes: {
        light: "light",
        dark: "dark",
      },
    }),
    ThemeDecorator, // Aquí pasas el componente directamente
  ],
};

export default preview;