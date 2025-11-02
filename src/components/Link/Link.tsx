// src/components/Link/Link.tsx

import React, { forwardRef, useMemo } from "react";
import clsx from "clsx";
import styles from "./Link.module.css";
import buttonStyles from "../Button/button.module.css";
import { LinkProps, LinkRef } from "./link.types";
import { button } from "../Button/button.variants";
import { linkButtonProps, linkProps } from "./link.variants";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

export const Link = forwardRef<LinkRef, LinkProps>(
	(
		{
			className,
			style,
			children,
			label,
			icon,
			disabled = false,
			type = "default",
			href,
			target,
			rel,
			onClick,
			variant,
			color,
			size,
			radius,
			justify,
			loading,
			iconPosition,
			...restProps
		},
		ref
	) => {
		const { radiusField } = useUIConfig();
		const radiusFieldLink = radius ?? radiusField;
		// Determinar el contenido visible del Link (label tiene prioridad si ambos existen)
		const content = label ?? children;
		const isButtonType = type === "button";
		// Combinar clases base, clases específicas del tipo, y clases de estado deshabilitado.
		const linkClasses = clsx(
			...(isButtonType
				? [
						button({
							variant,
							color,
							size,
							radius: radiusFieldLink,
							loading,
							disabled,
							iconPosition,
							onlyIcon: icon !== undefined && !label,
						}),
						linkButtonProps({ justify }),
				  ]
				: [linkProps({ color, size, disabled })]),
			{ [styles["lambda-link--disabled"]]: disabled },
			className
		);

		// --- Renderizar Icono y Contenido ---

		const iconElement = useMemo(() => {
			if (icon) {
				return (
					<span
						className={clsx(
							isButtonType ? buttonStyles["lambda-btn-icon"] : styles["lambda-link-icon"]
						)}
					>
						{icon}
					</span>
				);
			}
			return null;
		}, [icon, isButtonType]);

		const contentElement = useMemo(() => {
			if (content) {
				return <span className={clsx(styles["lambda-link-content"])}>{content}</span>;
			}
			return null;
		}, [content]);

		// Usamos useMemo para determinar el orden del icono y el contenido.
		const renderContent = useMemo(() => {
			if (!isButtonType || (!iconElement && !contentElement)) {
				return (
					<>
						{iconElement}
						{contentElement}
					</>
				);
			}

			return (
				<>
					{iconElement}
					{contentElement}
				</>
			);
		}, [iconElement, contentElement, isButtonType]);

		return (
			<a
				ref={ref}
				className={clsx(
					linkClasses,
					iconPosition === "left"
						? styles["lambda-link-icon-left"]
						: styles["lambda-link-icon-right"]
				)}
				style={style}
				href={disabled ? "#" : href}
				target={target}
				rel={rel}
				{...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				onClick={onClick}
			>
				{/* Renderiza el contenido calculado (icono y texto en el orden correcto) */}
				{renderContent}
			</a>
		);
	}
);
