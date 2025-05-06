import React, { HTMLAttributes } from 'react';

export type CarouselPaginationType = 'dots' | 'thumbnail';
export type CarouselDotType = 'circle' | 'line' | 'square';
export type CarouselOrientation = 'horizontal' | 'vertical';
export type CarouselSliderMode = 'auto' | 'single';

// Tipo para un punto de ruptura responsivo
export interface Breakpoint {
    /**
     * Ancho mínimo de la ventana en píxeles para aplicar esta configuración.
     * Los puntos de ruptura deben estar ordenados de menor a mayor.
     */
    breakpoint: number;
    /**
     * Número de items visibles a la vez en este punto de ruptura.
     */
    items: number;
}

// Props para el componente principal Carousel
export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Los elementos o componentes que se mostrarán dentro del carrusel.
     * Cada hijo directo será tratado como un item del carrusel.
     */
    children: React.ReactNode;

    /**
     * Opcional: Configuración de puntos de ruptura responsivos.
     * Un array de objetos { breakpoint: number, items: number }, ordenado por breakpoint.
     * Define cuántos items se muestran en diferentes tamaños de pantalla.
     * Si no se proporciona, por defecto muestra 1 item.
     * Ejemplo: [{ breakpoint: 0, items: 1 }, { breakpoint: 768, items: 2 }, { breakpoint: 1200, items: 3 }]
     */
    breakpoints?: Breakpoint[];

    /**
     * Opcional: Velocidad de la transición de desplazamiento en milisegundos.
     * Debe coincidir con la duración de la transición CSS `scroll-behavior: smooth`.
     * @default 300
     */
    transitionDuration?: number; // Sugerencia: usar solo CSS transition-duration
    /**
     * Opcional: Define la orientación del carrusel (horizontal o vertical).
     * @default 'horizontal'
     */
    orientation?: CarouselOrientation;

    /**
    * Determina cómo avanza el carrusel al navegar (botones) o durante la reproducción automática.
    * - 'auto': Avanza por el número de ítems visibles en el breakpoint actual.
    * - 'single': Avanza de un ítem en uno, independientemente de cuántos sean visibles.
    * @default 'auto'
    */
    modoSlider?: CarouselSliderMode;

    /**
     * Habilita o deshabilita la reproducción automática del carrusel.
     * Cuando está habilitado, el carrusel avanza automáticamente a la siguiente diapositiva 
     * @default false
     */
    autoPlay?: boolean;

    /**
  * Especifica el tipo visual o la forma de los puntos de paginación. 
  * * Solo relevante si `paginationType` es 'dots'.
  * @default 'circle'  
  */
    dotType?: CarouselDotType;

    /**
 * Especifica el tipo de indicadores de paginación a usar.
 * - 'dots': Utiliza los indicadores de puntos estándar (requiere `showPagination` true).
 * - 'thumbnail': Utiliza thumbnail extraídas de los ítems hijos como indicadores   
 * @default 'dots'
 */
    paginationType?: CarouselPaginationType;

    /**
     * Si es `true`, muestra los botones de navegación "Anterior" y "Siguiente".
     * @default true
     */
    showNavigationButtons?: boolean;

    /**
   * Si es `true`, el carrusel se desplazará infinitamente (modo looping).
   * Requiere duplicar items visualmente al inicio y al final.
   * @default false
   */
    loop?: boolean; // *** NUEVA PROP PARA MODO INFINITO ***

    /**
     * Si es `true`, muestra los indicadores de paginación (puntos).
     * @default true
     */
    showPagination?: boolean;

    /**
     * Opcional: Rol ARIA para el contenedor principal del carrusel.
     * @default "region"
     */
    role?: string; // Rol ARIA para el contenedor (ej: "region")

    /**
     * Opcional: Etiqueta ARIA para el contenedor principal del carrusel, necesaria si role="region".
     */
    'aria-label'?: string;


    // Opcional: Controlar el índice actual desde el padre (modo controlado)
    // value?: number; // Índice del primer item visible
    // onValueChange?: (index: number) => void; // Callback al cambiar el índice
}

// Props para el componente interno CarouselItem (no se exporta, se usa en el mapeo de children)
// Extiende HTMLAttributes<HTMLDivElement> para props estándar del contenedor del item
export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * El contenido de un item individual del carrusel.
     */
    children: React.ReactNode;
    // Props internas pasadas por el componente padre Carousel (ancho calculado, etc.)
    // Estas no son props que el usuario del componente Carousel deba pasar.
    __internal_width?: string; // Ancho calculado por el padre (usar inline style)
    __internal_index?: number; // Índice de este item (para ARIA o depuración)
}

// Opcional: Definir tipos para props de botones/indicadores si no se usan las variantes CVA directamente
// export interface CarouselButtonProps extends HTMLAttributes<HTMLButtonElement> { ... }
// export interface CarouselDotProps extends HTMLAttributes<HTMLButtonElement> { ... }
