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
import { X as CloseIcon } from "lucide-react";

import styles from "./Drawer.module.css";
import { DrawerPlacement, DrawerProps, DrawerState } from "./drawer.types";
import { drawerOverlayVariants, drawerPanelVariants } from "./drawer.variants";
import { Button } from "../Button/Button";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

let portalContainer: HTMLElement | null = null;

// Función helper para crear o obtener el contenedor del portal.
const getPortalContainer = (placement: DrawerPlacement) => {
	if (!portalContainer) {
		// Si no existe, crearlo y añadirlo al cuerpo del documento
		portalContainer = document.createElement("div");
		portalContainer.classList.add(styles["lambda-drawer-portal-container"]);
		portalContainer.setAttribute("data-placement", placement || "left");
		document.body.appendChild(portalContainer);
	} else {
		// Si ya existe, actualizar el atributo data-placement si ha cambiado
		if (portalContainer.getAttribute("data-placement") !== placement) {
			portalContainer.setAttribute("data-placement", placement || "left");
		}
	}
	return portalContainer;
};

// (Lógica simple, considerar un manager más robusto si múltiples drawers comparten contenedor)
const cleanupPortalContainer = () => {
	if (portalContainer && document.body.contains(portalContainer)) {
		document.body.removeChild(portalContainer);
		portalContainer = null;
	}
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
	(
		{
			isOpen,
			onClose,
			children,
			title,
			footer,
			placement,
			backdropType,
			size,
			closeOnOverlayClick = true,
			closeOnEscape = true,
			showCloseButton = true,
			width = "small",
			initialFocusRef,
			overlayClassName,
			panelClassName,
			headerClassName,
			bodyClassName,
			footerClassName,
			...rest
		},
		ref // Ref para el contenedor principal del Portal (opcionalmente)
	) => {
		// Estado interno para controlar la fase de la animación
		const [animationState, setAnimationState] = useState<DrawerState>("exited");
		const shouldRender = animationState !== "exited";
		const drawerPanelRef = useRef<HTMLDivElement>(null);
		const titleId = "drawer-title-" + useId();
		const { radiusBox } = useUIConfig();

		// --- Efecto principal para gestionar la transición de estados de animación ---
		useEffect(() => {
			if (isOpen) {
				// Si se abre, pasar al estado 'entering' inmediatamente
				setAnimationState("entering");

				// La transición a 'entered' se maneja en el useLayoutEffect con un timeout.
			} else {
				// Si se cierra, pasar al estado 'exiting' inmediatamente
				setAnimationState("exiting");

				// Después de la duración de la animación de salida, pasar al estado 'exited'
				const timer = setTimeout(() => {
					setAnimationState("exited");
				}, 300);

				return () => clearTimeout(timer);
			}
		}, [isOpen]);

		// --- useLayoutEffect para manejar la transición de 'entering' a 'entered' con timeout ---
		useLayoutEffect(() => {
			let timer: number | undefined;
			if (animationState === "entering") {
				// El DOM se ha actualizado con los estilos para 'entering' (posición inicial, opacidad 0).
				timer = window.setTimeout(() => {
					setAnimationState("entered");
				}, 50);
			}
			// Limpieza: Limpiar el timeout si el estado cambia (ej. el drawer se cierra antes de que termine la animación de entrada)
			return () => {
				if (timer) {
					clearTimeout(timer);
				}
			};
			// Este efecto solo necesita reaccionar a cambios en 'animationState', especialmente cuando pasa a 'entering'.
		}, [animationState]);

		// --- Efecto para manejar el foco inicial al abrir y controlar scroll del body ---
		useEffect(() => {
			let timer: number | undefined;
			if (animationState === "entered") {
				// Cuando el drawer está completamente abierto y animado:
				if (initialFocusRef?.current) {
					// Si se proporcionó una ref de foco inicial, intentar enfocar ese elemento.
					initialFocusRef.current.focus();
				} else if (drawerPanelRef.current) {
					// Si no hay initialFocusRef, enfocar el panel del drawer mismo.
					drawerPanelRef.current.focus();
				}
				// *** Deshabilitar scroll del body cuando el drawer está abierto ***
				document.body.style.overflow = "hidden";
			} else if (animationState === "exited") {
				// *** Re-habilitar scroll del body cuando el drawer está cerrado ***
				timer = window.setTimeout(() => {
					document.body.style.overflow = "";
				}, 50);
			}

			// Limpieza: Asegurar que el scroll del body se re-habilite al desmontar el componente
			return () => {
				clearTimeout(timer);
			};
		}, [animationState, initialFocusRef]);

		// --- Handlers de eventos ---

		// Handler para cerrar el drawer cuando se hace clic en el overlay. (Igual que Dialog)
		const handleOverlayClick = useCallback(
			(event: React.MouseEvent<HTMLDivElement>) => {
				if (closeOnOverlayClick && event.target === event.currentTarget) {
					onClose();
				}
			},
			[closeOnOverlayClick, onClose]
		);

		// Handler para cerrar el drawer cuando se presiona la tecla Escape. (Igual que Dialog)
		const handleKeyDown = useCallback(
			(event: KeyboardEvent) => {
				if (closeOnEscape && event.key === "Escape") {
					event.stopPropagation();
					onClose();
				}
			},
			[closeOnEscape, onClose]
		);

		// Handler para el botón de cerrar dentro del drawer. (Igual que Dialog)
		const handleCloseButtonClick = useCallback(() => {
			onClose();
		}, [onClose]);

		// --- Efecto para añadir/remover listener de teclado global (Escape) --- (Igual que Dialog)
		// Añade el listener solo cuando el drawer está completamente abierto y animado ('entered').
		useEffect(() => {
			// El listener solo se añade/remueve cuando el estado pasa a 'entered' o sale de 'entered'.
			if (animationState === "entered") {
				document.addEventListener("keydown", handleKeyDown);
			}
			// Limpieza: Asegurarse de que el listener siempre se remueva al desmontar el componente.
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}, [animationState, handleKeyDown]);

		// --- Efecto para gestionar la creación/limpieza del contenedor del Portal en el DOM ---
		useEffect(() => {
			const container = getPortalContainer(placement);
			return () => {
				if (document.body.contains(container)) {
					document.body.removeChild(container);
					portalContainer = null;
					cleanupPortalContainer();
				}
			};
		}, [placement]);

		// --- Renderizado ---
		// Si el estado de animación es 'exited', no renderizamos nada en el Portal.
		if (!shouldRender) {
			return null;
		}

		// Usar createPortal para renderizar el drawer y su overlay fuera de la jerarquía DOM normal.
		return ReactDOM.createPortal(
			<div ref={ref} className={styles["lambda-drawer-portal-wrapper"]} {...rest}>
				{/* Overlay: El fondo oscuro detrás del drawer */}
				<div
					className={clsx(
						styles["lambda-drawer-overlay"],
						drawerOverlayVariants({ state: animationState, backdropType }),
						overlayClassName
					)}
					onClick={handleOverlayClick}
					aria-hidden="true"
				></div>

				{/* Panel del Drawer: La caja que desliza */}
				<div
					ref={drawerPanelRef}
					className={clsx(
						styles["lambda-drawer-panel"],
						drawerPanelVariants({ state: animationState, placement, width, radius: radiusBox }),
						panelClassName
					)}
					role="dialog"
					aria-modal="true"
					aria-labelledby={title ? titleId : undefined}
					tabIndex={-1}
					// *** Aplicar el tamaño (width o height) usando inline style basado en la prop size ***
					style={{
						...(placement === "left" || placement === "right" ? { width: size } : {}),
						...(placement === "top" || placement === "bottom" ? { height: size } : {}),
					}}
				>
					{/* Sección del Encabezado */}
					{(title || showCloseButton) && (
						<div className={clsx(styles["lambda-drawer-header"], headerClassName)}>
							{/* Título */}
							{title && (
								<div
									id={title ? titleId : undefined}
									className={styles["lambda-drawer-header-title"]}
								>
									{title}
								</div>
							)}
							{/* Botón de cerrar */}
							{showCloseButton && (
								<Button
									variant="text"
									size="small"
									color="danger"
									icon={<CloseIcon />}
									className={styles["lambda-drawer-close-button"]}
									onClick={handleCloseButtonClick}
									aria-label="Cerrar drawer"
								/>
							)}
						</div>
					)}

					{/* Sección del Cuerpo */}
					<div className={clsx(styles["lambda-drawer-body"], bodyClassName, "scrollBar")}>
						{children} {/* Renderiza el contenido pasado al componente */}
					</div>

					{/* Sección del Pie */}
					{footer && (
						<div className={clsx(styles["lambda-drawer-footer"], footerClassName)}>
							{footer} {/* Renderiza el contenido pasado al componente */}
						</div>
					)}
				</div>
			</div>,
			getPortalContainer(placement)
		);
	}
);
