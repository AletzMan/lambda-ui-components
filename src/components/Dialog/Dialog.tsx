import React, { forwardRef, useCallback, useRef, useState, useEffect, useId } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import styles from "./dialog.module.css";
import { DialogProps, TransitionOptions } from "./dialog.types";
import { dialogOverlayVariants, dialogPanelVariants } from "./dialog.variants";
import { XIcon } from "lucide-react";
import { Button } from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";

let portalContainer: HTMLElement | null = null;

// Función helper para crear o obtener el contenedor del portal.
const getPortalContainer = () => {
	if (typeof document === "undefined") return null;
	if (!portalContainer) {
		portalContainer = document.createElement("div");
		portalContainer.classList.add(styles["lambda-dialog-portal-container"]);
		document.body.appendChild(portalContainer);
	}
	return portalContainer;
};

// --- Componente Dialog ---
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	(
		{
			isOpen,
			onClose,
			children,
			title,
			footer,
			closeOnEscape = true,
			showCloseButton = true,
			initialFocusRef,
			overlayClassName,
			panelClassName,
			headerClassName,
			bodyClassName,
			footerClassName,
			backdropType,
			transitionMode,
			isModal = false,
			isDraggable = false,
			...rest
		},
		ref
	) => {
		const dialogPanelRef = useRef<HTMLDivElement>(null);
		const idDialog = "dialog-" + useId();
		const [modalAnimation, setModalAnimation] = useState(false);
		const [isDragging, setIsDragging] = useState(false);
		const [offset, setOffset] = useState({ x: 0, y: 0 });
		const [startPos, setStartPos] = useState({ x: 0, y: 0 });
		const [mounted, setMounted] = useState(false);
		const [container, setContainer] = useState<HTMLElement | null>(null);

		useEffect(() => {
			setMounted(true);
			setContainer(getPortalContainer());
		}, []);

		// --- Lógica de arrastre ---
		const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
			// Asegúrate de que solo el clic en el encabezado inicie el arrastre
			const headerElement = e.currentTarget;
			if (e.target !== headerElement) {
				return;
			}

			if (dialogPanelRef.current) {
				// Usa getBoundingClientRect() para obtener la posición exacta del panel
				const rect = dialogPanelRef.current.getBoundingClientRect();
				setStartPos({
					x: rect.left,
					y: rect.top,
				});
				// Guarda la distancia entre el cursor y el borde del panel.
				setOffset({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});

				setIsDragging(true);
			}
		}, []);

		const handleMouseMove = useCallback(
			(e: MouseEvent) => {
				if (!isDragging || !dialogPanelRef.current) return;

				// Altura y ancho del panel
				const panelWidth = dialogPanelRef.current.offsetWidth;
				const panelHeight = dialogPanelRef.current.offsetHeight;

				// Limites del viewport
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;

				// Calcula la nueva posición
				let newLeft = startPos.x + (e.clientX - (startPos.x + offset.x));
				let newTop = startPos.y + (e.clientY - (startPos.y + offset.y));

				// Aplica los límites
				newLeft = Math.max(0, Math.min(newLeft, viewportWidth - panelWidth));
				newTop = Math.max(0, Math.min(newTop, viewportHeight - panelHeight));

				dialogPanelRef.current.style.left = `${newLeft}px`;
				dialogPanelRef.current.style.top = `${newTop}px`;
			},
			[isDragging, offset, startPos]
		);

		const handleMouseUp = useCallback(() => {
			setIsDragging(false);
		}, []);

		// Handler para cerrar el diálogo cuando se hace clic en el overlay.
		const handleOverlayClick = useCallback(
			(event: React.MouseEvent<HTMLDivElement>) => {
				if (event.target === event.currentTarget && !isModal) {
					onClose();
				} else {
					dialogPanelRef.current?.classList.add("lambda-dialog-panel-modal");
					setModalAnimation(true);
					setTimeout(() => {
						dialogPanelRef.current?.classList.remove("lambda-dialog-panel-modal");
						setModalAnimation(false);
					}, 500);
				}
			},
			[onClose, isModal]
		);

		// Handler para cerrar el diálogo cuando se presiona la tecla Escape.
		const handleKeyDown = useCallback(
			(event: KeyboardEvent) => {
				if (closeOnEscape && event.key === "Escape") {
					event.stopPropagation();
					onClose();
				}
			},
			[closeOnEscape, onClose]
		);

		const handleCloseButtonClick = useCallback(() => {
			onClose();
		}, [onClose]);

		// --- Efecto para los eventos de movimiento globales ---
		useEffect(() => {
			document.addEventListener("keydown", handleKeyDown);

			if (isDragging) {
				document.addEventListener("mousemove", handleMouseMove);
				document.addEventListener("mouseup", handleMouseUp);
			}

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
				document.removeEventListener("keydown", handleKeyDown);
			};
		}, [isDragging, handleMouseMove, handleMouseUp]);

		// --- Efecto para gestionar la creación/limpieza del contenedor del Portal en el DOM ---
		useEffect(() => {
			if (typeof document === "undefined") return;
			const container = getPortalContainer();

			return () => {
				if (container && document.body.contains(container)) {
					document.body.removeChild(container);
					portalContainer = null;
				}
			};
		}, []);

		const variantTransition: TransitionOptions = {
			fade: {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: {
					ease: "easeInOut",
					duration: 0.3,
				},
			},
			unfold: {
				initial: { opacity: 0, scaleY: 0.5 },
				animate: { opacity: 1, scaleY: 1 },
				exit: { opacity: 0, scaleY: 0.5 },
				transition: { type: "spring", stiffness: 400, damping: 25 },
			},
			scaleUp: {
				initial: { opacity: 0, scale: 0.5 },
				animate: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0.5 },
				transition: { type: "spring", stiffness: 400, damping: 25 },
			},
			fadeFromTop: {
				initial: { opacity: 0, y: -20 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -20 },
				transition: { type: "spring", stiffness: 400, damping: 25 },
			},
			fadeFromBottom: {
				initial: { opacity: 0, y: 20 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 20 },
				transition: { type: "spring", stiffness: 400, damping: 25 },
			},
			fadeFromLeft: {
				initial: { opacity: 0, x: -20 },
				animate: { opacity: 1, x: 0 },
				exit: { opacity: 0, x: -20 },
				transition: { type: "spring", stiffness: 400, damping: 25 },
			},
			fadeFromRight: {
				initial: { opacity: 0, x: 20 },
				animate: { opacity: 1, x: 0 },
				exit: { opacity: 0, x: 20 },
				transition: { type: "spring", stiffness: 400, damping: 25 },
			},
			undefined: {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { type: "spring", stiffness: 400, damping: 25 },
			},
		};

		if (!mounted || !container) return null;
		// --- Renderizado ---
		// Si el estado de animación es 'exited', no renderizamos nada en el Portal.
		return ReactDOM.createPortal(
			<AnimatePresence initial={false}>
				{isOpen && (
					<div ref={ref} className={styles["lambda-dialog-portal-wrapper"]} {...rest}>
						{/* Overlay animado */}
						<motion.div
							key="overlay"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							className={clsx(dialogOverlayVariants({ isModal, backdropType }), overlayClassName)}
							onClick={handleOverlayClick}
						/>

						{/* Panel animado */}
						<motion.div
							key="panel"
							initial={variantTransition[transitionMode || "scaleUp"].initial}
							animate={variantTransition[transitionMode || "scaleUp"].animate}
							exit={variantTransition[transitionMode || "scaleUp"].exit}
							transition={variantTransition[transitionMode || "scaleUp"].transition}
							ref={dialogPanelRef}
							className={clsx(
								dialogPanelVariants({
									isModal: modalAnimation,
									isDraggable,
								}),
								panelClassName
							)}
							role="dialog"
							aria-modal="true"
							aria-labelledby={title ? idDialog : undefined}
							tabIndex={-1}
						>
							{/* Sección del Encabezado */}
							{(title || showCloseButton) && (
								<header
									className={clsx(styles["lambda-dialog-header"], headerClassName)}
									onMouseDown={isDraggable ? handleMouseDown : undefined}
								>
									{/* Título */}
									{title && (
										<div
											id={title ? idDialog : undefined}
											className={styles["lambda-dialog-header-title"]}
										>
											{title}
										</div>
									)}
									{/* Botón de cerrar */}
									{showCloseButton && (
										<Button
											className={styles["lambda-dialog-close-button"]}
											variant="text"
											color="danger"
											icon={<XIcon />}
											onClick={handleCloseButtonClick}
											aria-label="Cerrar diálogo"
											size="tiny"
										/>
									)}
								</header>
							)}

							{/* Sección del Cuerpo */}
							<article className={clsx(styles["lambda-dialog-body"], bodyClassName)}>
								{children}
							</article>

							{/* Sección del Pie */}
							{footer && (
								<footer className={clsx(styles["lambda-dialog-footer"], footerClassName)}>
									{footer}
								</footer>
							)}
						</motion.div>
					</div>
				)}
			</AnimatePresence>,
			getPortalContainer() || document.body
		);
	}
);
