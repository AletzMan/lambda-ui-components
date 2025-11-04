import { RefObject, useEffect, useState } from "react";
import { CarouselOrientation } from "../carousel.types";
import styles from "../carousel.module.css";

interface ThumbnailControl {
	orientation: CarouselOrientation | undefined;
	showPagination: boolean;
	visualIndex: number;
	thumbnailTouchStartPos: RefObject<{ x: number; y: number } | null>;
	thumbnailsContainerRef: RefObject<HTMLDivElement | null>;
}

export const useThumbnalControl = ({
	orientation,
	showPagination,
	visualIndex,
	thumbnailTouchStartPos,
	thumbnailsContainerRef,
}: ThumbnailControl) => {
	const [isThumbnailDragging, setIsThumbnailDragging] = useState(false);

	// Efecto para centrar automáticamente la miniatura activa cuando cambia
	useEffect(() => {
		if (!showPagination || !thumbnailsContainerRef.current) return;

		const thumbnailsContainer = thumbnailsContainerRef.current;
		const activeThumbnail = thumbnailsContainer.querySelector(
			`.${styles["lambda-carousel-thumbnails-item-active"]}`
		) as HTMLElement;

		if (!activeThumbnail) return;

		// Obtener las dimensiones del contenedor y la miniatura
		const containerRect = thumbnailsContainer.getBoundingClientRect();
		const thumbnailRect = activeThumbnail.getBoundingClientRect();

		// Calcular si la miniatura está visible en el contenedor
		let isVisible = false;
		let scrollPosition = 0;

		if (orientation === "vertical") {
			// Modo vertical
			isVisible =
				thumbnailRect.top >= containerRect.top - 10 &&
				thumbnailRect.bottom <= containerRect.bottom + 10;

			if (!isVisible) {
				// Calcular la posición de scroll para centrar la miniatura
				scrollPosition =
					activeThumbnail.offsetTop - containerRect.height / 2 + thumbnailRect.height / 2;

				// Asegurarse de que la posición no sea negativa
				scrollPosition = Math.max(0, scrollPosition);

				thumbnailsContainer.scrollTo({
					top: scrollPosition,
					behavior: isThumbnailDragging ? "auto" : "smooth",
				});
			}
		} else {
			// Modo horizontal
			isVisible =
				thumbnailRect.left >= containerRect.left - 10 &&
				thumbnailRect.right <= containerRect.right + 10;

			if (!isVisible) {
				// Calcular la posición de scroll para centrar la miniatura
				scrollPosition =
					activeThumbnail.offsetLeft - containerRect.width / 2 + thumbnailRect.width / 2;

				// Asegurarse de que la posición no sea negativa
				scrollPosition = Math.max(0, scrollPosition);

				thumbnailsContainer.scrollTo({
					left: scrollPosition,
					behavior: isThumbnailDragging ? "auto" : "smooth",
				});
			}
		}
	}, [visualIndex, showPagination, orientation, isThumbnailDragging, thumbnailsContainerRef]);

	// Asegurar que las miniaturas estén visibles desde el inicio
	useEffect(() => {
		if (!showPagination || !thumbnailsContainerRef.current) return;

		// Resetear el scroll al inicio para asegurar que las primeras miniaturas sean visibles
		if (orientation === "vertical") {
			thumbnailsContainerRef.current.scrollTop = 0;
		} else {
			thumbnailsContainerRef.current.scrollLeft = 0;
		}
	}, [showPagination, orientation, thumbnailsContainerRef]);

	// Funcionalidad de arrastre para miniaturas
	const handleThumbnailTouchStart = (e: React.TouchEvent) => {
		// Evitar que se propague al carousel principal
		e.stopPropagation();

		setIsThumbnailDragging(true);
		thumbnailTouchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
	};

	const handleThumbnailTouchMove = (e: React.TouchEvent) => {
		// Evitar que se propague al carousel principal
		e.stopPropagation();

		if (!thumbnailTouchStartPos.current) return;

		const currentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
		// Usar coordenada X o Y según la orientación
		const diff =
			orientation === "vertical"
				? currentPos.y - thumbnailTouchStartPos.current.y
				: currentPos.x - thumbnailTouchStartPos.current.x;

		// Permitir el desplazamiento natural del contenedor de miniaturas
		if (thumbnailsContainerRef.current) {
			if (orientation === "vertical") {
				thumbnailsContainerRef.current.scrollTop -= diff;
			} else {
				thumbnailsContainerRef.current.scrollLeft -= diff;
			}
		}

		// Actualizar la posición de inicio para el próximo movimiento
		thumbnailTouchStartPos.current = { x: currentPos.x, y: currentPos.y };
	};

	const handleThumbnailTouchEnd = (e: React.TouchEvent) => {
		// Evitar que se propague al carousel principal
		e.stopPropagation();

		setIsThumbnailDragging(false);
		thumbnailTouchStartPos.current = null;
	};

	const handleThumbnailMouseDown = (e: React.MouseEvent) => {
		// Evitar que se propague al carousel principal
		e.stopPropagation();

		setIsThumbnailDragging(true);
		thumbnailTouchStartPos.current = { x: e.clientX, y: e.clientY };

		const handleThumbnailMouseMove = (e: MouseEvent) => {
			if (!thumbnailTouchStartPos.current) return;

			const currentPos = { x: e.clientX, y: e.clientY };
			// Usar coordenada X o Y según la orientación
			const diff =
				orientation === "vertical"
					? currentPos.y - thumbnailTouchStartPos.current.y
					: currentPos.x - thumbnailTouchStartPos.current.x;

			// Permitir el desplazamiento natural del contenedor de miniaturas
			if (thumbnailsContainerRef.current) {
				if (orientation === "vertical") {
					thumbnailsContainerRef.current.scrollTop -= diff;
				} else {
					thumbnailsContainerRef.current.scrollLeft -= diff;
				}
			}

			// Actualizar la posición de inicio para el próximo movimiento
			thumbnailTouchStartPos.current = { x: currentPos.x, y: currentPos.y };
		};

		const handleThumbnailMouseUp = () => {
			setIsThumbnailDragging(false);
			thumbnailTouchStartPos.current = null;
			document.removeEventListener("mousemove", handleThumbnailMouseMove);
			document.removeEventListener("mouseup", handleThumbnailMouseUp);
		};

		document.addEventListener("mousemove", handleThumbnailMouseMove);
		document.addEventListener("mouseup", handleThumbnailMouseUp);
	};

	return {
		handleThumbnailTouchStart,
		handleThumbnailTouchMove,
		handleThumbnailTouchEnd,
		handleThumbnailMouseDown,
	};
};
