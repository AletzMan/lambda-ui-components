import { forwardRef } from "react";
import { TagProps } from "./tag.types";
import { tagStyles, closeButtonStyles } from "./tag.variants";
import { X } from "lucide-react";
import styles from "./tag.module.css";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

export const Tag = forwardRef<HTMLDivElement, TagProps>(
	({ className, color, size, variant, children, text, icon, onClose, ...props }, ref) => {
		const { radiusField } = useUIConfig();

		return (
			<div
				ref={ref}
				className={tagStyles({
					color,
					size,
					variant,
					radius: radiusField,
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
