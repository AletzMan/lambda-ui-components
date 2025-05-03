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
import { carouselContainerVariants } from './carousel.variants';


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
            transitionDuration,
            itemsToScroll,
            style,
            loop = false, // Prop para el loop infinito
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
        const [visibleItems, setVisibleItems] = useState(1); // Número de elementos visibles actualmente
        const [effectiveSlidesToScroll, setEffectiveSlidesToScroll] = useState(itemsToScroll || 1);
        const touchStartX = useRef<number | null>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const slideRef = useRef<HTMLDivElement>(null);

        const realItems = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);


        const totalItems = realItems.length;

        // Efecto para manejar los breakpoints responsivos
        useEffect(() => {
            // Ordenar los breakpoints de mayor a menor para la evaluación correcta
            const sortedBreakpoints = [...breakpoints].sort((a, b) => b.breakpoint - a.breakpoint);

            const handleResize = () => {
                const width = window.innerWidth;
                // Encontrar el primer breakpoint que coincida con el ancho actual
                const breakpoint =
                    sortedBreakpoints.find((bp) => width >= bp.breakpoint) || sortedBreakpoints[sortedBreakpoints.length - 1];
                setVisibleItems(breakpoint.items);

                // Si no se proporciona itemsToScroll, usar visibleItems como valor predeterminado
                if (itemsToScroll === undefined) {
                    setEffectiveSlidesToScroll(breakpoint.items);
                }
            };

            // Inicializar
            handleResize();

            // Escuchar cambios de tamaño
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, [breakpoints, itemsToScroll]);

        // Actualizar effectiveSlidesToScroll cuando cambia itemsToScroll
        useEffect(() => {
            if (itemsToScroll !== undefined) {
                setEffectiveSlidesToScroll(itemsToScroll);
            }
        }, [itemsToScroll]);

        // Notificar cambios en el estado de autoplay
        /*  useEffect(() => {
            onAutoPlayChange?.(isPlaying)
          }, [isPlaying, onAutoPlayChange])*/

        // Crear el array de diapositivas según el modo (loop o no loop)
        const allSlides = loop
            ? [
                ...realItems.slice(totalItems - visibleItems, totalItems), // Clonar últimas diapositivas al principio
                ...realItems,
                ...realItems.slice(0, visibleItems), // Clonar primeras diapositivas al final
            ]
            : realItems;

        // Manejar el cambio de diapositiva con lógica de loop
        const handleSlideChange = useCallback(
            (newIndex: number) => {
                setIsTransitioning(true);
                setActiveIndex(newIndex);

                // Manejar el loop infinito
                if (loop) {
                    if (newIndex <= visibleItems - 1) {
                        // Si estamos en las diapositivas clonadas al principio
                        setTimeout(() => {
                            setIsTransitioning(false);
                            setActiveIndex(totalItems + newIndex); // Saltar a las diapositivas reales correspondientes
                        }, 500);
                    } else if (newIndex >= totalItems + visibleItems) {
                        // Si estamos en las diapositivas clonadas al final
                        setTimeout(() => {
                            setIsTransitioning(false);
                            setActiveIndex(newIndex - totalItems); // Saltar a las diapositivas reales correspondientes
                        }, 500);
                    } else {
                        setTimeout(() => {
                            setIsTransitioning(false);
                        }, 500);
                    }
                } else {
                    // Modo sin loop - simplemente terminar la transición
                    setTimeout(() => {
                        setIsTransitioning(false);
                    }, 500);
                }
            },
            [totalItems, loop, visibleItems],
        );

        const nextSlide = useCallback(() => {
            // En modo sin loop, verificar si estamos en o cerca de la última diapositiva
            if (!loop && activeIndex + effectiveSlidesToScroll > totalItems - visibleItems) {
                // Si estamos cerca del final, ir exactamente al final
                handleSlideChange(totalItems - visibleItems);
                return;
            }
            // Avanzar según itemsToScroll
            handleSlideChange(activeIndex + effectiveSlidesToScroll);
        }, [activeIndex, handleSlideChange, loop, totalItems, visibleItems, effectiveSlidesToScroll]);

        const prevSlide = useCallback(() => {
            // En modo sin loop, verificar si estamos en o cerca de la primera diapositiva
            if (!loop && activeIndex - effectiveSlidesToScroll < 0) {
                // Si estamos cerca del principio, ir exactamente al principio
                handleSlideChange(0);
                return;
            }
            // Retroceder según itemsToScroll
            handleSlideChange(activeIndex - effectiveSlidesToScroll);
        }, [activeIndex, handleSlideChange, loop, effectiveSlidesToScroll]);

        const goToSlide = useCallback(
            (index: number) => {
                // Convertir del índice de grupo (base 0) a nuestro índice interno
                const targetIndex = index * effectiveSlidesToScroll;
                handleSlideChange(loop ? targetIndex + visibleItems : targetIndex);
            },
            [handleSlideChange, loop, visibleItems, effectiveSlidesToScroll],
        );

        // Funcionalidad de autoplay
        useEffect(() => {
            if (!isPlaying || isDragging || isTransitioning || isReturning) return;

            const interval = setInterval(() => {
                // En modo sin loop, detener el autoplay al llegar al final
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

        // Obtener ancho del contenedor para cálculos
        const getContainerWidth = () => {
            return containerRef.current?.offsetWidth || 0;
        };

        // Funcionalidad táctil con retroalimentación visual
        const handleTouchStart = (e: React.TouchEvent) => {
            if (isTransitioning || isReturning) return;
            setIsDragging(true);
            touchStartX.current = e.touches[0].clientX;
            setDragOffset(0);
        };

        const handleTouchMove = (e: React.TouchEvent) => {
            if (touchStartX.current === null || isTransitioning || isReturning) return;

            const currentX = e.touches[0].clientX;
            const diff = currentX - touchStartX.current;
            const containerWidth = getContainerWidth();

            // En modo sin loop, limitar el arrastre en los extremos
            if (!loop) {
                if ((activeIndex === 0 && diff > 0) || (activeIndex === totalItems - visibleItems && diff < 0)) {
                    // Permitir un pequeño arrastre con resistencia en los extremos
                    const resistedDiff = diff * 0.2;
                    setDragOffset(resistedDiff);
                    return;
                }
            }

            // Limitar arrastre a un ancho de diapositiva en cualquier dirección
            const maxDrag = containerWidth;
            const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

            setDragOffset(limitedDiff);
        };

        const handleTouchEnd = (e: React.TouchEvent) => {
            if (touchStartX.current === null || isTransitioning || isReturning) return;

            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX.current - touchEndX;
            const containerWidth = getContainerWidth();
            const threshold = containerWidth * 0.2; // 20% del ancho del contenedor

            // Asegurarnos de que estamos en un estado limpio antes de cualquier transición
            setIsDragging(false);
            // Verificar si el arrastre fue suficiente para cambiar de diapositiva
            if (Math.abs(diff) > threshold) {
                // Umbral para deslizar
                if (diff > 0) {
                    // En modo sin loop, verificar si estamos en la última diapositiva
                    if (!loop && activeIndex >= totalItems - visibleItems) {
                        // Regresar suavemente a la posición original
                        setIsReturning(true);
                        setDragOffset(0);
                        setTimeout(() => setIsReturning(false), 300);
                    } else {
                        // Al arrastrar, avanzar solo 1 elemento para una experiencia más natural
                        setDragOffset(0);
                        handleSlideChange(activeIndex + 1);
                    }
                } else {
                    // En modo sin loop, verificar si estamos en la primera diapositiva
                    if (!loop && activeIndex <= 0) {
                        // Regresar suavemente a la posición original
                        setIsReturning(true);
                        setDragOffset(0);
                        setTimeout(() => setIsReturning(false), 300);
                    } else {
                        // Al arrastrar, retroceder solo 1 elemento para una experiencia más natural
                        setDragOffset(0);
                        handleSlideChange(activeIndex - 1);
                    }
                }
            } else {
                // Si no se arrastró lo suficiente, regresar suavemente a la posición original
                setIsReturning(true);
                setDragOffset(0);
                setTimeout(() => setIsReturning(false), 300);
            }

            touchStartX.current = null;
            //setIsDragging(false);
        };

        // Funcionalidad de arrastre con mouse con retroalimentación visual
        const handleMouseDown = (e: React.MouseEvent) => {
            if (isTransitioning || isReturning) return;
            setIsDragging(true);
            console.log("MOUSE START DRAG");
            touchStartX.current = e.clientX;
            setDragOffset(0);

            const handleMouseMove = (e: MouseEvent) => {
                if (touchStartX.current === null || isTransitioning || isReturning) return;

                const currentX = e.clientX;
                const diff = currentX - touchStartX.current;
                const containerWidth = getContainerWidth();

                // En modo sin loop, limitar el arrastre en los extremos
                if (!loop) {
                    if ((activeIndex === 0 && diff > 0) || (activeIndex === totalItems - visibleItems && diff < 0)) {
                        // Permitir un pequeño arrastre con resistencia en los extremos
                        const resistedDiff = diff * 0.2;
                        setDragOffset(resistedDiff);
                        return;
                    }
                }

                // Limitar arrastre a un ancho de diapositiva en cualquier dirección
                const maxDrag = containerWidth;
                const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

                setDragOffset(limitedDiff);
            };

            const handleMouseUp = (e: MouseEvent) => {
                if (touchStartX.current === null || isTransitioning || isReturning) return;

                const diff = touchStartX.current - e.clientX;
                const containerWidth = getContainerWidth();
                const threshold = containerWidth * 0.2; // 20% del ancho del contenedor

                // Verificar si el arrastre fue suficiente para cambiar de diapositiva
                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        // En modo sin loop, verificar si estamos en la última diapositiva
                        if (!loop && activeIndex >= totalItems - visibleItems) {
                            // Regresar suavemente a la posición original
                            setIsReturning(true);
                            setDragOffset(0);
                            setTimeout(() => setIsReturning(false), 300);
                        } else {
                            // Al arrastrar, avanzar solo 1 elemento para una experiencia más natural
                            handleSlideChange(activeIndex + 1);
                        }
                    } else {
                        // En modo sin loop, verificar si estamos en la primera diapositiva
                        if (!loop && activeIndex <= 0) {
                            // Regresar suavemente a la posición original
                            setIsReturning(true);
                            setDragOffset(0);
                            setTimeout(() => setIsReturning(false), 300);
                        } else {
                            // Al arrastrar, retroceder solo 1 elemento para una experiencia más natural
                            handleSlideChange(activeIndex - 1);
                        }
                    }
                } else {
                    // Si no se arrastró lo suficiente, regresar suavemente a la posición original
                    setIsReturning(true);
                    setDragOffset(0);
                    setTimeout(() => setIsReturning(false), 300);
                }

                touchStartX.current = null;
                setDragOffset(0);
                setIsDragging(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        // Calcular transformación con desplazamiento de arrastre
        const getTransformStyle = () => {
            // Calcular el ancho de cada elemento como porcentaje del contenedor
            const itemWidth = 100 / visibleItems;
            // Calcular la transformación base
            const baseTransform = -activeIndex * itemWidth;
            // Calcular el desplazamiento de arrastre como porcentaje
            const dragPercent = (dragOffset / getContainerWidth()) * 100;
            return `translateX(${baseTransform + dragPercent}%)`;
        };

        // Determinar si los botones de navegación deben estar deshabilitados
        const isPrevDisabled = !loop && activeIndex <= 0;
        const isNextDisabled = !loop && activeIndex >= totalItems - visibleItems;

        // Calcular el ancho de cada elemento como porcentaje
        const itemWidth = 100 / visibleItems;

        // Calcular el número de grupos para los dots según itemsToScroll
        const totalGroups = Math.ceil((totalItems - visibleItems + 1) / effectiveSlidesToScroll);

        return (
            <div
                className={clsx(styles["lambda-carousel"], className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={style}
                role={role}
                aria-label={ariaLabel}
                ref={containerRef ?? ref}
                {...restProps}
            >
                {/* Contenedor del carousel */}
                <div className={clsx(styles["lambda-carousel-drawer"])}>
                    <div
                        className={carouselContainerVariants({ isDragging, isReturning, isTransitioning })}
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
                                style={{ width: `${itemWidth}%` }}
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
                    className={clsx(styles["lambda-carousel-button"], styles["lambda-carousel-button-prev"])}
                    size="tiny"
                    onClick={prevSlide}
                    disabled={isTransitioning || isReturning || isPrevDisabled}
                    aria-label="Anterior"
                    icon={<ChevronLeft />}
                />

                <Button
                    variant="text"
                    color="secondary"
                    className={clsx(styles["lambda-carousel-button"], styles["lambda-carousel-button-next"])}
                    size="tiny"
                    onClick={nextSlide}
                    disabled={isTransitioning || isReturning || isNextDisabled}
                    aria-label="Siguiente"
                    icon={<ChevronRight />}
                />

                {/* Indicadores (dots) - Ajustados según itemsToScroll */}
                <div className={styles["lambda-carousel-pagination"]}>
                    {Array.from({ length: totalGroups }).map((_, groupIndex) => {
                        // Calcular si este grupo de diapositivas está activo
                        const startIdx = groupIndex * effectiveSlidesToScroll;
                        const normalizedActiveIndex = loop ? activeIndex - visibleItems : activeIndex;
                        const isActive =
                            normalizedActiveIndex >= startIdx && normalizedActiveIndex < startIdx + effectiveSlidesToScroll;

                        return (
                            <button
                                key={groupIndex}
                                className={clsx(styles["lambda-carousel-dot"], { [styles["lambda-carousel-dot-active"]]: isActive })}
                                onClick={() => goToSlide(groupIndex)}
                                disabled={isTransitioning || isReturning}
                                aria-label={`Ir al grupo de diapositivas ${groupIndex + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        );
    });