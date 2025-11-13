import React, {
	useRef,
	useReducer,
	useCallback,
	ReactElement,
	ComponentType,
	Ref,
	RefObject,
	Fragment,
} from "react";
import {
	Button,
	Checkbox,
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
} from "lambda-ui-components";

export interface PropConfig {
	name: string;
	type: "boolean" | "string" | "number" | "select" | "slider" | "radio" | "checkbox" | "color";
	values?: (string | number | boolean)[]; // Para 'select'
	defaultValue?: any;
	default?: any;
	label?: string; // Etiqueta opcional para el control UI
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

const colorOptions = [
	{ value: "neutral", color: "bg-(--neutral-base-color)" },
	{ value: "primary", color: "bg-(--primary-base-color)" },
	{ value: "secondary", color: "bg-(--secondary-base-color)" },
	{ value: "success", color: "bg-(--success-base-color)" },
	{ value: "danger", color: "bg-(--danger-base-color)" },
	{ value: "warning", color: "bg-(--warning-base-color)" },
	{ value: "info", color: "bg-(--info-base-color)" },
];

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
	children: ReactElement; // El componente base a renderizar (DEBE ser un ReactElement)
	componentRef?: Ref<T>; // La ref externa para el componente renderizado
	propConfigs: PropConfig[]; // Configuración de las props controlables (NO dynamicProps)
	title?: string;
	componentName?: string;
	description?: string;
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

	// Combinamos las props del children original con las props del estado actual del reducer
	const finalProps: Record<string, any> = {
		...(children.props as Record<string, any>),
		...currentProps,
	};

