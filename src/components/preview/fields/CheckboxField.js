import React from 'react';
import {
    FormControl,
    FormControlLabel,
    Checkbox,
    FormHelperText,
} from '@mui/material';
import { useForm } from '../../../context/FormContext';

function CheckboxField({ field, disabled, error }) {
    const { previewValues, setPreviewValue } = useForm();
    const value = previewValues[field.id] || false;

    const handleChange = (e) => {
        setPreviewValue(field.id, e.target.checked);
    };

    return (
        <FormControl error={!!error} disabled={disabled}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={handleChange}
                        color="primary"
                    />
                }
                label={
                    <>
                        {field.label}
                        {field.required && <span style={{ color: 'red' }}> *</span>}
                    </>
                }
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default CheckboxField;
