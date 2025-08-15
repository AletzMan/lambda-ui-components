import {
	forwardRef,
	useEffect,
	useId,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { TabProps } from "./tab.types";
import clsx from "clsx";
import {
	tabContainer,
	tabContent,
	tabCurrent,
	tabInput,
	tabLabel,
	tabWrapper,
} from "./tab.variants";
const hasResizeObserver = typeof window !== "undefined" && typeof ResizeObserver !== "undefined";

export const Tab = forwardRef<HTMLDivElement, TabProps>(
	(
		{ size, variant, color, radius, disabled, value, onChange, className, items, ...props },
		ref
	) => {
		// Seguridad si no llegan items
		const itemsArr = items ?? [];
		// índice seleccionado (usa 0 como fallback)
		const [checked, setChecked] = useState<number>(0);

		// refs
		const containerRef = useRef<HTMLDivElement | null>(null);
		const localRef = useRef<HTMLDivElement | null>(null);
		const labelRefs = useRef<Array<HTMLLabelElement | null>>([]);

		// expone el ref externo al contenedor
		useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

		const [indicator, setIndicator] = useState<{ left: number; width: number }>({
			left: 0,
			width: 0,
		});

		const syncIndicator = () => {
			const container = containerRef.current;
			const el = labelRefs.current[checked];
			if (!container || !el) return;

			const containerRect = container.getBoundingClientRect();
			const rect = el.getBoundingClientRect();

			// Compensa scroll horizontal si existiera
			const left = rect.left - containerRect.left + container.scrollLeft - 1;
			const width = rect.width;

			setIndicator({ left, width });
		};

		useLayoutEffect(() => {
			syncIndicator();
		}, [checked, itemsArr.length]);

		useEffect(() => {
			if (!containerRef.current) return;

			const resizeObserver = hasResizeObserver ? new ResizeObserver(() => syncIndicator()) : null;

			if (resizeObserver) {
				resizeObserver.observe(containerRef.current);
				labelRefs.current.forEach((el) => el && resizeObserver.observe(el));
			}

			const onWindowResize = () => syncIndicator();
			window.addEventListener("resize", onWindowResize);

			return () => {
				resizeObserver?.disconnect();
				window.removeEventListener("resize", onWindowResize);
			};
		}, [itemsArr.length]);

		// nombre único del grupo de radios (evita colisiones si hay múltiples <Tab/>)
		const groupId = useId();

		return (
			<div className={tabWrapper({ size, variant, color, radius })}>
				<div
					// el ref expuesto hacia afuera y usado interno
					ref={(node) => {
						localRef.current = node;
						containerRef.current = node;
					}}
					className={clsx(tabContainer({ size, variant, color, radius }), className)}
					{...props}
				>
					{/* Indicador detrás de las tabs */}
					<div
						className={tabCurrent({ variant, radius, color })}
						style={{
							left: `${indicator.left}px`,
							width: `${indicator.width}px`,
						}}
					/>

					{/* Tabs */}
					{itemsArr.map((item, index) => {
						const inputId = `${item.id}-${groupId}`;
						return (
							<label
								key={item.id ?? index}
								ref={(el) => {
									labelRefs.current[index] = el;
								}}
								htmlFor={inputId}
								className={tabLabel({
									size,
									variant,
									disabled,
									selected: checked === index,
									color,
									radius,
								})}
							>
								<input
									type="radio"
									name={`tab-${groupId}`}
									id={inputId}
									className={tabInput({ size, variant, disabled })}
									checked={checked === index}
									onChange={() => {
										setChecked(index);
										onChange?.((itemsArr[index] as any)?.value ?? index);
									}}
								/>
								{item.label}
							</label>
						);
					})}
				</div>

				<div className={tabContent({ size, variant, color, radius })}>
					{itemsArr[checked]?.content}
				</div>
			</div>
		);
	}
);
Tab.displayName = "Tab";
