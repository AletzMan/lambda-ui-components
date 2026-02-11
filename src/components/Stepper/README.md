# Stepper Component

El componente Stepper permite crear flujos de pasos secuenciales con validación personalizada.

## Características

- ✅ Orientación horizontal y vertical
- ✅ Validación personalizada por paso
- ✅ Validación asíncrona (soporte para llamadas a API)
- ✅ Mensajes de error personalizados
- ✅ Iconos personalizados
- ✅ Múltiples variantes visuales
- ✅ Patrón de composición con children (React idiomático)

## Uso Básico

```tsx
import { Stepper } from '@lambda-ui/components';

function MyForm() {
  return (
    <Stepper orientation="horizontal" variant="bordered">
      {/* Definir los pasos */}
      <Stepper.Step title="Paso 1" description="Descripción del paso 1" index={0} />
      <Stepper.Step title="Paso 2" description="Descripción del paso 2" index={1} />
      <Stepper.Step title="Paso 3" description="Descripción del paso 3" index={2} />
      
      {/* Contenido de cada paso */}
      <Stepper.Content>
        {/* Contenido del paso 1 */}
        <div>Formulario paso 1</div>
      </Stepper.Content>
      
      <Stepper.Content>
        {/* Contenido del paso 2 */}
        <div>Formulario paso 2</div>
      </Stepper.Content>
      
      <Stepper.Content>
        {/* Contenido del paso 3 */}
        <div>Formulario paso 3</div>
      </Stepper.Content>
      
      {/* Contenido cuando se completan todos los pasos */}
      <Stepper.CompletedContent>
        <div>¡Proceso completado! 🎉</div>
      </Stepper.CompletedContent>
    </Stepper>
  );
}
```

## Validación Personalizada con `onStepValidate`

La nueva funcionalidad `onStepValidate` permite ejecutar lógica de validación personalizada **antes** de avanzar al siguiente paso. Esta función se ejecuta cuando el usuario presiona el botón "Next".

### Características de la Validación

- ✅ **Síncrona o Asíncrona**: Soporta validaciones síncronas y asíncronas (ej: llamadas a API)
- ✅ **Mensajes personalizados**: Puedes definir mensajes de error específicos para cada caso
- ✅ **Bloqueo de avance**: Si la validación falla, el usuario no puede avanzar al siguiente paso
- ✅ **Feedback visual**: Muestra automáticamente el mensaje de error al usuario

### Ejemplo de Uso

```tsx
import { Stepper, StepValidationResult } from '@lambda-ui/components';
import { useState } from 'react';

function FormWithValidation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Función de validación personalizada
  const handleValidation = async (stepIndex: number): Promise<StepValidationResult> => {
    // Simular validación asíncrona (ej: verificar email en servidor)
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (stepIndex) {
      case 0:
        // Validar nombre
        if (formData.name.trim() === '') {
          return {
            isValid: false,
            errorMessage: 'El nombre es requerido para continuar',
          };
        }
        if (formData.name.length < 3) {
          return {
            isValid: false,
            errorMessage: 'El nombre debe tener al menos 3 caracteres',
          };
        }
        return { isValid: true };

      case 1:
        // Validar email
        if (formData.email.trim() === '') {
          return {
            isValid: false,
            errorMessage: 'El email es requerido',
          };
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          return {
            isValid: false,
            errorMessage: 'El email no es válido',
          };
        }
        return { isValid: true };

      case 2:
        // Validar teléfono
        if (formData.phone.trim() === '') {
          return {
            isValid: false,
            errorMessage: 'El teléfono es requerido',
          };
        }
        return { isValid: true };

      default:
        return { isValid: true };
    }
  };

  return (
    <Stepper
      orientation="horizontal"
      variant="bordered"
      onStepValidate={handleValidation} // ← Callback de validación
    >
      <Stepper.Step title="Nombre" description="Información personal" index={0} />
      <Stepper.Step title="Email" description="Contacto" index={1} />
      <Stepper.Step title="Teléfono" description="Verificación" index={2} />
      
      <Stepper.Content>
        {/* Formulario de nombre */}
      </Stepper.Content>
      <Stepper.Content>
        {/* Formulario de email */}
      </Stepper.Content>
      <Stepper.Content>
        {/* Formulario de teléfono */}
      </Stepper.Content>
      
      <Stepper.CompletedContent>
        <div>¡Registro completado!</div>
      </Stepper.CompletedContent>
    </Stepper>
  );
}
```

