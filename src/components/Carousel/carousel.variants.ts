// src/components/Carousel/Carousel.variants.ts

import { cva } from 'class-variance-authority';
import styles from './carousel.module.css'; // Asegúrate de la ruta correcta

// Variantes para los botones de navegación (Anterior/Siguiente)
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
        // Puedes añadir variantes para tamaño, color, etc.
        // size: { small: ..., medium: ..., large: ... }
    },
    defaultVariants: {
        // position es REQUIRED 
        // size: 'medium',
    },
});
// Variantes para los botones de navegación (Anterior/Siguiente)
export const carouselButtonVariants = cva(styles['lambda-carousel-button'], {
    variants: {
        // Posición del botón
        position: {
            prev: styles['lambda-carousel-button--prev'],
            next: styles['lambda-carousel-button--next'],
        },
        // Estado deshabilitado
        disabled: {
            true: styles['lambda-carousel-button--disabled'],
            false: ''
        },
        // Puedes añadir variantes para tamaño, color, etc.
        // size: { small: ..., medium: ..., large: ... }
    },
    defaultVariants: {
        // position es REQUIRED
        disabled: false,
        // size: 'medium',
    },
});

// Variantes para los indicadores de paginación (puntos)
export const carouselDotVariants = cva(styles['lambda-carousel-dot'], {
    variants: {
        // Estado activo (el punto que representa la vista actual)
        active: {
            true: styles['lambda-carousel-dot--active'],
            false: ''
        },
        // Puedes añadir variantes para tamaño, forma, color, etc.
        // size: { small: ..., large: ... }
    },
    defaultVariants: {
        active: false,
        // size: 'medium',
    },
});

// Exporta los tipos de variantes si los necesitas
// export type CarouselButtonVariants = VariantProps<typeof carouselButtonVariants>;
// export type CarouselDotVariants = VariantProps<typeof carouselDotVariants>;