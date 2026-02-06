# Lambda UI Components

[![npm version](https://img.shields.io/npm/v/lambda-ui-components.svg)](https://www.npmjs.com/package/lambda-ui-components)
[![license](https://img.shields.io/npm/l/lambda-ui-components.svg)](LICENSE)
[![downloads](https://img.shields.io/npm/dm/lambda-ui-components.svg)](https://www.npmjs.com/package/lambda-ui-components)
[![GitHub Repo stars](https://img.shields.io/github/stars/AletzMan/lambda-ui-components?style=social)](https://github.com/AletzMan/lambda-ui-components)
[![React 18+](https://img.shields.io/badge/react-18%2B-blue.svg)](https://react.dev/)
[![Build Status](https://github.com/AletzMan/lambda-ui-components/actions/workflows/main.yml/badge.svg)](https://github.com/AletzMan/lambda-ui-components/actions)

**Lambda UI Components** is a modern, accessible, and flexible React component library designed to help you build beautiful, consistent, and scalable user interfaces with ease. Every component is crafted with precision and attention to detail.

## ✨ Features

- **Accessible by default:** Components follow WAI-ARIA guidelines and are keyboard-friendly.
- **Modern design:** Built-in dark mode, theming, and responsive layouts.
- **Developer experience:** TypeScript-first, clear props, and Storybook demos.
- **Flexible & composable:** Extend, override, or compose components as you need.

## 🚀 Installation

Lambda UI Components is published as an npm package. You can install it using your favorite package manager:

```bash
pnpm add lambda-ui-components
# or
npm install lambda-ui-components
# or
yarn add lambda-ui-components
```

> **Tip:** For best results, use `pnpm` or `yarn` in monorepo setups.

## ⚡ Peer Dependencies

Lambda UI Components requires **React 18+** and **ReactDOM** as peer dependencies. Make sure they are installed in your project.

```bash
pnpm add react react-dom
```

For syntax highlighting in `CodeBlock`, install `prismjs`:

```bash
pnpm add prismjs
```

## 🎨 Importing CSS

Import the Lambda UI CSS in your main entry file (usually `src/index.tsx` or `_app.tsx` in Next.js):

```tsx
import "lambda-ui-components/dist/main.css";
```

This ensures all components are styled correctly out of the box.

## 🛠️ Theme & Configuration Providers

For advanced theming, localization, and consistent UI configuration, wrap your app with `LambdaConfigProvider` and `ThemeProvider` at the root of your component tree:

```tsx
import { LambdaConfigProvider, ThemeProvider } from "lambda-ui-components";

export default function App({ children }) {
  return (
    <LambdaConfigProvider lang="en">
      <ThemeProvider defaultTheme="dark">
        {children}
      </ThemeProvider>
    </LambdaConfigProvider>
  );
}
```

## 📦 Basic Usage

Import and use components in your React app:

```tsx
import { Button, Card } from "lambda-ui-components";

export default function Example() {
  return (
    <Card>
      <Button color="primary">Hello Lambda UI</Button>
    </Card>
  );
}
```

All components are fully typed and support both controlled and uncontrolled usage patterns.

### Next.js & RSC

If you use **Next.js App Router**, add `"use client"` at the top of your page or component file whenever you use interactive components:

```tsx
"use client";
import { Button } from "lambda-ui-components";
// ...
```

This is only necessary in Next.js App Router. In Vite, Astro, Remix, or CRA, you do **not** need this directive.

## 🧩 Components Included

Lambda UI offers a comprehensive set of UI primitives and advanced components, including:

- Button
- Input & TextArea
- Select & Dropdown
- Checkbox & Radio
- Switch
- Dialog & Drawer
- Notification
- Table & Pagination
- Card
- Tabs
- Slider
- Avatar
- Progress
- Skeleton
- And many more…

## 🎨 Theming & Customization

- **CSS Variables:** Lambda UI Components uses CSS variables for theming. You can globally override the theme by changing variables in your CSS or using `data-theme` for dark mode and custom themes.
- **Unstyled Prop:** To customize the style of specific components, many support the `unstyled` prop, which removes default styles so you can apply your own.

## 📅 Latest Updates (v1.0.2)

- **Button:** New `darkened` variant.
- **Avatar:** Dynamic border colors.
- **Theme:** Dark mode color improvements.
- **Fixes:** DatePicker modal stability.

## 🤝 Contribution

- Fork the repo and create a PR with your improvement or bugfix.
- Follow the component and style conventions.

---

## 📝 License

This project is licensed under the MIT License. You can freely use it in personal and commercial projects. See the LICENSE file for more details.

Developed by [BitCoder__](https://alejandro-garcia.dev)
