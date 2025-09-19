import { cva } from "class-variance-authority";
import styles from "./Dialog.module.css";

export const dialogOverlayVariants = cva(styles["lambda-dialog-overlay"], {
	variants: {
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
		state: "exited",
		isModal: false,
	},
});

export const dialogPanelVariants = cva(styles["lambda-dialog-panel"], {
	variants: {
		state: {
			entering: styles["lambda-dialog-panel-entering"],
			entered: styles["lambda-dialog-panel-entered"],
			exiting: styles["lambda-dialog-panel-exiting"],
			exited: styles["lambda-dialog-panel-exited"],
		},
		radius: {
			none: styles["lambda-dialog-panel-radius-none"],
			tiny: styles["lambda-dialog-panel-radius-tiny"],
			small: styles["lambda-dialog-panel-radius-small"],
			medium: styles["lambda-dialog-panel-radius-medium"],
			large: styles["lambda-dialog-panel-radius-large"],
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
		state: "exited",
		isModal: false,
		isDraggable: false,
		radius: "small",
	},
});
