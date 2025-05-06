import { cva } from 'class-variance-authority';
import styles from './carousel.module.css';


export const carouselVariants = cva(styles['lambda-carousel'], {
    variants: {
        paginationType: {
            thumbnail: styles["lambda-carousel-thumbnail"],
            dots: styles["lambda-carousel-dots"]
        },
        orientation: {
            horizontal: styles["lambda-carousel-horizontal"],
            vertical: styles["lambda-carousel-vertical"],
        },
        showPagination: {
            true: styles["lambda-carousel-pagination-true"],
            false: styles["lambda-carousel-pagination-false"],
        },
        showNavigationButtons: {
            true: styles["lambda-carousel-navigation-true"],
            false: styles["lambda-carousel-navigation-false"],
        }
    },
    defaultVariants: {
        orientation: "horizontal",
        paginationType: "dots",
    },
});

export const carouselContainerVariants = cva(styles['lambda-carousel-container'], {
    variants: {
        isDragging: {
            true: styles['lambda-carousel-container-dragging'],
        },
        isReturning: {
            true: styles['lambda-carousel-container-returning'],
        },
        isTransitioning: {
            true: styles['lambda-carousel-container-transitioning'],
        },
        orientation: {
            horizontal: styles["lambda-carousel-container-horizontal"],
            vertical: styles["lambda-carousel-container-vertical"],
        },
        skipTransition: {
            true: styles['lambda-carousel-container-skipTransition'],
        },
        stable: {
            true: styles['lambda-carousel-container-stable'],
        },   // size: { small: ..., medium: ..., large: ... }
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});


export const carouselButtonVariants = cva(styles['lambda-carousel-button'], {
    variants: {
        position: {
            prev: styles['lambda-carousel-button-prev'],
            next: styles['lambda-carousel-button-next'],
        },
        orientation: {
            horizontal: styles["lambda-carousel-button-horizontal"],
            vertical: styles["lambda-carousel-button-vertical"],
        },
        disabled: {
            true: styles['lambda-carousel-button-disabled'],
            false: ''
        },
    },
    defaultVariants: {
        orientation: "horizontal",
        disabled: false,
    },
});


export const carouselPaginationVariants = cva(styles['lambda-carousel-pagination'], {
    variants: {
        orientation: {
            horizontal: styles["lambda-carousel-pagination-horizontal"],
            vertical: styles["lambda-carousel-pagination-vertical"],
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});


export const carouselDotVariants = cva(styles['lambda-carousel-dot'], {
    variants: {
        active: {
            true: styles['lambda-carousel-dot-active'],
            false: ''
        },
        orientation: {
            horizontal: styles["lambda-carousel-dot-horizontal"],
            vertical: styles["lambda-carousel-dot-vertical"],
        },
        type: {
            circle: styles['lambda-carousel-dot-circle'],
            line: styles['lambda-carousel-dot-line'],
            square: styles['lambda-carousel-dot-square'],
        }
    },
    defaultVariants: {
        active: false,
        orientation: "horizontal",
        type: "circle",
    },
});


export const carouselThumbnailsVariants = cva(styles['lambda-carousel-thumbnails'], {
    variants: {
        orientation: {
            horizontal: styles["lambda-carousel-thumbnails-horizontal"],
            vertical: styles["lambda-carousel-thumbnails-vertical"],
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const carouselDrawerVariants = cva(styles['lambda-carousel-drawer'], {
    variants: {
        orientation: {
            horizontal: styles["lambda-carousel-drawer-horizontal"],
            vertical: styles["lambda-carousel-drawer-vertical"],
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});
