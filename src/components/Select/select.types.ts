import { SelectHTMLAttributes } from "react";

import {
    SelectVariants
} from "./select.variants";


export interface IListCollection {
    label: string;
    value: string;
    avatar?: string;
    description?: string;
}


export interface SelectProps
    extends Omit<
        SelectHTMLAttributes<HTMLSelectElement>,
        "size" | "disabled" | "value" | "onChange" | "placeholder" | "required" | "multiple" | "name"
    > {
    size?: SelectVariants["size"];
    variant?: SelectVariants["variant"];
    radius?: SelectVariants["radius"];
    disabled?: boolean;
    invalid?: boolean;
    label?: string;
    options: IListCollection[];
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | undefined) => void;
    name?: string;
}