// src/components/Dialog/Dialog.types.ts

import React, { RefObject } from "react";
// Importar las variantes CVA si se definen en el archivo de variantes.
// Aunque no usemos props de variantes CVA directamente en las props del componente
// (como size, variant), los tipos de los estados de animación (DialogState)
// pueden depender de la estructura de las variantes si se definen allí.
// Asegúrate de que la ruta de importación sea correcta.

// Define los posibles estados de animación del diálogo
export type DialogState = "entering" | "entered" | "exiting" | "exited";

// Props para el componente Dialog
// Extiende HTMLAttributes para que el componente acepte props estándar de div,
// que se aplicarán al contenedor del portal.
export interface DialogProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "title"> {
	/**
	 * Controla si el diálogo está visible (abierto) o no (cerrado).
	 * Al cambiar este valor (típicamente desde un estado en el componente padre),
	 * se activan las animaciones de entrada o salida.
	 * @default false
	 */
	isOpen: boolean;

	/**
	 * Callback que se llama cuando se solicita cerrar el diálogo.
	 * Esto puede ocurrir al hacer clic en el overlay, presionar la tecla Escape,
	 * o hacer clic en el botón de cerrar (si `showCloseButton` es true).
	 * Es responsabilidad del componente padre usar este callback para actualizar
	 * la prop `isOpen` y así cerrar el diálogo.
	 */
	onClose: () => void;

	/**
	 * El contenido principal que se mostrará dentro del cuerpo del diálogo.
	 * Puede ser cualquier elemento o componente React.
	 */
	children: React.ReactNode;

	/**
	 * Opcional: Contenido para la sección del encabezado del diálogo.
	 * Típicamente se usa para un título o una descripción corta.
	 */
	title?: React.ReactNode;

	/**
	 * Opcional: Contenido para la sección del pie del diálogo.
	 * Se usa comúnmente para botones de acción (por ejemplo, "Aceptar", "Cancelar").
	 */
	footer?: React.ReactNode;

	/**
	 * Si es `true`, presionar la tecla 'Escape' cuando el diálogo está abierto
	 * activará la llamada a `onClose`.
	 * @default true
	 */
	closeOnEscape?: boolean;

	/**
	 * Si es `true`, se mostrará automáticamente un botón estándar de cerrar (una 'x')
	 * en la esquina superior derecha del encabezado del diálogo.
	 * @default true
	 */
	showCloseButton?: boolean;

	/**
	 * Opcional: Una referencia a un elemento HTML dentro del diálogo.
	 * Cuando el diálogo se abre completamente, intentará poner el foco en este elemento.
	 * Esto es importante para la accesibilidad, guiando al usuario al contenido interactivo inicial.
	 */
	initialFocusRef?: RefObject<HTMLElement>;

	// Opcional: Permite pasar clases CSS adicionales para estilizar partes específicas del diálogo
	/**
	 * Clase CSS adicional para el overlay (fondo oscuro).
	 */
	overlayClassName?: string;
	/**
	 * Clase CSS adicional para el panel principal del diálogo (la caja).
	 */
	panelClassName?: string;
	/**
	 * Clase CSS adicional para la sección del encabezado.
	 */
	headerClassName?: string;
	/**
	 * Clase CSS adicional para la sección del cuerpo (donde se muestra `children`).
	 */
	bodyClassName?: string;
	/**
	 * Clase CSS adicional para la sección del pie de página (donde se muestra `footer`).
	 */
	footerClassName?: string;
	/**
	 * Si es `true`, el diálogo se mostrará como un modal (con un overlay oscuro), y no dejará
	 * interactuar con el contenido por debajo del diálogo.
	 * @default false
	 */
	isModal?: boolean;

	/**
	 * Si es `true`, el dialogo se puede arrastrar
	 * @default false
	 */
	isDraggable?: boolean;
}
