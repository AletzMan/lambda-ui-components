import React, { useRef, useReducer, useCallback, Ref, Fragment } from "react";
import { Plus, X } from "lucide-react";
import {
	Button,
	Checkbox,
	ClientOnly,
	CodeBlock,
	Divider,
	Input,
	InputNumber,
	Radio,
	RadioGroup,
	Select,
	Slider,
	Switch,
	Tooltip,
	DatePicker,
} from "lambda-ui-components";

const colors = {
	default: "bg-(--surface-d)",
	neutral: "bg-(--neutral-base-color)",
	primary: "bg-(--primary-base-color)",
	secondary: "bg-(--secondary-base-color)",
	success: "bg-(--success-base-color)",
	warning: "bg-(--warning-base-color)",
	danger: "bg-(--danger-base-color)",
	info: "bg-(--info-base-color)",
}

export interface PropConfig {
	name: string;
	type: "boolean" | "boolean-inverted" | "string" | "number" | "array-number" | "array-string" | "array-object" | "array-reactnode" | "select" | "slider" | "radio" | "checkbox" | "color" | "date" | "object" | "";
	values?: (string | number | boolean | any)[]; // Para 'select'
	defaultValue?: any;
	default?: any;
	label?: string; // Etiqueta opcional para el control UI
	description?: string; // Descripción opcional para el control UI
	transform?: (value: any) => any;
	transformCode?: (value: any) => string;
	schema?: Record<string, "string" | "number">; // Schema for array-object
	isRequired?: boolean[]; // Array de booleanos para marcar campos como obligatorios en array-object
	disabled?: boolean;
}

export interface ComponentPropsState {
	[key: string]: any;
}

export type PropsAction =
	| { type: "SET_PROP_VALUE"; propName: string; value: any }
	| { type: "RESET_PROPS"; initialConfigs: PropConfig[] }; // Pasar configs para resetear defaults

/**
 * Función de inicialización para el reducer.
 * Establece el estado inicial basándose en los `defaultValue` de `PropConfig`.
 */
export function initPropsState(propConfigs: PropConfig[]): ComponentPropsState {
	const initialState: ComponentPropsState = {};
	propConfigs.forEach((config) => {
		if (config.defaultValue !== undefined) {
			initialState[config.name] = config.defaultValue;
		}
	});
	return initialState;
}

/**
 * Interface para componentes funcionales o de clase
 */
interface ComponentType {
	displayName?: string;
	name?: string;
}


/**
 * Reducer para gestionar el estado de las props de un componente.
 * @param state El estado actual de las props.
 * @param action La acción a ejecutar (SET_PROP_VALUE o RESET_PROPS).
 * @returns El nuevo estado de las props.
 */
export function propsReducer(state: ComponentPropsState, action: PropsAction): ComponentPropsState {
	switch (action.type) {
		case "SET_PROP_VALUE":
			return {
				...state,
				[action.propName]: action.value,
			};
		case "RESET_PROPS":
			// Re-inicializa el estado a los valores por defecto
			return initPropsState(action.initialConfigs);
		default:
			return state;
	}
}

interface PlaygroundLayoutProps<T extends HTMLElement | ComponentType | null> {
	id: string;
	children: React.ReactElement | ((props: Record<string, any>) => React.ReactNode); // El componente base a renderizar (DEBE ser un ReactElement)
	childrenComponentsNames?: string[]; // Nombres de los componentes hijos
	componentRef?: Ref<T>; // La ref externa para el componente renderizado
	propConfigs: PropConfig[]; // Configuración de las props controlables (NO dynamicProps)
	title?: string;
	componentName?: string;
	description?: React.ReactNode;
	optionalProps?: React.ReactNode;
}

/**
 * Componente PlaygroundLayout que permite renderizar un `ReactElement` hijo,
 * controlar sus props de forma interactiva usando useReducer, e inyectar una ref.
 * Ideal para documentación y demostración interactiva de componentes.
 *
 * @template T El tipo del elemento DOM o componente al que se refiere `componentRef`.
 */
