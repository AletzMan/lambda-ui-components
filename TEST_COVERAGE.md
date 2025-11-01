# Cobertura de Tests de Componentes Críticos

Este documento resume el estado de los tests unitarios y de integración para los componentes más críticos de la librería `lambda-ui-components`.

## ¿Por qué es importante?
Tener tests para los componentes críticos garantiza:
- Mejor experiencia de usuario (UX)
- Accesibilidad y cumplimiento de buenas prácticas
- Menor probabilidad de bugs en producción
- Refactors y mejoras seguras

---

## Componentes Críticos a Testear

### 1. **Form Controls**
- **Input** ✅
- **InputNumber** ✅
- **TextArea** ✅
- **Select** ✅
- **Checkbox** ⬜
- **Radio** ⬜
- **Switch** ⬜
> Son la base de cualquier formulario. Errores aquí afectan UX y accesibilidad.

### 2. **Botones y acciones**
- **Button** ✅
- **ButtonTheme** ⬜
> Son el principal disparador de acciones. Deben responder bien a clicks, loading, disabled, variantes.

### 3. **Feedback y mensajes**
- **Alert** ✅
- **Skeleton** ✅
- **Progress** ⬜
- **Tooltip** ⬜
> Informan al usuario sobre el estado de la app o de operaciones. Su visibilidad y accesibilidad es clave.

### 4. **Navegación y Layout**
- **Accordion** ✅
- **Tabs** ⬜
- **Pagination** ⬜
- **Stepper** ⬜
- **Carousel** ⬜
> Manejan interacción y organización de contenido. Errores pueden bloquear navegación o romper flujos.

### 5. **Componentes con lógica visual compleja**
- **Card** ⬜
- **Modal/Dialog** ⬜
- **Drawer** ⬜
- **Dropdown** ⬜
- **Popover** ⬜
> Manejan overlays, focus, stacking, etc. Difíciles de testear manualmente.

---

## Leyenda
- ✅ Test cubierto
- ⬜ Test pendiente

---

## ¿Vale la pena subir esto al repo?
¡Sí! Un README o documento de cobertura de tests es **muy valioso** porque:
- Ayuda a nuevos contribuidores a identificar prioridades.
- Permite visualizar el progreso y planificar mejoras.
- Es útil para revisiones de código y auditorías de calidad.
- Motiva a mantener y aumentar la cobertura.

Puedes agregarlo como `TEST_COVERAGE.md` o una sección en tu `README.md` principal.
