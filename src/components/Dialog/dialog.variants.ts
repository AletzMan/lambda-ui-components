// src/components/Dialog/Dialog.variants.ts

import { cva } from "class-variance-authority";
import styles from "./Dialog.module.css"; // Asegúrate de la ruta correcta

// Variantes para el Overlay (fondo oscuro detrás del diálogo)
export const dialogOverlayVariants = cva(styles["lambda-dialog-overlay"], {
	variants: {
		// La variante 'state' se usa para controlar la animación y visibilidad vía CSS
		state: {
			entering: styles["lambda-dialog-overlay-entering"], // Estado inicial de la animación de entrada
			entered: styles["lambda-dialog-overlay-entered"], // Estado final de la animación de entrada (diálogo completamente visible)
			exiting: styles["lambda-dialog-overlay-exiting"], // Estado inicial de la animación de salida
			exited: styles["lambda-dialog-overlay-exited"], // Estado final de la animación de salida (diálogo completamente oculto)
		},
		isModal: {
			true: styles["lambda-dialog-overlay-modal"],
			false: styles["lambda-dialog-overlay"],
		},
	},
	defaultVariants: {
		state: "exited", // Por defecto, el overlay está en estado de salido (oculto)
		isModal: false,
	},
});

// Variantes para el Panel del Diálogo (la caja principal que contiene el contenido)
export const dialogPanelVariants = cva(styles["lambda-dialog-panel"], {
	variants: {
		// La variante 'state' se usa para controlar la animación y visibilidad vía CSS
		state: {
			entering: styles["lambda-dialog-panel-entering"], // Estado inicial de la animación de entrada
			entered: styles["lambda-dialog-panel-entered"], // Estado final de la animación de entrada (diálogo completamente visible)
			exiting: styles["lambda-dialog-panel-exiting"], // Estado inicial de la animación de salida
			exited: styles["lambda-dialog-panel-exited"], // Estado final de la animación de salida (diálogo completamente oculto)
		},
		isModal: {
			true: styles["lambda-dialog-panel-modal"],
			false: styles[""],
		},
		isDraggable: {
			true: styles["lambda-dialog-panel-draggable"],
			false: styles[""],
		},
	},
	defaultVariants: {
		state: "exited", // Por defecto, el panel está en estado de salido (oculto)
		isModal: false,
		isDraggable: false,
	},
});

// Opcional: Puedes definir variantes para otros elementos internos si es necesario (ej. botón de cerrar)
// export const dialogCloseButtonVariants = cva(styles['lambda-dialog-close-button'], {
//     variants: {
//         // ...
//     }
// });
