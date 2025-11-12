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
} from "lambda-ui-components";

export interface PropConfig {
	name: string;
	type: "boolean" | "string" | "number" | "select" | "slider" | "radio" | "checkbox";
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
	console.log(arrayProps);

	const propsString = arrayProps
		.map((prop) => {
			if (prop.type === "boolean") {
				console.log(prop.value);
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
		<div className="flex flex-col gap-4 bg-(--background-color) p-6 rounded-lg shadow-lg mr-3.5">
			{title && (
				<h2 id={id} className="text-2xl font-bold mb-1">
					{title}
				</h2>
			)}
			{description && <p className="text-(--foreground-secondary-color) mb-7">{description}</p>}

			<div className="grid grid-cols-[0.85fr_1fr] max-[1000px]:flex max-[1000px]:flex-col-reverse gap-6">
				{/* Columna de Controles de Props */}
				<div>
					<label className="text-lg font-semibold text-(--foreground-color) pl-2">Properties</label>
					<div className="bg-(--background-color) p-4 rounded-md border border-(--border-color)/50">
						<div className="space-y-2">
							<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 my-6">
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
													handlePropChange(config.name, e.target.checked ? config.default : false)
												}
											/>
										)}
									</Fragment>
								))}
							</div>
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
																value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
															}
														/>
													))}
												</RadioGroup>
											</div>
										)}
									</Fragment>
								))}
							</div>
							<div className="flex flex-col items-start gap-3 py-3.5 mb-5 px-1 my-6">
								{propConfigs.map((config) => (
									<Fragment key={config.name}>
										{config.type === "slider" && config.values && (
											<div className="flex flex-col items-start w-full">
												<label className="text-xs font-medium text-(--foreground-label-color) ">
													{config.label}
												</label>
												<Slider
													size="small"
													radius="full"
													min={0}
													max={config.values.length - 1}
													formatValue={(value) =>
														(config.values?.[value].toString().charAt(0).toUpperCase() || "") +
														(config.values?.[value].toString().slice(1) || "")
													}
													value={Number(config!.values!.indexOf(currentProps[config.name]) ?? 0)}
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
				<div className="flex flex-col gap-0.5 h-full">
					<div className="flex items-center gap-2 text-lg font-semibold text-(--foreground-color) pl-2">
						Preview
					</div>
					<div className="relative bg-(--background-color) p-5 rounded-md flex flex-col justify-center items-center min-h-[200px] border border-(--border-color)/50 h-full">
						{renderedComponent}
					</div>
				</div>
			</div>
			<CodeBlock
				buttonCopy
				tabs={[{ code: `<${componentName}\n\t${propsString}\n/>`, language: "tsx", label: "Code" }]}
			/>
		</div>
	);
}

// Exporta también como default si lo prefieres para la importación
export default PlaygroundLayout;
