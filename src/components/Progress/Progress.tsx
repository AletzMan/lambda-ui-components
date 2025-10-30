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
	small: 32,
	medium: 48,
	large: 64,
} as const;

export const Progress: React.FC<ProgressProps> = ({
	value,
	size = "small",
	color = "primary",
	variant = "bar",
	className = "",
	label,
	showValue = false,
}) => {
	// Clamp value
	const val = Math.max(0, Math.min(100, value));

	// Animación del número
	const motionValue = useMotionValue(0);
	const spring = useSpring(motionValue, { duration: 0.4, damping: 30, stiffness: 200 });
	const rounded = useTransform(spring, (latest) => Math.round(latest));
	const [displayValue, setDisplayValue] = React.useState(val);
	React.useEffect(() => {
		motionValue.set(val);
	}, [val, motionValue]);
	React.useEffect(() => {
		const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));
		return () => unsubscribe();
	}, [rounded]);

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
					</svg>
					{showValue && <span className={styles["lambda-progress-value"]}>{displayValue}%</span>}
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
					<div className={clsx(progressBarVariants({ size }))}>
						<motion.div
							className={clsx(progressInnerVariants({ color }))}
							initial={{ width: 0 }}
							animate={{ width: `${val}%` }}
							transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
						/>
					</div>
					{showValue && (
						<span className={clsx(progressValueVariants({ size }))}>{displayValue}%</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Progress;
