import React, { HTMLAttributes, RefObject } from "react";
import { DrawerVariants } from "./drawer.variants";

export type DrawerPlacement = DrawerVariants["placement"];
export type DrawerWidth = DrawerVariants["width"];
export type DrawerState = DrawerVariants["state"];

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
	/**
	 * Controla si el drawer está abierto o cerrado.
	 * Al cambiar este valor (típicamente desde un estado en el componente padre),
	 * se activan las animaciones de entrada o salida.
	 * @default false
	 */
	isOpen: boolean;

	/**
	 * Callback que se llama cuando se solicita cerrar el drawer.
	 * Esto puede ocurrir al hacer clic en el overlay, presionar la tecla Escape,
	 * o hacer clic en el botón de cerrar (si `showCloseButton` es true).
	 * Es responsabilidad del componente padre usar este callback para actualizar
	 * la prop `isOpen` y así cerrar el drawer.
	 */
	onClose: () => void;

	/**
	 * El contenido principal que se mostrará dentro del cuerpo del drawer.
	 * Puede ser cualquier elemento o componente React.
	 */
	children: React.ReactNode;

	/**
	 * Opcional: Contenido para la sección del encabezado del drawer.
	 * Típicamente se usa para un título o una descripción corta.
	 */
	title?: React.ReactNode;

	/**
	 * Define el tipo de backdrop que se mostrará detrás del drawer.
	 * Puede ser 'dark' (fondo oscuro), 'blur' (fondo con desenfoque), o 'transparent' (fondo transparente).
	 * @default 'dark'
	 */
	backdropType?: DrawerVariants["backdropType"];

	/**
	 * Opcional: Contenido para la sección del pie del drawer.
	 * Se usa comúnmente para botones de acción (por ejemplo, "Aceptar", "Cancelar").
	 */
	footer?: React.ReactNode;

	/**
	 * Define desde qué borde de la pantalla se abre el drawer.
	 * Requerido.
	 */
	placement: DrawerVariants["placement"];

	/**
	 * Define el ancho del drawer.
	 * Solo aplica para placement en: 'right' y 'left'
	 */
	width?: DrawerVariants["width"];

	/**
	 * Opcional: Define el tamaño del drawer (ancho para 'left'/'right', alto para 'top'/'bottom').
	 * @default '300px' para left/right, '25vh' para top/bottom (ejemplos definidos en CSS)
	 */
	size?: string;

	/**
	 * Si es `true`, hacer clic en el área oscura (overlay) fuera del panel del drawer
	 * activará la llamada a `onClose`.
	 * @default true
	 */
	closeOnOverlayClick?: boolean;

	/**
	 * Si es `true`, presionar la tecla 'Escape' cuando el drawer está abierto
	 * activará la llamada a `onClose`.
	 * @default true
	 */
	closeOnEscape?: boolean;

	/**
	 * Si es `true`, se mostrará automáticamente un botón estándar de cerrar (una 'x')
	 * en la esquina superior derecha del encabezado del drawer.
	 * @default true
	 */
	showCloseButton?: boolean;

	/**
	 * Opcional: Una referencia a un elemento HTML dentro del drawer.
	 * Cuando el drawer se abre completamente, intentará poner el foco en este elemento.
	 * Esto es importante para la accesibilidad, guiando al usuario al contenido interactivo inicial.
	 */
	initialFocusRef?: RefObject<HTMLElement>;

	// Opcional: Permite pasar clases CSS adicionales para estilizar partes específicas del drawer
	/**
	 * Clase CSS adicional para el overlay (fondo oscuro).
	 */
	overlayClassName?: string;
	/**
	 * Clase CSS adicional para el panel principal del drawer (la caja que desliza).
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
}
