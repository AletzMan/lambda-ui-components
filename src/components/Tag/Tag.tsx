import { forwardRef } from "react";
import { TagProps } from "./tag.types";
import { tagStyles, closeButtonStyles } from "./tag.variants";
import { X } from "lucide-react";
import styles from "./tag.module.css";

export const Tag = forwardRef<HTMLDivElement, TagProps>(
	({ className, color, size, variant, radius, children, text, icon, onClose, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={tagStyles({
					color,
					size,
					variant,
					radius,
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
