import React, { ReactSVGElement, forwardRef, useMemo } from "react";
import clsx from "clsx";
import {
	Info as InfoIcon,
	CheckCircle as SuccessIcon,
	AlertTriangle as WarningIcon,
	XCircle as DangerIcon,
	X as CloseIcon,
	MegaphoneIcon,
	BellIcon,
} from "lucide-react";

import styles from "./Alert.module.css";
import { AlertProps } from "./alert.types";
import { AlertVariants, alertVariants } from "./alert.variants";
import { useUIConfig } from "../../_internal/hooks/translation/ConfigProvider";

// --- Función helper para obtener el icono por defecto según la colore ---
const getDefaultIcon = (color: AlertVariants["color"]) => {
	switch (color) {
		case "success":
			return <SuccessIcon className={styles["lambda-alert-icon"]} />;
		case "warning":
			return <WarningIcon className={styles["lambda-alert-icon"]} />;
		case "danger":
			return <DangerIcon className={styles["lambda-alert-icon"]} />;
		case "info":
			return <InfoIcon className={styles["lambda-alert-icon"]} />;
		case "primary":
			return <BellIcon className={styles["lambda-alert-icon"]} />;
		case "neutral":
			return <MegaphoneIcon className={styles["lambda-alert-icon"]} />;
		default:
			return <InfoIcon className={styles["lambda-alert-icon"]} />;
	}
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
	(
		{
			color,
			variant,
			message,
			title,
			onClose,
			showIcon = true,
			customIcon,
			role = "status",
			size = "small",
			className,
			style,
			...restProps
		},
		ref
	) => {
		const { radiusBox } = useUIConfig();
		// Determinar si se debe mostrar algún icono
		const shouldShowIcon = showIcon || Boolean(customIcon);

		// Determinar qué icono mostrar (custom tiene prioridad sobre el por defecto)
		const renderedIcon = useMemo(() => {
			if (!shouldShowIcon) {
				return null;
			}
			// Si se proporciona un customIcon, usarlo directamente
			if (customIcon && color === "neutral") {
				// Asegurarse de que el customIcon tenga la clase de estilo si es necesario para el tamaño o color
				if (React.isValidElement(customIcon)) {
					return React.cloneElement(customIcon as ReactSVGElement, {
						className: clsx(
							(customIcon.props as React.HTMLAttributes<HTMLDivElement>).className,
							styles["lambda-alert-icon"]
						),
					});
				}
			}
			if (customIcon && color === "neutral") {
				// 1. Verificar si es un elemento React válido
				if (!React.isValidElement(customIcon)) {
					console.error("Error: customIcon debe ser un elemento React válido.");
					throw new Error("Invalid customIcon provided: Must be a valid React element.");
				}
			}
			// Si showIcon es true pero no hay customIcon, obtener el icono por defecto
			return getDefaultIcon(color);
		}, [shouldShowIcon, customIcon, color]);

		// Determinar si se debe mostrar el botón de cerrar (solo si se proporciona un handler onClose)
		const shouldShowCloseButton = Boolean(onClose);

		// --- Clases CSS ---
		// Combinar clase base, colore de color, y clase custom
		const alertClasses = clsx(
			styles["lambda-alert"],
			alertVariants({ color, size, variant, radius: radiusBox }),

			className
		);

		// --- ARIA Live Region ---
		// Si el role es "status" o "alert", añadir aria-live="polite" o "assertive"
		const ariaLive = role === "alert" ? "assertive" : "polite";

		return (
			// Contenedor principal del Alert (elemento div)
			<div
				ref={ref}
				className={alertClasses}
				style={style}
				role={role}
				aria-live={ariaLive}
				// Añadir otras props estándar de div si se pasaron
				{...restProps}
			>
				{/* Contenedor del icono (renderizado condicionalmente) */}
				{renderedIcon && (
					<div className={styles["lambda-alert-icon-container"]}>{renderedIcon}</div>
				)}
				<div className={styles["lambda-alert-content"]}>
					<span className={styles["lambda-alert-title"]}>{title}</span>
					{/* Contenedor del contenido del mensaje (flex-grow) */}
					<p className={styles["lambda-alert-message"]}>{message}</p>
				</div>

				{/* Botón de cerrar (renderizado condicionalmente si se proporciona onClose) */}
				{shouldShowCloseButton && (
					<button
						className={styles["lambda-alert-close-button"]}
						onClick={onClose}
						aria-label="Cerrar alerta"
					>
						<CloseIcon size={16} />
					</button>
				)}
			</div>
		);
	}
);
