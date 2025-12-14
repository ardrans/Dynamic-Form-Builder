import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from '../../../context/FormContext';

function EmailField({ field, disabled, error }) {
    const { previewValues, setPreviewValue } = useForm();
    const value = previewValues[field.id] || '';

    const handleChange = (e) => {
        setPreviewValue(field.id, e.target.value);
    };

    return (
        <TextField
            fullWidth
            type="email"
            label={field.label}
            placeholder={field.placeholder || 'email@example.com'}
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
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <EmailIcon color="action" fontSize="small" />
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default EmailField;
