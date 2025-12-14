import { useEffect, useRef, useCallback, useState } from 'react';
import { useForm } from '../context/FormContext';
import { saveFormToStorage } from '../utils/storage';

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

/**
 * Hook to handle autosave functionality
 */
export function useAutosave() {
    const { isDirty, getFormData, markSaved } = useForm();
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [error, setError] = useState(null);
    const timerRef = useRef(null);

    const save = useCallback(async () => {
        if (!isDirty) return;

        setIsSaving(true);
        setError(null);

        try {
            const formData = getFormData();
            const result = saveFormToStorage(formData);

            if (result.success) {
                const now = new Date();
                setLastSaved(now);
                markSaved();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    }, [isDirty, getFormData, markSaved]);

    // Set up autosave interval
    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (isDirty) {
                save();
            }
        }, AUTOSAVE_INTERVAL);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isDirty, save]);

    // Format last saved time
    const lastSavedText = lastSaved
        ? `Saved at ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : null;

    return {
        isSaving,
        lastSaved,
        lastSavedText,
        error,
        saveNow: save,
    };
}

export default useAutosave;
