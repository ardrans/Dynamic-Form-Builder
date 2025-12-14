import React, { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from '../../context/FormContext';
import { evaluateFieldVisibility, evaluateFieldDisabled } from '../../utils/conditionalLogic';
import { validateAllFields } from '../../utils/validation';
import PreviewField from './PreviewField';

function FormPreview() {
    const { fields, formTitle, formDescription, previewValues, resetPreview } = useForm();
    const [showSuccess, setShowSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // Filter visible fields based on conditional logic
    const visibleFields = fields.filter((field) =>
        evaluateFieldVisibility(field, previewValues)
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all visible fields
        const validation = validateAllFields(visibleFields, previewValues);

        if (!validation.isValid) {
            setValidationErrors(validation.fieldResults);
            return;
        }

        // Success!
        setShowSuccess(true);
        setValidationErrors({});
    };

    const handleReset = () => {
        resetPreview();
        setValidationErrors({});
    };

    if (fields.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 6,
                    color: 'text.secondary',
                }}
            >
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Your form preview will appear here
                </Typography>
                <Typography variant="caption">
                    Add fields from the builder to get started
                </Typography>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {/* Form Title */}
            <Typography variant="h5" fontWeight={600} gutterBottom>
                {formTitle}
            </Typography>

            {formDescription && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {formDescription}
                </Typography>
            )}

            {/* Fields */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {visibleFields.map((field) => {
                    const isDisabled = evaluateFieldDisabled(field, previewValues);
                    const fieldValidation = validationErrors[field.id];

                    return (
                        <PreviewField
                            key={field.id}
                            field={field}
                            disabled={isDisabled}
                            error={fieldValidation?.errors?.[0]}
                        />
                    );
                })}
            </Box>

            {/* Submit & Reset Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    }}
                >
                    Submit
                </Button>
                <Button variant="outlined" onClick={handleReset}>
                    Reset
                </Button>
            </Box>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={4000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    variant="filled"
                >
                    Form submitted successfully! (Preview only)
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default FormPreview;