export function PlaygroundLayout<T extends HTMLElement | ComponentType = HTMLElement>({
	id,
	children,
	childrenComponentsNames,
	optionalProps,
	componentRef,
	propConfigs, // Ahora recibimos propConfigs en lugar de dynamicProps
	title,
	componentName,
	description,
}: PlaygroundLayoutProps<T>) {
	// 1. **useReducer** para gestionar el estado interactivo de las props
	const [currentProps, dispatch] = useReducer(
		propsReducer,
		propConfigs,
		initPropsState // La función de inicialización usa propConfigs para los valores por defecto
	);

	// Refs para el componente renderizado
	const internalRef = useRef<T>(null);
	const refToInject: Ref<T> = componentRef || internalRef;

	// Aplicamos transform si existe en la configuración
	const transformedProps = Object.entries(currentProps).reduce((acc, [key, value]) => {
		const config = propConfigs.find((c) => c.name === key);
		acc[key] = config?.transform ? config.transform(value) : value;
		return acc;
	}, {} as any);

	// Combinamos las props del children original con las props transformadas
	const finalProps: Record<string, any> = React.isValidElement(children)
		? { ...(children.props as Record<string, any>), ...transformedProps }
		: { ...transformedProps };

	// Clona el elemento y le inyecta la ref y las props combinadas
	const renderedComponent =
		typeof children === "function"
			? children(finalProps)
			: React.isValidElement(children)
				? React.createElement(children.type, { ...finalProps, ref: refToInject })
				: null;

	// Manejador para los cambios en los controles UI
	const handlePropChange = useCallback((propName: string, value: any) => {
		dispatch({ type: "SET_PROP_VALUE", propName, value });
	}, []);

	// Manejador para resetear las props a sus valores por defecto
	const handleResetProps = useCallback(() => {
		dispatch({ type: "RESET_PROPS", initialConfigs: propConfigs }); // Pasa las configs para re-inicializar
	}, [propConfigs]);

	const arrayProps = Object.entries(currentProps).map(([key, value]) => ({
		name: key,
		value,
		type: propConfigs.find((prop) => prop.name === key)?.type === "boolean-inverted" ? "boolean-inverted" : propConfigs.find((prop) => prop.name === key)?.type === "array-number" ? "array-number" : propConfigs.find((prop) => prop.name === key)?.type === "array-string" ? "array-string" : propConfigs.find((prop) => prop.name === key)?.type === "array-object" ? "array-object" : propConfigs.find((prop) => prop.name === key)?.type === "array-reactnode" ? "array-reactnode" : propConfigs.find((prop) => prop.name === key)?.type === "object" ? "object" : typeof value,
		default: propConfigs.find((prop) => prop.name === key)?.default,
		displayName: propConfigs.find((prop) => prop.name === key)?.label,
	}));

	const propsString = arrayProps
		.map((prop) => {
			const config = propConfigs.find((c) => c.name === prop.name);
			if (config?.transformCode) {
				return config.transformCode(prop.value) ? `${prop.name}={${config.transformCode(prop.value)}}` : undefined;
			}

			if (prop.type === "boolean") {
				return prop.value === prop.default
					? undefined
					: typeof prop.default == "boolean"
						? `${prop.name}`
						: undefined;
			} else if (prop.type === "boolean-inverted") {
				return prop.value === prop.default
					? undefined
					: typeof prop.default == "boolean"
						? `${prop.name}={${prop.value}}`
						: undefined;
			} else if (prop.type === "string") {
				return prop.value && prop.value !== prop.default
					? `${prop.name}="${prop.value}"`
					: undefined;
			} else if (prop.type === "number") {
				return prop.value && prop.value !== prop.default ? `${prop.name}={${prop.value}}` : undefined;
			} else if (prop.type === "array-number") {
				return prop.value && JSON.stringify(prop.value) !== JSON.stringify(prop.default)
					? `${prop.name}={${JSON.stringify(prop.value)}}`
					: undefined;
			} else if (prop.type === "array-string") {
				return prop.value && JSON.stringify(prop.value) !== JSON.stringify(prop.default)
					? `${prop.name}={${JSON.stringify(prop.value)}}`
					: undefined;
			} else if (prop.type === "array-object") {
				const safeReplacer = (key: string, value: any) => {
					if (value && typeof value === "object" && "$$typeof" in value) {
						return `<ReactNode/>`;
					}
					return value;
				};
				return prop.value && JSON.stringify(prop.value, safeReplacer) !== JSON.stringify(prop.default, safeReplacer)
					? `${prop.name}={${JSON.stringify(prop.value, safeReplacer, 3).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:")}}`
					: undefined;
			} else if (prop.type === "array-reactnode") {
				return prop.value && JSON.stringify(prop.value) !== JSON.stringify(prop.default)
					? `${prop.name}={${JSON.stringify(prop.value)}}`
					: undefined;
			} else if (prop.type === "object") {
				const safeReplacer = (key: string, value: any) => {
					if (value && typeof value === "object" && "$$typeof" in value) {
						return `<ReactNode/>`;
					}
					return value;
				};
				return prop.value && JSON.stringify(prop.value, safeReplacer) !== JSON.stringify(prop.default, safeReplacer)
					? `${prop.name}=${JSON.stringify(prop.value, safeReplacer, 6).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:")}`
					: undefined;
			} else if (prop.type === "date") {
				return prop.value && prop.value instanceof Date
					? `${prop.name}={new Date("${prop.value.toISOString()}")}`
					: undefined;
			} else {
				return prop.value !== prop.default ? `${prop.name}=${prop.value}` : undefined;
			}
		})
		.filter((prop) => prop !== undefined)
		.join("\n\t");

	return (
		<>
			<div className="flex flex-col gap-3 p-3 border border-(--border-color)/80 border-dashed rounded-md bg-(--background-color)	w-full">
				{title && (
					<h2 id={id} className="text-2xl font-bold mb-1 scroll-mt-20">
						{title}
					</h2>
				)}
				{description && <p className="text-(--foreground-secondary-color) mb-7">{description}</p>}
				{optionalProps && (
					<div className="text-(--foreground-secondary-color) mb-7">{optionalProps}</div>
				)}
				<div className="grid grid-cols-[450px_1fr] max-[1000px]:flex max-[1000px]:flex-col-reverse gap-3 w-full">
					{/* Columna de Controles de Props */}
					<div className="flex flex-col h-full">
						<div
							className="flex flex-row items-center justify-between p-2 text-lg font-semibold text-(--foreground-color) 
					border border-(--border-color) rounded-t-sm border-b-0 pl-2 bg-(--surface-b)"
						>
							Properties
							<Button
								onClick={handleResetProps}
								label="Reset Props"
								size="tiny"
								color="neutral"
								variant="solid"
							/>
						</div>
						<div className="bg-(--background-color) p-2 rounded-b-md border border-(--border-color) scrollBar h-[calc(100svh-350px)] overflow-y-auto">
							<div className="space-y-2">

								{/* Selects, Strings */}
								{propConfigs.some((c) => ["select", "string"].includes(c.type)) && <div className="flex flex-wrap gap-2">
									{propConfigs
										.filter((c) => ["select", "string"].includes(c.type) && !c.disabled)
										.map((config) => (
											<div key={config.name} className="shrink-0 min-w-[130px] flex-1">
												<ControlItem
													config={config}
													currentValue={currentProps[config.name]}
													onChange={handlePropChange}
												/>
											</div>
										))}
								</div>}
								{/* Numbers */}
								{propConfigs.some((c) => c.type === "number") && <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
									{propConfigs
										.filter((c) => ["number"].includes(c.type) && !c.disabled)
										.map((config) => (
											<ControlItem
												key={config.name}
												config={config}
												currentValue={currentProps[config.name]}
												onChange={handlePropChange}
											/>
										))}
								</div>}
								{/* Array-Numbers */}
								{propConfigs.some((c) => c.type === "array-number") && <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
									{propConfigs
										.filter((c) => ["array-number"].includes(c.type) && !c.disabled)
										.map((config) => (
											<ControlItem
												key={config.name}
												config={config}
												currentValue={currentProps[config.name]}
												onChange={handlePropChange}
											/>
										))}
								</div>}
								{/* Array-Strings */}
								{propConfigs.some((c) => c.type === "array-string") && <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
									{propConfigs
										.filter((c) => ["array-string"].includes(c.type) && !c.disabled)
										.map((config) => (
											<ControlItem
												key={config.name}
												config={config}
												currentValue={currentProps[config.name]}
												onChange={handlePropChange}
											/>
										))}
								</div>}

								{/* Array-ReactNode */}
								{propConfigs.some((c) => c.type === "array-reactnode") && <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
									{propConfigs
										.filter((c) => ["array-reactnode"].includes(c.type) && !c.disabled)
										.map((config) => (
											<ControlItem
												key={config.name}
												config={config}
												currentValue={currentProps[config.name]}
												onChange={handlePropChange}
											/>
										))}
								</div>}

								{/* Array-Objects */}
								{propConfigs.some((c) => c.type === "array-object") && <div className="flex flex-col gap-2">
									{propConfigs
										.filter((c) => ["array-object"].includes(c.type) && !c.disabled)
										.map((config) => (
											<ControlItem
												key={config.name}
												config={config}
												currentValue={currentProps[config.name]}
												onChange={handlePropChange}
											/>
										))}
								</div>}

								{/* Objects */}
								{propConfigs.some((c) => c.type === "object") && <div className="flex flex-col gap-2">
									{propConfigs
										.filter((c) => ["object"].includes(c.type) && !c.disabled)
										.map((config) => (
											<ControlItem
												key={config.name}
												config={config}
												currentValue={currentProps[config.name]}
												onChange={handlePropChange}
											/>
										))}
								</div>}

								{/* Checkboxes */}
								{propConfigs.some((c) => c.type === "checkbox") && (
									<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
										{propConfigs
											.filter((c) => c.type === "checkbox" && !c.disabled)
											.map((config) => (
												<ControlItem
													key={config.name}
													config={config}
													currentValue={currentProps[config.name]}
													onChange={handlePropChange}
												/>
											))}
									</div>
								)}

								{/* Colors */}
								{propConfigs.some((c) => c.type === "color") && (
									<div className="flex flex-col gap-2">
										{propConfigs
											.filter((c) => c.type === "color" && !c.disabled)
											.map((config) => (
												<ControlItem
													key={config.name}
													config={config}
													currentValue={currentProps[config.name]}
													onChange={handlePropChange}
												/>
											))}
									</div>
								)}

								{/* Dates */}
								{propConfigs.some((c) => c.type === "date") && (
									<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
										{propConfigs
											.filter((c) => c.type === "date" && !c.disabled)
											.map((config) => (
												<ControlItem
													key={config.name}
													config={config}
													currentValue={currentProps[config.name]}
													onChange={handlePropChange}
												/>
											))}
									</div>
								)}

								{/* Radios */}
								{propConfigs.some((c) => c.type === "radio") && (
									<div className="grid grid-cols-[repeat(auto-fill,minmax(135px,1fr))] gap-2 w-full">
										{propConfigs
											.filter((c) => c.type === "radio" && !c.disabled)
											.map((config) => (
												<ControlItem
													key={config.name}
													config={config}
													currentValue={currentProps[config.name]}
													onChange={handlePropChange}
												/>
											))}
									</div>
								)}

								{/* Sliders */}
								{propConfigs.some((c) => c.type === "slider") && (
									<div className="flex flex-col gap-2">
										{propConfigs
											.filter((c) => c.type === "slider" && !c.disabled)
											.map((config) => (
												<ControlItem
													key={config.name}
													config={config}
													currentValue={currentProps[config.name]}
													onChange={handlePropChange}
												/>
											))}
									</div>
								)}

								{/* Switches (Boolean & Boolean-Inverted) */}
								{propConfigs.some((c) => ["boolean", "boolean-inverted"].includes(c.type)) && (
									<div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
										{propConfigs
											.filter((c) => ["boolean", "boolean-inverted"].includes(c.type) && !c.disabled)
											.map((config) => (
												<ControlItem
													key={config.name}
													config={config}
													currentValue={currentProps[config.name]}
													onChange={handlePropChange}
												/>
											))}
									</div>
								)}
							</div>
						</div>
					</div>
					{/* Columna de Previsualización del Componente */}
					<div className="flex flex-col h-full ">
						<label className="text-lg font-semibold text-(--foreground-color)  p-2 border border-(--border-color) border-b-0 rounded-t-sm bg-(--surface-b)">
							Preview
						</label>
						<div
							className="relative flex flex-col justify-center items-center 
							background-pattern-dot p-5 rounded-b-md min-h-[200px] border border-(--border-color) h-full overflow-hidden"
						>
							{renderedComponent}
						</div>
					</div>
				</div>
				<ClientOnly>
					<CodeBlock
						buttonCopy
						tabs={[
							{
								code: childrenComponentsNames
									? `<${componentName}${propsString ? "\n\t" : ""}${propsString}${propsString ? "\n" : ""
									}>${childrenComponentsNames
										?.map(
											(child, index) =>
												`\n\t<${child}>${index === childrenComponentsNames.length - 1 ? "\n" : ""
												}`
										)
										.join("")}</${componentName}>
							`
									: `<${componentName}${propsString ? "\n\t" : ""}${propsString}${propsString ? "\n" : ""
									}/>`,
								language: "tsx",
								label: "Code",
							},
						]}
					/>
				</ClientOnly>
			</div>
			<Divider spacing={70} variant="dashed" />
		</>
	);
}

