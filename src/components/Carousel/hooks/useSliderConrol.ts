/* eslint-disable react-hooks/exhaustive-deps */
import { Children, ReactNode, RefObject, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Breakpoint, CarouselOrientation, CarouselPaginationType, CarouselSliderMode } from "../carousel.types";

interface SliderControl {
    orientation: CarouselOrientation | undefined
    transitionDuration: number
    loop: boolean
    autoPlay: boolean | undefined
    breakpoints: Breakpoint[]
    paginationType: CarouselPaginationType | undefined
    slideMode: CarouselSliderMode | undefined
    children: ReactNode
    slideRef: RefObject<HTMLDivElement | null>
    containerRef: RefObject<HTMLDivElement | null>
    thumbnailsContainerRef: RefObject<HTMLDivElement | null>
}

const TRANSITION_TIME = 500;

export const useSliderControl = ({ orientation, loop, autoPlay, breakpoints, paginationType, slideMode, transitionDuration, children, containerRef, slideRef, thumbnailsContainerRef }: SliderControl) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isReturning, setIsReturning] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [activeIndex, setActiveIndex] = useState(loop ? 1 : 0);
    const [visualIndex, setVisualIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleItems, setVisibleItems] = useState(1);
    const [effectiveSlidesToScroll, setEffectiveSlidesToScroll] = useState<number>(1);
    const [skipTransition, setSkipTransition] = useState(false);
    const touchStartPos = useRef<{ x: number; y: number } | null>(null);
    const [positionThumbnail, setPositionThumbnail] = useState<'center' | 'start'>('center');
    const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const skipTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);


    const realItems = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);
    const totalItems = realItems.length;

    // Efecto para manejar los breakpoints responsivos
    useEffect(() => {
        const sortedBreakpoints = [...breakpoints].sort((a, b) => b.breakpoint - a.breakpoint);

        const handleResize = () => {
            const width = window.innerWidth;
            const breakpoint = sortedBreakpoints.find((bp) => width >= bp.breakpoint) || sortedBreakpoints[sortedBreakpoints.length - 1];
            getWidthContainerThumbnails();
            // Si estamos en modo miniatura, vertical o single mode siempre mostrar solo 1 elemento
            if (orientation === 'vertical' || paginationType === "thumbnail" || slideMode === 'single') {
                setVisibleItems(1);
            } else {
                setVisibleItems(breakpoint.items);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoints, slideMode, paginationType, orientation]);

    const getWidthContainerThumbnails = () => {
        if (thumbnailsContainerRef.current && containerRef && containerRef.current) {
            const widthContainer = thumbnailsContainerRef!.current!.getBoundingClientRect().width;
            const itemsThumbnail = Array.from(thumbnailsContainerRef!.current.children);
            const sumaWidths = itemsThumbnail.reduce((acumulador, item) => {
                return acumulador + item.getBoundingClientRect().width;
            }, 0);
            const totalWidthThumbnails = sumaWidths + (itemsThumbnail.length * 8);
            if (widthContainer < totalWidthThumbnails) {
                setPositionThumbnail('start');
            } else {
                setPositionThumbnail('center');
            }
        }
    };


    // Actualizar effectiveSlidesToScroll cuando cambia slideMode
    useEffect(() => {
        if (slideMode !== undefined) {
            if (orientation === 'vertical' || paginationType === "thumbnail" || slideMode === 'single') {
                setEffectiveSlidesToScroll(1);
            } else {
                setEffectiveSlidesToScroll(visibleItems);
            }
        } else {
            setEffectiveSlidesToScroll(visibleItems);
        }
    }, [slideMode, paginationType, visibleItems, orientation]);


    // Limpiar timeouts al desmontar
    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
            if (skipTransitionTimeoutRef.current) {
                clearTimeout(skipTransitionTimeoutRef.current);
            }
        };
    }, []);


    // Inicializar activeIndex después de que se establezcan visibleItems y effectiveSlidesToScroll
    useEffect(() => {
        // Asegurarnos de que el carousel siempre comience mostrando los primeros slides
        if (loop) {
            // Forzar la inicialización correcta inmediatamente
            const slidesToClone = Math.max(visibleItems, effectiveSlidesToScroll || visibleItems);

            // Establecer el índice activo para mostrar los primeros slides reales
            setActiveIndex(slidesToClone);
            setVisualIndex(0);

            // Forzar un reflow para asegurar que el carousel se renderice correctamente
            if (slideRef.current) {
                slideRef.current.style.transition = "none";
                slideRef.current.style.transform = `translateX(-${slidesToClone * (100 / visibleItems)}%)`;


                // Forzar un reflow
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                slideRef.current.offsetHeight;

                // Restaurar la transición
                setTimeout(() => {
                    if (slideRef.current) {
                        slideRef.current.style.transition = "";
                    }
                }, 50);
            }
        }
    }, [loop, visibleItems, effectiveSlidesToScroll]);

    // Actualizar visualIndex cuando cambia activeIndex
    useEffect(() => {
        if (!loop) {
            setVisualIndex(activeIndex);
            return;
        }
        // En modo loop, calculamos el índice visual basado en activeIndex
        const slidesToClone = Math.max(visibleItems, effectiveSlidesToScroll || visibleItems);

        if (activeIndex < slidesToClone) {
            // Estamos en los slides clonados al principio
            setVisualIndex(totalItems - (slidesToClone - activeIndex));
        } else if (activeIndex >= slidesToClone + totalItems) {
            // Estamos en los slides clonados al final
            setVisualIndex(activeIndex - slidesToClone - totalItems);
        } else {
            // Estamos en los slides reales
            setVisualIndex(activeIndex - slidesToClone);
        }
    }, [activeIndex, loop, totalItems, visibleItems, effectiveSlidesToScroll]);


    // Manejar el cambio de diapositiva con lógica de loop mejorada
    const handleSlideChange = useCallback((newIndex: number) => {
        // Limpiar cualquier timeout anterior
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        if (skipTransitionTimeoutRef.current) {
            clearTimeout(skipTransitionTimeoutRef.current);
        }

        if (!loop) {
            // Sin loop, simplemente actualizamos el índice
            setIsTransitioning(true);
            setActiveIndex(newIndex);

            transitionTimeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
            }, TRANSITION_TIME);
            return;
        }

        // Con loop, necesitamos manejar los saltos entre el principio y el final
        const slidesToClone = Math.max(visibleItems, effectiveSlidesToScroll || visibleItems);
        const maxIndex = slidesToClone + totalItems - 1;

        setIsTransitioning(true);
        setActiveIndex(newIndex);

        if (newIndex < slidesToClone) {
            // Estamos navegando hacia atrás hacia los slides clonados
            transitionTimeoutRef.current = setTimeout(() => {
                setSkipTransition(true);

                // Saltamos al final del carousel (a los slides reales correspondientes)
                const realIndex = totalItems + newIndex;
                setActiveIndex(realIndex);

                // Restauramos la transición después del salto
                skipTransitionTimeoutRef.current = setTimeout(() => {
                    setSkipTransition(false);
                    setIsTransitioning(false);
                }, 50);
            }, TRANSITION_TIME);
        } else if (newIndex > maxIndex) {
            // Estamos navegando hacia adelante hacia los slides clonados
            transitionTimeoutRef.current = setTimeout(() => {
                setSkipTransition(true);

                // Saltamos al inicio del carousel (a los slides reales correspondientes)
                const realIndex = slidesToClone + (newIndex - slidesToClone - totalItems);

                setActiveIndex(realIndex);

                // Restauramos la transición después del salto
                skipTransitionTimeoutRef.current = setTimeout(() => {
                    setSkipTransition(false);
                    setIsTransitioning(false);
                }, 50);
            }, TRANSITION_TIME);
        } else {
            // Transición normal dentro de los slides reales
            transitionTimeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
            }, TRANSITION_TIME);
        }

    },
        [loop, totalItems, visibleItems, effectiveSlidesToScroll],
    );

    const nextSlide = useCallback(() => {
        if (!loop && activeIndex + effectiveSlidesToScroll > totalItems - visibleItems) {
            handleSlideChange(totalItems - visibleItems);
            return;
        }
        handleSlideChange(activeIndex + effectiveSlidesToScroll);
    }, [activeIndex, handleSlideChange, loop, totalItems, visibleItems, effectiveSlidesToScroll]);

    const prevSlide = useCallback(() => {
        if (!loop && activeIndex - effectiveSlidesToScroll < 0) {
            handleSlideChange(0);
            return;
        }
        handleSlideChange(activeIndex - effectiveSlidesToScroll);
    }, [activeIndex, handleSlideChange, loop, effectiveSlidesToScroll]);

    const goToSlide = useCallback(
        (index: number) => {
            // Asegurarse de que el índice esté dentro de los límites
            const boundedIndex = Math.max(0, Math.min(index, totalItems - 1));

            if (!loop) {
                // Si hay múltiples diapositivas visibles y queremos centrar la actual
                if (visibleItems > 1 && slideMode === "single") {
                    // Calcular el índice para centrar la diapositiva seleccionada
                    // Restar la mitad de las diapositivas visibles (redondeado hacia abajo)
                    const offset = Math.floor(visibleItems / 2);

                    // Calcular el índice de inicio para centrar la diapositiva seleccionada
                    let centeredIndex = boundedIndex - offset;

                    // Asegurarse de que no vamos más allá de los límites
                    centeredIndex = Math.max(0, Math.min(centeredIndex, totalItems - visibleItems));

                    // Guardar el índice visual actual antes de cambiar el activeIndex
                    setVisualIndex(boundedIndex);

                    // Cambiar al índice calculado para centrar la diapositiva
                    handleSlideChange(centeredIndex);
                    return;
                }

                // Comportamiento normal para slidesToScroll=auto o cuando solo hay una diapositiva visible
                const maxStartIndex = Math.max(0, totalItems - visibleItems);
                const normalIndex = Math.min(Math.max(0, boundedIndex), maxStartIndex);
                handleSlideChange(normalIndex);
                return;
            }

            // En modo loop con múltiples diapositivas visibles y slidesToScroll=1
            if (visibleItems > 1 && slideMode === "single") {
                const slidesToClone = Math.max(visibleItems, effectiveSlidesToScroll || visibleItems);

                // Calcular el índice para centrar la diapositiva seleccionada
                const offset = Math.floor(visibleItems / 2);

                // En modo loop, añadimos slidesToClone al índice y restamos el offset para centrar
                const centeredIndex = slidesToClone + boundedIndex - offset;

                // Guardar el índice visual actual
                setVisualIndex(boundedIndex);

                // Asegurarnos de que el índice esté dentro de los límites válidos para el modo loop
                const adjustedIndex = Math.max(0, Math.min(centeredIndex, slidesToClone + totalItems - 1));

                handleSlideChange(adjustedIndex);
                return;
            }

            // Comportamiento normal para loop con slidesToScroll=auto
            const slidesToClone = Math.max(visibleItems, effectiveSlidesToScroll || visibleItems);
            handleSlideChange(slidesToClone + boundedIndex);
        },
        [handleSlideChange, loop, effectiveSlidesToScroll, visibleItems, totalItems, slideMode],
    );

    // Funcionalidad de autoplay
    useEffect(() => {
        if (!isPlaying || isDragging || isTransitioning || isReturning) return;

        const interval = setInterval(() => {
            if (!loop && activeIndex >= totalItems - visibleItems) {
                setIsPlaying(false);
                return;
            }
            nextSlide();
        }, transitionDuration);

        return () => clearInterval(interval);
    }, [isPlaying, nextSlide, isDragging, isTransitioning, isReturning, loop, activeIndex, totalItems, visibleItems, transitionDuration]);

    useEffect(() => {
        // Dónde adjuntar el listener:
        // 1. window: Para control global (funciona sin que el carrusel tenga foco, puede ser molesto)
        // 2. containerRef.current: Para control cuando el carrusel o un elemento dentro tiene foco (mejor para accesibilidad y evitar conflictos)
        const containerElement = containerRef.current;
        console.log(containerElement);

        if (!containerElement) return; // Asegurarse de que la referencia al DOM existe

        const handleKeyPress = (event: KeyboardEvent) => {
            // Opcional: Verificar si el evento proviene de un input, textarea o select para no interferir
            console.log(event.key);
            if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
                return;
            }


            switch (event.key) {
                case 'ArrowLeft':
                    // Opcional: event.preventDefault(); si quieres evitar el scroll nativo de la página con las flechas
                    prevSlide(); // Llama a la función del hook
                    break;
                case 'ArrowRight':
                    // Opcional: event.preventDefault();
                    nextSlide(); // Llama a la función del hook
                    break;
                default:
                    return; // No hacer nada si no es una flecha relevante
            }
        };

        // Adjuntar el event listener al contenedor principal del carrusel
        containerElement.addEventListener('keydown', handleKeyPress); // keydown para reacción inmediata

        // Función de limpieza: Remover el event listener al desmontar o si cambian dependencias
        return () => {
            containerElement.removeEventListener('keydown', handleKeyPress);
        };
    }, [containerRef.current, prevSlide, nextSlide, orientation]);
    // Crear el array de diapositivas para el modo loop
    const getClonedSlides = useCallback(() => {
        if (!loop) return realItems;

        // Para el modo loop, creamos un array con slides duplicados al principio y al final
        // para permitir una transición suave
        const slidesToClone = Math.max(visibleItems, effectiveSlidesToScroll || visibleItems);

        // Clonamos los últimos slides al principio
        const prefixSlides = [];
        for (let i = 0; i < slidesToClone; i++) {
            prefixSlides.push(realItems[totalItems - slidesToClone + i]);
        }

        // Clonamos los primeros slides al final
        const suffixSlides = [];
        for (let i = 0; i < slidesToClone; i++) {
            suffixSlides.push(realItems[i]);
        }
        return [...prefixSlides, ...realItems, ...suffixSlides,];
    }, [loop, realItems, visibleItems, effectiveSlidesToScroll, totalItems]);

    const allSlides = getClonedSlides();



    // Pausar autoplay al pasar el mouse
    const handleMouseEnter = () => {
        if (isPlaying) {
            setIsPlaying(false);
        }
    };

    const handleMouseLeave = () => {
        if (autoPlay) {
            setIsPlaying(true);
        }
    };

    // Obtener dimensiones del contenedor para cálculos
    const getContainerDimension = () => {
        if (!containerRef.current) return 0;
        return orientation === 'vertical' ? containerRef.current.offsetHeight : containerRef.current.offsetWidth;
    };

    // Funcionalidad táctil con retroalimentación visual
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isTransitioning || isReturning) return;
        setIsDragging(true);
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setDragOffset(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartPos.current || isTransitioning || isReturning) return;

        const currentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        // Usar coordenada X o Y según la orientación
        const diff = orientation === 'vertical' ? currentPos.y - touchStartPos.current.y : currentPos.x - touchStartPos.current.x;

        const containerDimension = getContainerDimension();

        if (!loop) {
            if ((activeIndex === 0 && diff > 0) || (activeIndex === totalItems - visibleItems && diff < 0)) {
                const resistedDiff = diff * 0.2;
                setDragOffset(resistedDiff);
                return;
            }
        }

        const maxDrag = containerDimension;
        const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

        setDragOffset(limitedDiff);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartPos.current || isTransitioning || isReturning) return;

        const touchEndPos = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        // Usar coordenada X o Y según la orientación
        const diff = orientation === 'vertical' ? touchStartPos.current.y - touchEndPos.y : touchStartPos.current.x - touchEndPos.x;

        const containerDimension = getContainerDimension();
        const threshold = containerDimension * 0.2;

        // Asegurarnos de que estamos en un estado limpio antes de cualquier transición
        setIsDragging(false);

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                if (!loop && activeIndex >= totalItems - visibleItems) {
                    // Regresar suavemente a la posición original
                    setIsReturning(true);
                    setDragOffset(0);
                    setTimeout(() => setIsReturning(false), 300);
                } else {
                    // Avanzar con transición limpia
                    setDragOffset(0); // Resetear el offset antes de la transición
                    nextSlide();
                }
            } else {
                if (!loop && activeIndex <= 0) {
                    // Regresar suavemente a la posición original
                    setIsReturning(true);
                    setDragOffset(0);
                    setTimeout(() => setIsReturning(false), 300);
                } else {
                    // Retroceder con transición limpia
                    setDragOffset(0); // Resetear el offset antes de la transición
                    prevSlide();
                }
            }
        } else {
            // Si no se arrastró lo suficiente, regresar suavemente a la posición original
            setIsReturning(true);
            setDragOffset(0);
            setTimeout(() => setIsReturning(false), 300);
        }

        touchStartPos.current = null;
    };

    // Funcionalidad de arrastre con mouse con retroalimentación visual
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isTransitioning || isReturning) return;
        setIsDragging(true);
        touchStartPos.current = { x: e.clientX, y: e.clientY };
        setDragOffset(0);

        const handleMouseMove = (e: MouseEvent) => {
            if (!touchStartPos.current || isTransitioning || isReturning) return;

            const currentPos = { x: e.clientX, y: e.clientY };
            // Usar coordenada X o Y según la orientación
            const diff = orientation === 'vertical' ? currentPos.y - touchStartPos.current.y : currentPos.x - touchStartPos.current.x;

            const containerDimension = getContainerDimension();

            if (!loop) {
                if ((activeIndex === 0 && diff > 0) || (activeIndex === totalItems - visibleItems && diff < 0)) {
                    const resistedDiff = diff * 0.2;
                    setDragOffset(resistedDiff);
                    return;
                }
            }

            const maxDrag = containerDimension;
            const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

            setDragOffset(limitedDiff);
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (!touchStartPos.current || isTransitioning || isReturning) return;

            const currentPos = { x: e.clientX, y: e.clientY };
            // Usar coordenada X o Y según la orientación
            const diff = orientation === 'vertical' ? touchStartPos.current.y - currentPos.y : touchStartPos.current.x - currentPos.x;

            const containerDimension = getContainerDimension();
            const threshold = containerDimension * 0.2;

            // Asegurarnos de que estamos en un estado limpio antes de cualquier transición
            setIsDragging(false);
            setDragOffset(0); // Resetear el offset inmediatamente

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    if (!loop && activeIndex >= totalItems - visibleItems) {
                        // Regresar suavemente a la posición original
                        setIsReturning(true);
                        setTimeout(() => setIsReturning(false), 300);
                    } else {
                        // Avanzar con transición limpia
                        nextSlide();
                    }
                } else {
                    if (!loop && activeIndex <= 0) {
                        // Regresar suavemente a la posición original
                        setIsReturning(true);
                        setTimeout(() => setIsReturning(false), 300);
                    } else {
                        // Retroceder con transición limpia
                        prevSlide();
                    }
                }
            } else {
                // Si no se arrastró lo suficiente, regresar suavemente a la posición original
                setIsReturning(true);
                setTimeout(() => setIsReturning(false), 300);
            }

            touchStartPos.current = null;
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Calcular transformación con desplazamiento de arrastre
    const getTransformStyle = () => {
        const itemSize = 100 / visibleItems;
        const baseTransform = -activeIndex * itemSize;

        // Solo aplicar el dragOffset cuando estamos arrastrando activamente
        // o cuando estamos regresando a la posición original
        const dragPercent = isDragging || isReturning ? (dragOffset / getContainerDimension()) * 100 : 0;

        // Usar translateX o translateY según la orientación 
        return orientation === 'vertical' ? `translateY(${baseTransform + dragPercent}%)` : `translateX(${baseTransform + dragPercent}%)`;
    };


    return {
        visualIndex,
        activeIndex,
        skipTransition,
        visibleItems,
        positionThumbnail,
        getTransformStyle,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseDown,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        nextSlide,
        prevSlide,
        goToSlide,
        allSlides,
        totalItems,
        realItems,
        isDragging,
        isReturning,
        isTransitioning

    };
};