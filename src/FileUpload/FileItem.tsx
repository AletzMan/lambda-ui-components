import { MouseEvent } from 'react';
import clsx from 'clsx';
import { FileItemVariants, fileItem } from './file-upload.variants';
import styles from './file-upload.module.css';
import { XCircleIcon, FileIcon, FileImage } from 'lucide-react';
import { SelectedFileData } from './file-upload-types';
import { formatBytes } from '../_util/helpers';

interface FileItemProps extends FileItemVariants {
    fileData: SelectedFileData;
    onRemove: (id: string) => void;
    viewFileSize: boolean;
}

export const FileItem = ({
    fileData,
    onRemove,
    size,
    invalid,
    viewFileSize,
}: FileItemProps) => {
    const isImage = fileData.file.type.startsWith('image/');

    const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onRemove(fileData.id);
    };


    const getFileIcon = () => {
        if (isImage) {
            return fileData.previewUrl ? (
                <img src={fileData.previewUrl} alt={`Preview of ${fileData.file.name}`} className={styles["lambda-file-upload-file-item-preview"]} />
            ) : (
                <FileImage className={styles["lambda-file-upload-file-item-icon"]} />
            );
        }
        return <FileIcon className={styles["lambda-file-upload-file-item-icon"]} />;
    };

    return (
        <li
            key={fileData.id}
            className={clsx(
                styles["lambda-file-upload-file-item-base"],
                fileItem({ size, invalid, isImage }),
            )}
        >
            {/* Icono o previsualización */}
            <div className={styles["lambda-file-upload-file-item-icon-container"]}>
                {getFileIcon()}
            </div>

            {/* Información del archivo */}
            <div className={styles["lambda-file-upload-file-item-info"]}>
                <span className={styles["lambda-file-upload-file-item-name"]}>{fileData.file.name}</span>
                {/* Opcional: Mostrar tamaño del archivo */}
                {viewFileSize && <span className={styles["lambda-file-upload-file-item-size"]}>{formatBytes(fileData.file.size)}</span>}
            </div>

            <button
                type="button"
                onClick={handleRemoveClick}
                className={styles["lambda-file-upload-file-item-remove-button"]}
                aria-label={`Remover archivo ${fileData.file.name}`}
            >
                <XCircleIcon className={styles["lambda-file-upload-file-item-remove-icon"]} />
            </button>
        </li>
    );
};


