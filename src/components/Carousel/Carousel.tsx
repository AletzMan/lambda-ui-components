/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    forwardRef,
    useCallback,
    useRef,
    useState,
    useEffect,
    useMemo,
    isValidElement,
    Children,
} from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, } from 'lucide-react';
import { CarouselProps, Breakpoint } from './carousel.types';
import { Button } from '../Button/Button';
import styles from "./carousel.module.css";
import { carouselButtonVariants, carouselContainerVariants, carouselDotVariants, carouselDrawerVariants, carouselPaginationVariants, carouselThumbnailsVariants, carouselVariants } from './carousel.variants';


const DEFAULT_BREAKPOINTS: Breakpoint[] = [
    { breakpoint: 0, items: 1 },
    { breakpoint: 768, items: 2 },
    { breakpoint: 1200, items: 3 },
];

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
    (
        {
            children,
            breakpoints = DEFAULT_BREAKPOINTS,
            //showNavigationButtons = true,
            //showPagination = true,
            role = 'region',
            'aria-label': ariaLabel,
            autoPlay,
            className,
            transitionDuration = 5000,
            orientation,
            modoSlider,
            style,
            loop = false,
            paginationType,
            dotType,
            ...restProps
        },
        ref
    ) => {
        const [activeIndex, setActiveIndex] = useState(loop ? 1 : 0);
        const [isPlaying, setIsPlaying] = useState(autoPlay);
        const [dragOffset, setDragOffset] = useState(0);
        const [isDragging, setIsDragging] = useState(false);
        const [isTransitioning, setIsTransitioning] = useState(false);
        const [isReturning, setIsReturning] = useState(false);
        const [visibleItems, setVisibleItems] = useState(1);
        const [effectiveSlidesToScroll, setEffectiveSlidesToScroll] = useState<number>(1);
        // Nuevo estado para mantener el índice visual para los dots/miniaturas
        const [visualIndex, setVisualIndex] = useState(0);
        const [skipTransition, setSkipTransition] = useState(false);
        const touchStartPos = useRef<{ x: number; y: number } | null>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const slideRef = useRef<HTMLDivElement>(null);
        const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const skipTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

        // Constante para el tiempo de transición normal (en ms)
        const TRANSITION_TIME = 500;


        const realItems = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);


        const totalItems = realItems.length;

        // Efecto para manejar los breakpoints responsivos
        useEffect(() => {
            const sortedBreakpoints = [...breakpoints].sort((a, b) => b.breakpoint - a.breakpoint);

            const handleResize = () => {
                const width = window.innerWidth;
                const breakpoint = sortedBreakpoints.find((bp) => width >= bp.breakpoint) || sortedBreakpoints[sortedBreakpoints.length - 1];

                // Si estamos en modo miniatura, siempre mostrar solo 1 elemento
                if (orientation === 'vertical' || paginationType === "thumbnail") {
                    setVisibleItems(1);
                } else {
                    setVisibleItems(breakpoint.items);
                }
            };

            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, [breakpoints, modoSlider, paginationType]);


        // Actualizar effectiveSlidesToScroll cuando cambia modoSlider
        useEffect(() => {
            if (modoSlider !== undefined) {
                if (orientation === 'vertical' || paginationType === "thumbnail" || modoSlider === 'single') {
                    setEffectiveSlidesToScroll(1);
                } else {
                    setEffectiveSlidesToScroll(visibleItems);
                }
            } else {
                setEffectiveSlidesToScroll(visibleItems);
            }
        }, [modoSlider, paginationType, visibleItems]);

        // Notificar cambios en el estado de autoplay
        /*  useEffect(() => {
              onAutoPlayChange?.(isPlaying);
          }, [isPlaying, onAutoPlayChange]);*/

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
        }, [realItems, loop, visibleItems, effectiveSlidesToScroll, totalItems]);

        const allSlides = getClonedSlides();

        // Actualizar visualIndex cuando cambia activeIndex
        /*  useEffect(() => {
              // Actualizar visualIndex inmediatamente al montar el componente
              if (loop) {
                  setVisualIndex(0); // Siempre empezar mostrando el primer elemento real
              }
          }, []);*/

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



        // Crear el array de diapositivas según el modo (loop o no loop)
        //const allSlides = loop ? [...realItems.slice(totalItems - 1, totalItems), ...realItems, ...realItems.slice(0, 1)] : realItems;

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
            [loop, totalItems, visibleItems, effectiveSlidesToScroll, TRANSITION_TIME],
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
                    if (visibleItems > 1 && modoSlider === "single") {
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
                if (visibleItems > 1 && modoSlider === "single") {
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
            [handleSlideChange, loop, effectiveSlidesToScroll, visibleItems, totalItems, modoSlider],
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
        }, [
            isPlaying,
            nextSlide,
            transitionDuration,
            isDragging,
            isTransitioning,
            isReturning,
            loop,
            activeIndex,
            totalItems,
            visibleItems,
        ]);

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

        // Determinar si los botones de navegación deben estar deshabilitados
        const isPrevDisabled = !loop && activeIndex <= 0;
        const isNextDisabled = !loop && activeIndex >= totalItems - visibleItems;

        // Calcular el tamaño de cada elemento como porcentaje
        const itemSize = 100 / visibleItems;

        const renderPagination = () => {

            if (paginationType === "thumbnail") {
                // Paginación con miniaturas
                return (
                    <div className={carouselThumbnailsVariants({ orientation })}>
                        {Array.from({ length: totalItems }).map((_, index) => {
                            // Determinar si esta miniatura está activa usando visualIndex 
                            const isActive = visualIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={clsx(styles["lambda-carousel-thumbnails-item"], { [styles["lambda-carousel-thumbnails-item-active"]]: isActive })}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Ir a la diapositiva ${index + 1}`}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {/* Clonar el elemento para usarlo como miniatura */}
                                    <div className={clsx(styles["lambda-carousel-content"])}>{realItems[index]}</div>
                                </div>
                            );
                        })}
                    </div>
                );
            } else {
                // Paginación con dots (puntos)
                let dotsCount;
                let getSlideIndexForDot = (dotIndex: number) => dotIndex;

                if (modoSlider === "single") {
                    // Un dot por cada diapositiva individual
                    dotsCount = totalItems;
                    getSlideIndexForDot = (dotIndex: number) => dotIndex;
                } else {
                    // Un dot por cada grupo de diapositivas visibles
                    dotsCount = Math.ceil(totalItems / visibleItems);
                    getSlideIndexForDot = (dotIndex: number) => dotIndex * visibleItems;
                }


                return (
                    <div className={carouselPaginationVariants({ orientation })}>
                        {Array.from({ length: dotsCount }).map((_, dotIndex) => {
                            // Calcular si este grupo de diapositivas está activo
                            let isActive;

                            if (modoSlider === "single") {
                                // Para slidesToScroll=1, un dot está activo si corresponde a la diapositiva actual
                                isActive = visualIndex === dotIndex;
                            } else {
                                // Para slidesToScroll=auto, un dot está activo si la diapositiva actual está en su grupo
                                const groupStart = dotIndex * visibleItems;
                                const groupEnd = Math.min(groupStart + visibleItems - 1, totalItems - 1);
                                isActive = visualIndex >= groupStart && visualIndex <= groupEnd;
                            }


                            return (
                                <button
                                    key={dotIndex}
                                    className={clsx(carouselDotVariants({ active: isActive, type: dotType }))}
                                    onClick={() => goToSlide(getSlideIndexForDot(dotIndex))}
                                    disabled={isTransitioning || isReturning}
                                    aria-label={`Ir a la diapositiva ${getSlideIndexForDot(dotIndex) + 1}`}
                                />
                            );
                        })}
                    </div>
                );
            }
        };

        return (
            <div
                className={clsx(carouselVariants({ paginationType, orientation }), className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={style}
                role={role}
                aria-label={ariaLabel}
                ref={containerRef ?? ref}
                {...restProps}
            >
                {/* Contenedor del carousel */}
                <div className={clsx(carouselDrawerVariants({ orientation }))}>
                    <div
                        className={carouselContainerVariants({ isDragging, isReturning, isTransitioning: isTransitioning && !skipTransition, orientation, skipTransition, stable: !isDragging && !isReturning && !isTransitioning && !skipTransition })}
                        style={{ transform: getTransformStyle() }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        ref={slideRef}
                    >
                        {allSlides && allSlides.map((item, index) => (
                            <div
                                key={index}
                                className={clsx(styles["lambda-carousel-item"])}
                                style={orientation === 'vertical' ? { height: `${itemSize}%` } : { width: `${itemSize}%` }}
                            >
                                <div className={clsx(styles["lambda-carousel-item-inner"])}>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones de navegación */}
                <Button
                    variant="text"
                    color="secondary"
                    className={clsx(carouselButtonVariants({ position: 'prev', orientation }))}
                    size="tiny"
                    onClick={prevSlide}
                    disabled={isTransitioning || isReturning || isPrevDisabled}
                    aria-label="Anterior"
                    icon={<ChevronLeft />}
                />

                <Button
                    variant="text"
                    color="secondary"
                    className={clsx(carouselButtonVariants({ position: 'next', orientation }))}
                    size="tiny"
                    onClick={nextSlide}
                    disabled={isTransitioning || isReturning || isNextDisabled}
                    aria-label="Siguiente"
                    icon={<ChevronRight />}
                />
                {renderPagination()}
            </div >
        );
    });