	// Clona el elemento y le inyecta la ref y las props combinadas
	const renderedComponent = React.cloneElement(children, {
		...finalProps,
		// @ts-ignore
		ref: refToInject,
	});

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
		type: typeof value,
		default: propConfigs.find((prop) => prop.name === key)?.default,
	}));

	const propsString = arrayProps
		.map((prop) => {
			if (prop.type === "boolean") {
				return prop.value === prop.default
					? undefined
					: typeof prop.default == "boolean"
					? `${prop.name}`
					: undefined;
			} else if (prop.type === "string") {
				return prop.value && prop.value !== prop.default
					? `${prop.name}="${prop.value}"`
					: undefined;
			} else if (prop.type === "number") {
				return prop.value ? `${prop.name}=${prop.value}` : undefined;
			} else if (prop.type === "object") {
				return prop.value ? `${prop.name}={<${prop.value.type.displayName}/>}` : undefined;
			} else {
				return prop.value !== prop.default ? `${prop.name}=${prop.value}` : undefined;
			}
		})
		.filter((prop) => prop !== undefined)
		.join("\n\t");

	return (
		<>
			<div className="flex flex-col gap-4 bg-(--background-color) p-6 rounded-lg shadow-lg mr-3.5">
				{title && (
					<h2 id={id} className="text-2xl font-bold mb-1">
						{title}
					</h2>
				)}
				{description && <p className="text-(--foreground-secondary-color) mb-7">{description}</p>}

				<div className="grid grid-cols-[0.85fr_1fr] max-[1000px]:flex max-[1000px]:flex-col-reverse gap-6">
					{/* Columna de Controles de Props */}
					<div className="flex flex-col h-full">
						<label
							className="text-lg font-semibold text-(--foreground-color) 
					border border-(--border-color)/50 rounded-t-sm border-b-0 pl-2 bg-(--surface-a)"
						>
							Properties
						</label>
						<div className="bg-(--background-color) p-4 rounded-b-md border border-(--border-color)/50">
							<div className="space-y-2">
								<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 mb-6">
									{propConfigs.map((config) => (
										<Fragment key={config.name}>
											{config.type === "select" && config.values && (
												<Select
													label={config.label}
													size="tiny"
													value={String(currentProps[config.name] ?? "")}
													onChange={(e) => handlePropChange(config.name, e)}
													options={config.values.map((val: any) => ({
														value: String(val),
														label: String(val),
													}))}
												/>
											)}
											{config.type === "string" && (
												<Input
													label={config.label}
													type="text"
													size="tiny"
													value={String(currentProps[config.name] ?? "")} // Asegura string para input value
													onChange={(e) => {
														handlePropChange(config.name, e);
													}}
												/>
											)}
											{config.type === "number" && (
												<InputNumber
													label={config.label}
													size="tiny"
													value={Number(currentProps[config.name] ?? "")} // Asegura string para input value
													onChange={(e) => {
														handlePropChange(config.name, e);
													}}
												/>
											)}
										</Fragment>
									))}
								</div>
								{propConfigs.some((config) => config.type === "checkbox") && (
									<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 place-items-start my-6">
										{propConfigs.map((config) => (
											<Fragment key={config.name}>
												{config.type === "checkbox" && (
													<Checkbox
														label={config.label}
														positionLabel="right"
														size="tiny"
														checked={!!currentProps[config.name]}
														onChange={(e) =>
															handlePropChange(
																config.name,
																e.target.checked ? config.default : false
															)
														}
													/>
												)}
											</Fragment>
										))}
									</div>
								)}
								{propConfigs.some((config) => config.type === "color") && (
									<div className="flex flex-col items-start gap-2 my-6">
										<label className="text-xs font-medium text-(--foreground-label-color) ">
											Color
										</label>
										{propConfigs.map((config) => (
											<Fragment key={config.name}>
												{config.type === "color" && (
													<div className="flex flex-wrap gap-2 w-full">
														{colorOptions.map((option) => (
															<Tooltip
																content={
																	option.value.charAt(0).toUpperCase() + option.value.slice(1)
																}
																key={option.value}
																color="neutral"
															>
																<button
																	className={
																		option.value === currentProps[config.name]
																			? `${option.color} text-(--foreground-color) size-6 rounded-xs`
																			: `${option.color} text-(--foreground-color) opacity-20 size-6 rounded-xs cursor-pointer hover:opacity-90 transition-opacity`
																	}
																	onClick={() => handlePropChange(config.name, option.value)}
																></button>
															</Tooltip>
														))}
													</div>
												)}
											</Fragment>
										))}
									</div>
								)}
								<div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-2 place-items-start my-6">
									{propConfigs.map((config) => (
										<Fragment key={config.name}>
											{config.type === "radio" && (
												<div className="flex flex-col items-start w-full gap-1">
													<label className="text-xs font-medium text-(--foreground-label-color) ">
														{config.label}
													</label>
													<RadioGroup
														size="tiny"
														variant="solid"
														onChange={(e) => handlePropChange(config.name, e)}
														selectedOption={currentProps[config.name]}
													>
														{config.values?.map((value: any) => (
															<Radio.Button
																key={value}
																value={value}
																label={
																	value.toString().charAt(0).toUpperCase() +
																	value.toString().slice(1)
																}
															/>
														))}
													</RadioGroup>
												</div>
											)}
										</Fragment>
									))}
								</div>
								<div className="flex flex-col items-start gap-7 py-3.5 mb-5 px-1 my-6">
									{propConfigs.map((config) => (
										<Fragment key={config.name}>
											{config.type === "slider" && config.values && (
												<div className="flex flex-col items-start w-full">
													<label className="text-xs font-medium text-(--foreground-label-color) ">
														{config.label}
													</label>
													<div className="w-full px-4">
														<Slider
															size="small"
															radius="full"
															min={0}
															max={config.values.length - 1}
															formatValue={(value) =>
																(config.values?.[value].toString().charAt(0).toUpperCase() || "") +
																(config.values?.[value].toString().slice(1) || "")
															}
															value={Number(
																config!.values!.indexOf(currentProps[config.name]) ?? 0
															)}
															onChange={(e) =>
																handlePropChange(config.name, config!.values![e as number])
															}
															onInput={(e) =>
																handlePropChange(config.name, config!.values![e as number])
															}
															marks={config.values?.map((val: any, index: number) => ({
																value: index,
																label:
																	String(config.values?.[index]).charAt(0).toUpperCase() +
																	String(config.values?.[index]).slice(1),
															}))}
														/>
													</div>
												</div>
											)}
										</Fragment>
									))}
								</div>
								<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 place-items-start my-6">
									{propConfigs.map((config) => (
										<Fragment key={config.name}>
											{config.type === "boolean" && (
												<Switch
													label={config.label}
													positionLabel="right"
													size="tiny"
													checked={!!currentProps[config.name]}
													onChange={(e) => handlePropChange(config.name, e.target.checked)}
												/>
											)}
										</Fragment>
									))}
								</div>
							</div>
							<Divider spacing={15} />
							<div className="flex justify-end pt-2 mt-2">
								<Button
									onClick={handleResetProps}
									label="Reset Props"
									size="tiny"
									color="neutral"
									variant="solid"
								/>
							</div>
						</div>
					</div>
					{/* Columna de Previsualización del Componente */}
					<div className="flex flex-col h-full">
						<label className="text-lg font-semibold text-(--foreground-color) pl-2 border border-(--border-color)/50 border-b-0 rounded-t-sm bg-(--surface-a)">
							Preview
						</label>
						<div
							className="relative flex flex-col justify-center items-center 
					 bg-(--background-color) p-5 rounded-b-md min-h-[200px] border border-(--border-color)/50 h-full"
						>
							{renderedComponent}
						</div>
					</div>
				</div>
				<CodeBlock
					buttonCopy
					tabs={[
						{
							code: `<${componentName}${propsString ? "\n\t" : ""}${propsString}${
								propsString ? "\n" : ""
							}/>
							`,
							language: "tsx",
							label: "Code",
						},
					]}
				/>
			</div>
			<Divider spacing={70} variant="dashed" />
		</>
	);
}

// Exporta también como default si lo prefieres para la importación
export default PlaygroundLayout;
