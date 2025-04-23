import { useEffect, useMemo, useRef } from 'react';
import { SelectedFileData } from '../file-upload-types';

/**
 * Hook para añadir URLs de previsualización a objetos SelectedFileData y gestionar su limpieza.
 * Recibe un array de SelectedFileData (que ya tienen ID) y añade previewUrl para imágenes.
 * @param selectedFilesData Array de objetos SelectedFileData.
 * @returns {SelectedFileData[]} Array de objetos SelectedFileData con previewUrl añadido para imágenes.
 */
export function useImagePreviews(selectedFilesData: SelectedFileData[]): SelectedFileData[] {
    const filesWithPreviews = useMemo(() => {
        return selectedFilesData.map(item => {
            if (item.file.type.startsWith('image/') && !item.previewUrl) {
                try {
                    return { ...item, previewUrl: URL.createObjectURL(item.file) };
                } catch (error) {
                    console.error("Error creating object URL for file:", item.file.name, error);
                    return item;
                }
            }
            return item;
        });
    }, [selectedFilesData]);

    const prevFilesWithPreviewsRef = useRef<SelectedFileData[]>([]);

    useEffect(() => {
        const previousFiles = prevFilesWithPreviewsRef.current;
        const currentFiles = filesWithPreviews;

        const removedFiles = previousFiles.filter(prevItem =>
            !currentFiles.some(currentItem => currentItem.id === prevItem.id)
        );


        removedFiles.forEach(item => {
            if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(item.previewUrl);
            }
        });


        prevFilesWithPreviewsRef.current = currentFiles;

        return () => {
            prevFilesWithPreviewsRef.current.forEach(item => {
                if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(item.previewUrl);
                }
            });
        };

    }, [filesWithPreviews]);

    return filesWithPreviews;
}