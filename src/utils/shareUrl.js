// Shareable URL utilities using Base64 encoding

/**
 * Encode form data to Base64 for URL sharing
 */
export const encodeFormToBase64 = (formData) => {
    try {
        const jsonString = JSON.stringify(formData);
        // Use encodeURIComponent to handle special characters before Base64 encoding
        const encoded = btoa(encodeURIComponent(jsonString));
        return { success: true, encoded };
    } catch (error) {
        console.error('Failed to encode form:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Decode form data from Base64
 */
export const decodeFormFromBase64 = (encoded) => {
    try {
        const jsonString = decodeURIComponent(atob(encoded));
        const formData = JSON.parse(jsonString);
        return { success: true, data: formData };
    } catch (error) {
        console.error('Failed to decode form:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Generate a shareable URL with the form data encoded in the query parameter
 */
export const generateShareableURL = (formData) => {
    const result = encodeFormToBase64(formData);
    if (!result.success) {
        return result;
    }

    const baseURL = window.location.origin + window.location.pathname;
    const shareableURL = `${baseURL}?form=${result.encoded}`;

    return { success: true, url: shareableURL };
};

/**
 * Extract and decode form data from URL query parameter
 */
export const getFormFromURL = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedForm = urlParams.get('form');

        if (!encodedForm) {
            return { success: false, error: 'No form data in URL' };
        }

        return decodeFormFromBase64(encodedForm);
    } catch (error) {
        console.error('Failed to get form from URL:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return { success: true };
    } catch (error) {
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return { success: true };
        } catch (fallbackError) {
            console.error('Failed to copy:', fallbackError);
            return { success: false, error: 'Failed to copy to clipboard' };
        }
    }
};

/**
 * Clear the form parameter from URL without page reload
 */
export const clearURLParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('form');
    window.history.replaceState({}, '', url.toString());
};
