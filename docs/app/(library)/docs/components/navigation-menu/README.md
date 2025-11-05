# NavigationMenu

Componente de menú de navegación jerárquica para Lambda UI Components.

## Uso básico

El componente `NavigationMenu` requiere que le pases la ruta actual (`currentPath`) para resaltar el ítem activo. Esto asegura que la navegación sea reactiva y universal, compatible con cualquier framework o router.

---

## Ejemplo de uso según el framework

### **Next.js (App Router)**

```tsx
import { NavigationMenu } from "lambda-ui-components";
import { usePathname } from "next/navigation";

const pathname = usePathname();

<NavigationMenu data={navData} currentPath={pathname} />
```

---

### **React Router (Vite, CRA, Remix, etc.)**

```tsx
import { NavigationMenu } from "lambda-ui-components";
import { useLocation } from "react-router-dom";

const location = useLocation();

<NavigationMenu data={navData} currentPath={location.pathname} />
```

---

### **Vanilla React (sin router, multipágina)**

```tsx
import { NavigationMenu } from "lambda-ui-components";

<NavigationMenu data={navData} currentPath={window.location.pathname} />
```

---

### **SPA sin router (avanzado, opcional)**
Si tu app es una SPA sin router, puedes usar el hook `usePathObserver` que provee la librería:

```tsx
import { NavigationMenu, usePathObserver } from "lambda-ui-components";

const pathname = usePathObserver();

<NavigationMenu data={navData} currentPath={pathname} />
```

Este hook detecta cambios de URL hechos con `pushState`, `replaceState` y los botones del navegador.

---

## Props principales
- `data`: Arreglo de nodos de navegación.
- `currentPath`: Ruta actual (string). **Debe ser reactiva para navegación SPA.**

---

## Recomendaciones
- **Siempre usa el hook del router de tu framework** para máxima reactividad.
- Si usas Next.js, **no uses window.location.pathname**: usa `usePathname()`.
- Si usas React Router, usa `useLocation()`.
- Si usas vanilla, puedes usar `window.location.pathname` (solo reactivo en recarga).
- El hook `usePathObserver` es útil para SPAs sin router, pero no es necesario si ya usas Next.js o React Router.

---

Próximamente más detalles, ejemplos avanzados y customización.

