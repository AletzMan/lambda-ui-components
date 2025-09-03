import { StarIcon } from "lucide-react";
import { ratingVariants, ratingItem } from "./rating.variants";
import clsx from "clsx";
import { forwardRef, useEffect, useState } from "react";
import { RatingProps } from "./rating.types";
import styles from "./rating.module.css";
import { useConfig } from "../../_internal/hooks/translation/ConfigProvider";

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
	(
		{ className, size, variant, color, value, onChange, customIcon, text, textPosition, ...props },
		ref
	) => {
		const [internalValue, setInternalValue] = useState(value || 0);
		const [type, setType] = useState<"icon" | "custom" | "string">("icon");
		const { t } = useConfig();

		useEffect(() => {
			const firstTypeIcon = typeof arrayIcons[0];
			for (const icon of arrayIcons) {
				// Compara si el tipo del elemento actual es diferente al del primero.
				if (typeof icon !== firstTypeIcon) {
					// Si el tipo es diferente, lanza un error.
					throw new Error(
						`El elemento ${icon} es de un tipo diferente al esperado ${firstTypeIcon}. Los elementos deben ser del mismo tipo`
					);
				}
			}

			if (customIcon) {
				console.log("customIcon", customIcon);
				setType(firstTypeIcon === "string" ? "string" : "custom");
			} else {
				setType("icon");
			}
		}, [customIcon, variant]);

		const handleChange = (newValue: number) => {
			if (value === internalValue) {
				onChange?.(0);
				setInternalValue(newValue);
			} else {
				onChange?.(newValue);
				setInternalValue(newValue);
			}
		};

		const handleMouseEnter = (newValue: number) => {
			setInternalValue(newValue);
		};
		const handleMouseLeave = () => {
			setInternalValue(value || 0);
		};

		const arrayIcons = customIcon || [
			<StarIcon />,
			<StarIcon />,
			<StarIcon />,
			<StarIcon />,
			<StarIcon />,
		];

		return (
			<div
				ref={ref}
				className={clsx(
					ratingVariants({
						size,
						variant,
						color,
						type,
						textPosition,
					}),
					className
				)}
				{...props}
			>
				<div className={styles["lambda-rating-container"]}>
					{Array.from({ length: 5 }, (_, index) => (
						<button
							key={index}
							className={ratingItem({ size, variant, color, type, active: index < internalValue })}
							onClick={() => handleChange(index + 1)}
							onMouseEnter={() => handleMouseEnter(index + 1)}
							onMouseLeave={() => handleMouseLeave()}
						>
							{type === "string" ? <span>{arrayIcons[index]}</span> : arrayIcons[index]}
						</button>
					))}
				</div>
				{text && (
					<div className={styles["lambda-rating-text"]}>
						<span>{internalValue > 0 ? text[internalValue - 1] : t("rating.text")}</span>
					</div>
				)}
			</div>
		);
	}
);
