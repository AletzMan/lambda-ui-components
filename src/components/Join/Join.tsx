/* eslint-disable react-refresh/only-export-components */
import {
	forwardRef,
	createContext,
	useMemo,
	PropsWithChildren,
	useContext,
	RefAttributes,
	Attributes,
} from "react";
import styles from "./join.module.css";
import clsx from "clsx";
import { VariantProps } from "class-variance-authority";
import { join, JoinVariants, joinWrapper } from "./join.variants";
import React from "react";

type JoinContextType = {
	/** Tamaño del componente */
	size?: JoinVariants["size"];
	/** Radio del componente */
	radius?: JoinVariants["radius"];
	/** Indica si el componente está deshabilitado */
	disabled?: boolean | null;
};

export const JoinContext = createContext<JoinContextType | null>(null);

export interface JoinProps extends VariantProps<typeof join>, RefAttributes<HTMLDivElement> {
	errorMessage?: string;
}

export const Join = forwardRef<HTMLDivElement, PropsWithChildren<JoinProps>>(
	({ children, size, radius, disabled }, ref) => {

		const contextValue = useMemo(
			() => ({
				size: size ?? "medium",
				radius,
				disabled: disabled ?? false,
			}),
			[size, radius, disabled]
		);

		const childrenConAtributo = React.Children.map(children, (child, index) => {
			// 1. Verificar si el nodo es un elemento válido de React (no un string, null, etc.)
			if (React.isValidElement(child)) {
				const childrenPosition =
					index === 0 ? "first" : index === React.Children.count(children) - 1 ? "last" : "middle";
				// 2. Clonar el elemento, pasando un objeto con las nuevas props a agregar.
				return React.cloneElement(child, {
					joinposition: `${childrenPosition}`,
					// Las props originales del hijo se mantienen y las nuevas se fusionan
				} as Attributes);
			}

			// Devolver el nodo original si no es un elemento válido
			return child;
		});
		return (
			<JoinContext.Provider value={contextValue}>
				<div className={styles["lambda-join-container"]}>
					<div
						ref={ref}
						className={clsx(
							join({
								size,
								disabled,
								radius,
							})
						)}
					>
						<div className={clsx(joinWrapper({ size }))}>{childrenConAtributo}</div>
					</div>
				</div>
			</JoinContext.Provider>
		);
	}
);

export const useJoin = () => {
	const context = useContext(JoinContext);
	if (!context) {
		throw new Error("useJoin must be used within an Join");
	}
	return context;
};

export default Join; // Exportamos el componente con forwardRef
