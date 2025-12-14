// Storage utility functions for form persistence

const STORAGE_KEY = 'dynamicFormBuilder';

/**
 * Save form data to localStorage
 */
export const saveFormToStorage = (formData) => {
    try {
        const dataToSave = {
            ...formData,
            savedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        return { success: true };
    } catch (error) {
        console.error('Failed to save form:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Load form data from localStorage
 */
export const loadFormFromStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            return { success: false, error: 'No saved form found' };
        }
        const formData = JSON.parse(saved);
        return { success: true, data: formData };
    } catch (error) {
        console.error('Failed to load form:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Clear saved form from localStorage
 */
export const clearStorage = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return { success: true };
    } catch (error) {
        console.error('Failed to clear storage:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Export form as JSON file download
 */
export const exportFormAsJSON = (formData) => {
    try {
        const dataToExport = {
            ...formData,
            exportedAt: new Date().toISOString(),
            version: '1.0',
        };

        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${formData.formTitle || 'form'}-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Failed to export form:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Import form from JSON file
 */
export const importFormFromFile = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const formData = JSON.parse(e.target.result);
                resolve({ success: true, data: formData });
            } catch (error) {
                resolve({ success: false, error: 'Invalid JSON file' });
            }
        };
        reader.onerror = () => {
            resolve({ success: false, error: 'Failed to read file' });
        };
        reader.readAsText(file);
    });
};
