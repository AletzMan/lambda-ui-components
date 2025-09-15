import { forwardRef, useRef } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselProps, Breakpoint } from "./carousel.types";
import { Button } from "../Button/Button";
import styles from "./carousel.module.css";
import {
	carouselButtonVariants,
	carouselContainerVariants,
	carouselDotVariants,
	carouselDrawerVariants,
	carouselPaginationVariants,
	carouselThumbnailsVariants,
	carouselVariants,
} from "./carousel.variants";
import { useThumbnalControl } from "./hooks/useThumbnailControl";
import { useSliderControl } from "./hooks/useSliderConrol";

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
			showNavigationButtons = true,
			showPagination = true,
			role = "region",
			"aria-label": ariaLabel,
			autoPlay,
			className,
			transitionDuration = 5000,
			orientation,
			slideMode,
			style,
			loop = false,
			paginationType,
			dotType,
			...restProps
		},
		ref
	) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const slideRef = useRef<HTMLDivElement>(null);
		const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
		const thumbnailTouchStartPos = useRef<{ x: number; y: number } | null>(null);
		const {
			skipTransition,
			totalItems,
			allSlides,
			visualIndex,
			positionThumbnail,
			realItems,
			isDragging,
			isReturning,
			isTransitioning,
			nextSlide,
			prevSlide,
			goToSlide,
			getTransformStyle,
			activeIndex,
			visibleItems,
			handleMouseDown,
			handleMouseEnter,
			handleMouseLeave,
			handleTouchEnd,
			handleTouchMove,
			handleTouchStart,
		} = useSliderControl({
			autoPlay,
			breakpoints,
			children,
			loop,
			orientation,
			paginationType,
			slideMode,
			transitionDuration,
			containerRef,
			slideRef,
			thumbnailsContainerRef,
		});
		const {
			handleThumbnailMouseDown,
			handleThumbnailTouchEnd,
			handleThumbnailTouchMove,
			handleThumbnailTouchStart,
		} = useThumbnalControl({
			orientation,
			showPagination,
			visualIndex,
			thumbnailTouchStartPos,
			thumbnailsContainerRef,
		});

		// Determinar si los botones de navegación deben estar deshabilitados
		const isPrevDisabled = !loop && activeIndex <= 0;
		const isNextDisabled = !loop && activeIndex >= totalItems - visibleItems;

		// Calcular el tamaño de cada elemento como porcentaje
		const itemSize = 100 / visibleItems;

		const renderPagination = () => {
			if (paginationType === "thumbnail") {
				// Paginación con miniaturas
				return (
					<div
						className={carouselThumbnailsVariants({
							orientation,
							position: positionThumbnail,
							showNavigationButtons,
						})}
						ref={thumbnailsContainerRef}
						onTouchStart={handleThumbnailTouchStart}
						onTouchMove={handleThumbnailTouchMove}
						onTouchEnd={handleThumbnailTouchEnd}
						onMouseDown={handleThumbnailMouseDown}
					>
						{Array.from({ length: totalItems }).map((_, index) => {
							// Determinar si esta miniatura está activa usando visualIndex
							const isActive = visualIndex === index;

							return (
								<div
									key={index}
									className={clsx(styles["lambda-carousel-thumbnails-item"], {
										[styles["lambda-carousel-thumbnails-item-active"]]: isActive,
									})}
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

				if (slideMode === "single") {
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

							if (slideMode === "single") {
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
									className={clsx(
										carouselDotVariants({ active: isActive, type: dotType, orientation })
									)}
									onClick={() => goToSlide(getSlideIndexForDot(dotIndex))}
									disabled={isTransitioning || isReturning}
									attr-index={dotIndex + 1}
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
				className={clsx(
					carouselVariants({ paginationType, orientation, showPagination, showNavigationButtons }),
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={style}
				role={role}
				aria-label={ariaLabel}
				ref={containerRef ?? ref}
				tabIndex={0}
				{...restProps}
			>
				{/* Contenedor del carousel */}
				<div className={clsx(carouselDrawerVariants({ orientation, paginationType }))}>
					<div
						className={carouselContainerVariants({
							isDragging,
							isReturning,
							isTransitioning: isTransitioning && !skipTransition,
							orientation,
							skipTransition,
							stable: !isDragging && !isReturning && !isTransitioning && !skipTransition,
						})}
						style={{ transform: getTransformStyle() }}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						onMouseDown={handleMouseDown}
						ref={slideRef}
					>
						{allSlides &&
							allSlides.map((item, index) => (
								<div
									key={index}
									className={clsx(styles["lambda-carousel-item"])}
									style={
										orientation === "vertical"
											? { height: `${itemSize}%` }
											: { width: `${itemSize}%` }
									}
								>
									<div className={clsx(styles["lambda-carousel-item-inner"])}>{item}</div>
								</div>
							))}
					</div>
				</div>

				{/* Botones de navegación */}
				{showNavigationButtons && (
					<Button
						variant="text"
						color="neutral"
						className={clsx(
							carouselButtonVariants({ position: "prev", orientation, paginationType })
						)}
						size="tiny"
						onClick={prevSlide}
						disabled={isTransitioning || isReturning || isPrevDisabled}
						aria-label="Anterior"
						icon={<ChevronLeft />}
					/>
				)}

				{showNavigationButtons && (
					<Button
						variant="text"
						color="neutral"
						className={clsx(
							carouselButtonVariants({ position: "next", orientation, paginationType })
						)}
						size="tiny"
						onClick={nextSlide}
						disabled={isTransitioning || isReturning || isNextDisabled}
						aria-label="Siguiente"
						icon={<ChevronRight />}
					/>
				)}
				{showPagination && renderPagination()}
			</div>
		);
	}
);
