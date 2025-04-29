import { NotificationVariants } from "./notification.variant";

export interface NotificationProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "size"> {

    /**
     * Define el tipo semántico de la notificación (por ejemplo, 'info', 'success', 'warning', 'error').
     * Esto suele afectar el color del icono y del borde/fondo de la notificación. .
     */
    notificationType?: NotificationVariants["notificationType"];

    /**
     * Define la posición en la pantalla donde aparecerá la notificación .
     */
    placement?: NotificationVariants["placement"];

    /**
     * Define la variante visual general de la notificación . 
     */
    variant?: NotificationVariants["variant"];

    /**
     * El título principal de la notificación.
     */
    title?: string;

    /**
     * El mensaje o contenido principal de la notificación.
     */
    message?: string;

    /**
     * Opcional: Un elemento React para usar como icono principal de la notificación.
     * Si no se proporciona, se puede usar un icono por defecto basado en `notificationType`.
     */
    icon?: React.ReactNode;

    /**
     * Indica si el usuario puede cerrar la notificación manualmente (por ejemplo, haciendo clic en un botón de cerrar).
     * @default true (o el valor que se defina en el componente)
     */
    closable?: boolean;

    /**
     * La duración en milisegundos que la notificación permanecerá visible antes de cerrarse automáticamente.
     * Si es 0 o indefinido, la notificación no se cerrará automáticamente.
     */
    duration?: number;

    /**
     * Callback que se dispara cuando la notificación se cierra, ya sea manualmente por el usuario o automáticamente después de `duration`.
     */
    onClose?: () => void;

    /**
     * Callback que se dispara cuando el usuario activa la acción de confirmación.
     * La presencia de este handler suele indicar que la notificación tiene botones de acción.
     */
    onConfirm?: () => void;

    /**
     * Callback que se dispara cuando el usuario activa la acción de cancelación.
     * La presencia de este handler suele indicar que la notificación tiene botones de acción.
     */
    onCancel?: () => void;

    /**
     * El texto que se muestra en el botón o enlace de cancelación.
     * Relevante cuando se usa `onCancel`.
     * @default 'Cancel'  
     */
    cancelText?: string;

    /**
     * El texto que se muestra en el botón o enlace de confirmación.
     * Relevante cuando se usa `onConfirm`.
     * @default 'Confirm'  
     */
    confirmText?: string;

    /**
     * Una etiqueta para accesibilidad (ARIA). Proporciona una descripción concisa para lectores de pantalla.
     */
    'aria-label'?: string;
}