import { useEffect, useState, useCallback } from 'react';
import { useForm } from '../context/FormContext';
import { getFormFromURL, generateShareableURL, clearURLParam, copyToClipboard } from '../utils/shareUrl';

/**
 * Hook to handle shareable URL functionality
 */
export function useShareUrl() {
    const { loadForm, getFormData } = useForm();
    const [shareUrl, setShareUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadedFromUrl, setLoadedFromUrl] = useState(false);

    // Check for form data in URL on mount
    useEffect(() => {
        const result = getFormFromURL();

        if (result.success && result.data) {
            loadForm(result.data);
            setLoadedFromUrl(true);
            // Clear URL param after loading
            clearURLParam();
        }

        setIsLoading(false);
    }, [loadForm]);

    // Generate shareable URL
    const generateUrl = useCallback(() => {
        const formData = getFormData();
        const result = generateShareableURL(formData);

        if (result.success) {
            setShareUrl(result.url);
            return result.url;
        }

        return null;
    }, [getFormData]);

    // Copy URL to clipboard
    const copyUrl = useCallback(async () => {
        if (!shareUrl) {
            const url = generateUrl();
            if (url) {
                return copyToClipboard(url);
            }
            return { success: false, error: 'Failed to generate URL' };
        }

        return copyToClipboard(shareUrl);
    }, [shareUrl, generateUrl]);

    return {
        shareUrl,
        generateUrl,
        copyUrl,
        isLoading,
        loadedFromUrl,
    };
}

export default useShareUrl;
