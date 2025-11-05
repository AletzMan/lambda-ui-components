"use client";
import React, {
	createContext,
	useContext,
	useState,
	useId,
	Children,
	isValidElement,
	forwardRef,
	ReactNode,
	useRef,
	useCallback,
	useLayoutEffect,
	useEffect,
} from "react";
import { TabItemProps, TabProps } from "./tabs.types";
import {
	tabContainer,
	tabContent,
	tabCurrent,
	tabInput,
	tabLabel,
	tabTabsContainer,
	tabWrapper,
} from "./tabs.variants";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

interface TabsContextType {
	activeTab: number;
	setActiveTab: (idx: number) => void;
	size?: TabProps["size"];
	variant?: TabProps["variant"];
	color?: TabProps["color"];
	radius?: TabProps["radius"];
	groupId: string;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);
function useTabsContext() {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error("useTabsContext debe usarse dentro de <Tabs>");
	return ctx;
}

const TabsRoot = forwardRef<HTMLDivElement, TabProps>(
	({ size, variant, color, radius, children, onChange, value }, ref) => {
		const [activeTab, setActiveTab] = useState(value ?? 0);
		const groupId = useId();
		const { radiusField } = useUIConfig();
		const contextValue: TabsContextType = {
			activeTab,
			setActiveTab,
			size,
			variant,
			color,
			radius: radius ?? radiusField,
			groupId,
		};

		useEffect(() => {
			onChange?.(activeTab);
		}, [activeTab]);

		const childrenList: React.ReactElement<any>[] = [];

		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			if (child.type === TabsList) {
				childrenList.push(child);
			} else if (child.type === TabsPanels) {
				childrenList.push(child);
			}
		});

		return (
			<TabsContext.Provider value={contextValue}>
				<div
					className={tabWrapper({ size, variant, color, radius: radius ?? radiusField })}
					ref={ref}
				>
					{childrenList}
				</div>
			</TabsContext.Provider>
		);
	}
);

TabsRoot.displayName = "Tabs";

const TabsList = ({ children }: { children: ReactNode }) => {
	const { activeTab, size, variant, color, radius } = useTabsContext();
	const tabChildren = Children.toArray(children).filter(
		isValidElement
	) as React.ReactElement<any>[];

	const containerRef = useRef<HTMLDivElement | null>(null);
	const labelRefs = useRef<Array<HTMLLabelElement | null>>([]);
	const [indicator, setIndicator] = useState<{ left: number; width: number }>({
		left: 0,
		width: 0,
	});

	// Calcula la posición y ancho del indicador
	const syncIndicator = useCallback(() => {
		const container = containerRef.current;
		const el = labelRefs.current[activeTab];
		if (!container || !el) return;
		const containerRect = container.getBoundingClientRect();
		const rect = el.getBoundingClientRect();
		const left = rect.left - containerRect.left + container.scrollLeft - 1;
		const width = rect.width;
		setIndicator({ left, width });
	}, [activeTab, tabChildren.length]);

	useLayoutEffect(() => {
		syncIndicator();
	}, [activeTab, tabChildren.length, syncIndicator]);

	useEffect(() => {
		if (!containerRef.current) return;
		const hasResizeObserver =
			typeof window !== "undefined" && typeof ResizeObserver !== "undefined";
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
	}, [tabChildren.length, syncIndicator]);

	let tabList: React.ReactElement<any>[] = [];

	tabChildren.forEach((child) => {
		if (child.type === TabsTab) {
			tabList.push(child);
		}
	});

	return (
		<div className={tabTabsContainer({ variant })}>
			<div
				className={tabContainer({ size, variant, color, radius })}
				ref={containerRef}
				style={{ position: "relative" }}
			>
				{/* Indicador detrás de las tabs */}
				<div
					className={tabCurrent({ variant, radius, color })}
					style={{
						left: `${indicator.left}px`,
						width: `${indicator.width}px`,
					}}
				/>
				{tabList.map((tab, index) => {
					// Usa key explícita si existe, si no usa title+index
					const tabKey = tab.key ?? (tab.props.title ? `tab-${tab.props.title}` : `tab-${index}`);
					return (
						<TabsTab
							key={tabKey}
							title={tab.props.title}
							icon={tab.props.icon}
							disabled={tab.props.disabled}
							index={index}
							labelRef={(el) => {
								labelRefs.current[index] = el;
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

TabsList.displayName = "TabsList";

const TabsTab = ({
	title,
	icon,
	disabled,
	index,
	labelRef,
}: TabItemProps & { index?: number; labelRef?: (el: HTMLLabelElement | null) => void }) => {
	const { activeTab, setActiveTab, groupId, size, variant, color, radius } = useTabsContext();
	const idTab = useId();
	const label = title || `Tab ${idTab}`;
	const inputId = `${label.replace(/\s+/g, "-")}-${groupId}`;
	return (
		<label
			key={inputId}
			ref={labelRef}
			htmlFor={inputId}
			className={tabLabel({
				size,
				variant,
				disabled,
				selected: activeTab === index,
				color,
				radius,
			})}
		>
			<input
				type="radio"
				name={`tab-${groupId}`}
				id={inputId}
				className={tabInput({ size, variant, disabled })}
				checked={activeTab === index}
				disabled={disabled}
				onChange={() => {
					if (disabled) return;
					setActiveTab(index || 0);
				}}
			/>
			{icon && <span>{icon}</span>}
			{label}
		</label>
	);
};

const TabsPanels = ({ children }: { children: ReactNode }) => {
	const { activeTab, size, variant, color, radius } = useTabsContext();
	let panels: React.ReactElement<any>[] = [];

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) return;
		if (child.type === TabsPanel) {
			panels.push(child);
		}
	});

	return <div className={tabContent({ size, variant, color, radius })}>{panels[activeTab]}</div>;
};

const TabsPanel = ({ children }: { children?: ReactNode }) => <>{children}</>;

export const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Tab: TabsTab,
	Panels: TabsPanels,
	Panel: TabsPanel,
});
