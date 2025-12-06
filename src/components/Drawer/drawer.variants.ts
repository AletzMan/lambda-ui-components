import { cva, VariantProps } from "class-variance-authority";
import styles from "./drawer.module.css";

export const drawerOverlayVariants = cva(styles["lambda-drawer-overlay"], {
	variants: {
		state: {
			entering: styles["lambda-drawer-overlay-entering"],
			entered: styles["lambda-drawer-overlay-entered"],
			exiting: styles["lambda-drawer-overlay-exiting"],
			exited: styles["lambda-drawer-overlay-exited"],
		},
		backdropType: {
			dark: styles["lambda-drawer-overlay-backdrop-dark"],
			blur: styles["lambda-drawer-overlay-backdrop-blur"],
			transparent: styles["lambda-drawer-overlay-backdrop-transparent"],
		},
	},
	defaultVariants: {
		state: "exited",
		backdropType: "dark",
	},
});

// Variantes para el Panel del Drawer (la caja que desliza)
export const drawerPanelVariants = cva(styles["lambda-drawer-panel"], {
	variants: {
		state: {
			entering: styles["lambda-drawer-panel-entering"],
			entered: styles["lambda-drawer-panel-entered"],
			exiting: styles["lambda-drawer-panel-exiting"],
			exited: styles["lambda-drawer-panel-exited"],
		},
		placement: {
			left: styles["lambda-drawer-panel-left"],
			right: styles["lambda-drawer-panel-right"],
			top: styles["lambda-drawer-panel-top"],
			bottom: styles["lambda-drawer-panel-bottom"],
		},
		width: {
			xsmall: styles["lambda-drawer-panel-xsmall"],
			small: styles["lambda-drawer-panel-small"],
			medium: styles["lambda-drawer-panel-medium"],
			half: styles["lambda-drawer-panel-half"],
			full: styles["lambda-drawer-panel-full"],
		},
		radius: {
			none: styles["lambda-drawer-panel-radius-none"],
			tiny: styles["lambda-drawer-panel-radius-tiny"],
			small: styles["lambda-drawer-panel-radius-small"],
			medium: styles["lambda-drawer-panel-radius-medium"],
			large: styles["lambda-drawer-panel-radius-large"],
		},
		backdropType: {
			dark: styles["lambda-drawer-panel-backdrop-dark"],
			blur: styles["lambda-drawer-panel-backdrop-blur"],
			transparent: styles["lambda-drawer-panel-backdrop-transparent"],
		},
	},
	defaultVariants: {
		state: "exited",
		placement: "left",
		width: "xsmall",
		backdropType: "dark",
	},
});

export type DrawerVariants = VariantProps<typeof drawerPanelVariants>;
