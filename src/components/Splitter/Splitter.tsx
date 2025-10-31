import React, { useRef, useState } from "react";
import { SplitterProps } from "./splitter.types";
import styles from "./splitter.module.css";
import clsx from "clsx";

export const Splitter: React.FC<SplitterProps> = ({
	direction = "horizontal",
	min = 100,
	max = 600,
	initial = 200,
	className = "",
	children,
	...props
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [positionPx, setPositionPx] = useState<number>(() =>
		toPx(initial, direction, containerRef.current)
	);
	const [positionRaw, setPositionRaw] = useState<number | string>(initial);
	const dragging = useRef(false);
	const dragStart = useRef({ mouse: 0, positionPx: 0, containerPx: 0 });
	const barRef = useRef<HTMLDivElement>(null);

	function toPx(
		val: number | string,
		dir: "horizontal" | "vertical",
		container: HTMLDivElement | null
	): number {
		if (typeof val === "number") return val;
		if (typeof val === "string" && val.endsWith("%")) {
			const percent = parseFloat(val) / 100;
			if (!container) return 0;
			const size = dir === "horizontal" ? container.offsetWidth : container.offsetHeight;
			return size * percent;
		}
		return parseFloat(val as string) || 0;
	}

	function toRaw(
		px: number,
		original: number | string,
		dir: "horizontal" | "vertical",
		container: HTMLDivElement | null
	): number | string {
		if (typeof original === "string" && original.endsWith("%")) {
			if (!container) return original;
			const size = dir === "horizontal" ? container.offsetWidth : container.offsetHeight;
			if (size === 0) return original;
			return ((px / size) * 100).toFixed(2) + "%";
		}
		return Math.round(px);
	}

	const onMouseMove = (e: MouseEvent) => {
		if (!dragging.current) return;
		const container = containerRef.current;
		let mouseNow = direction === "horizontal" ? e.clientX : e.clientY;
		let delta = mouseNow - dragStart.current.mouse;
		let newPx = dragStart.current.positionPx + delta;
		// Limitar por min/max (convertidos a px)
		const minPx = toPx(min, direction, container);
		let maxPx = toPx(max, direction, container);
		const containerPx = direction === "horizontal" ? container?.offsetWidth ?? 0 : container?.offsetHeight ?? 0;
		if (maxPx > containerPx) maxPx = containerPx;
		if (minPx !== undefined) newPx = Math.max(minPx, newPx);
		if (maxPx !== undefined) newPx = Math.min(maxPx, newPx);
		setPositionPx(newPx);
		setPositionRaw(toRaw(newPx, positionRaw, direction, container));
	};

	const onMouseUp = () => {
		dragging.current = false;
		window.removeEventListener("mousemove", onMouseMove);
		window.removeEventListener("mouseup", onMouseUp);
		barRef.current?.blur();
	};

	const onMouseDown = (e: React.MouseEvent) => {
		dragging.current = true;
		const container = containerRef.current;
		dragStart.current = {
			mouse: direction === "horizontal" ? e.clientX : e.clientY,
			positionPx: toPx(positionRaw, direction, container),
			containerPx:
				direction === "horizontal" ? container?.offsetWidth ?? 0 : container?.offsetHeight ?? 0,
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};

	const containerStyle =
		direction === "horizontal"
			? {
					gridTemplateColumns: `${
						typeof positionRaw === "number" ? positionPx + "px" : positionRaw
					} 2px 1fr`,
			  }
			: {
					gridTemplateRows: `${
						typeof positionRaw === "number" ? positionPx + "px" : positionRaw
					} 2px 1fr`,
			  };

	return (
		<div
			ref={containerRef}
			className={clsx(styles["lambda-splitter"], styles[`lambda-splitter-${direction}`], className)}
			style={containerStyle}
			{...props}
		>
			<div className={styles["lambda-splitter-pane"]}>
				{children && (Array.isArray(children) ? children[0] : children)}
			</div>
			<div
				className={styles["lambda-splitter-bar"]}
				ref={barRef}
				onMouseDown={onMouseDown}
				role="separator"
				tabIndex={0}
				aria-orientation={direction}
			/>
			<div className={styles["lambda-splitter-pane"]}>
				{children && Array.isArray(children) ? children[1] : null}
			</div>
		</div>
	);
};
