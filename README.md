# Lambda UI Components

[![npm version](https://img.shields.io/npm/v/lambda-ui-components.svg)](https://www.npmjs.com/package/lambda-ui-components)
[![license](https://img.shields.io/npm/l/lambda-ui-components.svg)](LICENSE)
[![downloads](https://img.shields.io/npm/dm/lambda-ui-components.svg)](https://www.npmjs.com/package/lambda-ui-components)
[![GitHub Repo stars](https://img.shields.io/github/stars/AletzMan/lambda-ui-components?style=social)](https://github.com/AletzMan/lambda-ui-components)
[![React 18+](https://img.shields.io/badge/react-18%2B-blue.svg)](https://react.dev/)
[![Build Status](https://github.com/AletzMan/lambda-ui-components/actions/workflows/main.yml/badge.svg)](https://github.com/AletzMan/lambda-ui-components/actions)

Component library for React built with TypeScript, Framer Motion, and Vite. Includes a modern, themeable, and accessible set of UI primitives for rapid product development.

## ✨ Características

- Componentes accesibles, tipados y listos para producción
- Soporte para dark mode y personalización por CSS variables
- Animaciones fluidas con Framer Motion
- Fácil integración con React 18+
- Incluye Skeleton, Button, Card, Input, Table, Modal, y más

## 🚀 Instalación

```sh
pnpm add lambda-ui-components
# o
npm install lambda-ui-components
```

> **Nota:** Debes tener React 18+ y ReactDOM como peerDependencies en tu proyecto.

## 🎨 Estilos globales recomendados

Para que los componentes de `lambda-ui-components` funcionen correctamente y evitar flashes de color al usar dark mode, agrega este snippet a tu CSS global (por ejemplo, en `globals.css` o el archivo global de tu proyecto):

```css
body {
	background-color: var(--background-color);
}
```

Si quieres máxima compatibilidad con dark/light mode y variables:

```css
html,
body {
	background: #09090b;
	color-scheme: dark;
}
html.light,
body.light {
	background: #fff !important;
	color-scheme: light;
}
```

> **Nota:**  
> No forzamos estos estilos desde la librería para no interferir con el diseño de tu app.  
> Si usas un ThemeProvider, asegúrate de que sincroniza la clase `dark`/`light` en `<html>`.

## 📦 Uso Básico

1. **Importa los estilos globales una vez en tu entrypoint:**
   ```js
   import "lambda-ui-components/dist/index.css";
   ```
2. **Importa componentes individuales:**
   ```jsx
   import { Skeleton, Button, Card } from "lambda-ui-components";
   ```

### Ejemplo de uso

```jsx
import "lambda-ui-components/dist/index.css";
import { Skeleton, Button, Card } from "lambda-ui-components";

function Demo() {
	return (
		<Card style={{ width: 320 }}>
			<Skeleton width={80} height={16} animationType="wave" />
			<Button variant="primary">Acción</Button>
		</Card>
	);
}
```

## 🧩 Componentes incluidos

- Accordion
- Alert
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Carousel
- Checkbox
- CodeBlock
- ColorPicker
- DatePicker
- Dialog
- Divider
- Drawer
- Dropdown
- FileUpload
- Flex
- Input
- InputNumber
- Join
- Link
- NavigationMenu
- Notification
- Pagination
- Progress
- Radio/RadioGroup
- Rating
- Select
- Skeleton
- Slider
- Splitter
- Stepper
- Switch
- Tab
- Table
- Tag
- TextArea
- Tooltip
- TreeView

## 🎨 Temas y Personalización

- Usa CSS variables para sobrescribir colores y estilos globales.
- Soporte nativo para dark mode (`[data-theme="dark"]` y `[data-theme="light"]`).

## ⚡ Peer Dependencies

- `react` >= 18
- `react-dom` >= 18
- (Opcional) `prismjs` para CodeBlock

## 🤝 Contribuir

- Haz un fork y un PR con tu mejora o bugfix.
- Sigue la convención de componentes y estilos.

---

¡Disfruta construyendo con Lambda UI Components!

## 📝 Licencia

Este proyecto está licenciado bajo la licencia MIT. Puedes usarlo libremente en proyectos personales y comerciales. Consulta el archivo LICENSE para más detalles.

Desarrollado por [BitCoder\_\_](https://alejandro-garcia.dev)
