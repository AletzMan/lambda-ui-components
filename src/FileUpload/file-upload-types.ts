import { InputHTMLAttributes } from 'react';
import { DropZoneVariants, FileUploadVariants } from './file-upload.variants';

export interface SelectedFileData {
    file: File;
    id: string;
    previewUrl?: string;
}

export interface FileUploadProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'size' | 'disabled' | 'onChange' | 'value' | 'multiple' | 'accept' | 'required' | 'aria-invalid' | 'aria-describedby' | 'aria-labelledby'
    > {
    type?: 'dropzone' | 'button';
    buttonText?: string;
    size?: FileUploadVariants['size'];
    radius?: DropZoneVariants['radius'];
    disabled?: boolean;
    invalid?: boolean;
    multiple?: boolean;
    accept?: string;
    required?: boolean;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    helperText?: string;
    maxSize?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDragOver?: (event: React.DragEvent<HTMLElement>) => void;
    onDragLeave?: (event: React.DragEvent<HTMLElement>) => void;
    onDrop?: (event: React.DragEvent<HTMLElement>) => void;
    name?: string;
    onFilesRejected?: (files: File[]) => void;
    viewFileSize?: boolean;
}