### Interfaz `StepValidationResult`

```typescript
interface StepValidationResult {
  /** Indica si el paso es válido */
  isValid: boolean;
  /** Mensaje de error opcional si la validación falla */
  errorMessage?: string;
}
```

### Flujo de Validación

1. El usuario presiona el botón "Next"
2. Se ejecuta `onStepValidate(currentStepIndex)`
3. Si `isValid === false`:
   - Se muestra el `errorMessage` al usuario
   - El paso se marca con estado de error (ícono X rojo)
   - **El usuario NO puede avanzar** (se ejecuta `return` y no se llama a `handleStepClick`)
   - El mensaje de error se muestra durante 2.75 segundos
4. Si `isValid === true`:
   - Se avanza al siguiente paso
   - Se limpian los errores de este paso
   - El paso se marca como completado (ícono ✓ verde)

### ⚠️ Comportamiento de Bloqueo

**IMPORTANTE**: Cuando la validación falla (`isValid: false`), el componente **BLOQUEA** el avance al siguiente paso mediante:

1. **`return` statement**: Detiene la ejecución de `handleNext()` antes de llamar a `handleStepClick()`
2. **Estado de error**: Marca el paso con error visual (ícono X rojo)
3. **Mensaje temporal**: Muestra el error durante 2.75 segundos

```tsx
// Ejemplo: El usuario NO podrá avanzar si el nombre está vacío
const handleValidation = async (stepIndex: number) => {
  if (stepIndex === 0 && formData.name === '') {
    return {
      isValid: false,  // ← Esto BLOQUEA el avance
      errorMessage: 'El nombre es requerido'
    };
  }
  
  return { isValid: true };  // ← Esto PERMITE el avance
};
```

### 🧪 Cómo Probar

Para verificar que el bloqueo funciona correctamente:

1. Abre el ejemplo `WithCustomValidation` en Storybook
2. **NO** llenes el campo "Nombre"
3. Presiona el botón "Next"
4. **Resultado esperado**:
   -❌ El stepper NO avanza al paso 2
   -❌ Se muestra el mensaje "El nombre es requerido para continuar"
   -❌ El paso 1 muestra un ícono X rojo
5. Ahora llena el campo "Nombre" con al menos 3 caracteres
6. Presiona el botón "Next"
7. **Resultado esperado**:
   -✅ El stepper avanza al paso 2
   -✅ El paso 1 muestra un ícono ✓ verde
   -✅ No se muestra ningún mensaje de error


### Validación Asíncrona

La función `onStepValidate` soporta validaciones asíncronas, perfectas para:

- Verificar datos en un servidor
- Validar unicidad de emails/usernames
- Consultar APIs externas
- Procesar archivos

```tsx
const handleValidation = async (stepIndex: number) => {
  if (stepIndex === 0) {
    // Verificar si el email ya existe en el servidor
    const response = await fetch(`/api/check-email?email=${formData.email}`);
    const { exists } = await response.json();
    
    if (exists) {
      return {
        isValid: false,
        errorMessage: 'Este email ya está registrado',
      };
    }
  }
  
  return { isValid: true };
};
```

## Props

### StepperProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `defaultActiveStep` | `number` | `0` | Índice del paso activo por defecto (0-indexed) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientación del stepper |
| `variant` | `'soft' \| 'bordered'` | `'bordered'` | Variante visual del stepper |
| `onStepCompleted` | `(stepIndex: number) => void` | - | Callback ejecutado cuando se completa un paso |
| `onStepValidate` | `(stepIndex: number) => StepValidationResult \| Promise<StepValidationResult>` | - | Callback de validación antes de avanzar al siguiente paso |
| `className` | `string` | - | Clases CSS adicionales |
| `style` | `CSSProperties` | - | Estilos inline |
| `children` | `ReactNode` | - | Elementos hijos (Stepper.Step, Stepper.Content, Stepper.CompletedContent) |

## Ejemplos

Consulta el archivo `stepper.stories.tsx` para ver ejemplos completos de:

- Stepper horizontal básico
- Stepper vertical
- Stepper con validación (método antiguo)
- **Stepper con validación personalizada** (`WithCustomValidation`) - Nuevo ejemplo usando `onStepValidate`
- Stepper con iconos personalizados
