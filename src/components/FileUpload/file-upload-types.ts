import { InputHTMLAttributes } from 'react';
import { DropZoneVariants, FileUploadVariants } from './file-upload.variants';

export interface SelectedFileData {
    /**
     * El objeto nativo `File` seleccionado por el usuario.
     */
    file: File;

    /**
     * Un identificador único para este archivo seleccionado.
     * Es útil para operaciones de eliminación o gestión individual de archivos cuando se permite selección múltiple.
     */
    id: string;

    /**
     * Opcional: Una URL temporal para previsualizar el archivo (por ejemplo, una URL de datos para imágenes).
     * Si el archivo es un tipo que se puede previsualizar (como una imagen), este campo puede contener la URL para mostrar una vista previa.
     */
    previewUrl?: string;
}

export interface FileUploadProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'size' | 'disabled' | 'onChange' | 'value' | 'multiple' | 'accept' | 'required' | 'aria-invalid' | 'aria-describedby' | 'aria-labelledby'
    > {

    /**
     * Define la apariencia visual y el comportamiento principal del componente.
     * - 'dropzone': Renderiza un área donde los archivos pueden ser arrastrados y soltados.
     * - 'button': Renderiza un botón que, al hacer clic, abre el diálogo de selección de archivos.
     * @default 'dropzone'  
     */
    type?: 'dropzone' | 'button';

    /**
     * El texto que se muestra en el botón de selección de archivos cuando `type` es 'button'.
     */
    buttonText?: string;

    /**
     * Define el tamaño del componente, afectando la dimensión del área de soltar o el botón. 
     */
    size?: FileUploadVariants['size'];

    /**
     * Define el radio de las esquinas del área de soltar o el botón. 
     */
    radius?: DropZoneVariants['radius'];

    /**
     * Deshabilita el componente, impidiendo la selección de archivos y la interacción de arrastrar y soltar.
     * @default false
     */
    disabled?: boolean;

    /**
     * Indica si el componente está en un estado de validación inválido.
     * Esto suele usarse para mostrar estilos de error alrededor del área de soltar o el botón.
     * @default false
     */
    invalid?: boolean;

    /**
     * Permite al usuario seleccionar múltiples archivos a la vez.
     * Si es `false`, solo se puede seleccionar un archivo.
     * @default false
     */
    multiple?: boolean;

    /**
     * Especifica los tipos de archivo permitidos (por ejemplo, "image/*", ".pdf", "image/png,image/jpeg").
     * Utiliza el formato estándar del atributo `accept` de input.
     */
    accept?: string;

    /**
     * Indica si la selección de archivo es obligatoria.
     * No añade validación por sí solo, pero puede usarse para estilos o lógica del formulario padre.
     * @default false
     */
    required?: boolean;

    /**
     * Etiqueta de texto asociada al componente.
     * Si se proporciona, se renderizará típicamente un elemento `<label>` vinculado al componente.
     */
    label?: string;

    /**
     * Texto placeholder que se muestra dentro del área de soltar cuando no se ha seleccionado ningún archivo.
     * Relevante principalmente cuando `type` es 'dropzone'.
     */
    placeholder?: string;

    /**
     * Mensaje de error que se muestra cuando `invalid` es true o cuando se rechazan archivos.
     * Este texto suele aparecer debajo del componente.
     */
    errorMessage?: string;

    /**
     * Texto de ayuda o descripción adicional que se muestra debajo del componente.
     */
    helperText?: string;

    /**
     * Tamaño máximo de archivo permitido en bytes.
     * Los archivos que excedan este tamaño serán rechazados y se disparará `onFilesRejected`.
     */
    maxSize?: number;

    /**
     * Callback que se dispara cuando el usuario selecciona archivos a través del diálogo de selección.
     * Recibe el evento nativo de cambio de input.
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * Callback que se dispara cuando un elemento arrastrable entra en el área de soltar.
     * Recibe el evento nativo de arrastrar.
     */
    onDragOver?: (event: React.DragEvent<HTMLElement>) => void;

    /**
     * Callback que se dispara cuando un elemento arrastrable sale del área de soltar.
     * Recibe el evento nativo de arrastrar.
     */
    onDragLeave?: (event: React.DragEvent<HTMLElement>) => void;

    /**
     * Callback que se dispara cuando se sueltan archivos en el área de soltar. 
     */
    onDrop?: (event: React.DragEvent<HTMLElement>) => void;

    /**
     * El atributo `name` para el elemento input nativo subyacente. 
     */
    name?: string; // Sobrescribe el name nativo (aunque no estaba omitido)

    /**
     * Callback que se dispara cuando uno o más archivos son seleccionados pero no cumplen
     * con los criterios de validación (por ejemplo, tipo de archivo, tamaño máximo).
     * Recibe un array de objetos `File` que fueron rechazados.
     */
    onFilesRejected?: (files: File[]) => void;

    /**
     * Indica si el componente debe mostrar el tamaño de los archivos seleccionados junto a su nombre.
     * @default false
     */
    viewFileSize?: boolean;

    // Nota: Como FileUploadProps extiende Omit<InputHTMLAttributes<HTMLInputElement>, ...>,
    // también acepta otras props estándar de HTMLInputElement (type="file") que no han sido
    // omitidas o redefinidas, como 'id', 'className', 'style', etc.
}