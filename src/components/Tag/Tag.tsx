import { forwardRef } from "react";
import { TagProps } from "./tag.types";
import { tagVariants, closeButtonStyles } from "./tag.variants";
import { X } from "lucide-react";
import styles from "./tag.module.css";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

export const Tag = forwardRef<HTMLDivElement, TagProps>(
	({ className, color, size, radius, variant, children, text, icon, onClose, ...props }, ref) => {
		const { radiusField } = useUIConfig();
		const radiusValue = radius || radiusField;

		return (
			<div
				ref={ref}
				className={tagVariants({
					color,
					size,
					variant,
					radius: radiusValue,
				})}
				{...props}
			>
				{icon}
				{children}
				{text && <span className={styles["lambda-tag-text"]}>{text}</span>}
				{onClose && (
					<button className={closeButtonStyles({ size })} onClick={onClose}>
						<X />
					</button>
				)}
			</div>
		);
	}
);
