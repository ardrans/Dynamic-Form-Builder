import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useForm } from '../../../context/FormContext';

function DateField({ field, disabled, error }) {
    const { previewValues, setPreviewValue } = useForm();
    const value = previewValues[field.id] || '';

    const handleChange = (e) => {
        setPreviewValue(field.id, e.target.value);
    };

    return (
        <TextField
            fullWidth
            type="date"
            label={field.label}
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
                        <EventIcon color="action" fontSize="small" />
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default DateField;
