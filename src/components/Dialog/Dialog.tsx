import React, {
	forwardRef,
	useCallback,
	useRef,
	useState,
	useEffect,
	useId,
	useLayoutEffect,
} from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import styles from "./dialog.module.css";
import { DialogProps, DialogState } from "./dialog.types";
import { dialogOverlayVariants, dialogPanelVariants } from "./dialog.variants";
import { XIcon } from "lucide-react";

let portalContainer: HTMLElement | null = null;

// Función helper para crear o obtener el contenedor del portal.
const getPortalContainer = () => {
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
			isModal = false,
			isDraggable = false,
			...rest
		},
		ref
	) => {
		// Estado interno para controlar la fase de la animación
		const [animationState, setAnimationState] = useState<DialogState>("exited");
		const shouldRender = animationState !== "exited";
		const dialogPanelRef = useRef<HTMLDivElement>(null);
		const idDialog = "dialog-" + useId();
		const [modalAnimation, setModalAnimation] = useState(false);
		const [isDragging, setIsDragging] = useState(false);
		const [offset, setOffset] = useState({ x: 0, y: 0 });
		const [startPos, setStartPos] = useState({ x: 0, y: 0 });

		// --- Efecto principal para gestionar la transición de estados de animación ---
		useEffect(() => {
			if (isOpen) {
				// Si la prop isOpen cambia a true:
				setAnimationState("entering");
			} else {
				// 1. Pasar al estado 'exiting' inmediatamente.
				setAnimationState("exiting");

				const timer = setTimeout(() => {
					setAnimationState("exited");
				}, 500);

				// Limpieza: Limpiar el timer si el componente se desmonta
				// o si isOpen cambia a true de nuevo antes de que termine la animación de salida.
				return () => {
					clearTimeout(timer);
				};
			}
		}, [isOpen]);

		// --- Efecto para manejar la transición de 'entering' a 'entered' ---
		useLayoutEffect(() => {
			if (animationState === "entering") {
				const timer = setTimeout(() => {
					setAnimationState("entered");
				}, 50);
				return () => {
					clearTimeout(timer);
				};
			}
		}, [animationState]);

		// --- Efecto para manejar el foco inicial al abrir ---
		useEffect(() => {
			if (animationState === "entered") {
				if (initialFocusRef?.current) {
					initialFocusRef.current.focus();
				} else if (dialogPanelRef.current) {
					dialogPanelRef.current.focus();
				}
			}
		}, [animationState, initialFocusRef]);

		// --- Handlers de eventos ---

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

		// --- Efecto para gestionar el listener de teclado global (Escape) ---
		useEffect(() => {
			// El listener solo se añade/remueve cuando el estado pasa a 'entered' o sale de 'entered'.
			if (animationState === "entered") {
				document.addEventListener("keydown", handleKeyDown);
			} else {
				document.removeEventListener("keydown", handleKeyDown);
			}

			// Limpieza: Asegurarse de que el listener siempre se remueva al desmontar el componente.
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}, [animationState, handleKeyDown]);

		// --- Efecto para los eventos de movimiento globales ---
		useEffect(() => {
			if (isDragging) {
				document.addEventListener("mousemove", handleMouseMove);
				document.addEventListener("mouseup", handleMouseUp);
			}

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}, [isDragging, handleMouseMove, handleMouseUp]);

		// --- Efecto para gestionar la creación/limpieza del contenedor del Portal en el DOM ---
		useEffect(() => {
			const container = getPortalContainer();

			return () => {
				if (document.body.contains(container)) {
					document.body.removeChild(container);
					portalContainer = null;
				}
			};
		}, []);

		// --- Renderizado ---
		// Si el estado de animación es 'exited', no renderizamos nada en el Portal.
		if (!shouldRender) {
			return null;
		}

		// Usar createPortal para renderizar el diálogo y su overlay fuera de la jerarquía DOM normal.
		return ReactDOM.createPortal(
			// El div principal dentro del portal. Este div envuelve el overlay y el panel.
			<div ref={ref} className={styles["lambda-dialog-portal-wrapper"]} {...rest}>
				{/* Overlay: El fondo oscuro detrás del diálogo */}
				<div
					className={clsx(
						dialogOverlayVariants({ state: animationState, isModal }),
						overlayClassName
					)}
					onClick={handleOverlayClick}
				></div>

				{/* Panel del Diálogo: La caja principal con el contenido */}
				<div
					ref={dialogPanelRef}
					className={clsx(
						dialogPanelVariants({ state: animationState, isModal: modalAnimation, isDraggable }),
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
								<button
									className={styles["lambda-dialog-close-button"]}
									onClick={handleCloseButtonClick}
									aria-label="Cerrar diálogo"
								>
									<XIcon />
								</button>
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
				</div>
			</div>,
			getPortalContainer()
		);
	}
);
