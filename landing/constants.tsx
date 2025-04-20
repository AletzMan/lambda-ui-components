import { AlertCircle, CheckCircle, HelpCircle, Menu, Send, Trash } from "lucide-react";
import { JSX } from "react";

interface IButton {
    color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | null | undefined
    label: string | undefined
    icon: JSX.Element | undefined
}


export const buttonsPrimary: IButton[] = [
    { color: 'primary', label: 'Primary', icon: <Send /> },
    { color: 'secondary', label: 'Secondary', icon: <Menu /> },
    { color: 'success', label: 'Success', icon: <CheckCircle /> },
    { color: 'danger', label: 'Danger', icon: <Trash /> },
    { color: 'warning', label: 'Warning', icon: <AlertCircle /> },
    { color: 'info', label: 'Info', icon: <HelpCircle /> }
];