/**
 * Helper component to render individual controls with accessibility and descriptions.
 */
const ControlItem: React.FC<{
	config: PropConfig;
	currentValue: any;
	onChange: (name: string, value: any) => void;
}> = ({ config, currentValue, onChange }) => {
	const controlId = `control-${config.name}`;
	const descriptionId = `desc-${config.name}`;

	const renderControl = () => {
		if (config.disabled) return null;
		switch (config.type) {
			case "select":
				return (
					<Select
						id={controlId}
						label={config.label}
						size="tiny"
						color="neutral"
						value={String(currentValue ?? "")}
						onChange={(e) => onChange(config.name, e)}
						options={config.values?.map((val: any) => ({
							value: String(val),
							label: String(val),
						})) || []}
						aria-describedby={config.description ? descriptionId : undefined}
					/>
				);
			case "string":
				return (
					<Input
						id={controlId}
						type="text"
						size="tiny"
						color="neutral"
						value={String(currentValue ?? "")}
						onChangeValue={(e) => onChange(config.name, e)}
						aria-describedby={config.description ? descriptionId : undefined}
					/>
				);
			case "number":
				return (
					<InputNumber
						id={controlId}
						size="tiny"
						color="neutral"
						value={Number(currentValue ?? "")}
						onChangeValue={(e) => onChange(config.name, e)}
						aria-describedby={config.description ? descriptionId : undefined}
					/>
				);
			case "array-number":
				return (
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-(--foreground-color)">{config.label || config.name}</span>
							<Button
								size="tiny"
								variant="text"
								onClick={() => {
									const newValue = [...(Array.isArray(currentValue) ? currentValue : []), 0];
									onChange(config.name, newValue);
								}}
							>
								<Plus size={14} />
							</Button>
						</div>
						{(Array.isArray(currentValue) ? currentValue : []).map((val: any, index: number) => (
							<div key={index} className="flex items-center gap-2">
								<InputNumber
									id={`${controlId}-${index}`}
									size="tiny"
									color="neutral"
									value={Number(val)}
									onChangeValue={(e) => {
										const newValue = [...(currentValue as number[])];
										newValue[index] = Number(e);
										onChange(config.name, newValue);
									}}
									aria-describedby={config.description ? descriptionId : undefined}
								/>
								<Button
									size="tiny"
									variant="text"
									color="danger"
									onClick={() => {
										const newValue = [...(currentValue as number[])];
										newValue.splice(index, 1);
										onChange(config.name, newValue);
									}}
								>
									<X size={14} />
								</Button>
							</div>
						))}
					</div>
				);
			case "array-reactnode":
				return (
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-(--foreground-color)">{config.label || config.name}</span>
							<Button
								size="tiny"
								variant="text"
								onClick={() => {
									const newValue = [...(Array.isArray(currentValue) ? currentValue : []), "Item"];
									onChange(config.name, newValue);
								}}
							>
								<Plus size={14} />
							</Button>
						</div>
						{(Array.isArray(currentValue) ? currentValue : []).map((val: any, index: number) => (
							<div key={index} className="flex items-center gap-2">
								<Input
									id={`${controlId}-${index}`}
									type="text"
									size="tiny"
									color="neutral"
									value={String(val)}
									onChangeValue={(e) => {
										const newValue = [...(currentValue as string[])];
										newValue[index] = String(e);
										onChange(config.name, newValue);
									}}
									aria-describedby={config.description ? descriptionId : undefined}
								/>
								<Button
									size="tiny"
									variant="text"
									color="danger"
									onClick={() => {
										const newValue = [...(currentValue as string[])];
										newValue.splice(index, 1);
										onChange(config.name, newValue);
									}}
								>
									<X size={14} />
								</Button>
							</div>
						))}
					</div>
				);
			case "array-string":
				return (
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-(--foreground-color)">{config.label || config.name}</span>
							<Button
								size="tiny"
								variant="text"
								onClick={() => {
									const newValue = [...(Array.isArray(currentValue) ? currentValue : []), "Item"];
									onChange(config.name, newValue);
								}}
							>
								<Plus size={14} />
							</Button>
						</div>
						{(Array.isArray(currentValue) ? currentValue : []).map((val: any, index: number) => (
							<div key={index} className="flex items-center gap-2">
								<Input
									id={`${controlId}-${index}`}
									type="text"
									size="tiny"
									color="neutral"
									value={String(val)}
									onChangeValue={(e) => {
										const newValue = [...(currentValue as string[])];
										newValue[index] = String(e);
										onChange(config.name, newValue);
									}}
									aria-describedby={config.description ? descriptionId : undefined}
								/>
								<Button
									size="tiny"
									variant="text"
									color="danger"
									onClick={() => {
										const newValue = [...(currentValue as string[])];
										newValue.splice(index, 1);
										onChange(config.name, newValue);
									}}
								>
									<X size={14} />
								</Button>
							</div>
						))}
					</div>
				);
			case "array-object":
				return (
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-(--foreground-color)">{config.label || config.name}</span>
							<Button
								size="tiny"
								variant="text"
								color="neutral"
								icon={<Plus />}
								onClick={() => {
									const newObj = Object.keys(config.schema || {}).reduce((acc, key) => {
										acc[key] = config.schema?.[key] === "number" ? 0 : "";
										return acc;
									}, {} as any);
									const newValue = [...(Array.isArray(currentValue) ? currentValue : []), newObj];
									onChange(config.name, newValue);
								}}
							/>
						</div>
						{(Array.isArray(currentValue) ? currentValue : []).map((val: any, index: number) => (
							<div key={index} className="flex flex-col gap-2 border border-dotted border-(--border-color) bg-(--background-color) p-2 rounded-md relative">
								<div className="flex justify-between items-center">
									<span className="text-sm font-medium text-(--primary-text-color)">Item {index + 1}</span>
									<Button
										size="tiny"
										variant="text"
										color="danger"
										className="w-6 h-6 "
										icon={<X />}
										onClick={() => {
											const newValue = [...(currentValue as any[])];
											newValue.splice(index, 1);
											onChange(config.name, newValue);
										}}
									/>
								</div>
								<div className="flex flex-row flex-wrap gap-2 w-full">

									{Object.entries(config.schema || {}).map(([key, type], schemaIndex) => (
										<div key={key} className="flex flex-col flex-1 shrink-0 min-w-[120px]">
											{type === "number" ? (
												<InputNumber
													size="tiny"
													label={key}
													color="neutral"
													value={config.values?.includes(Number(val[key])) ? Number(val[key]) : undefined}
													required={config.isRequired?.[schemaIndex] || false}
													onChangeValue={(e) => {
														const newValue = [...(currentValue as any[])];
														newValue[index] = { ...newValue[index], [key]: Number(e) };
														onChange(config.name, newValue);
													}}
												/>
											) : (
												<Input
													type="text"
													size="tiny"
													label={key}
													color="neutral"
													required={config.isRequired?.[schemaIndex] || false}
													value={String(val[key] ?? "")}
													onChangeValue={(e) => {
														const newValue = [...(currentValue as any[])];
														newValue[index] = { ...newValue[index], [key]: e };
														onChange(config.name, newValue);
													}}
												/>
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				);
			case "object":
				return (
					<div className="flex flex-col gap-2 border border-dotted border-(--border-color) bg-(--background-color) p-2 rounded-md relative">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-(--foreground-color)">{config.label || config.name}</span>
						</div>
						<div className="flex flex-row flex-wrap gap-2 w-full">
							{Object.entries(config.schema || {}).map(([key, type], schemaIndex) => (
								<div key={key} className="flex flex-col flex-1 shrink-0 min-w-[120px]">
									{type === "number" ? (
										<InputNumber
											size="tiny"
											label={key}
											color="neutral"
											value={currentValue?.[key] !== undefined ? Number(currentValue[key]) : undefined}
											required={config.isRequired?.[schemaIndex] || false}
											onChangeValue={(e) => {
												const newValue = { ...currentValue, [key]: Number(e) };
												onChange(config.name, newValue);
											}}
										/>
									) : (
										<Input
											type="text"
											size="tiny"
											label={key}
											color="neutral"
											required={config.isRequired?.[schemaIndex] || false}
											value={String(currentValue?.[key] ?? "")}
											onChangeValue={(e) => {
												const newValue = { ...currentValue, [key]: e };
												onChange(config.name, newValue);
											}}
										/>
									)}
								</div>
							))}
						</div>
					</div>
				);
			case "checkbox":
				return (
					<Checkbox
						id={controlId}
						positionLabel="right"
						color="neutral"
						size="tiny"
						checked={!!currentValue}
						onChange={(e) =>
							onChange(config.name, e.target.checked ? config.default : false)
						}
						aria-describedby={config.description ? descriptionId : undefined}
					/>
				);
			case "color":
				return (
					<div className="flex flex-col items-start gap-2">
						<div className="flex flex-wrap gap-2 w-full" id={controlId} role="radiogroup" aria-describedby={config.description ? descriptionId : undefined}>
							{Object.entries(colors).map(([key, value], indexColor) => ( // <-- Cambio clave: Usamos ( en lugar de {
								config.values?.includes(key) ? (
									<Tooltip
										content={key.charAt(0).toUpperCase() + key.slice(1)}
										key={key} // La key debe estar en el elemento raíz del return
										color="neutral"
									>
										<button
											type="button"
											role="radio"
											aria-checked={key.includes(currentValue)}
											className={
												key.includes(currentValue)
													? `${value} size-6 rounded-xs outline-2 outline-(--foreground-color) outline-offset-2`
													: `${value} opacity-20 size-6 rounded-xs cursor-pointer hover:opacity-90 transition-opacity`
											}
											onClick={() => onChange(config.name, key)}
											aria-label={key}
										></button>
									</Tooltip>
								) : null
							))}
						</div>
					</div>
				);
			case "radio":
				return (
					<div className="flex flex-col items-start w-full gap-1 h-full">
						<RadioGroup
							size="tiny"
							variant="solid"
							color="neutral"
							orientation="vertical"
							onChangeOption={(e) => onChange(config.name, e)}
							selectedOption={currentValue}
							aria-labelledby={`${controlId}-label`}
							aria-describedby={config.description ? descriptionId : undefined}
						>
							{config.values?.map((value: any) => (
								<Radio.Button
									key={value}
									value={value}
									label={value.toString().charAt(0).toUpperCase() + value.toString().slice(1)}
								/>
							))}
						</RadioGroup>
					</div>
				);
			case "slider":
				return (
					<div className="flex flex-col items-start w-full">
						<div className="w-full px-4 pt-2 pr-12">
							<Slider
								id={controlId}
								size="small"
								radius="full"
								min={0}
								max={(config.values?.length || 1) - 1}
								color="neutral"
								formatValue={(value) =>
									(config.values?.[value]?.toString().charAt(0).toUpperCase() || "") +
									(config.values?.[value]?.toString().slice(1) || "")
								}
								value={Number(config.values?.indexOf(currentValue) ?? 0)}
								onChangeValue={(e) =>
									onChange(config.name, config.values?.[e as number])
								}
								marks={config.values?.map((val: any, index: number) => ({
									value: index,
									label:
										String(config.values![index]).charAt(0).toUpperCase() +
										String(config.values![index]).slice(1),
								}))}
								aria-describedby={config.description ? descriptionId : undefined}
							/>
						</div>
					</div>
				);
			case "boolean":
			case "boolean-inverted":
				return (
					<Switch
						id={controlId}
						positionLabel="right"
						color="neutral"
						size="tiny"
						checked={!!currentValue}
						onChange={(e) => onChange(config.name, e.target.checked)}
						aria-describedby={config.description ? descriptionId : undefined}
					/>
				);
			case "date":
				return (
					<div className="flex flex-col items-start w-full">
						<DatePicker
							value={currentValue ? new Date(currentValue) : undefined}
							onChange={(date) => onChange(config.name, date)}
							type="dropdown"
							size="tiny"
							radius="small"
							color="neutral"
							aria-describedby={config.description ? descriptionId : undefined}
						/>
					</div>
				);
			default:
				return null;
		}
	};

	let isModified = false;
	try {
		isModified = JSON.stringify(currentValue) !== JSON.stringify(config.type === "checkbox" ? !config.default : config.default);
	} catch (error) {
		isModified = currentValue !== (config.type === "checkbox" ? !config.default : config.default);
	}

	return (
		<div className="flex flex-col justify-between gap-3 bg-(--surface-a) rounded-md p-3 border border-dashed border-(--border-color) h-full relative shadow-sm shadow-(--shadow-color)/95">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					{config.name && (
						<div className="flex items-center gap-2">
							<code className="text-[10px] font-regular text-(--primary-text-color) bg-(--primary-opacity-color)/60 px-1.5 py-0.5 rounded-xs font-mono border border-(--primary-opacity-color)/60">
								{config.name}
							</code>
							{isModified && (
								<div className="w-1.5 h-1.5 rounded-full bg-(--primary-base-color) animate-pulse" title="Modified" />
							)}
						</div>
					)}
				</div>
				<div className="w-full pt-2">{renderControl()}</div>
			</div>
			{config.description && (
				<p id={descriptionId} className="text-[11px] text-(--foreground-secondary-color) leading-tight border-t border-(--border-color)/50 pt-2 mt-1">
					{config.description}
				</p>
			)}
		</div>
	);
};

// Exporta también como default si lo prefieres para la importación
export default PlaygroundLayout;
