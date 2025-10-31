import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { SkeletonProps } from "./skeleton.types";
import { skeletonVariants } from "./skeleton.variants";

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	(
		{
			shape = "rect",
			rounded = false,
			width = "100%",
			height = 16,
			className,
			style,
			animationType = "fade",
			...props
		},
		ref
	) => {
		const isCircle = shape === "circle";
		const borderRadius = isCircle ? "50%" : rounded ? 8 : 0;
		const sizeStyle = isCircle ? { width: height, height } : { width, height };

		if (animationType === "wave") {
			return (
				<motion.div
					ref={ref}
					className={clsx(
						skeletonVariants({ animation: animationType, shape, rounded: rounded && !isCircle }),
						className
					)}
					style={{
						borderRadius,
						backgroundPositionX: "200%",
						...sizeStyle,
						...style,
					}}
					animate={{ backgroundPositionX: ["200%", "-200%"] }}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "linear",
					}}
					{...props}
				/>
			);
		}

		return (
			<motion.div
				ref={ref}
				className={clsx(
					skeletonVariants({ animation: animationType, shape, rounded: rounded && !isCircle }),
					className
				)}
				style={{
					borderRadius,
					...sizeStyle,
					...style,
				}}
				animate={{ opacity: [1, 0.5, 1] }}
				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				{...props}
			/>
		);
	}
);

Skeleton.displayName = "Skeleton";
