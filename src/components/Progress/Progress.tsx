import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";
import {
	progressBarVariants,
	progressInnerVariants,
	progressValueVariants,
	progressVariants,
} from "./progress.variants";
import { ProgressProps } from "./progress.types";
import styles from "./progress.module.css";

const sizeMap = {
	tiny: 24,
	small: 36,
	medium: 48,
	large: 64,
} as const;

export const Progress: React.FC<ProgressProps> = ({
	value,
	indeterminate = false,
	size = "small",
	color = "primary",
	variant = "bar",
	className = "",
	label,
	showValue = false,
}) => {
	const isIndeterminate = !!indeterminate;
	// Clamp value solo si no es indeterminado
	const val = !isIndeterminate ? Math.max(0, Math.min(100, value)) : 0;

	// Animación del número
	const motionValue = useMotionValue(0);
	const spring = useSpring(motionValue, { duration: 0.4, damping: 30, stiffness: 200 });
	const rounded = useTransform(spring, (latest) => Math.round(latest));
	const [displayValue, setDisplayValue] = React.useState(val);
	React.useEffect(() => {
		if (!isIndeterminate) motionValue.set(val);
	}, [val, motionValue, isIndeterminate]);
	React.useEffect(() => {
		if (!isIndeterminate) {
			const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));
			return () => unsubscribe();
		}
	}, [rounded, isIndeterminate]);

	if (variant === "circle") {
		const strokeWidth = size === "tiny" ? 3 : size === "small" ? 4 : size === "large" ? 8 : 6;
		const radius = (sizeMap[size as keyof typeof sizeMap] - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference * (1 - val / 100);
		return (
			<div className={clsx(progressVariants({ color, size, variant }), className)}>
				<div className={styles["lambda-progress-circle-container"]}>
					<svg
						className={styles["lambda-progress-circle-svg"]}
						width={sizeMap[size as keyof typeof sizeMap]}
						height={sizeMap[size as keyof typeof sizeMap]}
					>
						<circle
							className={styles["lambda-progress-circle-bg"]}
							cx={sizeMap[size as keyof typeof sizeMap] / 2}
							cy={sizeMap[size as keyof typeof sizeMap] / 2}
							r={radius}
							strokeWidth={strokeWidth}
							fill="none"
						/>
						{isIndeterminate ? (
							<circle
								className={clsx(
									styles["lambda-progress-circle-fg"],
									styles["lambda-progress-indeterminate-circle"]
								)}
								cx={sizeMap[size as keyof typeof sizeMap] / 2}
								cy={sizeMap[size as keyof typeof sizeMap] / 2}
								r={radius}
								strokeWidth={strokeWidth}
								fill="none"
								strokeDasharray={circumference}
								strokeDashoffset={circumference * 0.25}
								strokeLinecap="round"
							/>
						) : (
							<motion.circle
								className={styles["lambda-progress-circle-fg"]}
								cx={sizeMap[size as keyof typeof sizeMap] / 2}
								cy={sizeMap[size as keyof typeof sizeMap] / 2}
								r={radius}
								strokeWidth={strokeWidth}
								fill="none"
								strokeDasharray={circumference}
								strokeDashoffset={offset}
								strokeLinecap="round"
								initial={{ strokeDashoffset: circumference }}
								animate={{ strokeDashoffset: offset }}
								transition={{ ease: "linear" }}
							/>
						)}
					</svg>
					{showValue && !isIndeterminate && (
						<span className={clsx(progressValueVariants({ size, variant }))}>{displayValue}</span>
					)}
				</div>
				{label && <span className={styles["lambda-progress-label"]}>{label}</span>}
			</div>
		);
	}

	// Barra
	return (
		<div className={clsx(progressVariants({ color, size }), className)}>
			<div className={styles["lambda-progress-container"]}>
				{label && <span className={styles["lambda-progress-label"]}>{label}</span>}
				<div className={styles["lambda-progress-bar-container"]}>
					<div className={clsx(progressBarVariants({ size }))} style={{ position: "relative" }}>
						{isIndeterminate ? (
							<div className={styles["lambda-progress-indeterminate-bar"]} />
						) : (
							<motion.div
								className={clsx(progressInnerVariants({ color }))}
								initial={{ width: 0 }}
								animate={{ width: `${val}%` }}
								transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
							/>
						)}
					</div>
					{showValue && !isIndeterminate && (
						<span className={clsx(progressValueVariants({ size }))}>{displayValue}%</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Progress;
