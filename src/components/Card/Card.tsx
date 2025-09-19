import { forwardRef } from "react";
import styles from "./card.module.css";
import { card } from "./card.variants";
import { CardProps } from "./card-types";
import { clsx } from "clsx";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

const SizeHeight: Record<"medium" | "small" | "large", number> = {
	small: 10,
	medium: 15,
	large: 18,
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, variant = "outline", size = "medium", header, image, actions, ...props }, ref) => {
		const { radiusBox } = useUIConfig();
		return (
			<div ref={ref} className={card({ variant, size, radius: radiusBox, className })} {...props}>
				{image && (
					<div
						className={styles[`lambda-card-header-image-container`]}
						style={{
							height: image.heightPorcent
								? `${(SizeHeight[size || "medium"] / 100) * image.heightPorcent}em`
								: "auto",
						}}
					>
						<img
							className={styles[`lambda-card-header-image`]}
							src={image.src}
							alt={image.src || header?.title}
						/>
					</div>
				)}
				{header && (
					<header className={styles[`lambda-card-header`]}>
						<div className={styles[`lambda-card-header-content`]}>
							{header.icon && (
								<span className={styles[`lambda-card-header-icon`]}>{header.icon}</span>
							)}
							<div className={styles[`lambda-card-header-text`]}>
								{header.title && (
									<h1 className={styles[`lambda-card-header-title`]}>{header.title}</h1>
								)}
								{header.description && (
									<p className={styles[`lambda-card-header-description`]}>{header.description}</p>
								)}
							</div>
						</div>
					</header>
				)}
				{props.children && (
					<div className={clsx(styles[`lambda-card-body`], "scrollBar")}>{props.children}</div>
				)}
				{actions && actions.length > 0 && (
					<footer
						className={clsx(styles[`lambda-card-footer`], {
							[styles[`lambda-card-footer-onlyactions`]]: !image && !header && !props.children,
						})}
					>
						{actions.map((action, index) => (
							<button key={index} className={styles[`lambda-card-action`]} onClick={action.onClick}>
								{action.icon && (
									<span className={styles[`lambda-card-action-icon`]}>{action.icon}</span>
								)}
								{action.text && (
									<span className={styles[`lambda-card-action-text`]}>{action.text}</span>
								)}
							</button>
						))}
					</footer>
				)}
			</div>
		);
	}
);
