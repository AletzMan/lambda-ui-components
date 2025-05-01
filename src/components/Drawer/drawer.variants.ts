import { cva } from 'class-variance-authority';
import styles from './Drawer.module.css';

export const drawerOverlayVariants = cva(styles['lambda-drawer-overlay'], {
    variants: {
        state: {
            entering: styles['lambda-drawer-overlay-entering'],
            entered: styles['lambda-drawer-overlay-entered'],
            exiting: styles['lambda-drawer-overlay-exiting'],
            exited: styles['lambda-drawer-overlay-exited'],
        },
    },
    defaultVariants: {
        state: 'exited',
    },
});

// Variantes para el Panel del Drawer (la caja que desliza)
export const drawerPanelVariants = cva(styles['lambda-drawer-panel'], {
    variants: {
        state: {
            entering: styles['lambda-drawer-panel-entering'],
            entered: styles['lambda-drawer-panel-entered'],
            exiting: styles['lambda-drawer-panel-exiting'],
            exited: styles['lambda-drawer-panel-exited'],
        },
        placement: {
            left: styles['lambda-drawer-panel-left'],
            right: styles['lambda-drawer-panel-right'],
            top: styles['lambda-drawer-panel-top'],
            bottom: styles['lambda-drawer-panel-bottom'],
        },
        width: {
            xsmall: styles["lambda-drawer-panel-xsmall"],
            small: styles["lambda-drawer-panel-small"],
            medium: styles["lambda-drawer-panel-medium"],
            half: styles["lambda-drawer-panel-half"],
            full: styles["lambda-drawer-panel-full"],
        }
    }, defaultVariants: {
        state: 'exited',
    },
});
