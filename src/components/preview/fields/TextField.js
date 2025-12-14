import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { useForm } from '../../../context/FormContext';

function TextField({ field, disabled, error }) {
    const { previewValues, setPreviewValue } = useForm();
    const value = previewValues[field.id] || '';

    const handleChange = (e) => {
        setPreviewValue(field.id, e.target.value);
    };

    return (
        <MuiTextField
            fullWidth
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={field.required}
            error={!!error}
            helperText={error}
            variant="outlined"
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}

export default TextField;
