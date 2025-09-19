/* eslint-disable react-refresh/only-export-components */
import {
	ReactNode,
	forwardRef,
	createContext,
	useMemo,
	PropsWithChildren,
	FC,
	useContext,
	RefAttributes,
	useRef,
} from "react";
import styles from "./inputGroup.module.css";
import clsx from "clsx";
import { VariantProps } from "class-variance-authority";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { inputGroup, inputGroupWrapper } from "./inputgroup.variants";
import { InputProps } from "../Input/input.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

type InputGroupContextType = {
	/** Variante del componente */
	variant?: "outline" | "soft" | "underline" | null;
	/** Tamaño del componente */
	size?: "tiny" | "small" | "medium" | "large" | null;
	/** Indica si el componente es inválido */
	invalid?: boolean | null;
	/** Indica si el componente está deshabilitado */
	hasElements: "none" | "first" | "last" | "both";
	/** Indica si el componente está deshabilitado */
	disabled?: boolean | null;
};

const InputGroupContext = createContext<InputGroupContextType | null>(null);

export interface InputGroupProps
	extends Omit<InputProps, "invalid" | "disabled">,
		VariantProps<typeof inputGroup>,
		RefAttributes<HTMLDivElement> {
	/** Elemento que se muestra al inicio del grupo de inputs */
	prefixElement?: ReactNode;
	/** Elemento que se muestra al final del grupo de inputs */
	suffixElement?: ReactNode;
	errorMessage?: string;
}

export const InputGroup: FC<PropsWithChildren<InputGroupProps>> = forwardRef<
	HTMLDivElement,
	InputGroupProps
>(
	(
		{ prefixElement, suffixElement, children, variant, size, invalid, disabled, errorMessage },
		ref
	) => {
		const { radiusField } = useUIConfig();
		const hasElements: "none" | "first" | "last" | "both" =
			prefixElement && suffixElement
				? "both"
				: prefixElement
				? "first"
				: suffixElement
				? "last"
				: "none";
		const refPrefix = useRef<HTMLDivElement>(null);

		const contextValue = useMemo(
			() => ({
				variant: variant ?? "outline",
				size: size ?? "medium",
				invalid: invalid ?? false,
				hasElements: hasElements,
				disabled: disabled ?? false,
			}),
			[variant, size, invalid, disabled, hasElements]
		);

		return (
			<InputGroupContext.Provider value={contextValue}>
				<div className={styles["lambda-input-group-container"]}>
					<div
						ref={ref}
						className={clsx(
							inputGroup({
								variant: variant,
								size,
								invalid,
								disabled,
								radius: radiusField,
								hasElements,
							})
						)}
					>
						{prefixElement && (
							<div className={styles["lambda-input-group-start"]} ref={refPrefix}>
								{prefixElement}
							</div>
						)}
						<div className={clsx(inputGroupWrapper({ variant: variant }))}>{children}</div>
						{suffixElement && (
							<div className={styles["lambda-input-group-end"]}>{suffixElement}</div>
						)}
					</div>
					{errorMessage && invalid && (
						<InvalidMessage
							errorMessage={errorMessage}
							invalid={invalid}
							size={size}
							marginArrow={refPrefix?.current?.getBoundingClientRect().width}
						/>
					)}
				</div>
			</InputGroupContext.Provider>
		);
	}
);

export const useInputGroup = () => {
	const context = useContext(InputGroupContext);
	if (!context) {
		throw new Error("useInputGroup must be used within an InputGroup");
	}
	return context;
};

export default InputGroup; // Exportamos el componente con forwardRef
